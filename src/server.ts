import express from "express";
import { PORT } from "../src/config";

const app = express();

app.listen(PORT, () => console.log(`${PORT}`));
