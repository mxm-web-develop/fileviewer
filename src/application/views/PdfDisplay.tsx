import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import { useEffect } from 'react';
import { useStateStore } from '../store';
import { produce } from 'immer';
import { AppStatus } from '../store/system.type';
import { ScrollArea } from '@radix-ui/themes';
// const worker = new Worker(new URL("/worker/pdf.worker.min.mjs", import.meta.url));
// import PDFWorkerMin from '/worker/pdf.worker.min.mjs'
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  '/worker/pdf.worker.min.js',
  import.meta.url
).toString();

interface IPDFDisplayer {
  width?: number;
  scale?: number;
}

const PDFDisplay = (props: IPDFDisplayer) => {
  const { appState, setAppStatus } = useStateStore();

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

  useEffect(() => {
    console.log(appState);
  }, [appState.page_manager]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    updatePageManager(numPages);
    setAppStatus(AppStatus.LOADED);
    console.log(appState);

    // 检查并调整滚动位置
    const container = document.querySelector('.pdf-document');
    if (container) {
      container.scrollTop = 0; // 滚动到第一页的顶部
      const pageHeight = container.scrollHeight / numPages;
      container.scrollTop = pageHeight * 8; // 滚动到第9页的顶部
    }
  };

  return (
    <ScrollArea type="scroll" scrollbars="vertical" size={'2'} style={{ height: '100%' }}>
      <Document
        file={appState.checha_data}
        className="pdf-document my-5 px-8"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <div className="flex flex-col gap-y-3">
          {Array.from(new Array(appState.page_manager?.total), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={props.width}
              scale={props.scale}
            />
          ))}
        </div>
      </Document>
    </ScrollArea>
  );
};

export default PDFDisplay;
