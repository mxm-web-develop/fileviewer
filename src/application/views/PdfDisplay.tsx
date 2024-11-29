import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import './style.css';
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useStateStore } from '../store';
import { produce } from 'immer';
import { AppStatus } from '../store/system.type';
import { ScrollArea } from '@radix-ui/themes';
import { AnotationMethod, AnotationPosition, AnotationType } from '../types/system';

let timerPolling: any = null;
const page_gap = 5;
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
  const [canvasSize, setCanvasSize] = useState({ w: 0, h: 0 });
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
    const container = document.querySelector('.pdf-document');
    if (container) {
      container.scrollTop = 0; // 滚动到第一页的顶部
    }
    const canvas: any = document.getElementById('selfCanvas');
    const page: any = document.querySelector(
      `[data-page-number="${appState.page_manager.current}"]`
    );
    if (canvas && page) {
      const updateCanvasPosition = () => {
        const { top, left } = page.getBoundingClientRect();
        const parent = page.parentElement; // 获取父元素
        const parentLeft = parent ? parent.getBoundingClientRect().left : 0; // 获取父元素的左边距

        canvas.style.position = 'absolute';
        canvas.style.top = `${top}px`;
        canvas.style.left = `${left - parentLeft}px`; // 调整canvas的left值

        // 设置canvas的宽度和高度
        canvas.width = page.scrollWidth; // 设置canvas宽度
        canvas.height = page.scrollHeight; // 设置canvas高度

        // 调用绘图函数
        drawMark();
      };

      // 使用 setTimeout 确保在渲染完成后获取高度和宽度
      setTimeout(() => {
        updateCanvasPosition();
      }, 100); // 延迟100毫秒

      // 创建 ResizeObserver 监听父元素的变化
      const resizeObserver = new ResizeObserver(() => {
        updateCanvasPosition(); // 重新计算位置
      });
      const parent = page.parentElement;
      if (parent) {
        resizeObserver.observe(parent); // 观察父元素
      }

      // 清理函数
      return () => {
        resizeObserver.disconnect(); // 断开观察
      };
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
    const ctx = selfCanvas.getContext('2d');

    // 获取canvas的实际宽度和高度
    const renderWidth = selfCanvas.width;
    const renderHeight = selfCanvas.height;

    ctx.clearRect(0, 0, renderWidth, renderHeight); // 清空画布

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

  // const startPolling = () => {
  //   timerPolling = setInterval(() => {
  //     const canvas: any = document.getElementsByClassName('react-pdf__Page__canvas')[0];
  //     if (canvas) {
  //       setCanvasSize({ w: canvas.clientWidth, h: canvas.clientHeight });
  //       clearInterval(timerPolling);
  //     }
  //   });
  // };

  useEffect(() => {
    if (annotation?.method === 'position' && annotation?.data?.length && props.width) {
      drawMark();
    }
  }, [annotation?.data, props.width]);

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
            className="relative h-full"
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
          >
            <canvas id="selfCanvas" className="absolute top-0 left-0 z-10" />
            <div className="flex flex-col gap-y-[5px]">
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
