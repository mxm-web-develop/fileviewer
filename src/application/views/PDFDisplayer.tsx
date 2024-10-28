import { Document, Page, pdfjs } from 'react-pdf';
import { renderAsync } from 'docx-preview';
import Reveal from 'reveal.js';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { useStateStore } from '../core/useStateStore';
import { useEffect, useState } from 'react';
import AnnotationLayer from './AnnotationLayer';
import { Annotation, AppStatus } from '../@types/sys';
pdfjs.GlobalWorkerOptions.workerSrc = '/worker/pdf.worker.min.mjs';
interface IPDFDisplayer {
  annotations?: Annotation[];
  width?: number
  scale?: number
}
const PDFDisplayer = (props: IPDFDisplayer) => {
  // const { appState, setAppState } = useStateStore();
  // const [annotations, setAnnotations] = useState<any[]>([]);
  const { appState, setAppStatus } = useStateStore();
  const updatePageManager = (numPages: number) => {
    useStateStore.getState().setAppState((prevState) => ({
      ...prevState,
      page_manager: {
        total: numPages,
        current: prevState.page_manager?.current || 1,
        scrollTop: 0, // 初始化scrollTop
      },
    }));
  };


  useEffect(() => {
    console.log(appState.page_manager)
  }, [appState.page_manager])
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    updatePageManager(numPages);
    // 检查并调整滚动位置
    const container = document.querySelector('.pdf-document');
    setAppStatus(AppStatus.LOADED)
    console.log(appState)
    if (container) {
      container.scrollTop = 0; // 滚动到第一页的顶部
      const pageHeight = container.scrollHeight / numPages;
      container.scrollTop = pageHeight * 8; // 滚动到第9页的顶部
    }
  };

  return (
    <div className=' overflow-y-scroll h-full w-full'>
      <Document file={appState.checha_data} className="pdf-document my-5" onLoadSuccess={onDocumentLoadSuccess}>
        <div className='flex flex-col gap-y-3'>
          {Array.from(new Array(appState.page_manager?.total), (el, index) => (
            <div key={`page_${index + 1}`} >
              <AnnotationLayer
                pageNumber={index + 1}
                annotations={props.annotations || []}
                width={props.width}
                scale={props.scale}
              // onAddAnnotation={handleAddAnnotation}
              />
            </div>
          ))}
        </div>
      </Document>
    </div>
  )
}

export default PDFDisplayer