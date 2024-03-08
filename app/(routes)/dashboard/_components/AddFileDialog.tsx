import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { File } from 'lucide-react';
import { useEffect, useState } from 'react';

type AddFileDialogProps = {
  onFileCreate: (fileName: string) => void;
  totalFiles: number;
};

export default function AddFileDialog({
  onFileCreate,
  totalFiles
}: AddFileDialogProps) {
  const [fileInput, setFileInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const disabled = fileInput && fileInput.length > 3 ? false : true;
    setIsOpen(disabled);
  }, [fileInput]);
  const OpenChange = (isLoading: boolean) => {
    setIsOpen(isLoading);
  };
  const ButtonClick = () => {
    onFileCreate(fileInput);
    setFileInput('');
  };

  function newFile() {
    const isMaxFilesReached = totalFiles === 5;
    const buttonClassName = `flex items-center justify-start gap-2 p-2 rounded-lg cursor-pointer mt-3 text-white w-full ${
      isMaxFilesReached ? 'bg-slate-600' : 'bg-blue-600 hover:bg-blue-700'
    }`;

    return (
      <button className={buttonClassName} disabled={isMaxFilesReached}>
        <File className="w-5 h-5" />
        New File
      </button>
    );
  }
  0;

  return (
    <>
      <Dialog onOpenChange={OpenChange}>
        <DialogTrigger asChild>{newFile()}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>创建新文件</DialogTitle>
            <DialogDescription>
              <Input
                placeholder="输入文件名"
                className="mt-3"
                onChange={(e) => setFileInput(e.target.value)}
              />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isOpen}
                onClick={ButtonClick}
              >
                创建
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
