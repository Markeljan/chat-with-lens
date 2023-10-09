import { Chat } from '@/components/chat'
import ProfileEmbed from './lens/profile-embed'

export const runtime = 'edge'

export default function Home() {
  return <div className="max-w">
    <div className="flex justify-center">
      <ProfileEmbed handle='stani' />
    </div>
    <Chat className='max-h-[50px] overflow-y-scroll' />
  </div>
}
