import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
export default function SideNav() {
  return (
    <div className="bg-gray-100 h-screen fixed w-72 border-r p-6">
      <div
        className="
        max-w-44
        flex 
        items-center 
        gap-2
       hover:bg-slate-200 
        p-2
        rounded-lg 
        cursor-pointer
      "
      >
        <Image
          src="/TeamLogo.svg"
          width={0}
          height={0}
          alt="logo"
          priority={true}
          style={{ width: 30, height: 30 }}
        />
        <h2 className="flex gap-8 items-center font-bold text-[15px]">
          团队名称
          <ChevronDown size={20} />
        </h2>
      </div>
    </div>
  );
}
