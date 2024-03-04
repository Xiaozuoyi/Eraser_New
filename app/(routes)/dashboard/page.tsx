'use client';
import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';

import {
  LogoutLink,
  useKindeBrowserClient
} from '@kinde-oss/kinde-auth-nextjs';
import { useMutation } from 'convex/react';
import { useEffect } from 'react';

function Dashboard() {
  const { user } = useKindeBrowserClient();
  const convex = useConvex();
  const createUser = useMutation(api.user.createUser);
  useEffect(() => {
    if (user) {
      checkUser();
    }
  }, [user]);

  /*   检查用户是否存在，如果不存在，则创建一个新用户 */
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
    <div>
      <h1>Dashboard</h1>
      <p>This is the dashboard page</p>
      <Button>
        <LogoutLink>Logout</LogoutLink>
      </Button>
    </div>
  );
}
export default Dashboard;
