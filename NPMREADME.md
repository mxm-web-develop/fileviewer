# mxm 组件库文档

## 安装

```
yarn add @mxmweb/fv
```

## 当前支持文件类型

- PDF
- TXT
- Xlsx
- CVS

| 待支持格式 docx,图片,html,markdown,pptx

## 使用

```
import { useFileViewer } from '@mxmweb/fv';
import '@mxmweb/fv/style.css'
function Preview() {

  const handlethat = (type: string) => {
    console.log(type)
  }
  const { Element } = useFileViewer({
    fileUrl: '/files/1.pdf',
    // form:'',
    width: 680,
    actionOnEmmit: handlethat
  });

  return <div className="h-[700px] w-[850px] relative mx-auto">{Element}</div>;
}

```

## vite 环境引入需要配置 optimizeDeps

```
   // vite.config.js
   export default {
     optimizeDeps: {
       exclude: ['@mxmweb/fv']
     }
   }
```
