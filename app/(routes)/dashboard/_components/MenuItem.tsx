import { useRouter } from 'next/navigation';
import { MenuItemProps } from './TopSection';
export default function MenuItem({ name, path, icon }: MenuItemProps) {
  const router = useRouter();
  const jumpPage = async () => {
    if (path) {
      try {
        router.push(path);
      } catch (error) {
        console.error('Failed to navigate:', error);
      }
    }
  };

  return (
    <div
      onClick={jumpPage}
      className="flex items-center gap-2 p-2 hover:bg-slate-200 rounded-lg cursor-pointer dark:hover:bg-white/45"
    >
      {icon}
      <span className="flex gap-8 items-center font-bold text-[15px]">
        {name}
      </span>
    </div>
  );
}
