import { Archive, Flag, Github } from 'lucide-react';
import MenuItem from './MenuItem';
import AddFileDialog from './AddFileDialog';
import { Progress } from '@/components/ui/progress';

const menuItems = [
  {
    name: '入门',
    icon: <Flag className="w-5 h-5" />,
    path: ''
  },
  {
    name: 'Github',
    icon: <Github className="w-5 h-5" />,
    path: ''
  },
  {
    name: '存档',
    icon: <Archive className="w-5 h-5" />,
    path: ''
  }
];

type BottomSectionProps = {
  onFileCreate: (fileName: string) => void;
  totalFiles: number;
};
export default function BottomSection({
  onFileCreate,
  totalFiles
}: BottomSectionProps) {
  return (
    <>
      {menuItems.map((item) => (
        <MenuItem key={item.name} {...item} />
      ))}
      <AddFileDialog onFileCreate={onFileCreate} totalFiles={totalFiles} />
      <Progress value={totalFiles * 20} className="mt-5 bg-gray-200" />
      <p className="text-[12px] mt-3">
        使用了 <strong>{totalFiles}</strong> 个文件，还有{' '}
        <strong>{5 - totalFiles}</strong> 个没有使用
      </p>
      <p className="text-[12px] mt-1">升级计划，实现无限制访问</p>
    </>
  );
}
