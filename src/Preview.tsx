import { useEffect, useState } from 'react';
import { useFileViewer, registerPDFWorker } from './application/lib_enter';
import { uid } from 'uid';
import { log } from 'console';
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
  useEffect(() => {
    setTimeout(() => {
      setOriginPaperSize({ width: 1920, height: 1080 });
      setrender_width(526);
    }, 500);
  }, []);
  const { Element, pdfRef, mdRef } = useFileViewer({
    fileUrl:
      'http://10.15.12.13:9000/dev-rag-data/qvq/qvq_%E4%BF%9D%E9%99%A9%E8%B5%84%E4%BA%A7%E7%AE%A1%E7%90%86%E5%85%AC%E5%8F%B8%E7%AE%A1%E7%90%86%E8%A7%84%E5%AE%9A%E7%82%B9%E8%AF%84%E5%A5%A0%E5%AE%9A%E4%BF%9D%E9%99%A9%E8%B5%84%E7%AE%A1%E5%85%AC%E5%8F%B8%E5%88%B6%E5%BA%A6%E5%9F%BA%E7%A1%80%E5%BC%95%E5%AF%BC%E5%B8%82%E5%9C%BA%E5%8C%96%E9%95%BF%E6%9C%9F%E5%8C%96%E7%BB%8F%E8%90%A5%E7%90%86%E5%BF%B5%E8%A1%8C%E4%B8%9A%E7%A0%94%E6%8A%A5/V0/%E3%80%8A%E4%BF%9D%E9%99%A9%E8%B5%84%E4%BA%A7%E7%AE%A1%E7%90%86%E5%85%AC%E5%8F%B8%E7%AE%A1%E7%90%86%E8%A7%84%E5%AE%9A%E3%80%8B%E7%82%B9%E8%AF%84%EF%BC%9A%E5%A5%A0%E5%AE%9A%E4%BF%9D%E9%99%A9%E8%B5%84%E7%AE%A1%E5%85%AC%E5%8F%B8%E5%88%B6%E5%BA%A6%E5%9F%BA%E7%A1%80%EF%BC%8C%E5%BC%95%E5%AF%BC%E5%B8%82%E5%9C%BA%E5%8C%96%E9%95%BF%E6%9C%9F%E5%8C%96%E7%BB%8F%E8%90%A5%E7%90%86%E5%BF%B52022-08-09%E8%A1%8C%E4%B8%9A%E7%A0%94%E6%8A%A5.pdf',
    // 'http://10.15.12.13:9000/dev-rag-data/qvq/qvq_%E7%A7%91%E6%8A%80%E9%87%91%E8%9E%8D%E7%9A%84%E5%85%AC%E5%8F%B8%E6%88%91%E4%BB%AC%E9%9C%80%E8%A6%81%E5%85%B3%E6%B3%A8%E5%93%AA%E4%BA%9B%E6%94%BF%E7%AD%96%E8%A1%8C%E4%B8%9A%E7%A0%94%E6%8A%A5/V0/%E2%80%9C%E7%A7%91%E6%8A%80+%E9%87%91%E8%9E%8D%E2%80%9D%E7%9A%84%E5%85%AC%E5%8F%B8%EF%BC%8C%E6%88%91%E4%BB%AC%E9%9C%80%E8%A6%81%E5%85%B3%E6%B3%A8%E5%93%AA%E4%BA%9B%E6%94%BF%E7%AD%96%EF%BC%9F2022-04-12%E8%A1%8C%E4%B8%9A%E7%A0%94%E6%8A%A5.pdf',
    // 'http://10.15.12.13:9000/dev-rag-data/%E8%A1%A8%E6%A0%BC%E5%A4%9A%E8%A1%8C%E5%A4%9A%E5%88%97%E6%B5%8B%E8%AF%95/%E8%A1%A8%E6%A0%BC%E5%A4%9A%E8%A1%8C%E5%A4%9A%E5%88%97%E6%B5%8B%E8%AF%95_%E6%B6%89%E5%A4%96%E6%94%B6%E6%94%AF%E4%BB%A3%E7%A0%81%E8%A1%A8/V0/%E6%B6%89%E5%A4%96%E6%94%B6%E6%94%AF%E4%BB%A3%E7%A0%81%E8%A1%A8-1547451846112.pdf',
    // 'http://10.15.12.13:9000/dev-rag-data/syt_test/syt_test_%E8%BD%B4%E6%89%BF%E7%9F%A5%E8%AF%86%E8%BD%B4%E6%89%BF%E7%9A%84%E7%BB%93%E6%9E%84%E5%8F%8A%E5%90%84%E6%9E%84%E6%88%90%E9%9B%B6%E4%BB%B6%E7%9A%84%E4%BD%9C%E7%94%A8/V0/%E8%BD%B4%E6%89%BF%E7%9F%A5%E8%AF%86%EF%BC%883%EF%BC%89%E2%80%94%E2%80%94%E8%BD%B4%E6%89%BF%E7%9A%84%E7%BB%93%E6%9E%84%E5%8F%8A%E5%90%84%E6%9E%84%E6%88%90%E9%9B%B6%E4%BB%B6%E7%9A%84%E4%BD%9C%E7%94%A8.pdf',
    // 'http://10.15.12.13:9000/dev-rag-data/%E5%AF%8C%E6%96%87%E6%9C%AC%E6%B5%8B%E8%AF%95test1/%E5%AF%8C%E6%96%87%E6%9C%AC%E6%B5%8B%E8%AF%95test1_%E8%BD%B4%E6%89%BF%E6%98%AF%E6%9C%BA%E6%A2%B0%E8%AE%BE%E5%A4%87%E4%B8%AD%E4%B8%BE%E8%B6%B3%E8%BD%BB%E9%87%8D%E7%9A%84%E9%9B%B6%E9%83%A8%E4%BB%B6%E5%89%AF%E6%9C%AC/V0/%E8%BD%B4%E6%89%BF%E6%98%AF%E6%9C%BA%E6%A2%B0%E8%AE%BE%E5%A4%87%E4%B8%AD%E4%B8%BE%E8%B6%B3%E8%BD%BB%E9%87%8D%E7%9A%84%E9%9B%B6%E9%83%A8%E4%BB%B6-%E5%89%AF%E6%9C%AC.pdf',
    //'http://10.15.12.13:9000/dev-rag-data/%E6%99%AE%E9%80%9A%E6%96%87%E4%BB%B6%E6%B5%8B%E8%AF%95/%E6%99%AE%E9%80%9A%E6%96%87%E4%BB%B6%E6%B5%8B%E8%AF%95_n%E6%A1%88IWT%E4%BA%94%E5%BA%93%E6%95%B0%E6%8D%AE%E6%A0%87%E5%87%86%E6%A8%A1%E7%89%88%E6%A1%88%E4%BE%8B%E5%BA%93/V0/n%E6%A1%88IWT_%E4%BA%94%E5%BA%93%E6%95%B0%E6%8D%AE%E6%A0%87%E5%87%86%E6%A8%A1%E7%89%88-%E6%A1%88%E4%BE%8B%E5%BA%93.xlsx',
    form: 'pdf',
    annotation: {
      method: 'position',
      data: [
        {
          id: '85941721f9d',
          page: 1,
          anotation_color: 'rgba(223,231,255,.5)',
          position: [
            [94, 38],
            [570, 38],
            [570, 69],
            [94, 69],
          ],
        },
        {
          id: '5941721f9db',
          page: 1,
          anotation_color: 'rgba(223,231,255,.5)',
          position: [
            [81, 81],
            [396, 81],
            [396, 120],
            [81, 120],
          ],
        },
        {
          id: '941721f9db2',
          page: 1,
          anotation_color: 'rgba(223,231,255,.5)',
          position: [
            [81, 130],
            [778, 130],
            [778, 263],
            [81, 263],
          ],
        },
        {
          id: '41721f9db2a',
          page: 1,
          anotation_color: 'rgba(223,231,255,.5)',
          position: [
            [81, 279],
            [263, 279],
            [263, 316],
            [81, 316],
          ],
        },
        {
          id: '1721f9db2a7',
          page: 1,
          anotation_color: 'rgba(223,231,255,.5)',
          position: [
            [91, 335],
            [768, 335],
            [768, 429],
            [91, 429],
          ],
        },
        {
          id: '721f9db2a77',
          page: 1,
          anotation_color: 'rgba(223,231,255,.5)',
          position: [
            [91, 433],
            [181, 433],
            [181, 457],
            [91, 457],
          ],
        },
        {
          id: '21f9db2a77d',
          page: 1,
          anotation_color: 'rgba(223,231,255,.5)',
          position: [
            [91, 459],
            [768, 459],
            [768, 531],
            [91, 531],
          ],
        },
      ],
      origin_paper_size: { width: 1191, height: 1684 },
    },
    bgColor: '#fff',
    render_width: 526,
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
    </div>
  );
}

export default Preview;
