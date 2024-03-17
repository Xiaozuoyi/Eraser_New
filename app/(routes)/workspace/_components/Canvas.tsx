import {Excalidraw, MainMenu, WelcomeScreen} from "@excalidraw/excalidraw";
import {useEffect, useState} from "react";
import {useMutation} from "convex/react";
import {api} from "@/convex/_generated/api";
import {toast} from "@/components/ui/use-toast";

interface CanvasProps {
    onSaveTrigger: boolean,
    fileId: string,
    fileData: any
    onKeep: () => void;
}

function Canvas({onSaveTrigger, fileId, fileData, onKeep}: CanvasProps) {
    const [whiteBoarData, setWhiteBoarData] = useState<any>(null);
    const updateWhiteBoard = useMutation(api.files.updateWhiteboard);
    useEffect(() => {
        const saveWhiteBoard = () => {
            updateWhiteBoard({
                fileId: fileId as any,
                whiteboard: JSON.stringify(whiteBoarData)
            }).then(
                () => {
                    toast({
                        title: "Whiteboard saved",
                        description: "Your whiteboard has been saved successfully",
                    });
                    onKeep();
                }
            ).catch(
                (e) => {
                    toast({
                        title: "Whiteboard save failed",
                        description: "Your whiteboard has not been saved successfully",
                    });
                }
            )
        }
        if (onSaveTrigger) {
            saveWhiteBoard();
        }
    }, [onSaveTrigger]);
    return (
        <div style={{height: "90vh"}}>
            <Excalidraw
                theme="light"
                initialData={{elements: fileData?.whiteboard && JSON.parse(fileData?.whiteboard)}}
                onChange={(DirectDrawElements) => setWhiteBoarData(DirectDrawElements)}
                UIOptions={{
                    canvasActions: {
                        export: false,
                        loadScene: false,
                        saveToActiveFile: false,
                        toggleTheme: false
                    }
                }}
            >
                <MainMenu>
                    <MainMenu.DefaultItems.ClearCanvas/>
                    <MainMenu.DefaultItems.SaveAsImage/>
                    <MainMenu.DefaultItems.ChangeCanvasBackground/>
                </MainMenu>
                <WelcomeScreen>
                    <WelcomeScreen.Hints.MenuHint/>
                    <WelcomeScreen.Hints.MenuHint/>
                    <WelcomeScreen.Hints.ToolbarHint/>
                    <WelcomeScreen.Center>
                        <WelcomeScreen.Center.MenuItemHelp/>
                    </WelcomeScreen.Center>
                </WelcomeScreen>
            </Excalidraw>
        </div>
    )
}

export default Canvas;