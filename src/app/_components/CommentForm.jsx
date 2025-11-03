// app/components/CommentForm.jsx
'use client';

import { createComment } from '@/app/_actions/comment';
import { useUser } from '@/app/context/UserContext';
import { useRouter } from 'next/navigation';

export default function CommentForm({ haikuId, onCommentAdded }) {
  const { user } = useUser() || {};
  const router = useRouter();

  return (
    <form
      action={async (formData) => {
        const text = formData.get('text')?.trim();

        if (!text) {
          alert('Le commentaire ne peut pas être vide.');
          return;
        }

        try {
          await createComment({
            haikuId,
            authorId: user.id,
            text,
          });

          onCommentAdded?.(); // rafraîchit la liste ou ferme la modale
        } catch (err) {
          console.error(err);
          alert('Erreur lors de l’envoi du commentaire.');
        }
      }}
      className="flex flex-col gap-3 bg-gray-800 p-4 rounded shadow-lg text-gray-100"
    >
      <textarea
        name="text"
        placeholder="Écrire un commentaire..."
        className="bg-gray-700 text-gray-100 border border-gray-600 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={4}
        required
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition"
      >
        Envoyer
      </button>
    </form>
  );
}
