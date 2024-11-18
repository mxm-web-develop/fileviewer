import { useFileViewer, registerPDFWorker } from './application/lib_enter';

function Preview() {
  // 修正路径
  registerPDFWorker('/worker/pdf.worker.min.js');

  const handlethat = (type: string) => {
    console.log(type);
  };
  const { Element } = useFileViewer({
    // fileUrl: ['http://10.64.7.145:9000/dev-brain-data/demoLib/测试预览PPTslides_1.html',
    //   'http://10.64.7.145:9000/dev-brain-data/demoLib/测试预览PPTslides_2.html',
    //   'http://10.64.7.145:9000/dev-brain-data/demoLib/测试预览PPTslides_3.html',
    //   'http://10.64.7.145:9000/dev-brain-data/demoLib/测试预览PPTslides_4.html',
    //   'http://10.64.7.145:9000/dev-brain-data/demoLib/测试预览PPTslides_5.html',
    //   'http://10.64.7.145:9000/dev-brain-data/demoLib/测试预览PPTslides_6.html',
    //   'http://10.64.7.145:9000/dev-brain-data/demoLib/测试预览PPTslides_7.html',
    //   'http://10.64.7.145:9000/dev-brain-data/demoLib/测试预览PPTslides_8.html',
    //   'http://10.64.7.145:9000/dev-brain-data/demoLib/测试预览PPTslides_9.html',
    //   'http://10.64.7.145:9000/dev-brain-data/demoLib/测试预览PPTslides_10.html',
    //   'http://10.64.7.145:9000/dev-brain-data/demoLib/测试预览PPTslides_11.html',
    //   'http://10.64.7.145:9000/dev-brain-data/demoLib/测试预览PPTslides_12.html',
    //   'http://10.64.7.145:9000/dev-brain-data/demoLib/测试预览PPTslides_13.html',
    //   'http://10.64.7.145:9000/dev-brain-data/demoLib/测试预览PPTslides_14.html',
    //   'http://10.64.7.145:9000/dev-brain-data/demoLib/测试预览PPTslides_15.html',
    //   'http://10.64.7.145:9000/dev-brain-data/demoLib/测试预览PPTslides_16.html',
    //   'http://10.64.7.145:9000/dev-brain-data/demoLib/测试预览PPTslides_17.html',
    //   'http://10.64.7.145:9000/dev-brain-data/demoLib/测试预览PPTslides_18.html',
    //   'http://10.64.7.145:9000/dev-brain-data/demoLib/测试预览PPTslides_19.html',
    //   'http://10.64.7.145:9000/dev-brain-data/demoLib/测试预览PPTslides_20.html'],
    // form: 'html',

    // fileUrl: ['/files/1.html', 'files/aaa.html'], form: 'html',
    // fileUrl: 'http://10.15.12.12:9000/dev-brain-data/demoLib/测试预览表格.xlsx', render_width: 540,

    fileUrl: 'http://10.15.12.12:9000/dev-brain-data/demoLib/领域驱动设计-预览测试_html合集/领域驱动设计-预览测试_page_1.html',
    // fileUrl: [
    //   'http://10.15.12.12:9000/dev-rag-data/%E5%8E%9F%E6%96%87%E8%A7%A3%E6%9E%90%E9%A2%84%E8%A7%88%E6%B5%8B%E8%AF%95/%E5%8E%9F%E6%96%87%E8%A7%A3%E6%9E%90%E9%A2%84%E8%A7%88%E6%B5%8B%E8%AF%95_n%E6%A1%88IWT%E4%BA%94%E5%BA%93%E6%95%B0%E6%8D%AE%E6%A0%87%E5%87%86%E6%A8%A1%E7%89%88%E6%A1%88%E4%BE%8B%E5%BA%93/V0/n%E6%A1%88IWT_%E4%BA%94%E5%BA%93%E6%95%B0%E6%8D%AE%E6%A0%87%E5%87%86%E6%A8%A1%E7%89%88-%E6%A1%88%E4%BE%8B%E5%BA%93.xlsx',
    //   'http://10.15.12.12:9000/dev-rag-data/%E5%8E%9F%E6%96%87%E8%A7%A3%E6%9E%90%E9%A2%84%E8%A7%88%E6%B5%8B%E8%AF%95/%E5%8E%9F%E6%96%87%E8%A7%A3%E6%9E%90%E9%A2%84%E8%A7%88%E6%B5%8B%E8%AF%95_n%E6%A1%88IWT%E4%BA%94%E5%BA%93%E6%95%B0%E6%8D%AE%E6%A0%87%E5%87%86%E6%A8%A1%E7%89%88%E6%A1%88%E4%BE%8B%E5%BA%93/V0/n%E6%A1%88IWT_%E4%BA%94%E5%BA%93%E6%95%B0%E6%8D%AE%E6%A0%87%E5%87%86%E6%A8%A1%E7%89%88-%E6%A1%88%E4%BE%8B%E5%BA%93.xlsx',
    // ],
    // fileUrl: [
    //   'http://10.15.12.12:9000/dev-rag-data/%E5%8E%9F%E6%96%87%E8%A7%A3%E6%9E%90%E9%A2%84%E8%A7%88%E6%B5%8B%E8%AF%95/%E5%8E%9F%E6%96%87%E8%A7%A3%E6%9E%90%E9%A2%84%E8%A7%88%E6%B5%8B%E8%AF%95_%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87/V0/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20241101130208.png',
    //   'http://10.15.12.12:9000/dev-rag-data/%E5%8E%9F%E6%96%87%E8%A7%A3%E6%9E%90%E9%A2%84%E8%A7%88%E6%B5%8B%E8%AF%95/%E5%8E%9F%E6%96%87%E8%A7%A3%E6%9E%90%E9%A2%84%E8%A7%88%E6%B5%8B%E8%AF%95_%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87/V0/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20241101130208.png',
    // ],
    // fileUrl:
    //   'http://10.15.12.12:9000/dev-rag-data/金融场景知识库/金融场景知识库_国家金融监督管理总局有关司局负责人就固定资产贷款管理办法流动资金贷款管理办法个人贷款管理办法答记者问/V0/国家金融监督管理总局有关司局负责人就《固定资产贷款管理办法》《流动资金贷款管理办法》《个人贷款管理办法》答记者问-2024-02-02_01_03_01_01_02.pdf',
    // render_width: 680,
    // fileUrl: '/files/1.xlsx',
    // fileUrl: [
    //   '/files/测试测试01测试01测试01测试01测试01测试01测试01测试01测试01测试01测试测试01测试01测试01测试01测试01测试01测试01测试01测试01测试01测试01测试01测试0101 copy测试01测试01测试0101 copy.txt',
    //   '/files/测试01.txt',
    //   '/files/测试02.txt',
    // ],
    //fileUrl: '/aaa.html',
    //form: 'xlsx',
    // pdf,txt,html,csv
    // "http://10.15.12.12:9000/dev-rag-data/%E5%8E%9F%E6%96%87%E8%A7%A3%E6%9E%90%E9%A2%84%E8%A7%88%E6%B5%8B%E8%AF%95/%E5%8E%9F%E6%96%87%E8%A7%A3%E6%9E%90%E9%A2%84%E8%A7%88%E6%B5%8B%E8%AF%95_IWT%E9%87%8E%E7%94%9F%E5%8A%A8%E7%89%A9%E9%9D%9E%E6%B3%95%E8%B4%B8%E6%98%93%E9%9C%80%E6%B1%82%E5%88%86%E6%9E%90%E6%8A%A5%E5%91%8A/V0/IWT%E9%87%8E%E7%94%9F%E5%8A%A8%E7%89%A9%E9%9D%9E%E6%B3%95%E8%B4%B8%E6%98%93%E9%9C%80%E6%B1%82%E5%88%86%E6%9E%90%E6%8A%A5%E5%91%8A20210520.docx",
    // 'http://10.15.12.12:9000/dev-rag-data/%E5%8E%9F%E6%96%87%E8%A7%A3%E6%9E%90%E9%A2%84%E8%A7%88%E6%B5%8B%E8%AF%95/%E5%8E%9F%E6%96%87%E8%A7%A3%E6%9E%90%E9%A2%84%E8%A7%88%E6%B5%8B%E8%AF%95_%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87/V0/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20241101130208.png',
    // 'http://10.15.12.12:9000/dev-rag-data/%E5%8E%9F%E6%96%87%E8%A7%A3%E6%9E%90%E9%A2%84%E8%A7%88%E6%B5%8B%E8%AF%95/%E5%8E%9F%E6%96%87%E8%A7%A3%E6%9E%90%E9%A2%84%E8%A7%88%E6%B5%8B%E8%AF%95_%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87/V0/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20241101130926.jpeg',
    //'http://10.15.12.12:9000/dev-rag-data/%E9%87%91%E8%9E%8D%E5%9C%BA%E6%99%AF%E7%9F%A5%E8%AF%86%E5%BA%93/%E9%87%91%E8%9E%8D%E5%9C%BA%E6%99%AF%E7%9F%A5%E8%AF%86%E5%BA%93_%E5%9B%BA%E5%AE%9A%E8%B5%84%E4%BA%A7%E8%B4%B7%E6%AC%BE%E7%AE%A1%E7%90%86%E5%8A%9E%E6%B3%95/V0/%E5%9B%BA%E5%AE%9A%E8%B5%84%E4%BA%A7%E8%B4%B7%E6%AC%BE%E7%AE%A1%E7%90%86%E5%8A%9E%E6%B3%95-_0111.pdf',
    // 'http://10.15.12.11:9000/dev-rag-data/%E5%8E%9F%E6%96%87%E9%A2%84%E8%A7%88%E6%B5%8B%E8%AF%95/%E5%8E%9F%E6%96%87%E9%A2%84%E8%A7%88%E6%B5%8B%E8%AF%95_%E9%93%B6%E8%A1%8C%E5%9F%BA%E6%9C%AC%E7%9F%A5%E8%AF%86%E7%82%B9doc/V0/parsed/%E9%93%B6%E8%A1%8C%E5%9F%BA%E6%9C%AC%E7%9F%A5%E8%AF%86%E7%82%B9.doc.txt',
    //'http://10.15.12.11:9000/dev-rag-data/%E5%8E%9F%E6%96%87%E9%A2%84%E8%A7%88%E6%B5%8B%E8%AF%95/%E5%8E%9F%E6%96%87%E9%A2%84%E8%A7%88%E6%B5%8B%E8%AF%95_IWT%E9%87%8E%E7%94%9F%E5%8A%A8%E7%89%A9%E9%9D%9E%E6%B3%95%E8%B4%B8%E6%98%93%E9%9C%80%E6%B1%82%E5%88%86%E6%9E%90%E6%8A%A5%E5%91%8A/V0/IWT%E9%87%8E%E7%94%9F%E5%8A%A8%E7%89%A9%E9%9D%9E%E6%B3%95%E8%B4%B8%E6%98%93%E9%9C%80%E6%B1%82%E5%88%86%E6%9E%90%E6%8A%A5%E5%91%8A20210520.docx',
    //'http://10.15.12.11:9000/dev-rag-data/%E5%8E%9F%E6%96%87%E9%A2%84%E8%A7%88%E6%B5%8B%E8%AF%95/%E5%8E%9F%E6%96%87%E9%A2%84%E8%A7%88%E6%B5%8B%E8%AF%95_%E9%93%B6%E8%A1%8C%E5%9F%BA%E6%9C%AC%E7%9F%A5%E8%AF%86%E7%82%B9doc/V0/%E9%93%B6%E8%A1%8C%E5%9F%BA%E6%9C%AC%E7%9F%A5%E8%AF%86%E7%82%B9.doc',
    // form:'',
    actionOnEmmit: handlethat,
  });

  return <div className="w-[750px] h-[100dvh] relative mx-auto">{Element}</div>;
}

export default Preview;
