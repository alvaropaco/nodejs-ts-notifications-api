import express from 'express';
import http from 'http';
import { setupSwagger } from '../swaggerOptions';
import notificationRoutes from './routes/notification.routes';

export class Server {
  public _app: express.Application;
  private server?: http.Server;

  constructor() {
    this._app = express();
    this._app.use(express.json());

    this._app.use('/notifications', notificationRoutes);
    
    setupSwagger(this._app);
  }

  run() {
    this._app.listen(3000, () => console.log('Server running on port 3000'));
  }

  stop() {
    if (this.server) {
      this.server.close(() => {
        console.log('Server stopped');
      });
    }
  }

  get app(): express.Application {
    return this._app;
  }
}
