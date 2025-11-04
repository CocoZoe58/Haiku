// app/haiku/[id]/page.jsx
import { getHaikuById } from '@/app/_actions/haiku';
import { getCommentsByHaiku } from '@/app/_actions/comment';
import HaikuClientView from './HaikuClientView';

export default async function HaikuPage({ params }) {
  const haikuId = Number(params.id);

  const haiku = await getHaikuById(haikuId);
  const comments = await getCommentsByHaiku(haikuId);

  if (!haiku) return <p>Haïku introuvable.</p>;

  return <HaikuClientView haiku={haiku} comments={comments} />;
}
