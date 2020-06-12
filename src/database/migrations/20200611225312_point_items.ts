import * as Knex from "knex";

export const up = async (knex: Knex) =>
  knex.schema.createTable("point_items", (table) => {
    table.increments("id").primary();
    table.integer("point_id").notNullable();

    table.foreign("point_id").references("id").inTable("points");

    table.integer("item_id").notNullable();

    table.foreign("item_id").references("id").inTable("items");
  });

export const down = async (knex: Knex) =>
  knex.schema.dropTableIfExists("point_items");
