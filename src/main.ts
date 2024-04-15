import express from 'express';
import { setupSwagger } from '../swaggerOptions';
import notificationRoutes from './routes/notification.routes';

export class Server {
  private _app: express.Application;

  constructor() {
    this._app = express();
    this._app.use(express.json());

    this._app.use('/notifications', notificationRoutes);
    
    setupSwagger(this._app);
  }

  run() {
    this._app.listen(3000, () => console.log('Server running on port 3000'));
  }
}
