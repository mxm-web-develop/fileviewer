import { useFileViewer, registerPDFWorker } from './application/lib_enter';
registerPDFWorker('/local/worker/pdf.worker.min.js');

function Preview() {
  // 修正路径

  // const handlethat = (type: string) => {
  //   console.log(type);
  // };
  const { Element } = useFileViewer({
    fileUrl: ['local/files/1.pdf', 'local/files/6666.pdf'], form: 'pdf',
    // actionOnEmmit: handlethat,
  });

  return <div className="w-[980px] h-[800px] relative mx-auto">{Element}</div>;
}

export default Preview;
