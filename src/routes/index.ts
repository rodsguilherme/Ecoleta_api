import express from "express";

const app = express();

import userRouter from "./users-routes";
import itemRouter from "./items-routes";
import pointRouter from "./points-router";

app.use(userRouter);
app.use(itemRouter);
app.use(pointRouter);

export default app;
