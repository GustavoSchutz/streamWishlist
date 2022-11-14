import { db } from "../db/db.js";

async function insertMedia({ title, link, relevance, platform }) {
    return db.query(
        `INSERT INTO media (title, link, relevance, platform) 
        VALUES ($1, $2, $3, $4);`,
        [title, link, relevance, platform]
    );
}

export { insertMedia }