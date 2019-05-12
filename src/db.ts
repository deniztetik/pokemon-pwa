import Dexie from "dexie";

const db = new Dexie("Pokemon");
db.version(1).stores({ pokemon: "++id, nationalNo, name, spriteUrl" });

export default db;
