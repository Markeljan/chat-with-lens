import { Chat } from '@/components/chat'
import ProfileEmbed from '../lens/profile-embed'

export default function Home({ params }: { params: { handle: string } }) {
  return <div className="max-w">
    <div className="flex justify-center mt-2 mb-1 max-w-[350px] lg:max-w-[400px] mx-auto">
      <ProfileEmbed handle={params.handle} />
    </div>
    <Chat handle={params.handle} className='max-h-[50px] overflow-y-scroll' />
  </div>
}
