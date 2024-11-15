import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { useStateStore } from '../store';
import { useCallback, useMemo } from 'react'; // 引入 useMemo
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
const MultiFileNav = () => {
  const { appState, setAppState } = useStateStore();
  // 使用 useMemo 记录当前激活的文件
  const isActived = useCallback((id: string) => appState.current_file === id, [appState.current_file]);

  return (

    <div className=" border border-r-[1px] text-xs h-full bg-white overflow-y-auto overflow-x-hidden">
      {appState.data.map((item, index) => {
        return (
          <div
            key={index}
            className={cn(`py-3  px-2 w-full box-border flex justify-center bg-white items-center cursor-pointer`, {
              'bg-primary text-background': isActived(item.id)
            })} // 根据 isActived 状态添加 active 类
            onClick={() => {
              setAppState((pre) => {
                return {
                  ...pre,
                  current_file: item.id,
                };
              });
            }}
          >
            <span className=" px-2  max-h-[10px] py-3 line-clamp-1  text-ellipsis" >
              {item.file_name}
            </span>
          </div>
        );
      })}
    </div>


  );
};

export default MultiFileNav;