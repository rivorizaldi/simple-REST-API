"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Order = use("App/Models/Order");
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
    try {
      // using eager loading
      const orders = await Order.query()
        .with("product")
        .fetch();

      response.json({
        message: "success",
        data: orders
      });
    } catch (error) {
      console.log(error);
    }
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
    try {
      const { price, qty, product_id } = request.post();

      const order = new Order();

      const filter = await Order.findBy("product_id", product_id);

      if (filter) {
        filter.merge({ qty: filter.qty + qty });
        await filter.save();
        response.json({
          message: "data updated",
          data: order
        });
      } else {
        order.price = price;
        order.qty = qty;
        order.product_id = product_id;
        await order.save();

        response.json({
          message: "data added",
          data: order
        });
      }
    } catch (error) {
      console.log(error);
    }
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
    try {
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
    } catch (error) {
      console.log(error);
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
    try {
      const { id } = params;

      const orderId = await Order.find(id);

      await orderId.delete();

      response.json({
        message: "deleted",
        id: id
      });
    } catch (error) {}
  }
}

module.exports = OrderController;
