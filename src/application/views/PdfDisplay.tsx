import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useStateStore } from '../store';
import { produce } from 'immer';
import { AppStatus } from '../store/system.type';
import { ScrollArea } from '@radix-ui/themes';
// const worker = new Worker(new URL("/worker/pdf.worker.min.mjs", import.meta.url));
// import PDFWorkerMin from '/worker/pdf.worker.min.mjs'
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   '/worker/pdf.worker.min.js',
//   import.meta.url
// ).toString();
let timerPolling: any = null;
export function registerPDFWorker(workerUrl: string) {
  pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;
}
interface IPDFDisplayer {
  width?: number;
  scale?: number;
  annotation?: {
    method: 'match' | 'position' | 'index';
    data?: [
      {
        x: number;
        y: number;
        w: number;
        h: number;
      }
    ];
  };
}

const PDFDisplay = forwardRef((props: IPDFDisplayer, ref) => {
  const { annotation } = props;
  const { appState, setAppStatus } = useStateStore();
  const [canvasSize, setCanvasSize] = useState({ w: 0, h: 0 });
  const pageChange = (page: number) => {
    // 使用 querySelector 获取第一个匹配的元素
    const element = document.querySelector(`[data-page-number="${page}"]`);
    if (!element) return;
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    useStateStore.setState((prevState) =>
      produce(prevState, (draft) => {
        draft.appState.page_manager = {
          ...draft.appState.page_manager,
          current: page,
        }; // 确保 page_manager 存在并更新 total
      })
    );
  };

  const getTotal = () => {
    return appState.page_manager.total;
  };

  useImperativeHandle(ref, () => ({
    pageChange,
    getTotal,
  }));
  const updatePageManager = (numPages: number) => {
    useStateStore.setState((prevState) =>
      produce(prevState, (draft) => {
        draft.appState.page_manager = {
          total: numPages,
          current: 1,
        }; // 确保 page_manager 存在并更新 total
      })
    );
  };
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    updatePageManager(numPages);
    setAppStatus(AppStatus.LOADED);

    // 检查并调整滚动位置
    const container = document.querySelector('.pdf-document');
    if (container) {
      container.scrollTop = 0; // 滚动到第一页的顶部
      const pageHeight = container.scrollHeight / numPages;
      container.scrollTop = pageHeight * 8; // 滚动到第9页的顶部
    }
  };
  const onDocumentLoadError = (error: any) => {
    console.error('Error loading PDF:', error);
    setAppStatus(AppStatus.ERROR);
  };
  const checha_data = useMemo(() => {
    if (appState.data?.length) {
      const currentFileData = appState.data.find((item) => item.id === appState.current_file);
      if (currentFileData) {
        return currentFileData.checha_data;
      }
      return null;
    }
  }, [appState.data, appState.current_file]);

  const drawMark = () => {
    const selfCanvas: any = document.getElementById('selfCanvas');
    const ctx = selfCanvas.getContext('2d');
    (annotation?.data || []).forEach((item: any) => {
      ctx.fillStyle = 'rgba(223,231,255,.5)';
      ctx.rect(item.x, item.y, item.w, item.h);
      ctx.fill();
    });
  };

  useEffect(() => {
    if (
      annotation?.method === 'position' &&
      annotation?.data?.length &&
      canvasSize.w &&
      canvasSize.h
    ) {
      drawMark();
    }
  }, [canvasSize]);

  const startPolling = () => {
    timerPolling = setInterval(() => {
      const canvas: any = document.getElementsByClassName('react-pdf__Page__canvas')[0];
      if (canvas) {
        setCanvasSize({ w: canvas.clientWidth, h: canvas.clientHeight });
        clearInterval(timerPolling);
      }
    });
  };

  useEffect(() => {
    if (annotation?.method === 'position' && annotation?.data?.length) {
      startPolling();
    }
  }, []);

  return (
    <div className="h-full">
      <ScrollArea
        type="scroll"
        scrollbars="vertical"
        size={'2'}
        style={{ height: '100%', width: '100%' }}
      >
        <div className="w-full mx-auto">
          <Document
            file={checha_data}
            className="pdf-document my-5 mx-8 relative h-full"
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
          >
            <canvas
              id="selfCanvas"
              width={canvasSize.w}
              height={canvasSize.h}
              className="absolute top-0 left-0 z-10"
            />
            <div className="flex flex-col gap-y-3">
              {Array.from(new Array(appState.page_manager?.total), (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  width={props.width}
                  scale={props.scale}
                />
              ))}
              {/* {annotation?.method === 'position' ? (
                <Page
                  pageNumber={appState.page_manager.current}
                  width={props.width}
                  scale={props.scale}
                />
              ) : (
                
              )} */}
            </div>
          </Document>
        </div>
      </ScrollArea>
    </div>
  );
});

export default PDFDisplay;
