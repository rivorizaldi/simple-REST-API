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
Route.group(() => {
  Route.get("products", "ProductController.index");
  Route.get("products/:id", "ProductController.show");
}).prefix("api/v1");

//orders endpoint
Route.group(() => {
  Route.get("orders", "OrderController.index");
  Route.post("orders", "OrderController.store");
  Route.patch("orders/:id", "OrderController.update");
  Route.delete("orders/:id", "OrderController.destroy");
}).prefix("api/v1");
