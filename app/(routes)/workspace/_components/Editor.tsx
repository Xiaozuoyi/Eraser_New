'use client';
import { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
// 该函数将确保组件只渲染一次
const RenderEditor = (ElementId: string = 'editorjs') => {
  const rendered = useRef<false | true>(false);
  useEffect(() => {
    if (!rendered.current) {
      rendered.current = true;
      //在这里，我们调用 EditorJS 运行，还可以向它传递运行所需的参数
      new EditorJS({
        holder: ElementId,
        tools: {
          header: Header
        }
      });
    } else {
      return;
    }
  }, [ElementId]);
};

function Editor() {
  const editorId = 'editorjs';
  RenderEditor(editorId);
  return <div id={editorId} className="ml-20"></div>;
}

export default Editor;
