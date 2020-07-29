"use strict";
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.resource("/posts", "PostController").apiOnly();
