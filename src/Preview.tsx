import { useEffect, useState } from 'react';
import { useFileViewer, registerPDFWorker } from './application/lib_enter';
import { uid } from 'uid';
registerPDFWorker('../public/worker/pdf.worker.min.js');
//const SCALE = 0.554;

const p = `[[[178, 830], [1010, 830], [1010, 921], [178, 921]],
 [[502, 957], [625, 957], [625, 985], [502, 985]],
  [[220, 1424], [856, 1424], [856, 1453], [220, 1453]],
          [[176, 206], [375, 206], [375, 234], [176, 234]]]`;

const n = [2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4];
const convertData = (positions: number[][][], pages: number[]) => {
  const annotationPositions: any = [];
  positions.forEach((positionSet, index) => {
    const page = pages[index]; // 获取对应的页码
    const id = uid(16); // 生成唯一的id

    annotationPositions.push({
      id,
      page,
      anotation_color: '',
      position: [
        positionSet[0], // tl
        positionSet[1], // tr
        positionSet[2], // br
        positionSet[3], // bl
      ],
    });
  });

  return annotationPositions;
};

const positions = JSON.parse(p); // 将字符串解析为数组
const annotationList = convertData(positions, n);

function Preview() {
  const [curPositions, setCurPositions]: any = useState([]);
  const [origin_paper_size, setOriginPaperSize]: any = useState(null);
  const [render_width, setrender_width]: any = useState(null);
  const [fileUrl, setFileUrl] = useState<any>(test_urls);
  const [pdfInfo, setPdfInfo] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      setOriginPaperSize({ width: 1920, height: 1080 });
      setrender_width(526);
    }, 500);
  }, []);
  const { Element, pdfRef, mdRef } = useFileViewer({
    fileUrl: fileUrl,
    form: 'html',
    bgColor: '#fff',
    render_width: 526,
    hide_toolbar: false,
    display_file_type: 'ppt',
    setPdfInfo,
  });
  useEffect(() => {
    console.log('====================================');
    console.log('pdfInfo', pdfInfo);
    console.log('====================================');
  }, [pdfInfo]);

  return (
    <div className="h-[800px] w-[900px] relative mx-auto">
      {Element}
      <button
        onClick={() => {
          pdfRef.current?.pageChange(1);
          setCurPositions([
            {
              id: 'a33e1eb8010',
              page: 1,
              anotation_color: 'rgba(223,231,255,.5)',
              position: [
                [295, 438],
                [1624, 438],
                [1624, 505],
                [295, 505],
              ],
            },
            {
              id: '33e1eb8010a',
              page: 1,
              anotation_color: 'rgba(223,231,255,.5)',
              position: [
                [67, 844],
                [791, 844],
                [791, 873],
                [67, 873],
              ],
            },
            {
              id: '3e1eb8010a2',
              page: 1,
              anotation_color: 'rgba(223,231,255,.5)',
              position: [
                [67, 878],
                [911, 878],
                [911, 911],
                [67, 911],
              ],
            },
            {
              id: 'e1eb8010a21',
              page: 1,
              anotation_color: 'rgba(223,231,255,.5)',
              position: [
                [67, 914],
                [934, 914],
                [934, 947],
                [67, 947],
              ],
            },
          ]);
        }}
      >
        翻页1
      </button>
      <button
        onClick={() => {
          pdfRef.current?.pageChange(2);
          setCurPositions(annotationList);
        }}
      >
        翻页2
      </button>
      <button
        onClick={() => {
          pdfRef.current?.pageChange(6);
          setCurPositions(annotationList);
        }}
      >
        翻页6
      </button>
      <button
        onClick={() => {
          //pdfRef.current?.pageChange(3);
          setCurPositions([]);
        }}
      >
        清除
      </button>
      <button
        onClick={() => {
          mdRef.current?.heightLight({
            positions: [
              [0, 0],
              [1, 1],
            ],
            bgColor: '',
          });
        }}
      >
        高亮
      </button>
      <button
        onClick={() => {
          mdRef.current?.heightLight({
            positions: [
              [9, 4],
              [13, 4],
            ],
            bgColor: '',
          });
        }}
      >
        高亮2
      </button>
      <button
        onClick={() => {
          const res = pdfRef.current?.getAllConfig();
          console.log(res);
        }}
      >
        获取参数
      </button>
      <button
        onClick={() => {
          if (fileUrl === file_url_2) {
            setFileUrl(file_urls);
          } else {
            setFileUrl(file_url_2);
          }
        }}
      >
        切换地址
      </button>
    </div>
  );
}

export default Preview;

const file_urls = [
  'http://10.15.12.13:9000/dev-rag-data/qvq/qvq_%E4%BF%9D%E9%99%A9%E8%B5%84%E4%BA%A7%E7%AE%A1%E7%90%86%E5%85%AC%E5%8F%B8%E7%AE%A1%E7%90%86%E8%A7%84%E5%AE%9A%E7%82%B9%E8%AF%84%E5%A5%A0%E5%AE%9A%E4%BF%9D%E9%99%A9%E8%B5%84%E7%AE%A1%E5%85%AC%E5%8F%B8%E5%88%B6%E5%BA%A6%E5%9F%BA%E7%A1%80%E5%BC%95%E5%AF%BC%E5%B8%82%E5%9C%BA%E5%8C%96%E9%95%BF%E6%9C%9F%E5%8C%96%E7%BB%8F%E8%90%A5%E7%90%86%E5%BF%B5%E8%A1%8C%E4%B8%9A%E7%A0%94%E6%8A%A5/V0/%E3%80%8A%E4%BF%9D%E9%99%A9%E8%B5%84%E4%BA%A7%E7%AE%A1%E7%90%86%E5%85%AC%E5%8F%B8%E7%AE%A1%E7%90%86%E8%A7%84%E5%AE%9A%E3%80%8B%E7%82%B9%E8%AF%84%EF%BC%9A%E5%A5%A0%E5%AE%9A%E4%BF%9D%E9%99%A9%E8%B5%84%E7%AE%A1%E5%85%AC%E5%8F%B8%E5%88%B6%E5%BA%A6%E5%9F%BA%E7%A1%80%EF%BC%8C%E5%BC%95%E5%AF%BC%E5%B8%82%E5%9C%BA%E5%8C%96%E9%95%BF%E6%9C%9F%E5%8C%96%E7%BB%8F%E8%90%A5%E7%90%86%E5%BF%B52022-08-09%E8%A1%8C%E4%B8%9A%E7%A0%94%E6%8A%A5.pdf',
  'http://10.15.12.13:9000/dev-rag-data/qvq/qvq_%E4%BF%9D%E9%99%A9%E8%B5%84%E4%BA%A7%E7%AE%A1%E7%90%86%E5%85%AC%E5%8F%B8%E7%AE%A1%E7%90%86%E8%A7%84%E5%AE%9A%E7%82%B9%E8%AF%84%E5%A5%A0%E5%AE%9A%E4%BF%9D%E9%99%A9%E8%B5%84%E7%AE%A1%E5%85%AC%E5%8F%B8%E5%88%B6%E5%BA%A6%E5%9F%BA%E7%A1%80%E5%BC%95%E5%AF%BC%E5%B8%82%E5%9C%BA%E5%8C%96%E9%95%BF%E6%9C%9F%E5%8C%96%E7%BB%8F%E8%90%A5%E7%90%86%E5%BF%B5%E8%A1%8C%E4%B8%9A%E7%A0%94%E6%8A%A5/V0/%E3%80%8A%E4%BF%9D%E9%99%A9%E8%B5%84%E4%BA%A7%E7%AE%A1%E7%90%86%E5%85%AC%E5%8F%B8%E7%AE%A1%E7%90%86%E8%A7%84%E5%AE%9A%E3%80%8B%E7%82%B9%E8%AF%84%EF%BC%9A%E5%A5%A0%E5%AE%9A%E4%BF%9D%E9%99%A9%E8%B5%84%E7%AE%A1%E5%85%AC%E5%8F%B8%E5%88%B6%E5%BA%A6%E5%9F%BA%E7%A1%80%EF%BC%8C%E5%BC%95%E5%AF%BC%E5%B8%82%E5%9C%BA%E5%8C%96%E9%95%BF%E6%9C%9F%E5%8C%96%E7%BB%8F%E8%90%A5%E7%90%86%E5%BF%B52022-08-09%E8%A1%8C%E4%B8%9A%E7%A0%94%E6%8A%A5.pdf',
  'http://10.15.12.13:9000/dev-rag-data/qvq/qvq_%E4%BF%9D%E9%99%A9%E8%B5%84%E4%BA%A7%E7%AE%A1%E7%90%86%E5%85%AC%E5%8F%B8%E7%AE%A1%E7%90%86%E8%A7%84%E5%AE%9A%E7%82%B9%E8%AF%84%E5%A5%A0%E5%AE%9A%E4%BF%9D%E9%99%A9%E8%B5%84%E7%AE%A1%E5%85%AC%E5%8F%B8%E5%88%B6%E5%BA%A6%E5%9F%BA%E7%A1%80%E5%BC%95%E5%AF%BC%E5%B8%82%E5%9C%BA%E5%8C%96%E9%95%BF%E6%9C%9F%E5%8C%96%E7%BB%8F%E8%90%A5%E7%90%86%E5%BF%B5%E8%A1%8C%E4%B8%9A%E7%A0%94%E6%8A%A5/V0/%E3%80%8A%E4%BF%9D%E9%99%A9%E8%B5%84%E4%BA%A7%E7%AE%A1%E7%90%86%E5%85%AC%E5%8F%B8%E7%AE%A1%E7%90%86%E8%A7%84%E5%AE%9A%E3%80%8B%E7%82%B9%E8%AF%84%EF%BC%9A%E5%A5%A0%E5%AE%9A%E4%BF%9D%E9%99%A9%E8%B5%84%E7%AE%A1%E5%85%AC%E5%8F%B8%E5%88%B6%E5%BA%A6%E5%9F%BA%E7%A1%80%EF%BC%8C%E5%BC%95%E5%AF%BC%E5%B8%82%E5%9C%BA%E5%8C%96%E9%95%BF%E6%9C%9F%E5%8C%96%E7%BB%8F%E8%90%A5%E7%90%86%E5%BF%B52022-08-09%E8%A1%8C%E4%B8%9A%E7%A0%94%E6%8A%A5.pdf',
  'http://10.15.12.13:9000/dev-rag-data/qvq/qvq_%E4%BF%9D%E9%99%A9%E8%B5%84%E4%BA%A7%E7%AE%A1%E7%90%86%E5%85%AC%E5%8F%B8%E7%AE%A1%E7%90%86%E8%A7%84%E5%AE%9A%E7%82%B9%E8%AF%84%E5%A5%A0%E5%AE%9A%E4%BF%9D%E9%99%A9%E8%B5%84%E7%AE%A1%E5%85%AC%E5%8F%B8%E5%88%B6%E5%BA%A6%E5%9F%BA%E7%A1%80%E5%BC%95%E5%AF%BC%E5%B8%82%E5%9C%BA%E5%8C%96%E9%95%BF%E6%9C%9F%E5%8C%96%E7%BB%8F%E8%90%A5%E7%90%86%E5%BF%B5%E8%A1%8C%E4%B8%9A%E7%A0%94%E6%8A%A5/V0/%E3%80%8A%E4%BF%9D%E9%99%A9%E8%B5%84%E4%BA%A7%E7%AE%A1%E7%90%86%E5%85%AC%E5%8F%B8%E7%AE%A1%E7%90%86%E8%A7%84%E5%AE%9A%E3%80%8B%E7%82%B9%E8%AF%84%EF%BC%9A%E5%A5%A0%E5%AE%9A%E4%BF%9D%E9%99%A9%E8%B5%84%E7%AE%A1%E5%85%AC%E5%8F%B8%E5%88%B6%E5%BA%A6%E5%9F%BA%E7%A1%80%EF%BC%8C%E5%BC%95%E5%AF%BC%E5%B8%82%E5%9C%BA%E5%8C%96%E9%95%BF%E6%9C%9F%E5%8C%96%E7%BB%8F%E8%90%A5%E7%90%86%E5%BF%B52022-08-09%E8%A1%8C%E4%B8%9A%E7%A0%94%E6%8A%A5.pdf',
];

const test_urls = [
  "http://10.15.12.13:9000/dev-brain-data/commonLib/1000/ArgoWorkflow任务编排原型设计_html合集/ArgoWorkflow任务编排原型设计_page_1.html",
  "http://10.15.12.13:9000/dev-brain-data/commonLib/1000/ArgoWorkflow任务编排原型设计_html合集/ArgoWorkflow任务编排原型设计_page_2.html",
  "http://10.15.12.13:9000/dev-brain-data/commonLib/1000/ArgoWorkflow任务编排原型设计_html合集/ArgoWorkflow任务编排原型设计_page_3.html",
  "http://10.15.12.13:9000/dev-brain-data/commonLib/1000/ArgoWorkflow任务编排原型设计_html合集/ArgoWorkflow任务编排原型设计_page_4.html",
  "http://10.15.12.13:9000/dev-brain-data/commonLib/1000/ArgoWorkflow任务编排原型设计_html合集/ArgoWorkflow任务编排原型设计_page_5.html",
  "http://10.15.12.13:9000/dev-brain-data/commonLib/1000/ArgoWorkflow任务编排原型设计_html合集/ArgoWorkflow任务编排原型设计_page_6.html",
  "http://10.15.12.13:9000/dev-brain-data/commonLib/1000/ArgoWorkflow任务编排原型设计_html合集/ArgoWorkflow任务编排原型设计_page_7.html",
  "http://10.15.12.13:9000/dev-brain-data/commonLib/1000/ArgoWorkflow任务编排原型设计_html合集/ArgoWorkflow任务编排原型设计_page_8.html",
  "http://10.15.12.13:9000/dev-brain-data/commonLib/1000/ArgoWorkflow任务编排原型设计_html合集/ArgoWorkflow任务编排原型设计_page_9.html",

];


const file_url =
  'http://10.15.12.13:9000/dev-rag-data/qvq/qvq_%E4%BF%9D%E9%99%A9%E8%B5%84%E4%BA%A7%E7%AE%A1%E7%90%86%E5%85%AC%E5%8F%B8%E7%AE%A1%E7%90%86%E8%A7%84%E5%AE%9A%E7%82%B9%E8%AF%84%E5%A5%A0%E5%AE%9A%E4%BF%9D%E9%99%A9%E8%B5%84%E7%AE%A1%E5%85%AC%E5%8F%B8%E5%88%B6%E5%BA%A6%E5%9F%BA%E7%A1%80%E5%BC%95%E5%AF%BC%E5%B8%82%E5%9C%BA%E5%8C%96%E9%95%BF%E6%9C%9F%E5%8C%96%E7%BB%8F%E8%90%A5%E7%90%86%E5%BF%B5%E8%A1%8C%E4%B8%9A%E7%A0%94%E6%8A%A5/V0/%E3%80%8A%E4%BF%9D%E9%99%A9%E8%B5%84%E4%BA%A7%E7%AE%A1%E7%90%86%E5%85%AC%E5%8F%B8%E7%AE%A1%E7%90%86%E8%A7%84%E5%AE%9A%E3%80%8B%E7%82%B9%E8%AF%84%EF%BC%9A%E5%A5%A0%E5%AE%9A%E4%BF%9D%E9%99%A9%E8%B5%84%E7%AE%A1%E5%85%AC%E5%8F%B8%E5%88%B6%E5%BA%A6%E5%9F%BA%E7%A1%80%EF%BC%8C%E5%BC%95%E5%AF%BC%E5%B8%82%E5%9C%BA%E5%8C%96%E9%95%BF%E6%9C%9F%E5%8C%96%E7%BB%8F%E8%90%A5%E7%90%86%E5%BF%B52022-08-09%E8%A1%8C%E4%B8%9A%E7%A0%94%E6%8A%A5.pdf';

const file_url_2 =
  'http://10.15.12.13:9000/dev-rag-data/%E6%8A%BD%E5%8F%96%E9%85%8D%E7%BD%AE%E6%B5%8B%E8%AF%9505/%E6%8A%BD%E5%8F%96%E9%85%8D%E7%BD%AE%E6%B5%8B%E8%AF%9505_%E6%8B%9B%E5%95%86%E9%93%B6%E8%A1%8C%E5%91%98%E5%B7%A5%E8%A1%8C%E4%B8%BA%E5%90%88%E8%A7%84%E6%89%8B%E5%86%8C/V0/%E6%8B%9B%E5%95%86%E9%93%B6%E8%A1%8C%E5%91%98%E5%B7%A5%E8%A1%8C%E4%B8%BA%E5%90%88%E8%A7%84%E6%89%8B%E5%86%8C.pdf';
