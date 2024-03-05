'use client';
import { api } from '@/convex/_generated/api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useConvex } from 'convex/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import SideNav from './_components/SideNav';
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
  useEffect(() => {
    user && checkTeam();
  }, [user]);
  /**
   * 检查团队是否存在,
   * 如果不存在则跳转到创建团队页面
   * @returns {Promise<void>}
   * @private {void}
   */
  const checkTeam = async () => {
    const result = await convex.query(api.teams.getTeam, {
      email: user?.email ?? ''
    });
    if (!result?.length) {
      router.push('teams/create');
    }
  };

  return (
    <>
      <div className="grid grid-cols-4">
        <div>
          <SideNav />
        </div>
        <div className="grid-cols-3">{children}</div>
      </div>
    </>
  );
};

export default DashboardLayout;
