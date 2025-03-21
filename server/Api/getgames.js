import { Router } from "express";
import { readdirSync, readFileSync } from "fs";
import path from "path";

const router = Router();
router.get("/", async (req, res) => {
  const jsonFile = [];
  const gamesFolderPath = path.join(path.resolve(), "..", "client/games");
  if (gamesFolderPath) {
    const games = readdirSync(gamesFolderPath);
    games.forEach((game) => {
      const gamePath = path.join(gamesFolderPath, game);
      const files = readdirSync(gamePath);
      files.forEach((file) => {
        if (file.endsWith(".json")) {
          const jasonFile = path.join(gamePath, file);
          const jsonData = readFileSync(jasonFile, "utf-8");
          jsonFile.push(JSON.parse(jsonData));
        }
      });
    });
    res.status(200).json(jsonFile);
  } else {
    res.status(404).json({ Message: "Games not found" });
  }
});

export default router;
