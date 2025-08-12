import { sql } from "./db.js";

// sql`DROP TABLE IF EXISTS videos;`.then(() =>{
//     console.log("tabela excluida");
// })

sql`
    CREATE TABLE IF NOT EXISTS videos (
        id             TEXT PRIMARY KEY,
        title          TEXT,
        description    TEXT,
        duration       INTEGER
    );
`.then(() => {
    console.log('Created!');
});