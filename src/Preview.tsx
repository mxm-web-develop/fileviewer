import { useFileViewer } from "./application/Fileviewer";

function Preview() {

  const handlethat = (type: string) => {
    console.log(type)
  }
  const { Element } = useFileViewer({
    fileUrl: '/files/6666.pdf',
    // form:'',
    // width: 680,
    actionOnEmmit: handlethat
  });

  return <div className="h-screen w-[850px] relative mx-auto">{Element}</div>;
}


export default Preview
