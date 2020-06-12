import * as Knex from "knex";

export const up = async (knex: Knex) =>
  knex.schema.createTable("points", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("image").notNullable();
    table.string("uf", 2).notNullable();
    table.string("city").notNullable();
    table.string("whatsapp").notNullable();
    table.decimal("longitude").notNullable();
    table.decimal("latitude").notNullable();
  });

export const down = async (knex: Knex) =>
  knex.schema.dropTableIfExists("points");
