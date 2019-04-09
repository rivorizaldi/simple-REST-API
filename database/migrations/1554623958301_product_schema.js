"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProductSchema extends Schema {
  up() {
    this.create("products", table => {
      table.increments();
      table.string("name", 100);
      table.string("image", 100);
      table.integer("price");
      table.string("nama", 100);
      table.text("description");
      table.timestamp("created_at").defaultTo(this.fn.now());
      table.timestamp("updated_at").defaultTo(this.fn.now());
    });
  }

  down() {
    this.drop("products");
  }
}

module.exports = ProductSchema;
