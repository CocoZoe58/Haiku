'use server';
import { db } from '@/db';
import { commentsTable, usersTable } from '@/db/schemas';
import { eq } from 'drizzle-orm';

// Ajouter un commentaire
export async function createComment({ haikuId, authorId, text }) {
    if (!text || !text.trim()) throw new Error('Le commentaire est vide');

    await db.insert(commentsTable).values({
        haiku_id: haikuId,
        author_id: authorId,
        text: text.trim(),
    });

    return { success: true };
}

// Récupérer tous les commentaires pour un haïku
export async function getCommentsByHaiku(haikuId) {
    return db
        .select({
            id: commentsTable.id,
            text: commentsTable.text,
            author_id: commentsTable.author_id,
            name: usersTable.name,
            createdAt: commentsTable.createdAt,
        })
        .from(commentsTable)
        .leftJoin(usersTable, eq(commentsTable.author_id, usersTable.id))
        .where(eq(commentsTable.haiku_id, haikuId))
        .orderBy(commentsTable.createdAt); // ← pas besoin d'asc()
}

// Supprimer un commentaire par id
export async function deleteComment(commentId) {
    await db.delete(commentsTable).where(eq(commentsTable.id, commentId));
    return { success: true };
}
