import React, { useEffect } from "react";

import './style.css';
import "@radix-ui/themes/styles.css";
import TextDisplay from "./views/TextDisplay";
import CsvDisplay from "./views/CSVDisplay";
import XlsxDisplay from "./views/XlsxDisplay";
import WordsDisplay from "./views/WordsDisplay";
// import PDFDisplay from "./views/PdfDisplay";
import Layout from "./views/Layout";
import { Blockquote, Theme, ThemeProps } from '@radix-ui/themes';
import { AppStatus } from "./store/system.type";
import { useStateStore } from "./store";
//import PDFDisplay from "./views/PdfDisplay";
import { produce } from "immer";
import { HtmlDisplay } from "./views/HtmlDisplay";
import { registerAllModules } from 'handsontable/registry';

registerAllModules();
interface IUseFileViewer {
  fileUrl: string;
  form?: 'pdf' | 'doc' | 'docx' | 'txt' | 'md' | 'html' | 'csv' | 'xlsx' | 'img';
  width?: number;
  scale?: number;
  theme?: ThemeProps;
  actionOnEmmit?: (type: string) => any
}

export const useFileViewer = (props: IUseFileViewer) => {
  const { theme = {
    accentColor: 'indigo',
    grayColor: 'gray',
    panelBackground: 'solid',
    scaling: '100%',
    radius: 'full',
  } } = props;

  const { appState, setAppState } = useStateStore();

  useEffect(() => {
    const init = () => {
      const urlParts = props.fileUrl.match(/\/([^\/?#]+)$/);
      const fileNameWithExtension = urlParts ? urlParts[1] : '';
      const fileName = fileNameWithExtension.split('.').slice(0, -1).join('.') || '';
      const fileExtension = fileNameWithExtension.split('.').pop() || '';
      const form = props.form || fileExtension;
      console.log(urlParts, fileNameWithExtension, fileName, fileExtension, form)
      // setAppState((prevState) => ({
      //   ...prevState,
      //   file_name: fileName || 'untitled',
      //   file_form: form,
      //   file_url: props.fileUrl,
      //   status: AppStatus.UNLOAD,
      // }));
      setAppState(pre => produce(pre, (draft) => {
        draft.file_form = form,
          draft.file_url = props.fileUrl
        draft.file_name = fileName || 'untitled',
          draft.status = AppStatus.UNLOAD
      }))
    };

    const fetchFile = async () => {
      try {
        const response = await fetch(props.fileUrl, { cache: 'no-store' });
        if (response.status === 304) {
          console.log('File not modified, using cached version');
          return;
        }
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.blob();
        // setAppState((prevState) => ({
        //   ...prevState,
        //   checha_data: data as any,
        //   status: AppStatus.FETCHED,
        // }));

        setAppState((pre) => produce(pre, (draft) => {
          draft.checha_data = data as any,
            draft.status = AppStatus.FETCHED
        }))
      } catch (error) {
        console.error('Error fetching file:', error);
      }
    };

    init();
    fetchFile();
  }, [props.fileUrl, props.form]);

  const renderFile = () => {
    switch (appState.file_form) {
      // case 'pdf':
      //   return <PDFDisplay width={props.width || 800} scale={props.scale || 1} /> as React.ReactNode;
      // case 'doc':
      // case 'docx':
      //   return <WordsDisplay width={props.width || 800} scale={props.scale || 1} /> as React.ReactNode;
      case 'txt':
        return <TextDisplay width={props.width || 800} />;
      case 'csv':
        return <CsvDisplay width={props.width || 800} />;
      case "xls":
      case 'xlsx':
        return <XlsxDisplay width={props.width || 800} />;
      case 'html':
        return <HtmlDisplay width={props.width || 800} />;
      default:
        return <Blockquote>
          错误！未能成功解析文件
        </Blockquote>
    }
  };

  return {
    Element: (
      <Theme asChild {...theme} style={{ minHeight: '100%' }}>
        <div className="relative h-full w-full">
          <Layout handleEmmit={props.actionOnEmmit && props.actionOnEmmit}>
            {
              appState.status === AppStatus.UNLOAD && <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center bg-gray-200 z-[100]">加载文件中</div>
            }
            {
              appState.status === AppStatus.FETCHED && <div className=" absolute top-0 left-0 h-full w-full flex items-center justify-center bg-gray-200 z-[100]">加载数据成功，渲染文件中</div>
            }
            {
              renderFile()
            }

          </Layout>
        </div>
      </Theme>
    ),

  };
};