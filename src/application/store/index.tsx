import { create } from 'zustand';
import { AppStatev1029, AppStatus } from './system.type';
import { enableMapSet, setAutoFreeze } from 'immer';
import { produce } from 'immer';
import { createJSONStorage, persist } from 'zustand/middleware';
enableMapSet();
interface State {
  appState: AppStatev1029;
  setAppState: (state: (prevState: AppStatev1029) => Partial<AppStatev1029>) => void;
  setAppStatus: (status: AppStatus) => void;
  currentRequestAbortControllers: Map<string, AbortController>;
  // 修改 setCurrentRequestAbortController 方法以接受一个 id 和一个 AbortController 实例
  setCurrentRequestAbortController: (id: string, controller: AbortController | null) => void;
  // 添加一个新的方法来移除一个 AbortController 实例
  //removeCurrentRequestAbortController: (id: string) => void;
  // 添加一个新的方法来取消所有请求
  abortAllRequests: () => void;
}
export const useStateStore = create(
  persist(
    (set, get: any) => ({
      appState: {
        parse_form: 'txt',
        file_url: '',
        display_file_type: 'txt',
        status: AppStatus.UNLOAD,
        data: [],
        page_manager: {
          total: 0,
          current: 0,
        },
      },
      currentRequestAbortControllers: new Map(),
      // setAppState: (state: (arg0: AppStatev1029) => AppStatev1029) =>
      //   set(
      //     produce((draft: State) => {
      //       draft.appState = { ...draft.appState, ...state(draft.appState) };
      //     })
      //   ),
      setAppState: (payload: any) => set({ appState: { ...get().appState, ...payload } }),
      // setAppStatus: (status: AppStatus) =>
      //   set(
      //     produce((draft: State) => {
      //       // 指定 draft 的类型
      //       draft.appState.status = status;
      //     })
      //   ),
      setAppStatus: (payload: any) => set({ appState: { ...get().appState, status: payload } }),
      // setCurrentRequestAbortController: (id: string, controller: AbortController) =>
      //   set(
      //     produce((draft: State) => {
      //       if (controller) {
      //         draft.currentRequestAbortControllers.set(id, controller);
      //       } else {
      //         draft.currentRequestAbortControllers.delete(id);
      //       }
      //     })
      //   ),
      setCurrentRequestAbortController: (id: string, controller: AbortController) => {
        const c = get().currentRequestAbortControllers;
        if (controller) {
          c.set(id, controller);
          return set({ currentRequestAbortControllers: c });
        } else {
          c.delete(id, controller);
          return set({ currentRequestAbortControllers: c });
        }
      },
      // abortAllRequests: () =>
      //   set(
      //     produce((draft: State) => {
      //       draft.currentRequestAbortControllers.forEach((controller) => {
      //         controller.abort();
      //       });
      //       draft.currentRequestAbortControllers.clear();
      //     })
      //   ),
      abortAllRequests: (payload: any) => {
        const c = get().currentRequestAbortControllers;
        c.forEach((controller: { abort: () => void }) => {
          controller.abort();
        });
        c.clear();
        return set({ currentRequestAbortControllers: c });
      },
    }),
    {
      name: 'food-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
