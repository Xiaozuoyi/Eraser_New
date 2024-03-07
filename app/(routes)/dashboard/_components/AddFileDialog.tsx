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
import { useState } from 'react';
export default function AddFileDialog() {
  const [fileInput, setFileInput] = useState('');
  const disabled = fileInput && fileInput.length > 3 ? false : true;
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button className="flex items-center justify-start gap-2 bg-blue-600 hover:bg-blue-700 p-2 rounded-lg cursor-pointer mt-3 text-white w-full">
            <File className="w-5 h-5" />
            New File
          </button>
        </DialogTrigger>
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
            <Button
              type="button"
              variant="secondary"
              className="bg-blue-600 hover:bg-blue-700 text-white mr-2"
              disabled={disabled}
            >
              创建
            </Button>
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                取消
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
