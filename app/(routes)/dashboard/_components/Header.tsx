import { Button } from '@/components/ui/button';
import { Search, Send } from 'lucide-react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import Image from 'next/image';

export default function Header() {
  const { user }: any = useKindeBrowserClient();
  const usePicture = () => {
    if (user?.picture) {
      return (
        <Image
          src={user.picture}
          alt=""
          width={0}
          height={0}
          style={{ width: 30, height: 30 }}
          className="rounded-full"
        />
      );
    } else {
      return (
        <div
          className="rounded-full bg-gray-500"
          style={{ width: 30, height: 30 }}
        />
      );
    }
  };
  return (
    <div className="flex justify-end w-full gap-2 items-center">
      <div className="flex gap-2 items-center border rounded-md p-1">
        <Search size={16} />
        <input
          type="text"
          placeholder="Search"
          className="!outline-none bg-inherit"
        />
      </div>
      <div>{usePicture()}</div>
      <Button className="gap-2 flex text-sm h-8 hover:bg-blue-700 bg-blue-600">
        <Send size={16} />
        Invite
      </Button>
    </div>
  );
}
