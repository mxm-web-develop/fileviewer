import { useEffect, useState } from 'react';
import { AppStatus } from '../store/system.type';
import { useStateStore } from '../store';

export const ImgDisplay = ({ width }: any) => {
  const { appState, setAppStatus } = useStateStore();

  useEffect(() => {
    setAppStatus(AppStatus.LOADED);
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <img width={'100%'} src={appState.file_url} />
    </div>
  );
};
