import React from 'react';
import WorkspaceHeader from '../_components/WorkspaceHeader';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable';
import dynamic from 'next/dynamic';
const Editor = dynamic(() => import('../_components/Editor'), {
  ssr: false,
  loading: () => <p>loading...</p>
});
function Workspace() {
  return (
    <>
      <WorkspaceHeader />
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={50}>
          <div className="h-screen">
            <Editor />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <h2 className="h-screen">Two</h2>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}

export default Workspace;
