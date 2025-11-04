import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { drizzle } from "drizzle-orm/libsql";
import fs from "fs";
import { usersTable, haikusTable, commentsTable } from "./schemas/schema.js";

// -----------------------------------------
// Chargement JSON
// -----------------------------------------
const seedDataPath = new URL("./01_seed.json", import.meta.url);
const seedData = JSON.parse(fs.readFileSync(seedDataPath, "utf-8"));
const { users, haikus, comments } = seedData;

// -----------------------------------------
// Chargement .env.prod
// -----------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, "../../.env.prod") });

if (!process.env.DATABASE_URL || !process.env.DATABASE_AUTH_TOKEN) {
    throw new Error("DATABASE_URL ou DATABASE_AUTH_TOKEN non défini !");
}

// -----------------------------------------
// Connexion DB
// -----------------------------------------
const db = drizzle({
    connection: {
        url: process.env.DATABASE_URL,
        authToken: process.env.DATABASE_AUTH_TOKEN,
    },
});

// -----------------------------------------
// Fonction d'insertion batchée
// -----------------------------------------
const insertWithDelay = async (data, table, batchSize = 10, delayMs = 500) => {
    for (let i = 0; i < data.length; i += batchSize) {
        const batch = data.slice(i, i + batchSize);
        console.log(`[INSERTING DATA] batch ${i / batchSize + 1}`);
        await db.insert(table).values(batch).onConflictDoNothing();
        if (i + batchSize < data.length) await new Promise(r => setTimeout(r, delayMs));
    }
};

// -----------------------------------------
// Seed principal
// -----------------------------------------
const main = async () => {
    console.log("[DELETING COMMENTS, HAIKUS AND USERS FROM DB]");
    try {
        await db.delete(commentsTable).where({});
        await db.delete(haikusTable).where({});
        await db.delete(usersTable).where({});
        console.log("[DELETE DONE]");
    } catch (err) {
        console.error("Erreur suppression :", err);
    }

    console.log("[INSERTING USERS]");
    await insertWithDelay(users, usersTable, 5, 1000);

    console.log("[INSERTING HAIKUS]");
    await insertWithDelay(haikus, haikusTable, 5, 1000);

    console.log("[INSERTING COMMENTS]");
    await insertWithDelay(comments, commentsTable, 5, 1000);

    console.log("[DONE] Seed terminé !");
};

main().catch(err => console.error("Erreur seed :", err));
