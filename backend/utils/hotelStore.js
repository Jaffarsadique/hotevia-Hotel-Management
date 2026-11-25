import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// hotels are kept in a json file so they are still there after a restart
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "..", "data", "hotels.json");

export async function readHotels() {
  const text = await readFile(filePath, "utf-8");
  return JSON.parse(text);
}

export async function saveHotels(hotels) {
  await writeFile(filePath, JSON.stringify(hotels, null, 2));
}
