"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Order = use("App/Models/Order");
const Database = use("Database");
/**
 * Resourceful controller for interacting with orders
 */
class OrderController {
  /**
   * Show a list of all orders.
   * GET orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    //const orders = await Order.all();

    const orders = await Database.table("orders").innerJoin(
      "products",
      "orders.product_id",
      "products.id"
    );

    response.json({
      message: "success",
      data: orders
    });
  }

  /**
   * Create/save a new order.
   * POST orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const { price, qty, product_id } = request.post();

    const order = new Order();
    order.price = price;
    order.qty = qty;
    order.product_id = product_id;
    await order.save();

    response.json({
      message: "data added",
      data: order
    });
  }

  /**
   * Update order details.
   * PUT or PATCH orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const { id } = params;
    const order = await Order.find(id);

    if (order) {
      const { qty } = request.post();
      order.qty = qty;

      await order.save();

      response.json({
        message: "data updated",
        data: order
      });
    } else {
      response.json({
        message: "data failed to updated",
        data: id
      });
    }
  }

  /**
   * Delete a order with id.
   * DELETE orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const { id } = params;
    const order = await Order.find(id);

    await order.delete();

    response.json({
      message: "deleted",
      data: order
    });
  }
}

module.exports = OrderController;