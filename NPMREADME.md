# mxm 组件库文档

## 安装

```
yarn add @mxmweb/fv
```

```ts
import { useFileViewer, registerPDFWorker } from './application/lib_enter';
registerPDFWorker('/worker/pdf.worker.min.js');
function Preview() {

   const { Element } = useFileViewer({
    fileUrl:['https://demo.1.html'],
    form:'html'
  })
...
```

## 更新说明

v1.0.28 支持图片，解决 xlsx 合并单元格 bug

## 当前支持文件类型

- PDF
- TXT
- Xlsx
- CVS
- docx （不能完全还原样式）
- html

| 待支持格式 图片,markdown,pptx

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
    <!-- width: 680, -->
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
