'use server';
import { db } from '@/db';
import { usersTable } from '@/db/schemas';
import { sql } from 'drizzle-orm';

export async function createUser(name) {
  if (!name || !name.trim()) throw new Error('Le nom est requis');

  const [user] = await db
    .insert(usersTable)
    .values({
      name: name.trim(),
      createdAt: sql`CURRENT_TIMESTAMP`,
    })
    .returning({
      id: usersTable.id,
      name: usersTable.name,
    });

  return user; 
}
