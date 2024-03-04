/**
 * 创建团队页面
 * @returns {JSX.Element}
 */

'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { api } from '@/convex/_generated/api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useMutation } from 'convex/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function CreateTeam() {
  const [teamName, setTeamName] = useState('');
  const createTeam = useMutation(api.teams.createTeam);
  const { user } = useKindeBrowserClient();
  const router = useRouter();
  const createNewTeam = async () => {
    createTeam({
      teamName,
      createdBy: user?.email ?? ''
    }).then((res) => {
      if (res) {
        router.push('/dashboard');
        toast({
          title: '团队创建成功',
          description: '您的团队已成功创建。'
        });
      }
    });
  };
  return (
    <div className="px-6 md:px-16 my-16">
      <Image src="/logo.svg" alt="logo" width={200} height={200} />
      <div className="flex flex-col items-center mt-8">
        <h2 className="font-bold text-[40px] py-3 text-black dark:text-white">
          我们应该如何称呼你的团队？
        </h2>
        <h2 className="text-slate-900 dark:text-gray-500">
          您可以随时在设置中更改此选项。
        </h2>
        <div className="mt-7 w-[40%]">
          <label className="text-gray-500 dark:text-slate-200">
            团队名称 :
          </label>
          <Input
            placeholder="请输入团队名称"
            className="mt-3"
            onChange={(e) => setTeamName(e.target.value)}
          />
        </div>
        <Button
          className="mt-7 w-[30%] bg-slate-600 dark:bg-slate-200 dark:hover:bg-neutral-200"
          disabled={!(teamName && teamName.length > 0)}
          onClick={createNewTeam}
        >
          创建团队
        </Button>
      </div>
    </div>
  );
}

export default CreateTeam;
