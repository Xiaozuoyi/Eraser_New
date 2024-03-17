import {Button} from '@/components/ui/button';
import {Link, Save} from 'lucide-react';
import Image from 'next/image';

function WorkspaceHeader({onSave}: { onSave: () => void }) {
    return (
        <div className="p-3 border-b flex justify-between items-center">
            <div className="flex gap-2 items-center">
                <Image
                    src={'/TeamLogo.svg'}
                    width={0}
                    height={0}
                    style={{width: 40, height: 40}}
                    alt="logo"
                    priority={true}
                />
                <h2>File Name</h2>
            </div>
            <div className='flex items-center gap-4'>
                <Button className='h-8 text-[12px] gap-2 bg-yellow-500 hover:bg-yellow-600' onClick={() => onSave()}>
                    <Save className='h-4 w-4'/> Save
                </Button>
                <Button className='h-8 text-[12px] gap-2 bg-blue-600 hover:bg-blue-700'>
                    Share <Link size={20}/>
                </Button>
            </div>
        </div>
    );
}

export default WorkspaceHeader;
