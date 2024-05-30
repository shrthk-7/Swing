import Entry from "./model.js";
import Path from "path";
import { fileURLToPath } from "url";

const getHome = async (req, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = Path.dirname(__filename);
  return res.sendFile(Path.join(__dirname, "index.html"));
};

const addEntry = async (req, res) => {
  const { score, comment, passkey } = req.body;

  if (passkey !== process.env.PASSKEY)
    return res.status(500).json({
      message: "Nope, not gonna happen",
    });

  if (typeof comment === "undefined") comment = "";
  if (typeof score === "undefined") score = 5;

  const timestamp = Date.now();

  await new Entry({
    score,
    timestamp,
    comment,
  }).save();

  return res.status(201).json({
    message: "Goood",
  });
};

const getEntries = async (req, res) => {
  const passkey = req.params.passkey;
  if (passkey !== process.env.PASSKEY)
    return res.status(404).json({
      message: "Nope, not gonna happen",
    });

  const entries = await Entry.find()
    .sort({ timestamp: 1 })
    .select("score timestamp");

  return res.status(200).json({
    entries,
  });
};

export default { addEntry, getEntries, getHome };
