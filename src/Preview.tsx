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
  setTimeout(() => {
    setOriginPaperSize({ width: 1191, height: 1684 });
  }, 500);
  const { Element, pdfRef, mdRef } = useFileViewer({
    fileUrl:
      'http://10.15.12.13:9000/dev-rag-data/syt_test/syt_test_%E5%8F%B7%E6%96%87%E8%AF%86%E5%88%AB%E7%82%B9/V0/parsed/60%E5%8F%B7%E6%96%87%E8%AF%86%E5%88%AB%E7%82%B9.xlsx.md',
    // 'http://10.15.12.13:9000/dev-rag-data/%E8%A1%A8%E6%A0%BC%E5%A4%9A%E8%A1%8C%E5%A4%9A%E5%88%97%E6%B5%8B%E8%AF%95/%E8%A1%A8%E6%A0%BC%E5%A4%9A%E8%A1%8C%E5%A4%9A%E5%88%97%E6%B5%8B%E8%AF%95_%E5%8F%B7%E6%96%87%E8%AF%86%E5%88%AB%E7%82%B9/V0/parsed/60%E5%8F%B7%E6%96%87%E8%AF%86%E5%88%AB%E7%82%B9.xlsx.md',
    // 'http://10.15.12.13:9000/dev-rag-data/%E8%A1%A8%E6%A0%BC%E5%A4%9A%E8%A1%8C%E5%A4%9A%E5%88%97%E6%B5%8B%E8%AF%95/%E8%A1%A8%E6%A0%BC%E5%A4%9A%E8%A1%8C%E5%A4%9A%E5%88%97%E6%B5%8B%E8%AF%95_%E6%B6%89%E5%A4%96%E6%94%B6%E6%94%AF%E4%BB%A3%E7%A0%81%E8%A1%A8/V0/%E6%B6%89%E5%A4%96%E6%94%B6%E6%94%AF%E4%BB%A3%E7%A0%81%E8%A1%A8-1547451846112.pdf',
    //'http://10.15.12.13:9000/dev-rag-data/syt_test/syt_test_%E8%BD%B4%E6%89%BF%E7%9F%A5%E8%AF%86%E8%BD%B4%E6%89%BF%E7%9A%84%E7%BB%93%E6%9E%84%E5%8F%8A%E5%90%84%E6%9E%84%E6%88%90%E9%9B%B6%E4%BB%B6%E7%9A%84%E4%BD%9C%E7%94%A8/V0/%E8%BD%B4%E6%89%BF%E7%9F%A5%E8%AF%86%EF%BC%883%EF%BC%89%E2%80%94%E2%80%94%E8%BD%B4%E6%89%BF%E7%9A%84%E7%BB%93%E6%9E%84%E5%8F%8A%E5%90%84%E6%9E%84%E6%88%90%E9%9B%B6%E4%BB%B6%E7%9A%84%E4%BD%9C%E7%94%A8.pdf',
    // 'http://10.15.12.13:9000/dev-rag-data/%E5%AF%8C%E6%96%87%E6%9C%AC%E6%B5%8B%E8%AF%95test1/%E5%AF%8C%E6%96%87%E6%9C%AC%E6%B5%8B%E8%AF%95test1_%E8%BD%B4%E6%89%BF%E6%98%AF%E6%9C%BA%E6%A2%B0%E8%AE%BE%E5%A4%87%E4%B8%AD%E4%B8%BE%E8%B6%B3%E8%BD%BB%E9%87%8D%E7%9A%84%E9%9B%B6%E9%83%A8%E4%BB%B6%E5%89%AF%E6%9C%AC/V0/%E8%BD%B4%E6%89%BF%E6%98%AF%E6%9C%BA%E6%A2%B0%E8%AE%BE%E5%A4%87%E4%B8%AD%E4%B8%BE%E8%B6%B3%E8%BD%BB%E9%87%8D%E7%9A%84%E9%9B%B6%E9%83%A8%E4%BB%B6-%E5%89%AF%E6%9C%AC.pdf',
    //'http://10.15.12.13:9000/dev-rag-data/%E6%99%AE%E9%80%9A%E6%96%87%E4%BB%B6%E6%B5%8B%E8%AF%95/%E6%99%AE%E9%80%9A%E6%96%87%E4%BB%B6%E6%B5%8B%E8%AF%95_n%E6%A1%88IWT%E4%BA%94%E5%BA%93%E6%95%B0%E6%8D%AE%E6%A0%87%E5%87%86%E6%A8%A1%E7%89%88%E6%A1%88%E4%BE%8B%E5%BA%93/V0/n%E6%A1%88IWT_%E4%BA%94%E5%BA%93%E6%95%B0%E6%8D%AE%E6%A0%87%E5%87%86%E6%A8%A1%E7%89%88-%E6%A1%88%E4%BE%8B%E5%BA%93.xlsx',
    form: 'md',
    annotation: {
      method: 'position',
      data: curPositions,
      origin_paper_size,
    },
    render_width: 660,
    hide_toolbar: true,
  });

  // useEffect(() => {
  //   function handleResize() {
  //     console.log('Window resized:', window.innerWidth, window.innerHeight);
  //     const w = window.innerWidth - 100;
  //     setRenderWidth(w);
  //     setRenderScale(w / PDFWIDTH);

  //     // 在这里添加你的响应式逻辑
  //   }

  //   // 添加事件监听器
  //   window.addEventListener('resize', handleResize);

  //   // 清除事件监听器
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  return (
    <div className="h-[800px] w-[900px] relative mx-auto">
      {Element}
      <button
        onClick={() => {
          pdfRef.current?.pageChange(1);
          setCurPositions(annotationList);
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
    </div>
  );
}

export default Preview;
