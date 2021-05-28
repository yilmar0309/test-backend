import * as dotenv from 'dotenv';
dotenv.config();
const cors = require('cors')
const express = require('express')
const errorhandler = require('strong-error-handler')
import * as bodyParser from 'body-parser';
import cluster from 'cluster';
// tslint:disable-next-line:no-duplicate-imports
import { Request, Response } from 'express';
import 'reflect-metadata';
import routes from './routes';
import sequelizeInstance from './db-config';

import Models from './models'

sequelizeInstance.addModels([...Models])

sequelizeInstance
  .authenticate()
  .then(() => {
    if (cluster.isMaster) {
      sequelizeInstance.sync({ alter: false, force: false }).then(() => {
        initServer();
      });
    } else {
      initServer();
    }
  })
  .catch(err => {
    console.error(err);
  });

function initServer() {
  const numCPUs = require('os').cpus().length;

  if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    for (let i = 0; i < 0; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
      console.log('worker %d died (%s). restarting...', worker.process.pid, signal || code);
      cluster.fork();
    });
  } else {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json({ limit: '10mb' }));
    app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));
    app.use(
      errorhandler({
        debug: process.env.ENV !== 'prod',
        log: true,
      }),
    );
    routes.forEach(route => {
      app[route.method](
        `/api/v1${route.path}`,
        (request: Request, response: Response, next: (error: Error) => void) => {
          route
            .action(request, response)
            .then(() => next)
            .catch(err => next(err));
        },
      );
    });
    app.listen(process.env.APP_PORT || 5001);
    console.log(`Worker ${process.pid} started ${process.env.APP_PORT}`);
  }
}
