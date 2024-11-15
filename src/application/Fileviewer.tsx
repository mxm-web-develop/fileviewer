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

registerAllModules();

export const useFileViewer = (props: IUseFileViewer) => {
  const {
    theme = {
      accentColor: 'indigo',
      grayColor: 'gray',
      panelBackground: 'solid',
      scaling: '100%',
      radius: 'full',
    },
    fileUrl,
    display_file_type,
    form,
  } = props;

  const { appState, setAppState } = useStateStore();

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
    try {
      const fetchPromises = fileUrls.map((item) => fetch(item.file_url, { cache: 'no-store' }));
      const responses = await Promise.all(fetchPromises);
      const blobPromises = responses.map((response) => response.blob());
      const r = await Promise.all(blobPromises);

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
        };
      });
    } catch (error) {
      console.error('Error fetching file:', error);
    }
  };

  const initArrayFile = (fileUrlArray: any[]) => {
    const arr: ParsedFileItem[] = [];
    fileUrlArray.forEach((url: string) => {
      const { fileName, parse_form } = dealUrl(url);
      arr.push({
        file_form: parse_form,
        file_url: url,
        file_name: fileName,
        id: '0',
        status: AppStatus.UNLOAD,
      });
    });
    setAppState((pre) =>
      produce(pre, (draft) => {
        return {
          ...draft,
          parse_form: arr[0].file_form,
          display_file_type: display_file_type || pre.display_file_type,
          file_url: fileUrlArray,
          page_manager: {
            total: arr.length,
            current: 1,
          },
          data: arr,
        };
      })
    );

    fetchFile(arr);
  };

  const initStringFile = (fileUrl: string) => {
    const { fileName, parse_form } = dealUrl(fileUrl);
    setAppState((pre) =>
      produce(pre, (draft) => {
        return {
          ...draft,
          parse_form: parse_form,
          file_url: fileUrl,
          display_file_type: display_file_type || pre.display_file_type,
          page_manager: {
            total: 1,
            current: 1,
          },
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
      })
    );

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
          <PDFDisplay width={props.width || 800} scale={props.scale || 1} />
        ) as React.ReactNode;
      case 'docx':
        return (
          <WordsDisplay width={props.width || 800} scale={props.scale || 1} />
        ) as React.ReactNode;
      case 'txt':
        return <TextDisplay width={props.width || 800} />;
      case 'csv':
        return <CsvDisplay width={props.width || 800} />;
      case 'xls':
      case 'xlsx':
        return <XlsxDisplay width={props.width || 800} />;
      case 'html':
        return <HtmlDisplay width={props.width || 800} />;
      case 'jpeg':
      case 'jpg':
      case 'png':
        return <ImgDisplay width={props.width || 800} />;
      default:
        return <Blockquote>错误！未能成功解析文件</Blockquote>;
    }
  };

  useEffect(() => {
    init(fileUrl);
  }, []);

  const handleEvent = (type: string) => {
    switch (type) {
      case 'plus':
        break;
      case 'minus':
        break;
    }
  };

  return {
    Element: (
      <Theme asChild {...theme} style={{ minHeight: '100%' }}>
        <div className="relative h-full w-full">
          <Layout
            handleEmmit={props.actionOnEmmit && props.actionOnEmmit}
            handleEvent={handleEvent}
            pageBar={
              appState.data.length > 1 ? (
                <div className="w-[200px] h-full bg-white overflow-y-auto overflow-x-hidden">
                  <ScrollArea
                    type="scroll"
                    scrollbars="vertical"
                    size={'2'}
                    style={{ height: '100%' }}
                  >
                    <div>
                      {appState.data.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="h-[120px] w-full flex justify-center items-center cursor-pointer"
                            style={{
                              borderBottom: '1px solid #f3f4f5',
                              borderRight: '1px solid #f3f4f5',
                              backgroundColor:
                                appState.page_manager.current === index + 1 ? '#f3f4f5' : '#fff',
                            }}
                            onClick={() => {
                              setAppState((pre) =>
                                produce(pre, (draft) => {
                                  return {
                                    ...draft,
                                    page_manager: {
                                      ...draft.page_manager,
                                      current: index + 1,
                                    },
                                  };
                                })
                              );
                            }}
                          >
                            <div className="h-[80px] w-[160px] text-ellipsis break-words line-clamp-4 text-[#2a2a2a] text-[14px]">
                              {item.file_name}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </ScrollArea>
                </div>
              ) : (
                <></>
              )
            }
          >
            <div className="w-[calc(100%-200px)] h-full flex justify-center bg-[#f3f4f5]">
              {appState.status === AppStatus.UNLOAD && (
                <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center bg-gray-200 z-[100]">
                  加载文件中
                </div>
              )}
              {appState.status === AppStatus.FETCHED && (
                <div className=" absolute top-0 left-0 h-full w-full flex items-center justify-center bg-gray-200 z-[100]">
                  加载数据成功，渲染文件中
                </div>
              )}
              <div className="bg-white h-full w-full">{renderFile()}</div>
            </div>
          </Layout>
        </div>
      </Theme>
    ),
  };
};
