import { Request, Response } from "express";

import db from "../database/connection";
import { PORT } from "../config";

class itemsController {
  async index(request: Request, response: Response) {
    const { mobile = false } = request.query;
    const itemsDb = await db("items").select("*");

    const host = mobile
      ? `http://192.168.100.102:${PORT}/uploads`
      : `http://localhost:${PORT}/uploads`;

    const items = itemsDb.map((item) => ({
      id: item.id,
      title: item.title,
      image_url: `${host}/${item.image}`,
    }));

    return response.json({ items });
  }
}

export default itemsController;
