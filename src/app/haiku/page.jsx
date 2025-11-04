// app/haiku/page.jsx

import { getAllHaikus } from '@/app/_actions/haiku';
import Link from 'next/link';

export default async function HaikuListPage() {
  let haikus = [];
  let error = null; // Variable pour stocker une erreur potentielle

  try {
    // ⚠️ On tente d'appeler la fonction
    haikus = await getAllHaikus();
  } catch (e) {
    // Si la fonction échoue, on attrape l'erreur
    console.error("Échec du fetching des haïkus:", e);
    error = "Impossible de charger les haïkus. Veuillez réessayer plus tard.";
    haikus = []; // Assurez-vous que la liste reste vide en cas d'erreur
  }

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

      {/* 🛑 NOUVEAU : Afficher le message d'erreur si la requête a échoué */}
      {error && (
        <div className="text-red-600 p-3 border border-red-300 bg-red-50 rounded">
          {error}
        </div>
      )}

      {haikus.length === 0 && !error ? (
        <p>Aucun haïku disponible.</p>
      ) : (
        // Le reste de votre code reste inchangé
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