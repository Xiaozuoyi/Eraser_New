import { Archive, Flag, Github } from 'lucide-react';
import MenuItem from './MenuItem';
import AddFileDialog from './AddFileDialog';

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

export default function BottomSection() {
  return (
    <>
      {menuItems.map((item) => (
        <MenuItem key={item.name} {...item} />
      ))}
      <AddFileDialog />
      <div className="h-4 w-full bg-gray-200 rounded-full mt-5">
        <div className="h-4 w-[40%] bg-blue-600 rounded-full"></div>
      </div>
      <p className="text-[12px] mt-3">
        使用了 <strong>1</strong> 个文件，还有 <strong>3</strong> 个没有使用
      </p>
      <p className="text-[12px] mt-1">升级计划，实现无限制访问</p>
    </>
  );
}
