export interface AppState {
  file_form: string;
  file_url: string;
  file_name?: string;
  id: string;
  status: AppStatus;
  checha_data?: any;
  annotation_method?: 'draw' | 'match';
  page_manager?: {
    total: number;
    current: number;
  };
  annotation_manager?: AnnotationItem[];
}

export interface ParsedFileItem {
  id: string;
  checha_data: any;
  url: string;
  page_manager?: {
    total: number;
    current: number;
  };
  //用于管理静态文件的下载和解析状态
  state: 'process' | 'done' | 'error';
}
export interface AppStatev1029 {
  //应用初始化进行用户传参的储存，方便访问
  file_url: string[] | string;
  parse_form: 'docx' | 'cvs' | 'html' | 'txt' | 'img' | 'pdf';
  display_file_type?: 'docx' | 'cvs' | 'html' | 'txt' | 'img' | 'pdf' | 'xslx';
  //用于管理应用的状态
  status: AppState;
  data: ParsedFileItem[] | ParsedFileItem;
}

type AnnotationItem = DarwAnnotation | MatchAnnotation;
export enum AppStatus {
  UNLOAD,
  LOADING,
  PRASING,
  FETCHED,
  LOADED,
  ERROR,
}

export interface Annotation {
  og_size?: {
    pwidth: string;
    pheight: string;
  };
  anno_color?: string;
  pageNumber: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

//绘图模式
export interface DarwAnnotation {
  og_size?: {
    pwidth: string;
    pheight: string;
  };
  anno_color?: string;
  pageNumber: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

//匹配模式
export interface MatchAnnotation {
  anno_color?: string;
  startValue: string;
  endValue: string;
}
