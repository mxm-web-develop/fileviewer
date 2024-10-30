


import React, { useEffect, useRef, useState } from 'react';
import { Options, renderAsync } from 'docx-preview';
import mammoth from 'mammoth'; // 引入 mammoth.js
import PizZip from "pizzip"; // 引入 PizZip
import './FileViewer.css'; // 引入自定义样式
import { useStateStore } from '../core/useStateStore';
import { uid } from 'uid';

interface WordsDisplayProps {
  width?: number;
  scale?: number;
  handlePageItemClicked?: any
}

const parseStyles = (stylesXml) => {
  const styleMap = [];
  const styleRegex = /<w:lsdException[^>]* w:name="([^"]+)"[^>]*>/g;
  let match;
  while ((match = styleRegex.exec(stylesXml)) !== null) {
    const styleName = match[1];
    // 根据样式名称创建映射
    // switch (styleName.toLowerCase()) {
    //   case 'normal':
    //     styleMap.push("p[style-name='Normal'] => p:fresh");
    //     break;
    //   case 'heading 1':
    //     styleMap.push("p[style-name='Heading 1'] => h1:fresh");
    //     break;
    //   case 'heading 2':
    //     styleMap.push("p[style-name='Heading 2'] => h2:fresh");
    //     break;
    //   // 添加更多样式映射
    //   default:
    //     styleMap.push(`p[style-name='${styleName}'] => p:fresh`);
    // }
  }
  return styleMap;
};
const DocxDisplay: React.FC<WordsDisplayProps> = ({ width, scale, handlePageItemClicked }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { appState, setAppStatus } = useStateStore.getState()
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null)
  const [docContent, setDocContent] = useState<string>('');
  const [docHeight, setDocHeight] = useState<number>(0);
  const [pageHeights, setPageHeights] = useState<number[]>([]);
  const [highlightedNodes, setHighlightedNodes] = useState<{ id: string, node: Node, color: string }[]>([]);
  let startNode: Node | null = null;
  let endNode: Node | null = null;
  let startOffset = 0;
  let endOffset = 0;
  const updatePageManager = (numPages: number) => {
    useStateStore.getState().setAppState((prevState) => ({
      ...prevState,
      page_manager: {
        total: numPages,
        current: prevState.page_manager?.current || 1,
      },
    }));
  };
  // 将 Blob 转换为 ArrayBuffer 的辅助函数
  const blobToArrayBuffer = (blob: Blob): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as ArrayBuffer);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(blob);
    });
  };
  useEffect(() => {
    const loadDocx = async () => {
      if (appState.checha_data) {
        console.log('appState.checha_data', appState.checha_data)
        try {
          const arrayBuffer = await blobToArrayBuffer(appState.checha_data)
          const zip = new PizZip(arrayBuffer);
          const stylesXml = await zip.file('word/styles.xml')?.asText()
          const documentXml = await zip.file('word/document.xml')?.asText()
          const styleMap = parseStyles(stylesXml); // 提取样式映射

          //const stylesXml = await zip.file('word/styles.xml').async('string');
          console.log('Styles XML:', zip, stylesXml);
          const { value: html } = await mammoth.convertToHtml(
            { arrayBuffer: arrayBuffer }, // 确保这里传递的是 document.xml 的内容
            {
              styleMap: [
                "p[style-name='Normal'] => p:fresh",
                "p[style-name='Heading 1'] => h1:fresh",
                // 添加更多样式映射
              ],
            })
          setDocContent(html); // 设置转换后的 HTML 内容
          setAppStatus(AppStatus.LOADED)
        } catch (error) {
          console.error('Error loading DOCX file:', error);
        }
      }
    };

    loadDocx();
  }, [appState.checha_data]);


  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', width: 'auto', height: '100%' }}
      className='overflow-y-scroll overflow-x-hidden bg-white'
      contentEditable // 使容器可编辑
      dangerouslySetInnerHTML={{ __html: docContent }} // 设置 HTML 内容
    />
  );
};

export default DocxDisplay;