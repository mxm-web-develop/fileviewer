import { ThemeProps } from '@radix-ui/themes';

export interface IUseFileViewer {
  fileUrl: string;
  form?: 'pdf' | 'doc' | 'docx' | 'txt' | 'md' | 'html' | 'csv' | 'xlsx' | 'img';
  width?: number;
  scale?: number;
  theme?: ThemeProps;
  actionOnEmmit?: (type: string) => any;
}
