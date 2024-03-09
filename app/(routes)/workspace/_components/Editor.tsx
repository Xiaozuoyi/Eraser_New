'use client';
import { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
// 该函数将确保组件只渲染一次
const RenderEditor = (ElementId: string) => {
  const rendered = useRef<false | true>(false);
  useEffect(() => {
    if (!rendered.current) {
      rendered.current = true;
      //在这里，我们调用 EditorJS 运行，还可以向它传递运行所需的参数
      new EditorJS({
        holder: ElementId
      });
    } else {
      return;
    }
  }, [ElementId]);
};

function Editor() {
  const editorId = 'editorjs';
  RenderEditor(editorId);
  return <div id={editorId}></div>;
}

export default Editor;
