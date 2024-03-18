import { ChevronDown, LayoutGrid, LogOut, Settings, Users } from 'lucide-react';
import Image from 'next/image';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TEAM } from './SideNav';
import MenuItem from './MenuItem';

export interface MenuItemProps {
  name: string;
  path: string;
  icon: React.ReactNode;
}

interface TopSectionProps {
  user: any;
  teamList: TEAM[] | undefined;
  activeTeam: TEAM | undefined;
  setActiveTeam: (team: TEAM) => void;
}

const menuItems: MenuItemProps[] = [
  {
    name: '创建团队',
    path: '/teams/create',
    icon: <Users className="h-4 w-4" />
  },
  {
    name: '设置',
    path: '',
    icon: <Settings className="h-4 w-4" />
  }
];

export default function TopSection({
  user,
  teamList,
  activeTeam,
  setActiveTeam
}: TopSectionProps) {
  const handleTeamClick = (team: TEAM) => {
    setActiveTeam(team);
  };
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <div className="max-w-44 flex items-center gap-2 hover:bg-slate-200 p-2 rounded-lg cursor-pointer dark:hover:bg-white/45">
            <Image
              src="/TeamLogo.svg"
              width={30}
              height={30}
              alt="logo"
              priority={true}
              style={{ width: 30, height: 30 }}
            />
            <h2 className="flex gap-8 items-center font-bold text-[15px]">
              {activeTeam?.teamName}
              <ChevronDown size={20} />
            </h2>
          </div>
        </PopoverTrigger>
        <PopoverContent className="ml-7 p-4">
          <div>
            {teamList?.map((item, index) => (
              <div key={index}>
                <h2
                  className={`
                    p-2 hover:bg-blue-500 hover:text-white rounded-lg mb-1 cursor-pointer
                    ${
                      activeTeam?._id === item._id
                        ? 'bg-blue-500 text-white'
                        : ''
                    }
                  `}
                  onClick={() => handleTeamClick(item)}
                >
                  {item.teamName}
                </h2>
              </div>
            ))}
          </div>
          <Separator className="mt-2" />
          <div>
            {menuItems.map((item) => (
              <MenuItem key={item.name} {...item} />
            ))}
            <LogoutLink>
              <div className="flex items-center gap-2 p-2 hover:bg-slate-200 rounded-lg cursor-pointer dark:hover:bg-white/45">
                <LogOut className="h-4 w-4" />
                <h2 className="flex gap-8 items-center font-bold text-[15px]">
                  退出
                </h2>
              </div>
            </LogoutLink>
          </div>
          <Separator className="mt-2" />
          <div className="mt-2 flex gap-2 items-center">
            <Avatar>
              <AvatarImage src={user.picture} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-[14px] font-bold">
                {user?.given_name}&nbsp;
                {user?.family_name}
              </p>
              <p className="text-[12px] text-gray-500">{user?.email}</p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <Button
        variant="outline"
        className="w-full justify-start gap-2 font-bold mt-8 bg-blue-600 hover:bg-blue-700 text-white hover:text-white"
      >
        <LayoutGrid size={20} />
        全部文件
      </Button>
    </>
  );
}
