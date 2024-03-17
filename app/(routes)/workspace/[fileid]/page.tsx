"use client";
import React, {useEffect, useState} from 'react';
import WorkspaceHeader from '../_components/WorkspaceHeader';
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from '@/components/ui/resizable';
import dynamic from 'next/dynamic';
import {useConvex} from "convex/react";
import {api} from "@/convex/_generated/api";

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

const Editor = dynamic(() => import('../_components/Editor'), {
    ssr: false,
    loading: () => <p>loading...</p>
});

const Canvas = dynamic(() => import('../_components/Canvas'), {
    ssr: false, loading: () => <p>loading...</p>
});

function Workspace({params}: any) {
    const [triggerSave, setTriggerSave] = useState(false);
    const [fileData, setFileData] = useState<FILE | null>(null);
    const convex = useConvex();
    useEffect(() => {
        const getFileData = async () => {
            try {
                const fileData = await convex.query(api.files.getFileById, {fileId: params.fileid});
                setFileData(fileData);
            } catch (e) {
                console.error(e);
            }
        }
        params.fileid && getFileData()
    }, []);
    return (
        <>
            <WorkspaceHeader onSave={() => setTriggerSave(!triggerSave)}/>
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={50}>
                    {
                        fileData &&
                        <Editor
                            onSaveTrigger={triggerSave}
                            fileId={params.fileid}
                            fileData={fileData}
                            onKeep={() => setTriggerSave(false)}
                        />
                    }
                </ResizablePanel>
                <ResizableHandle withHandle/>
                <ResizablePanel defaultSize={50}>

                    {
                        fileData &&
                        <Canvas
                            onSaveTrigger={triggerSave}
                            fileId={params.fileid}
                            fileData={fileData}
                            onKeep={() => setTriggerSave(false)}
                        />
                    }
                </ResizablePanel>
            </ResizablePanelGroup>
        </>
    );
}

export default Workspace;
