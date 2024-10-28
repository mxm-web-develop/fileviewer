
import { create } from 'zustand';
import { AppState, AppStatus } from './system.type';
import { produce } from 'immer';
interface State {
  appState: AppState;
  setAppState: (state: (prevState: AppState) => Partial<AppState>) => void;
  setAppStatus: (status: AppStatus) => void;
}
export const useStateStore = create<State>((set) => ({
  appState: {
    file_form: '',
    file_url: '',
    id: '',
    status: AppStatus.UNLOAD,
    checha_data: null,
    page_manager: {
      total: 0,
      current: 1,
    }
  },
  setAppState: (state) => set(produce((draft: State) => {
    Object.assign(draft.appState, state(draft.appState));
  })),
  setAppStatus: (status: AppStatus) => set(produce((draft: State) => { // 指定 draft 的类型
    draft.appState.status = status;
  })),
}));
