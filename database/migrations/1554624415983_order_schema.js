"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class OrderSchema extends Schema {
  up() {
    this.create("orders", table => {
      table.increments();
      table.integer("product_id").unsigned();
      table
        .foreign("product_id")
        .references("products.id")
        .onDelete("cascade");
      table.integer("qty");
      table.integer("price");
      table.timestamps();
    });
  }

  down() {
    this.drop("orders");
  }
}

module.exports = OrderSchema;
