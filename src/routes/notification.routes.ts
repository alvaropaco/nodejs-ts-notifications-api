import { Router } from 'express';
import { getNotification, handleWebhook, sendNotification } from '../controllers/notification.controller';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       required:
 *         - id
 *         - channel
 *         - to
 *         - body
 *         - externalId
 *         - status
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the notification.
 *         channel:
 *           type: string
 *           description: The channel used to send the notification (e.g., sms, whatsApp).
 *         to:
 *           type: string
 *           description: The recipient of the notification.
 *         body:
 *           type: string
 *           description: The content of the notification.
 *         externalId:
 *           type: string
 *           description: An identifier from an external system.
 *         status:
 *           type: string
 *           description: The current status of the notification (processing, sent, delivered, etc.).
 *   parameters:
 *     notificationId:
 *       in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *       description: The unique identifier of the notification.
 */


/**
 * @swagger
 * /notifications:
 *   post:
 *     summary: Send a notification
 *     description: Send a new notification to a specified channel and recipient.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notification'
 *     responses:
 *       201:
 *         description: Notification created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       400:
 *         description: Invalid input parameters.
 */

router.post('/', sendNotification);

/**
 * @swagger
 * /notifications/{id}:
 *   get:
 *     summary: Get a notification by ID
 *     description: Retrieve a notification by its unique identifier.
 *     parameters:
 *       - $ref: '#/components/parameters/notificationId'
 *     responses:
 *       200:
 *         description: A single notification.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       404:
 *         description: Notification not found.
 */
router.get('/:id', getNotification);

/**
 * @swagger
 * /webhooks:
 *   post:
 *     summary: Receive a webhook for a notification status update
 *     description: Endpoint for external systems to send status updates for notifications.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The notification identifier.
 *               event:
 *                 type: string
 *                 description: The status event (sent, delivered, etc.).
 *     responses:
 *       204:
 *         description: Webhook received successfully.
 *       400:
 *         description: Invalid input data.
 */
router.post('/webhooks', handleWebhook);

export default router;
