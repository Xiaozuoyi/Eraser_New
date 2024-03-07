import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import TopSection from './TopSection';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import BottomSection from './BottomSection';
export interface TEAM {
  createdBy: String;
  teamName: String;
  _creationTime: String;
  _id: String;
}
export default function SideNav() {
  const [teamList, setTeamList] = useState<TEAM[]>();
  const [activeTeam, setActiveTeam] = useState<TEAM>();
  const { user }: { user: any } = useKindeBrowserClient();
  const convex = useConvex();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getTeamList = async () => {
      setIsLoading(true);
      try {
        const result = await convex.query(api.teams.getTeam, {
          email: user?.email
        });
        setTeamList(result);
        setActiveTeam(result[0]);
      } catch (error) {
        console.log('Failed to get team list:', error);
      } finally {
        setIsLoading(false);
      }
    };
    user && getTeamList();
  }, [user, convex]);

  return (
    <div className="h-screen fixed w-72 border-r-2 p-6 dark:bg-slate-900 flex flex-col">
      {isLoading ? (
        <>
          <Skeleton className="h-full w-full flex items-center justify-center text-center">
            加载中...
          </Skeleton>
        </>
      ) : (
        <>
          <div className="flex-1">
            <TopSection
              user={user}
              teamList={teamList}
              activeTeam={activeTeam}
              setActiveTeam={setActiveTeam}
            />
          </div>
          <BottomSection />
        </>
      )}
    </div>
  );
}
