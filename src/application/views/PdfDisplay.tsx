import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useStateStore } from '../store';
import { produce } from 'immer';
import { AppStatus } from '../store/system.type';
import { ScrollArea } from '@radix-ui/themes';
import { AnotationType } from '../types/system';
const options = {
  cMapUrl: `/cmaps/`,
};
export function registerPDFWorker(workerUrl: string) {
  pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;
}
interface IPDFDisplayer {
  width?: number;
  scale?: number;
  annotation?: AnotationType;
}

const PDFDisplay = forwardRef((props: IPDFDisplayer, ref) => {
  const { annotation } = props;
  const { appState, setAppStatus } = useStateStore();
  const [canvasSize, setCanvasSize] = useState({ w: 660, h: 1000 });

  const pageChange = (page: number) => {
    useStateStore.setState((prevState) =>
      produce(prevState, (draft) => {
        draft.appState.page_manager = {
          ...draft.appState.page_manager,
          current: page,
        };
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
    const { data }: any = annotation;

    const selfCanvas: any = document.getElementById('selfCanvas');
    if (!selfCanvas) return;
    const ctx = selfCanvas.getContext('2d');

    ctx.clearRect(0, 0, canvasSize.w, canvasSize.h); // 清空画布

    data.forEach((item: any) => {
      const { position, anotation_color } = item;
      ctx.beginPath();
      ctx.fillStyle = anotation_color || 'rgba(223,231,255,.8)';
      // 使用四个位置绘制矩形
      const [[tlX, tlY]] = position;
      ctx.moveTo(tlX, tlY); // 移动到第一个点

      for (let i = 1; i < position.length; i++) {
        ctx.lineTo(position[i][0], position[i][1]); // 绘制线段
      }

      ctx.closePath(); // 关闭路径
      ctx.fill(); // 填充多边形
    });
  };

  useEffect(() => {
    if (annotation?.method !== 'position' || !canvasSize.w || !canvasSize.h) return;
    drawMark();
  }, [canvasSize, annotation?.data]);

  const setSelfCanvasSize = (annotation: AnotationType) => {
    const { origin_paper_size } = annotation;
    if (!origin_paper_size || !props.width) return;
    const curWidth = props.width;
    const scale = +(curWidth / origin_paper_size?.width).toFixed(2);
    setCanvasSize({ w: curWidth, h: origin_paper_size?.height * scale });
  };

  useEffect(() => {
    if (annotation?.method !== 'position' || !props.width || !annotation.origin_paper_size) return;
    setSelfCanvasSize(annotation);
  }, [annotation]);

  return (
    <div className="h-full">
      <ScrollArea
        type="scroll"
        scrollbars="vertical"
        size={'2'}
        style={{ height: '100%', width: '100%' }}
      >
        <div className="w-full mx-auto" style={{ width: `${canvasSize.w}px` }}>
          <Document
            file={checha_data}
            className="pdf-document relative h-full"
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            options={options}
          >
            <canvas
              id="selfCanvas"
              width={canvasSize.w}
              height={canvasSize.h}
              className="absolute top-0 left-0 z-10"
            />
            <div className="flex flex-col gap-y-3">
              {annotation?.method === 'position' ? (
                <Page
                  pageNumber={appState.page_manager.current}
                  width={props.width}
                  scale={props.scale}
                />
              ) : (
                Array.from(new Array(appState.page_manager?.total), (el, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    width={props.width}
                    scale={props.scale}
                  />
                ))
              )}
            </div>
          </Document>
        </div>
      </ScrollArea>
    </div>
  );
});

export default PDFDisplay;
