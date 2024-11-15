import { useEffect, useState } from 'react';
import { AppStatus } from '../store/system.type';
import { useStateStore } from '../store';

export const HtmlDisplay = ({ width }: any) => {

  const { appState, setAppStatus } = useStateStore();
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  useEffect(() => {

    const currentFileData = appState.data.find(item => item.id === appState.current_file);
    const blob = currentFileData ? currentFileData.checha_data : null;
    if (blob) {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result as string;
        setHtmlContent(content);
        setAppStatus(AppStatus.LOADED);
      };
      reader.readAsText(blob); // 将 Blob 读取为文本
    }
  }, [appState.data, appState.current_file]);

  return (
    <div className="h-full w-full mx-auto relative overflow-y-auto">
      {htmlContent && (
        <div
          style={{ boxSizing: 'border-box' }} // 确保内容宽度为100%
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      )}
    </div>
  );
};
