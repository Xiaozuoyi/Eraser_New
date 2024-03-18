import {Button} from '@/components/ui/button';
import {Search, Send} from 'lucide-react';
import {useKindeBrowserClient} from '@kinde-oss/kinde-auth-nextjs';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';

export default function Header() {
    const {user}: any = useKindeBrowserClient();
    return (
        <div className="flex justify-end w-full gap-2 items-center">
            <div className="flex gap-2 items-center border rounded-md p-1">
                <Search size={16}/>
                <input
                    type="text"
                    placeholder="Search"
                    className="!outline-none bg-inherit"
                />
            </div>
            <Avatar>
                <AvatarImage src={user?.picture}/>
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Button className="gap-2 flex text-sm h-8 hover:bg-blue-700 bg-blue-600">
                <Send size={16}/>
                Invite
            </Button>
        </div>
    );
}
