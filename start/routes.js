"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

// products endpoint
Route.get("v1/products", "ProductController.index");
Route.get("v1/products/:id", "ProductController.show");

//orders endpoint
Route.get("v1/orders", "OrderController.index");
Route.post("v1/orders", "OrderController.store");
Route.patch("v1/orders/:id", "OrderController.update");
Route.delete("v1/orders/:id", "OrderController.destroy");
