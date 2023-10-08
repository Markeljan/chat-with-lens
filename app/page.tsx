import Image from 'next/image'
import { Chat } from '@/components/chat'

export const runtime = 'edge'

export default function Home() {
  return <div className="max-w">
    <div className="relative flex mx-auto mx-auto h-[150px] w-[150px] lg:h-[300px] lg:w-[300px] my-4">
      <Image src="/avatar.png" alt="Markeljan Avatar" fill />
    </div>
    <Chat className='max-h-[50px] overflow-y-scroll' />
  </div>
}
