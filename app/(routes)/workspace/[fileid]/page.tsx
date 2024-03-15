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

function Workspace({params}: any) {
    const [triggerSave, setTriggerSave] = useState(false);
    const [fileData, setFileData] = useState<FILE | null>(null);
    const convex = useConvex();
    useEffect(() => {
        const getFileData = async () => {
            const result = await convex.query(api.files.getFileById, {fileId: params.fileId})
            setFileData(result)
        }
        params.fileId && getFileData()
    }, []);
    return (
        <>
            <WorkspaceHeader/>
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={50}>
                    <div className="h-screen">
                        <Editor onSaveTrigger={triggerSave} fileId={params.fileId} fileData={fileData}/>
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle/>
                <ResizablePanel defaultSize={50}>
                    <h2 className="h-screen">Two</h2>
                </ResizablePanel>
            </ResizablePanelGroup>
        </>
    );
}

export default Workspace;
