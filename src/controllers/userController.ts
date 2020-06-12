import { Request, Response } from "express";

class UserController {
  async index(request: Request, response: Response) {
    response.json({ alo: "oi" });
  }
}

export default UserController;
