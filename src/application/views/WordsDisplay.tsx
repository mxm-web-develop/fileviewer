import React, { useEffect, useRef, useState } from 'react';
import { Options, renderAsync } from 'docx-preview';

import { useStateStore } from '../store';
import { AppStatus } from '../store/system.type';
import { ScrollArea } from '@radix-ui/themes';
import './wordStyle.css'
interface WordsDisplayProps {
  width?: number;
  scale?: number;
  handlePageItemClicked?: any
}

const options = {
  inWrapper: true,
  ignoreWidth: false,
  ignoreHeight: false,
  breakPages: true,
  renderHeaders: false,
  renderFooters: true,
  ignoreLastRenderedPageBreak: true,
  useBase64URL: true,
  experimental: false,
  className: 'string',
  trimXmlDeclaration: true,
  renderFootnotes: false,
  renderChanges: true,
  renderComments: false
};


const WordsDisplay: React.FC<WordsDisplayProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { appState, setAppStatus } = useStateStore.getState();
  const [, setDocHeight] = useState<number>(0);
  // const [pageHeights, setPageHeights] = useState<number[]>([]);

  useEffect(() => {
    if (appState.checha_data && containerRef.current) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;

        // 使用 setTimeout 确保 DOM 元素已渲染
        setTimeout(() => {
          if (containerRef.current) {
            renderAsync(arrayBuffer, containerRef.current, containerRef.current, options).then(() => {
              const height = containerRef.current!.scrollHeight;
              setDocHeight(height);
              setAppStatus(AppStatus.LOADED);
            }).catch(err => {
              console.error(err);
            });
          }
        }, 0);
      };

      try {
        fileReader.readAsArrayBuffer(appState.checha_data);
      } catch (err) {
        console.error(err);
      }
    }
  }, [appState.checha_data]);

  return (
    <ScrollArea>
      <div ref={containerRef}  >
        {/* 渲染的 DOCX 内容将插入到这里 */}
      </div>
    </ScrollArea>

  );
};

export default WordsDisplay;