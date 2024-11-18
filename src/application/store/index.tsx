import { create } from 'zustand';
import { AppStatev1029, AppStatus } from './system.type';
import { produce } from 'immer';
interface State {
  appState: AppStatev1029;
  setAppState: (state: (prevState: AppStatev1029) => Partial<AppStatev1029>) => void;
  setAppStatus: (status: AppStatus) => void;
  currentRequestAbortController: AbortController | null;
  setCurrentRequestAbortController: (controller: AbortController | null) => void;
}
export const useStateStore = create<State>((set) => ({
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
  currentRequestAbortController: null,
  setAppState: (state) =>
    set(
      produce((draft: State) => {
        Object.assign(draft.appState, state(draft.appState));
      })
    ),
  setAppStatus: (status: AppStatus) =>
    set(
      produce((draft: State) => {
        // 指定 draft 的类型
        draft.appState.status = status;
      })
    ),
  setCurrentRequestAbortController: (controller: AbortController | null) =>
    set(
      produce((draft: State) => {
        draft.currentRequestAbortController = controller;
      })
    ),
}));
