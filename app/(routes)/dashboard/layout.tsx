'use client';
import { api } from '@/convex/_generated/api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useConvex } from 'convex/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import SideNav from './_components/SideNav';
import {
  FilesListContext,
  type FilesListContextType
} from '@/app/_context/FilesListContext';
type ReadonlyChildren = Readonly<{ children: React.ReactNode }>;
/**
 * 仪表盘布局 - 用于包裹仪表盘页面
 * @param children
 * @returns {JSX.Element}
 */
const DashboardLayout = ({ children }: ReadonlyChildren) => {
  const convex = useConvex();
  const { user } = useKindeBrowserClient();
  const router = useRouter();
  const [fileListings, setFileListings] = useState<
    FilesListContextType['fileListings']
  >([]);
  useEffect(() => {
    user && checkTeam();
  }, [user]);
  /**
   * 检查团队是否存在,
   * 如果不存在则跳转到创建团队页面
   * @returns {Promise<void>}
   * @private {void}
   */
  const checkTeam = async (): Promise<void> => {
    const result = await convex.query(api.teams.getTeam, {
      email: user?.email ?? ''
    });
    if (!result?.length) {
      router.push('teams/create');
    }
  };

  return (
    <>
      <FilesListContext.Provider value={{ fileListings, setFileListings }}>
        <div className="grid grid-cols-4">
          <div className="h-screen w-72 fixed">
            <SideNav />
          </div>
          <div className="col-span-4 ml-72">{children}</div>
        </div>
      </FilesListContext.Provider>
    </>
  );
};

export default DashboardLayout;
