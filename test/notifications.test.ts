import request from 'supertest';
import { Server } from '../src/main';
import sequelize from '../src/models';

const server = new Server();

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
  await server.stop();
});

describe('POST /notifications', () => {
  it('should create a new notification and return it', async () => {
    const res = await request(server.app)
      .post('/notifications')
      .send({
        channel: 'sms',
        to: '+5511999999999',
        body: 'Hello, this is a test message!',
        externalId: '12345'
      })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.to).toEqual('+5511999999999');
  });
});

describe('GET /notifications/:id', () => {
  it('should retrieve a notification by id', async () => {
    const notification = await request(server.app)
      .post('/notifications')
      .send({
        channel: 'sms',
        to: '+5511999999999',
        body: 'Follow up test message',
        externalId: '12346'
      });

    const res = await request(server.app)
      .get(`/notifications/${notification.body.id}`)
      .expect(200);

    expect(res.body.to).toEqual('+5511999999999');
  });

  it('should return 404 for a non-existent notification', async () => {
    const res = await request(server.app)
      .get('/notifications/999999')
      .expect(404);

    expect(res.body.message).toBe('Notification not found');
  });
});

describe('POST /notifications/webhooks', () => {
  it('should receive webhook and update notification status', async () => {
    const notification = await request(server.app)
      .post('/notifications')
      .send({
        channel: 'sms',
        to: '+5511999999999',
        body: 'Webhook test message',
        externalId: '12347'
      });

    await request(server.app)
      .post('/notifications/webhooks')
      .send({
        id: notification.body.id,
        event: { status: 'delivered' }
      })
      .expect(204)

    const updatedNotification = await request(server.app)
      .get(`/notifications/${notification.body.id}`)
      .expect(200);

    expect(updatedNotification.body.status).toEqual('delivered');
  });

  it('should return an error for invalid notification ID in webhook', async () => {
    await request(server.app)
      .post('/notifications/webhooks')
      .send({
        id: 'nonexistent-id',
        event: { status: 'delivered' }
      })
      .expect(404);
  });

  it('should handle invalid event types gracefully', async () => {
    const notification = await request(server.app)
      .post('/notifications')
      .send({
        channel: 'sms',
        to: '+5511999999999',
        body: 'Another webhook test message',
        externalId: '12348'
      });

    await request(server.app)
      .post('/notifications/webhooks')
      .send({
        id: notification.body.id,
        event: { status: 'unknown_event' }
      })
      .expect(400);
  });
});
