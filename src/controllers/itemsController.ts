import { Request, Response } from "express";

import db from "../database/connection";
import { PORT } from "../config";

class itemsController {
  async index(request: Request, response: Response) {
    const items = await db("items").select("*");

    const serializeItem = items.map((item) => ({
      id: item.id,
      title: item.title,
      image_url: `http://localhost:${PORT}/uploads/${item.image}`,
    }));
    return response.json({ serializeItem });
  }
}

export default itemsController;
