import { useFileViewer } from "./application";

function Preview() {

  const handlethat = (type: string) => {
    console.log(type)
  }
  const { Element } = useFileViewer({
    fileUrl: '/files/1.pdf',
    // form:'',
    width: 680,
    actionOnEmmit: handlethat
  });

  return <div className="h-[700px] w-[850px] relative mx-auto">{Element}</div>;
}


export default Preview
