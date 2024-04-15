import { Request, Response } from 'express';
import NotificationService from '../services/notification.services';

export const sendNotification = async (req: Request, res: Response) => {
  const { channel, to, body, externalId } = req.body;
  try {
    const notification = await NotificationService.send({ channel, to, body, externalId });
    return res.status(201).json(notification);
  } catch (error) {
    return res.status(500).json({ message: 'Error sending notification', error });
  }
};

export const getNotification = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const notification = await NotificationService.findById(id);
    if (notification) {
      return res.json(notification);
    } else {
      return res.status(404).json({ message: 'Notification not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving notification', error });
  }
};

export const handleWebhook = async (req: Request, res: Response) => {
  const { id, event } = req.body;
  try {
    await NotificationService.updateStatus(id, event);
    return res.status(204).send();
  } catch (error) {
    const errorMessage = (error as Error).message;
    if(errorMessage === 'Invalid status') {
      return res.status(400).json({ message: 'Invalid status event' });
    }
    if(errorMessage === 'Notification not found') {
      return res.status(404).json({ message: 'Notification not found' });
    }
    return res.status(500).json({ message: 'Error processing webhook', error });
  }
};
