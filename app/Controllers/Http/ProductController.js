"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Product = use("App/Models/Product");
/**
 * Resourceful controller for interacting with products
 */
class ProductController {
  /**
   * Show a list of all products.
   * GET products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    try {
      const products = await Product.all();

      response.json({
        message: "success",
        data: products
      });
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Display a single product.
   * GET products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params: { id }, request, response, view }) {
    try {
      const product = await Product.find(id);

      if (product) {
        response.json({
          message: "success",
          data: product
        });
      } else {
        response.json({
          message: "failed",
          id
        });
      }
    } catch (error) {}
  }
}

module.exports = ProductController;
