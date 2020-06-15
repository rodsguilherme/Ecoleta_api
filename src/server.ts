import express from "express";
import { PORT } from "../src/config";
import routes from "./routes/index";
import path from "path";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

app.use(routes);
app.listen(PORT, () => console.log(`Listenning on ${PORT}`));
