import { Request, Response } from 'express';
import NotificationService from '../services/notification.services';

export const sendNotification = async (req: Request, res: Response) => {
    const { channel, to, body, externalId } = req.body;
    try {
        // Assuming NotificationService handles the logic to send notification
        const notification = await NotificationService.send({ channel, to, body, externalId });
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ message: 'Error sending notification', error });
    }
};

export const getNotification = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        // Assuming NotificationService handles the logic to get a notification by ID
        const notification = await NotificationService.findById(id);
        if (notification) {
            res.json(notification);
        } else {
            res.status(404).json({ message: 'Notification not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving notification', error });
    }
};

export const handleWebhook = async (req: Request, res: Response) => {
    const { id, event } = req.body;
    try {
        // Assuming NotificationService handles the logic to update a notification status
        await NotificationService.updateStatus(id, event);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error processing webhook', error });
    }
};
