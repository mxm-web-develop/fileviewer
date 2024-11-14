import { useEffect, useMemo, useState } from 'react';
import { AppStatus } from '../store/system.type';
import { useStateStore } from '../store';

export const ImgDisplay = ({ width }: any) => {
  const { appState, setAppStatus } = useStateStore();
  useEffect(() => {
    setAppStatus(AppStatus.LOADED);
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <img width={'100%'} src={appState.data[appState.page_manager.current - 1].file_url} />
    </div>
  );
};
