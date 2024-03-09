import { Button } from '@/components/ui/button';
import { Link } from 'lucide-react';
import Image from 'next/image';

function WorkspaceHeader() {
  return (
    <div className="p-3 border-b flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <Image
          src={'/TeamLogo.svg'}
          width={0}
          height={0}
          style={{ width: 40, height: 40 }}
          alt="logo"
          priority={true}
        />
        <h2>File Name</h2>
      </div>
      <Button className="h-8 text-[12px] gap-2 bg-blue-600 hover:bg-blue-700 text-white">
        Share <Link size={20} />
      </Button>
    </div>
  );
}

export default WorkspaceHeader;
