import { useFileViewer, registerPDFWorker } from './application/lib_enter';
registerPDFWorker('../public/worker/pdf.worker.min.js');

function Preview() {
  // 修正路径

  const { Element, pdfRef } = useFileViewer({
    fileUrl:
      'http://10.15.12.13:9000/dev-rag-data/%E5%AF%8C%E6%96%87%E6%9C%AC%E6%B5%8B%E8%AF%95/%E5%AF%8C%E6%96%87%E6%9C%AC%E6%B5%8B%E8%AF%95_%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD%E5%8F%8D%E6%B4%97%E9%92%B1%E6%B3%95/V0/%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD%E5%8F%8D%E6%B4%97%E9%92%B1%E6%B3%95.pdf',
    form: 'pdf',
    annotation: {
      method: 'position',
      data: [{ x: 0, y: 0, w: 50, h: 50 }],
    },
    hide_toolbar: true,
  });

  return (
    <div className="w-[980px] h-[800px] relative mx-auto">
      {Element}
      {/* <button
        onClick={() => {
          pdfRef.current?.pageChange(3);
        }}
      >
        翻页
      </button> */}
    </div>
  );
}

export default Preview;
