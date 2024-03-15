'use client';
import {useEffect, useRef} from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
// @ts-ignore
import List from '@editorjs/list';
// @ts-ignore
import Checklist from '@editorjs/checklist';
import {useMutation} from "convex/react";
import {api} from "@/convex/_generated/api";
import {toast} from "sonner";

// 该函数将确保组件只渲染一次
const RenderEditor = (ElementId: string, fileData: FILE, onSave: (content: any) => void) => {
    const rendered = useRef<false | true>(false);
    useEffect(() => {
        if (!rendered.current) {
            rendered.current = true;
            //在这里，我们调用 EditorJS 运行，还可以向它传递运行所需的参数
            const editor = new EditorJS({
                holder: ElementId,
                tools: {
                    header: {
                        class: Header as any,
                        shortcut: 'CMD+SHIFT+H',
                        config: {
                            placeholder: '输入标题'
                        }
                    },
                    list: {
                        class: List,
                        inlineToolbar: true,
                        shortcut: 'CMD+SHIFT+L',
                        config: {
                            defaultStyle: 'unordered'
                        }
                    },

                    checklist: {
                        class: Checklist,
                        inlineToolbar: true,
                        shortcut: 'CMD+SHIFT+C',
                        config: {
                            defaultStyle: 'checked'
                        }
                    }
                },
                data: fileData?.document ? JSON.parse(fileData.document) : INITIAL_DOCUMENT,
                onChange() {
                    if (editor) {
                        editor.save().then(onSave).catch(error => {
                            console.error('Saving failed: ', error);
                        });
                    }
                }
            })
        } else {
            return () => {
                // 在组件卸载时，我们将 rendered.current 设置为 false，以便在下次组件渲染时重新渲染编辑器
                rendered.current = false;
            }
        }
    }, [ElementId]);
};

interface FILE {
    archive: boolean,
    createdBt: string,
    document: string,
    fileName: string,
    teamId: string,
    whiteboard: string,
    _id: string,
    _creationTime: number
}

// 使用常量代替硬编码的文档初始数据
const INITIAL_DOCUMENT = {
    "time": 1550476186479,
    "blocks": [
        {
            "data": {
                "text": 'Document Name',
                "level": 2
            },
            "id": "123",
            "type": 'header'
        },
        {
            "data": {
                "level": 4
            },
            "id": "1234",
            "type": 'header'
        }
    ],
    "version": "2.8.1"
};
// 定义 onSaveTrigger 和 fileId 的具体类型
type EditorProps = {
    onSaveTrigger: boolean; // 如果 onSaveTrigger 是一个标志，表示是否该保存文档，我们可以将其类型定义为 boolean
    fileId: string; // 假设 fileId 是字符串形式的唯一标识符
    fileData: FILE | null; // 假设 FILE 已经是一个类型定义
};

function Editor({onSaveTrigger, fileId, fileData}: EditorProps) {
    const editorId = 'editorjs';
    const updateDocument = useMutation(api.files.updateDocument);
    const onSave = (outputData: any) => {
        updateDocument({
            _id: fileId as any,
            document: JSON.stringify(outputData)
        }).then(() => {
            toast.success('Document Updated!');
        }).catch(() => {
            toast.error("Server Error!");
        });
    }
    // 监听 onSaveTrigger 的变化来保存文档
    useEffect(() => {
        if (onSaveTrigger) {
            onSave(fileData?.document ? JSON.parse(fileData.document) : INITIAL_DOCUMENT);
        }
    }, [onSaveTrigger]);

    // 调用 RenderEditor 渲染编辑器
    if (fileData) {
        RenderEditor(editorId, fileData, onSave);
    }

    return <div id={editorId} className="ml-20"></div>;
}

export default Editor;
