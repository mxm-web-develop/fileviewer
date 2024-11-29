import { useEffect, useState } from 'react';
import { useFileViewer, registerPDFWorker } from './application/lib_enter';
import moke from './moke.json'
import { uid } from 'uid';
registerPDFWorker('../public/worker/pdf.worker.min.js');
//const SCALE = 0.554;

const p = `[[[178, 830], [1010, 830], [1010, 921], [178, 921]],
 [[502, 957], [625, 957], [625, 985], [502, 985]],
  [[220, 1424], [856, 1424], [856, 1453], [220, 1453]],
   [[176, 1455], [375, 1455], [375, 1485], [176, 1485]],
    [[175, 143], [1013, 143], [1013, 265], [175, 265]], 
    [[531, 308], [676, 308], [676, 338], [531, 338]],
     [[175, 767], [1013, 767], [1013, 857], [175, 857]],
      [[175, 861], [422, 861], [422, 891], [175, 891]],
       [[175, 893], [1011, 893], [1011, 985], [175, 985]],
        [[507, 1036], [698, 1036], [698, 1064], [507, 1064]],
         [[176, 142], [1010, 142], [1010, 204], [176, 204]],
          [[176, 206], [375, 206], [375, 234], [176, 234]]]`

const n = [2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4]
const convertData = (positions: number[][][], pages: number[]) => {
  const annotationPositions: any = [];
  positions.forEach((positionSet, index) => {
    const page = pages[index]; // 获取对应的页码
    const id = uid(16); // 生成唯一的id

    annotationPositions.push({
      id,
      page,
      position: [
        positionSet[0], // tl
        positionSet[1], // tr
        positionSet[2], // br
        positionSet[3]  // bl
      ],
    });
  });

  return annotationPositions;
};


const positions = JSON.parse(p); // 将字符串解析为数组
const annotationList = convertData(positions, n);

// 输出转换后的数据



const PDFWIDTH = 1190;
function Preview() {
  // 修正路径
  // console.log('====================================');
  // console.log(annotationList);
  // console.log('====================================');
  const [curPositions, setCurPositions]: any = useState([]);
  const [renderWidth, setRenderWidth] = useState(660);
  const [SCALE, setRenderScale] = useState(0.555);
  const { Element, pdfRef } = useFileViewer({
    fileUrl:
      'http://10.15.12.13:9000/dev-rag-data/%E5%AF%8C%E6%96%87%E6%9C%AC%E6%B5%8B%E8%AF%95test1/%E5%AF%8C%E6%96%87%E6%9C%AC%E6%B5%8B%E8%AF%95test1_%E8%BD%B4%E6%89%BF%E6%98%AF%E6%9C%BA%E6%A2%B0%E8%AE%BE%E5%A4%87%E4%B8%AD%E4%B8%BE%E8%B6%B3%E8%BD%BB%E9%87%8D%E7%9A%84%E9%9B%B6%E9%83%A8%E4%BB%B6%E5%89%AF%E6%9C%AC/V0/%E8%BD%B4%E6%89%BF%E6%98%AF%E6%9C%BA%E6%A2%B0%E8%AE%BE%E5%A4%87%E4%B8%AD%E4%B8%BE%E8%B6%B3%E8%BD%BB%E9%87%8D%E7%9A%84%E9%9B%B6%E9%83%A8%E4%BB%B6-%E5%89%AF%E6%9C%AC.pdf',
    //'http://10.15.12.13:9000/dev-rag-data/%E6%99%AE%E9%80%9A%E6%96%87%E4%BB%B6%E6%B5%8B%E8%AF%95/%E6%99%AE%E9%80%9A%E6%96%87%E4%BB%B6%E6%B5%8B%E8%AF%95_n%E6%A1%88IWT%E4%BA%94%E5%BA%93%E6%95%B0%E6%8D%AE%E6%A0%87%E5%87%86%E6%A8%A1%E7%89%88%E6%A1%88%E4%BE%8B%E5%BA%93/V0/n%E6%A1%88IWT_%E4%BA%94%E5%BA%93%E6%95%B0%E6%8D%AE%E6%A0%87%E5%87%86%E6%A8%A1%E7%89%88-%E6%A1%88%E4%BE%8B%E5%BA%93.xlsx',
    form: 'pdf',
    annotation: {
      method: 'position',
      data: annotationList,
    },
    render_width: 650,
    // render_scale: SCALE,
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
    <div className="h-[800px] w-[1000px] relative mx-auto">
      {Element}
      <button
        onClick={() => {
          pdfRef.current?.pageChange(1);
          setCurPositions([
            {
              x: 329 * SCALE,
              y: 176 * SCALE,
              w: 532 * SCALE,
              h: 55 * SCALE,
            },
          ]);
        }}
      >
        翻页1
      </button>
      <button
        onClick={() => {
          pdfRef.current?.pageChange(2);
          setCurPositions([
            {
              x: 169 * SCALE,
              y: 232 * SCALE,
              w: 770 * SCALE,
              h: 876 * SCALE,
            },
          ]);
        }}
      >
        翻页2
      </button>
      <button
        onClick={() => {
          pdfRef.current?.pageChange(6);
          setCurPositions([
            {
              x: 170 * SCALE,
              y: 158 * SCALE,
              w: 698 * SCALE,
              h: 952 * SCALE,
              bgColor: 'rgba(225,238,223,.5)',
            },
          ]);
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
    </div>
  );
}

export default Preview;
