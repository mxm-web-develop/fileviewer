import { ScrollArea } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { AppStatus } from "../store/system.type";
import { useStateStore } from "../store";
import { produce } from "immer";


export const HtmlDisplay = ({ width }: any) => {
  const { appState, setAppStatus } = useStateStore();
  const [htmlContent, setHtmlContent] = useState<string | null>(null);

  // const updatePageManager = (numPages: number) => {
  //   useStateStore.setState((prevState) =>
  //     produce(prevState, (draft) => {
  //       draft.appState.page_manager = {
  //         total: numPages,
  //         current: 1,
  //       }; // 确保 page_manager 存在并更新 total
  //     })
  //   );
  // };

  useEffect(() => {
    const blob = appState.checha_data; // 假设这是 Blob 数据
    if (blob) {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result as string;
        setHtmlContent(content);
        //const numPages = content.split(/<\/?page>/).length - 1; // 假设每个 <page> 标签表示一页
        // updatePageManager(numPages);
        setAppStatus(AppStatus.LOADED);
      };
      reader.readAsText(blob); // 将 Blob 读取为文本
    }
  }, [appState.checha_data, setAppStatus]);

  return (
    <ScrollArea type="scroll" scrollbars="vertical" size={'2'} style={{ height: '100%' }}>
      <div className="html-document my-5 px-8" style={{ width }}>
        {/* 使用 dangerouslySetInnerHTML 来渲染 HTML 内容 */}
        {htmlContent && <div dangerouslySetInnerHTML={{ __html: htmlContent }} />}
      </div>
    </ScrollArea>
  );
};
