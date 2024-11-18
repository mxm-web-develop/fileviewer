import React, { useEffect, useState } from 'react';

import './style.css';
import '@radix-ui/themes/styles.css';
import TextDisplay from './views/TextDisplay';
import CsvDisplay from './views/CSVDisplay';
import XlsxDisplay from './views/XlsxDisplay';
import WordsDisplay from './views/WordsDisplay';
import PDFDisplay from './views/PdfDisplay';
import Layout from './views/Layout';
import { Blockquote, ScrollArea, Theme } from '@radix-ui/themes';
import { AppStatus, ParsedFileItem } from './store/system.type';
import { useStateStore } from './store';
//import PDFDisplay from "./views/PdfDisplay";
import { produce } from 'immer';
import { HtmlDisplay } from './views/HtmlDisplay';
import { registerAllModules } from 'handsontable/registry';
import { IUseFileViewer } from './types/system';
import { ImgDisplay } from './views/ImgDisplay';
import { cn } from '@/lib/utils';
import MultiFileNav from './views/MultiFileNav';
import { uid } from 'uid';
import Loading from './views/Loading';
import ErrorComponent from './views/ErrorComponent';

registerAllModules();

export const useFileViewer = (props: IUseFileViewer) => {
  const {
    fileUrl,
    display_file_type,
    form,
    render_width,
    render_scale,
    LoadingComponent,
    fetching_text,
    actionOnEmmit,
    error_text
  } = props;
  if (Array.isArray(fileUrl) && !form) {
    throw new Error("多文件格式必须使用form传参指定解析格式.");
  }
  const { appState, setAppState } = useStateStore();

  const setNetController = useStateStore(state => state.setCurrentRequestAbortController)
  const getStatus = (fileExtension: string) => {
    switch (fileExtension) {
      case 'jpeg':
      case 'jpg':
      case 'png':
        return AppStatus.LOADED;
      default:
        return AppStatus.FETCHED;
    }
  };

  const dealUrl = (fileUrl: string) => {
    const urlParts = fileUrl.match(/\/([^\/?#]+)$/);
    const fileNameWithExtension = urlParts ? urlParts[1] : '';
    const fileName = fileNameWithExtension.split('.').slice(0, -1).join('.') || '';
    const fileExtension = fileNameWithExtension.split('.').pop() || '';
    const form = props.form || fileExtension;
    return { fileName, parse_form: form };
  };

  const fetchFile = async (fileUrls: any[]) => {
    const abortController = new AbortController();
    setNetController(abortController);
    try {
      const fetchPromises = fileUrls.map((item) => fetch(item.file_url, { cache: 'no-store' }))
      const responses = await Promise.all(fetchPromises);


      // Check if any response has status other than 200
      responses.forEach((response, index) => {
        if (!response.ok) {
          setAppState((pre) => ({
            ...pre,
            status: AppStatus.ERROR
          }))
          throw new Error(`Error fetching file at index ${index}: ${response.statusText}`);
        }
      });
      const blobPromises = responses.map((response) => response.blob());
      const r = await Promise.all(blobPromises)
      setAppState((pre) => {
        const { data: oldData } = pre;
        const curStatus = getStatus(pre.parse_form);
        oldData.forEach((item, index) => {
          item.checha_data = r[index];
          item.status = curStatus;
        });

        return {
          ...pre,
          data: oldData,
          status: curStatus,
          current_file: oldData[0]?.id,
        };
      });
    } catch (error) {
      console.error('Error fetching file:', error);
    }
  };

  const initArrayFile = (fileUrlArray: any[]) => {
    const arr: ParsedFileItem[] = [];
    fileUrlArray.forEach((url: string, index: number) => {
      const id = uid(8)
      const { fileName, parse_form } = dealUrl(url);
      arr.push({
        file_form: parse_form,
        file_url: url,
        file_name: fileName,
        id: id,
        status: AppStatus.UNLOAD,
      });
    });
    setAppState((pre) => {
      return (
        {
          ...pre,
          parse_form: form,
          display_file_type: display_file_type || pre.display_file_type,
          file_url: fileUrlArray,
          current_file: arr[0].id,
          data: arr,
        }
      )
    })
    fetchFile(arr);
  };

  const initStringFile = (fileUrl: string) => {
    const { fileName, parse_form } = dealUrl(fileUrl);
    setAppState((pre) => {
      return {
        ...pre,
        parse_form: parse_form,
        file_url: fileUrl,
        display_file_type: display_file_type || pre.display_file_type,
        data: [
          {
            file_form: parse_form,
            file_url: fileUrl,
            file_name: fileName,
            id: '0',
            status: AppStatus.UNLOAD,
          },
        ],
      };
    });

    fetchFile([{ file_url: fileUrl, file_form: parse_form }]);
  };

  const init = (fileUrl: string | string[]) => {
    if (typeof fileUrl === 'string') {
      initStringFile(fileUrl);
    } else {
      initArrayFile(fileUrl);
    }
  };

  const renderFile = () => {

    switch (appState.parse_form) {
      case 'pdf':
        return (
          <PDFDisplay width={render_width || 800} scale={render_scale || 1} />
        ) as React.ReactNode;
      case 'docx':
        return (
          <WordsDisplay width={render_width || 800} scale={render_scale || 1} />
        ) as React.ReactNode;
      case 'txt':
        return <TextDisplay width={render_width || 800} />;
      case 'csv':
        return <CsvDisplay width={render_width || 800} />;
      case 'xls':
      case 'xlsx':
        return <XlsxDisplay width={render_width || 800} />;
      case 'html':
        return <HtmlDisplay width={render_width || 800} />;
      case 'jpeg':
      case 'jpg':
      case 'png':
        return <ImgDisplay width={render_width || 800} />;
      default:
        return <Blockquote>错误！未能成功解析文件</Blockquote>;
    }
  };

  useEffect(() => {
    init(fileUrl);
  }, []);


  return {
    Element: (
      // <Theme asChild {...theme}>
      <div className="relative h-full w-full overflow-hidden">
        <Layout
          handleEmmit={actionOnEmmit && actionOnEmmit}
        >
          <div className={cn("w-full h-full flex justify-center bg-[#f3f4f5]", {
            'w-600px': Array.isArray(fileUrl)
          })}>
            {appState.status === AppStatus.UNLOAD && (
              <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center bg-gray-200 z-[100]">
                <div className=' flex-col items-center justify-center'>
                  <div className='pb-3 text-slate-800/70'>{fetching_text ? fetching_text : '加载文件中'}</div>
                  {LoadingComponent ? LoadingComponent : <Loading />}
                </div>

              </div>
            )}

            {appState.status === AppStatus.ERROR && (
              <div className=" absolute top-0 left-0 h-full w-full flex items-center justify-center bg-gray-200 z-[100]">
                <ErrorComponent message={error_text || '应用报错了，请重试'} />
              </div>
            )
            }
            {appState.status === AppStatus.FETCHED && (
              <div className=" absolute top-0 left-0 h-full w-full flex items-center justify-center bg-gray-200 z-[100]">
                <div className=' flex-col items-center justify-center'>
                  <div className='pb-3 text-slate-800/70'>{fetching_text ? fetching_text : '加载文件中'}</div>
                  {LoadingComponent ? LoadingComponent : <Loading />}
                </div>
              </div>
            )}
            <div className="bg-slate-100 h-full w-full flex items-center justify-center">
              {
                Array.isArray(fileUrl) && fileUrl.length > 1 && <div className='multiFile-nav w-[145px] h-full'>
                  <ScrollArea
                    style={{ height: '100%' }}
                  >
                    <MultiFileNav />
                  </ScrollArea>
                </div>
              }
              <div className={cn('w-full h-full relative', {
                'w-[calc(100%-145px)]': Array.isArray(fileUrl)
              })}>
                {renderFile()}
              </div>

            </div>
          </div>
        </Layout>
      </div>
      // </Theme>
    ),
  };
};
