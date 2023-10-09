import { Chat } from '@/components/chat'
import ProfileEmbed from './lens/profile-embed'

export default function Home() {
  return <div className="max-w">
    <Chat handle='stani' />
  </div>
}
