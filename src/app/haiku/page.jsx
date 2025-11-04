// app/haiku/page.jsx

import { getAllHaikus } from '@/app/_actions/haiku';
import Link from 'next/link';

export default async function HaikuListPage() {
  const haikus = await getAllHaikus();

  return (
    <main className="p-5 max-w-xl mx-auto flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Liste des Haïkus</h1>
        <Link
          href="/haiku/new"
          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
        >
          Nouveau haïku
        </Link>
      </div>

      {haikus.length === 0 ? (
        <p>Aucun haïku disponible.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {haikus.map((h) => (
            <li key={h.id}>
              <Link
                href={`/haiku/${h.id}`}
                className="cursor-pointer text-blue-600 hover:underline"
              >
                {h.title} {h.icon}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
