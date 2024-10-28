import React, { useEffect, useMemo, useRef, useState } from 'react';
import Papa from 'papaparse';
import { AppStatus } from '../store/system.type';
import { useStateStore } from '../store';
import { HotTable, HotTableClass } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.css';

interface CsvDisplayProps {
  width?: number;
}

const CsvDisplay: React.FC<CsvDisplayProps> = ({ width }) => {
  const [rows, setRows] = useState<string[][]>([]);
  const { appState, setAppStatus } = useStateStore();
  const [tableHeight, setTableHeight] = useState<number>(0);
  const hotTableRef = useRef<HotTableClass>(null);
  const tableContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const parentHeight = tableContainer.current?.clientHeight || 0;
      const newHeight = parentHeight;

      if (newHeight !== tableHeight) {
        setTableHeight(newHeight);
      }
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    if (tableContainer.current) {
      resizeObserver.observe(tableContainer.current);
    }

    return () => {
      if (tableContainer.current) {
        resizeObserver.unobserve(tableContainer.current);
      }
    };
  }, []);

  useEffect(() => {
    if (appState.checha_data) {
      Papa.parse(appState.checha_data, {
        complete: (results) => {
          console.log(results.data)
          setRows(results.data as string[][]);
        },
        header: false,
      });


      setAppStatus(AppStatus.LOADED);
    }
  }, [appState.checha_data]);
  const columnHeaders = useMemo(() => rows[0] || [], [rows]);


  return (
    <div ref={tableContainer} className="mx-auto" style={{ height: `calc(100%)` }}>
      <HotTable
        ref={hotTableRef}
        data={rows.slice(1)} // 使用 rows 作为数据源
        colHeaders={columnHeaders} // 设置列头
        rowHeaders={true} // 显示行头
        width={'100%'} // 设置表格宽度
        height={tableHeight || '500px'} // 设置表格高度
        manualColumnResize={true} // 启用列宽拖拽调整
        manualRowResize={true} // 启用行高拖拽调整
        licenseKey="non-commercial-and-evaluation"
        colWidths={Array(rows[0]?.length || 0).fill(160)}
      />
    </div>
  );
};

export default CsvDisplay;