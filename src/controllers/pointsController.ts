import { Request, Response } from "express";

import db from "../database/connection";

class pointsController {
  async create(request: Request, response: Response) {
    const {
      name,
      email,
      longitude,
      latitude,
      whatsapp,
      city,
      uf,
      items,
    } = request.body;

    const point = {
      name,
      email,
      image:
        "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=850",
      longitude,
      latitude,
      whatsapp,
      city,
      uf,
    };

    const trx = await db.transaction();

    const [point_id] = await trx("points").insert({
      name,
      email,
      image:
        "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=850",
      longitude,
      latitude,
      whatsapp,
      city,
      uf,
    });
    const pointItems = items.map((item_id: number) => {
      return {
        item_id,
        point_id,
      };
    });

    await trx("point_items").insert(pointItems);

    await trx.commit();
    return response.json({ point_id, ...point });
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await db("points").where({ id }).first();

    if (!point) {
      return response.status(400).json({ message: "Point not found." });
    }

    const items = await db("items")
      .select("items.title")
      .innerJoin("point_items", "items.id", "point_items.item_id")
      .where("point_items.point_id", id);

    return response.json({ point, items });
  }

  async index(request: Request, response: Response) {
    const { uf, city, items } = request.query;

    const parsedItems = String(items)
      .split(",")
      .map((item) => Number(item.trim()));

    const points = await db("points")
      .innerJoin("point_items", "points.id", "point_items.point_id")
      .whereIn("point_items.item_id", parsedItems)
      .where("points.city", String(city))
      .where("points.uf", String(uf))
      .distinct()
      .select("points.*");

    return response.json({ points });
  }
}
export default pointsController;
