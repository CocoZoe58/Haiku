// app/haiku/new/page.jsx
'use client';

import { createHaiku } from '@/app/_actions/haiku';
import { useUser, UserProvider } from '@/app/context/UserContext';
import { useRouter } from 'next/navigation';

const icons = ['🌸', '🍁', '🌞', '🌙'];

function AddHaikuForm() {
  const { user } = useUser() || {};
  const router = useRouter();

  return (
    <form
      action={async (formData) => {
        const title = formData.get('title');
        const text = formData.get('text');
        const icon = formData.get('icon') || icons[0];

        if (!title?.trim() || !text?.trim()) {
          alert('Titre et texte sont requis');
          return;
        }

        try {
          await createHaiku({
            title: title.trim(),
            text: text.trim(),
            icon,
            authorId: user?.id || null,
          });

          router.push('/haiku'); // redirection après création
        } catch (err) {
          console.error(err);
          alert('Erreur lors de l’enregistrement du haïku');
        }
      }}
      className="flex flex-col gap-2 max-w-xl mx-auto p-5"
    >
      <input
        type="text"
        name="title"
        placeholder="Titre"
        className="border p-2 rounded"
        required
      />
      <textarea
        name="text"
        placeholder="Texte du haïku"
        className="border p-2 rounded"
        required
      />
      <select name="icon" className="border p-2 rounded" defaultValue={icons[0]}>
        {icons.map((ic) => (
          <option key={ic} value={ic}>{ic}</option>
        ))}
      </select>
      <button type="submit" className="bg-green-500 text-white p-2 rounded">
        Ajouter
      </button>
    </form>
  );
}

export default function AddHaikuPage() {
  return (
    <UserProvider>
      <AddHaikuForm />
    </UserProvider>
  );
}
