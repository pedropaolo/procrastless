const express = require('express');
const routes = require('./routes');

import express from 'express';
import routes from './routes';

class App {

  /* Método que executa toda vez que a classe App for instanciada */
  constructor() {

    this.server = express();
    this.middlewares();
    this.routes();


  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes)

  }
}

export default new App().server;
