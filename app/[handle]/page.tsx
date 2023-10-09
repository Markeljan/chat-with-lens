import { Chat } from '@/components/chat'

export default function Home({ params }: { params: { handle: string } }) {
  return <div className="max-w">
    <Chat handle={params.handle} />
  </div>
}
