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
type AnnotationItem = DarwAnnotation | MatchAnnotation;
export enum AppStatus {
  UNLOAD,
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
