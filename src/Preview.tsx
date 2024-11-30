import { useEffect, useState } from 'react';
import { useFileViewer, registerPDFWorker } from './application/lib_enter';
registerPDFWorker('../public/worker/pdf.worker.min.js');
//const SCALE = 0.554;
const PDFWIDTH = 1190;
function Preview() {
  // 修正路径
  console.log('====================================');
  console.log('更新啦啦啦啦啦啦');
  console.log('====================================');
  const [curPositions, setCurPositions]: any = useState([]);
  const [renderWidth, setRenderWidth] = useState(660);
  const [SCALE, setRenderScale] = useState(0.555);
  const { Element, pdfRef } = useFileViewer({
    fileUrl:
      'http://10.15.12.13:9000/dev-rag-data/%E5%AF%8C%E6%96%87%E6%9C%AC%E6%B5%8B%E8%AF%95/%E5%AF%8C%E6%96%87%E6%9C%AC%E6%B5%8B%E8%AF%95_%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD%E5%8F%8D%E6%B4%97%E9%92%B1%E6%B3%95/V0/%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD%E5%8F%8D%E6%B4%97%E9%92%B1%E6%B3%95.pdf',
    //'http://10.15.12.13:9000/dev-rag-data/%E6%99%AE%E9%80%9A%E6%96%87%E4%BB%B6%E6%B5%8B%E8%AF%95/%E6%99%AE%E9%80%9A%E6%96%87%E4%BB%B6%E6%B5%8B%E8%AF%95_n%E6%A1%88IWT%E4%BA%94%E5%BA%93%E6%95%B0%E6%8D%AE%E6%A0%87%E5%87%86%E6%A8%A1%E7%89%88%E6%A1%88%E4%BE%8B%E5%BA%93/V0/n%E6%A1%88IWT_%E4%BA%94%E5%BA%93%E6%95%B0%E6%8D%AE%E6%A0%87%E5%87%86%E6%A8%A1%E7%89%88-%E6%A1%88%E4%BE%8B%E5%BA%93.xlsx',
    form: 'pdf',
    annotation: {
      method: 'position',
      data: curPositions,
    },
    render_width: renderWidth,
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
    <div className="h-[800px] relative mx-auto">
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
