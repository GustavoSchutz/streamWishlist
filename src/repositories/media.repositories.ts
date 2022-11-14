import { db } from "../db/db.js";

async function insertMedia({ title, link, relevance, platform }) {
    return db.query(
        `INSERT INTO media (title, link, relevance, platform) 
        VALUES ($1, $2, $3, $4);`,
        [title, link, relevance, platform]
    );
}

async function insertCategory({ mediaId, category }) {
    return db.query(
        `INSERT INTO "mediaCategories" ("mediaId", category) VALUES ( $1, $2);`,
        [mediaId, category]
    );
}

async function  selectMedia() {
    return db.query(
        `SELECT "mediaCategories".id AS "categoryId",
            "mediaCategories".category AS "category",
            "mediaCategories"."mediaId" AS "mediaId",
            json_build_object('id', media.id, 'title', media.title, 'link', media.link) AS media
	    FROM "mediaCategories"
		    JOIN media
			    ON "mediaCategories"."mediaId" = "media"."id";`
    );
}

export { insertMedia, insertCategory, selectMedia }