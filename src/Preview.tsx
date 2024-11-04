import { useFileViewer } from './application/Fileviewer';

function Preview() {
  const handlethat = (type: string) => {
    console.log(type);
  };
  const { Element } = useFileViewer({
    fileUrl:
      'http://10.15.12.12:9000/dev-rag-data/%E9%87%91%E8%9E%8D%E5%9C%BA%E6%99%AF%E7%9F%A5%E8%AF%86%E5%BA%93/%E9%87%91%E8%9E%8D%E5%9C%BA%E6%99%AF%E7%9F%A5%E8%AF%86%E5%BA%93_%E5%9B%BA%E5%AE%9A%E8%B5%84%E4%BA%A7%E8%B4%B7%E6%AC%BE%E7%AE%A1%E7%90%86%E5%8A%9E%E6%B3%95/V0/%E5%9B%BA%E5%AE%9A%E8%B5%84%E4%BA%A7%E8%B4%B7%E6%AC%BE%E7%AE%A1%E7%90%86%E5%8A%9E%E6%B3%95-_0111.pdf',
    // 'http://10.15.12.11:9000/dev-rag-data/%E5%8E%9F%E6%96%87%E9%A2%84%E8%A7%88%E6%B5%8B%E8%AF%95/%E5%8E%9F%E6%96%87%E9%A2%84%E8%A7%88%E6%B5%8B%E8%AF%95_%E9%93%B6%E8%A1%8C%E5%9F%BA%E6%9C%AC%E7%9F%A5%E8%AF%86%E7%82%B9doc/V0/parsed/%E9%93%B6%E8%A1%8C%E5%9F%BA%E6%9C%AC%E7%9F%A5%E8%AF%86%E7%82%B9.doc.txt',
    //'http://10.15.12.11:9000/dev-rag-data/%E5%8E%9F%E6%96%87%E9%A2%84%E8%A7%88%E6%B5%8B%E8%AF%95/%E5%8E%9F%E6%96%87%E9%A2%84%E8%A7%88%E6%B5%8B%E8%AF%95_IWT%E9%87%8E%E7%94%9F%E5%8A%A8%E7%89%A9%E9%9D%9E%E6%B3%95%E8%B4%B8%E6%98%93%E9%9C%80%E6%B1%82%E5%88%86%E6%9E%90%E6%8A%A5%E5%91%8A/V0/IWT%E9%87%8E%E7%94%9F%E5%8A%A8%E7%89%A9%E9%9D%9E%E6%B3%95%E8%B4%B8%E6%98%93%E9%9C%80%E6%B1%82%E5%88%86%E6%9E%90%E6%8A%A5%E5%91%8A20210520.docx',
    //'http://10.15.12.11:9000/dev-rag-data/%E5%8E%9F%E6%96%87%E9%A2%84%E8%A7%88%E6%B5%8B%E8%AF%95/%E5%8E%9F%E6%96%87%E9%A2%84%E8%A7%88%E6%B5%8B%E8%AF%95_%E9%93%B6%E8%A1%8C%E5%9F%BA%E6%9C%AC%E7%9F%A5%E8%AF%86%E7%82%B9doc/V0/%E9%93%B6%E8%A1%8C%E5%9F%BA%E6%9C%AC%E7%9F%A5%E8%AF%86%E7%82%B9.doc',
    // form:'',
    // width: 680,
    actionOnEmmit: handlethat,
  });

  return <div className="h-screen w-[850px] relative mx-auto">{Element}</div>;
}

export default Preview;
