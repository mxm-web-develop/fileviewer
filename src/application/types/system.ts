import { ReactNode } from 'react';

export interface IUseFileViewer {
  fileUrl: string[] | string;
  form?: 'pdf' | 'doc' | 'docx' | 'txt' | 'md' | 'html' | 'csv' | 'xlsx' | 'img' | string;
  render_width?: number;
  render_scale?: number;
  display_file_type?: string;
  LoadingComponent?: ReactNode;
  fetching_text?: string;
  rending_text?: string;
  error_text?: string;
  actionOnEmmit?: (type: string, data?: any) => any;
}
