'use client';
import FileList from './_components/FileList';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useMutation } from 'convex/react';
import { useEffect } from 'react';
import Header from './_components/Header';

/**
 * 仪表盘页面
 * @returns {JSX.Element}
 */
function Dashboard() {
  const { user } = useKindeBrowserClient();
  const convex = useConvex();
  const createUser = useMutation(api.user.createUser);
  useEffect(() => {
    if (user) {
      checkUser();
    }
  }, [user]);
  /**
   * 检查用户是否存在,
   * 如果不存在则创建用户
   * @returns {Promise<void>}
   * @private {void}
   */
  const checkUser = async () => {
    const result = await convex.query(api.user.getUser, {
      email: user?.email ?? ''
    });
    if (!result?.length) {
      createUser({
        name: user?.given_name ?? '',
        email: user?.email ?? '',
        image: user?.picture ?? ''
      }).then((result) => {
        console.log(result);
      });
    }
  };

  return (
    <div className="p-8">
      <Header />
      <FileList />
    </div>
  );
}
export default Dashboard;
