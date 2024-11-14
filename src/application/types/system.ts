import { ThemeProps } from '@radix-ui/themes';

export interface IUseFileViewer {
  fileUrl: string[] | string;
  form?: 'pdf' | 'doc' | 'docx' | 'txt' | 'md' | 'html' | 'csv' | 'xlsx' | 'img' | string;
  width?: number;
  scale?: number;
  theme?: ThemeProps;
  display_file_type?: string;
  actionOnEmmit?: (type: string) => any;
}
