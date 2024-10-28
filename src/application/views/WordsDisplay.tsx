import React, { useEffect, useRef, useState } from 'react';
import { Options, renderAsync } from 'docx-preview';
import mammoth from 'mammoth'; // 引入 mammoth.js
import PizZip from "pizzip"; // 引入 PizZip
import './FileViewer.css'; // 引入自定义样式
import { useStateStore } from '../core/useStateStore';
import { uid } from 'uid';
import { AppStatus } from '../@types/sys';
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
const WordsDisplay: React.FC<WordsDisplayProps> = ({ width, scale, handlePageItemClicked }) => {
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
  // useEffect(() => {
  //   const container = containerRef.current;
  //   if (container) {
  //     const options: Partial<Options> = {
  //       inWrapper: true,
  //       ignoreWidth: false,
  //       ignoreHeight: false,
  //       className: 'docx-preview',
  //       trimXmlDeclaration: true,
  //       useBase64URL: true,
  //       breakPages: true, // 启用分页
  //       renderHeaders: true,
  //       renderFooters: true,
  //       renderFootnotes: true,
  //       renderEndnotes: true,
  //       ignoreLastRenderedPageBreak: false,
  //     };
  //     console.log(appState.checha_data)
  //     renderAsync(appState.checha_data, container, undefined, options).then(() => {

  //       setTimeout(() => {
  //         setDocHeight(container.scrollHeight);
  //         const pages = container.querySelectorAll('section.docx-preview');
  //         const heights = Array.from(pages).map(page => page.scrollHeight);
  //         setPageHeights(heights);
  //         updatePageManager(pages.length);

  //         useStateStore.getState().setAppState(pre => ({
  //           ...pre,
  //           page_manager: {
  //             total: pages.length + 1,
  //             current: 1,
  //           }
  //         }));


  //         // Initialize BScroll after content is rendered

  //         // Refresh BScroll after content is rendered
  //         //  container.style.height = '500px'; // 设定一个固定高度
  //         setAppStatus(AppStatus.LOADED)
  //       }, 0);
  //     }).catch(error => {
  //       console.log('error 了', error)
  //     })
  //   }
  // }, [appState.checha_data]);

  // useEffect(() => {
  //   highlightedNodes.forEach(({ id, node, color }) => {
  //     if (node.nodeType === Node.TEXT_NODE) {
  //       const parentElement = node.parentElement;
  //       if (parentElement) {
  //         const textContent = node.textContent || '';
  //         const beforeText = textContent.slice(0, startOffset);
  //         const highlightedText = textContent.slice(startOffset, endOffset);
  //         const afterText = textContent.slice(endOffset);
  //         parentElement.innerHTML = `${beforeText}<span id=${id} style="background-color: ${color};">${highlightedText}</span>${afterText}`;
  //       }
  //     } else {
  //       const element = node as HTMLElement;
  //       element.style.backgroundColor = color;
  //       element.setAttribute('id', id);
  //     }
  //   });
  // }, [highlightedNodes]);
  // useEffect(() => {
  //   const container = containerRef.current;
  //   if (!container) return;
  //   // 查找并绘制标注
  //   const start = '登录客户端需要两次认证，分别是第一阶段域认证';
  //   const end = '步骤二：在跳转到域认证界面，输入域账号及密码；';
  //   const color = 'rgba(255, 22, 123,0.31)';
  //   const textNodes = Array.from(container.querySelectorAll('p, span') || []);

  //   // 查找起始和结束节点
  //   textNodes.forEach(node => {
  //     if (node.textContent?.includes(start) && !startNode) {
  //       startNode = node;
  //       startOffset = node.textContent.indexOf(start);
  //       //  console.log('Found start node:', startNode, 'with offset:', startOffset); // 调试日志
  //     }
  //     if (node.textContent?.includes(end) && !endNode) {
  //       endNode = node;
  //       endOffset = node.textContent.indexOf(end) + end.length;
  //       //console.log('Found end node:', endNode, 'with offset:', endOffset); // 调试日志
  //     }
  //   });

  //   if (startNode && endNode) {
  //     const id = uid(8);
  //     if (startNode === endNode) {

  //       console.log('Start node and end node are the same element');
  //       const element = startNode as HTMLElement;

  //       element.style.backgroundColor = color;
  //       element.setAttribute('id', id);
  //       // 重新渲染
  //       container.innerHTML = container.innerHTML;
  //     } else {
  //       const range = document.createRange();
  //       range.setStart(startNode, 0);
  //       range.setEnd(endNode, 0);

  //       const fragment = range.cloneContents();
  //       const elements = fragment.querySelectorAll('*');

  //       // elements.forEach(element => {
  //       //   element.style.backgroundColor = color;
  //       // });

  //       //const wrapId = uid(8);
  //       const wrapElement = document.createElement('span');
  //       wrapElement.setAttribute('id', id);
  //       wrapElement.style.backgroundColor = color; // 设置背景色
  //       wrapElement.style.display = 'block'; // 确保背景色应用到整个范围

  //       // 使用fragment而不是range.cloneContents()
  //       wrapElement.appendChild(fragment);
  //       console.log(wrapElement)
  //       range.insertNode(wrapElement);
  //       console.log('Start node and end node are different elements');
  //     }
  //   } else {
  //     console.warn('Start or end node not found for annotation');
  //   }
  // }, [docHeight, pageHeights]);
  // return (
  //   <div ref={containerRef} style={{ position: 'relative', width: width || '100%', height: '100%' }} className='overflow-y-scroll overflow-x-hidden'>
  //     <div style={{ width: '100%', height: '100%' }}  >
  //       <canvas
  //         ref={canvasRef}
  //         style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
  //         width={width}
  //         height={docHeight} // 根据渲染后的文档高度调整画布高度
  //       />
  //     </div>
  //   </div>
  // );
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

export default WordsDisplay;