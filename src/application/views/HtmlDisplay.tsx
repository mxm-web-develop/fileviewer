import { useEffect, useState } from 'react';
import { AppStatus } from '../store/system.type';
import { useStateStore } from '../store';

export const HtmlDisplay = ({ width }: any) => {
  const { appState, setAppStatus } = useStateStore();
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  useEffect(() => {
    if (!appState?.page_manager?.current) {
      return;
    }
    const blob = appState.data[appState.page_manager.current - 1].checha_data; // 假设这是 Blob 数据
    if (blob) {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result as string;
        setHtmlContent(content);
        console.log(content);
        setAppStatus(AppStatus.LOADED);
      };
      reader.readAsText(blob); // 将 Blob 读取为文本
    }
  }, [appState.data, appState.page_manager]);

  return (
    <div className="h-full w-full relative overflow-y-auto">
      {htmlContent && (
        <div
          style={{ width: '850px!important', boxSizing: 'border-box' }} // 确保内容宽度为100%
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      )}
    </div>
  );
};
