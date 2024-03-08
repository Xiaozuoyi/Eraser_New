import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import TopSection from './TopSection';
import { useConvex, useMutation } from 'convex/react';
import { useContext, useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import BottomSection from './BottomSection';
import { api } from '@/convex/_generated/api';
import { toast } from '@/components/ui/use-toast';
import { FilesListContext } from '@/app/_context/FilesListContext';
export interface TEAM {
  createdBy: string;
  teamName: string;
  _creationTime: string;
  _id: string;
}
export default function SideNav() {
  const [teamList, setTeamList] = useState<TEAM[]>();
  const [activeTeam, setActiveTeam] = useState<TEAM>();
  const { user }: { user: any } = useKindeBrowserClient();
  const convex = useConvex();
  const [isLoading, setIsLoading] = useState(true);
  const [totalFiles, setTotalFiles] = useState<number>(0);
  const context = useContext(FilesListContext);
  if (!context) {
    throw new Error('useFilesList must be used within a FilesListProvider');
  }
  const { setFileListings } = context;
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

  useEffect(() => {
    activeTeam && getFiles();
  }, [activeTeam]);
  const getFiles = async () => {
    const result = await convex.query(api.files.getFiles, {
      teamId: activeTeam?._id ?? ''
    });
    setFileListings(result);
    setTotalFiles(result.length);
  };
  const createFile = useMutation(api.files.createFile);
  const onFileCreate = (fileName: string) => {
    createFile({
      teamId: activeTeam?._id ?? '',
      fileName: fileName,
      createdBy: user?.email,
      archive: false,
      document: '',
      whiteboard: ''
    }).then(
      (result) => {
        if (result) {
          toast({
            title: '文件创建成功',
            description: `文件 ${fileName} 已经成功创建`
          });
          getFiles();
        }
      },
      (error) => {
        toast({
          title: '文件创建失败',
          description: `文件 ${fileName} 创建失败`
        });
      }
    );
  };

  return (
    <div className="h-screen fixed w-72 border-r-2 p-6 flex flex-col">
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
          <BottomSection onFileCreate={onFileCreate} totalFiles={totalFiles} />
        </>
      )}
    </div>
  );
}
