// app/haiku/[id]/HaikuClientView.jsx
'use client';
import { useState } from 'react';
import CommentForm from '@/app/_components/CommentForm';

export default function HaikuClientView({ haiku, comments }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <main className="p-5 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{haiku.title} {haiku.icon}</h1>
      <p className="mb-4">{haiku.text}</p>
      <small className="text-gray-500">Auteur: {haiku.name || 'Inconnu'}</small>

      <hr className="my-4" />

      <button
        onClick={() => setShowForm(true)}
        className="bg-green-500 text-white text-lg font-bold p-4 rounded w-full mb-4"
      >
        Ajouter un commentaire
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              ✕
            </button>
            <CommentForm
              haikuId={haiku.id}
              onCommentAdded={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-2 mt-6">Commentaires</h2>
      {comments.length === 0 ? (
        <p>Aucun commentaire pour le moment.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {comments.map((c) => (
            <li key={c.id} className="border p-2 rounded flex justify-between items-start">
              <div>
                <strong>{c.name}</strong> : {c.text}
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
