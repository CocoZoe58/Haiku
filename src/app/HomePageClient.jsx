// app/page.jsx
'use client';

import { createUser } from './_actions/user';
import { useUser } from './context/UserContext';
import { useRouter } from 'next/navigation';

export default function HomePageClient() {
  const { setUser } = useUser(); 
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center gap-2 py-5">
      <h1>Entrez votre nom</h1>
      <form
        action={async (formData) => {
          const name = formData.get('name');
          if (!name || !name.trim()) return;

          try {
            const userCreated = await createUser(name.trim());
            setUser(userCreated); // stocke dans le contexte
            router.push('/haiku'); // redirection après création
          } catch (err) {
            console.error(err);
            alert('Erreur lors de l’enregistrement.');
          }
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          name="name" 
          placeholder="Votre nom"
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Continuer
        </button>
      </form>
    </main>
  );
}
