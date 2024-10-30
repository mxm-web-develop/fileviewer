
import { useEffect, useState } from "react";
import { AppStatus } from "../store/system.type";
import { useStateStore } from "../store";

export const HtmlDisplay = ({ width }: any) => {
  const { appState, setAppStatus } = useStateStore();
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  useEffect(() => {
    const blob = appState.checha_data; // 假设这是 Blob 数据
    if (blob) {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result as string;
        setHtmlContent(content);
        console.log(content)
        setAppStatus(AppStatus.LOADED);
      };
      reader.readAsText(blob); // 将 Blob 读取为文本
    }
  }, [appState.checha_data]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {htmlContent && (
        <div
          className="w-full h-full"
          style={{ width: '100%', boxSizing: 'border-box' }} // 确保内容宽度为100%
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      )}
    </div>

  )
};
