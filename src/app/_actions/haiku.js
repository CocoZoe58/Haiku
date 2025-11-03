'use server';
import { db } from '@/db';
import { haikusTable, usersTable } from '@/db/schemas'; // assure-toi d'importer usersTable
import { eq } from 'drizzle-orm';

// Création d'un haïku
export async function createHaiku({ title, text, authorId, icon }) {
  if (!title || !title.trim()) throw new Error('Le titre est requis');
  if (!text || !text.trim()) throw new Error('Le texte est requis');
  if (!icon) throw new Error('Une icône doit être sélectionnée');

  await db.insert(haikusTable).values({
    title: title.trim(),
    text: text.trim(),
    author_id: authorId,
    icon,
  });

  return { success: true };
}

// Récupération de tous les haïkus avec le nom de l'auteur
export async function getAllHaikus() {
  const haikus = await db
    .select({
      id: haikusTable.id,
      title: haikusTable.title,
      text: haikusTable.text,
      icon: haikusTable.icon,
      author_id: haikusTable.author_id,
      name: usersTable.name, // nom de l'auteur
    })
      .from(haikusTable)
    .leftJoin(usersTable, eq(haikusTable.author_id, usersTable.id));

  return haikus;
}
// Récupérer un haïku par id
export async function getHaikuById(id) {
  const [haiku] = await db
    .select({
      id: haikusTable.id,
      title: haikusTable.title,
      text: haikusTable.text,
      icon: haikusTable.icon,
      author_id: haikusTable.author_id,
      name: usersTable.name,
    })
    .from(haikusTable)
    .leftJoin(usersTable, eq(haikusTable.author_id, usersTable.id))
    .where(eq(haikusTable.id, id));

  return haiku || null;
}