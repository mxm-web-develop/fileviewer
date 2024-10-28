import { useRef, useEffect } from "react";
import { useStateStore } from "../store";
import { AppStatus } from "../store/system.type";
import { Box, ScrollArea } from "@radix-ui/themes";


const TextDisplay = ({ width }: { width: string | number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { appState, setAppStatus } = useStateStore();

  useEffect(() => {
    if (appState.checha_data && containerRef.current) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result && containerRef.current && typeof e.target.result === 'string') {
          containerRef.current.innerText = e.target.result;
          console.log("文件内容:", e.target.result); // 打印文件内容，确保解析正确

          // 检查并设置字体（模拟字由字体应用）
          containerRef.current.style.fontFamily = "sans-serif";
        }
      };
      reader.onerror = (error) => {
        console.error("文件读取失败:", error);
        setAppStatus(AppStatus.ERROR);
      };
      reader.readAsText(appState.checha_data);
      setAppStatus(AppStatus.LOADED);
    }
  }, [appState.checha_data, setAppStatus]);

  return (
    <ScrollArea type="scroll" scrollbars="vertical" size={'2'} style={{ height: '100%' }}>
      <Box px={'5'} py={'3'} style={{ width: '100%', height: '100%' }}>
        <article ref={containerRef} className="prose" />
      </Box>
    </ScrollArea >
  );
};

export default TextDisplay;