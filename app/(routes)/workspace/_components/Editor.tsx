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
import {toast} from '@/components/ui/use-toast';

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
    fileData: FILE; // 假设 FILE 已经是一个类型定义
    onKeep: () => void; // onSave 是一个函数，它将在保存文档时被调用
};


function Editor({onSaveTrigger, fileId, fileData, onKeep}: EditorProps) {
    const editorId = 'editorjs';
    const updateDocument = useMutation(api.files.updateDocument);
    const editorInstance = useRef<EditorJS | undefined>(undefined)
    const onSave = (outputData: any) => {
        updateDocument({
            _id: fileId as any,
            document: JSON.stringify(outputData)
        }).then(() => {
            onKeep();
            toast({
                title: "Document saved",
                description: "Your document has been saved successfully",
            })
        }).catch(() => {
            toast({
                title: "Document save failed",
                description: "Your document failed to save",
            })
        });
    }
    const performSave = async () => {
        if (editorInstance.current && typeof editorInstance.current.save === "function") {
            try {
                const savedData = await editorInstance.current.save();
                onSave(savedData);
            } catch (e) {
                console.error('Save failed:', e);
            }
        }
    };

    // 初始化 EditorJS 实例
    useEffect(() => {
        if (!editorInstance.current && fileData) {
            editorInstance.current = new EditorJS({
                holder: editorId,
                tools: {
                    header: {
                        class: Header as any,
                        inlineToolbar: true,
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
            })
        }
        return () => {
            if (editorInstance.current && typeof editorInstance.current.destroy === 'function') {
                editorInstance.current.destroy();
                editorInstance.current = undefined;
            }
        }
    }, [fileData]);
    // 监听 onSaveTrigger 的变化来保存文档
    useEffect(() => {
        if (onSaveTrigger) {
            performSave();
        }
    }, [onSaveTrigger]);

    return <div id={editorId} className="ml-20 h-[90vh]"></div>;
}

export default Editor;
