import { Channel, Notification } from '../dtos/notification.dto';
import NotificationModel from '../models/notifications.model'; // Renamed import

interface NotificationInput {
    channel: Channel;
    to: string;
    body: string;
    externalId: string;
}

interface NotificationUpdate {
    status: string;
}

export default class NotificationService {
    // Method to send a notification
    static async send({ channel, to, body, externalId }: NotificationInput): Promise<Notification> {
        try {
            // Here, you would interact with an external notification API
            const data = {
              channel,
              to,
              body,
              externalId,
              status: 'processing'  // Initial status
            }
            const notification = await NotificationModel.create({...data});
            await notification.save();
            return notification;
        } catch (error) {
            console.error("Failed to send notification", error);
            throw error; // Bubble up the error
        }
    }

    // Method to find a notification by ID
    static async findById(id: string): Promise<Notification | null> {
        try {
            const notification = await NotificationModel.findByPk(id);
            return notification;
        } catch (error) {
            console.error("Failed to find notification", error);
            throw error; // Bubble up the error
        }
    }

    // Method to update notification status
    static async updateStatus(id: string, { status }: NotificationUpdate): Promise<void> {
        try {
            const notification = await NotificationModel.findByPk(id);
            if (!notification) {
                throw new Error('Notification not found');
            }
            notification.status = status;
            await notification.save();
        } catch (error) {
            console.error("Failed to update notification status", error);
            throw error; // Bubble up the error
        }
    }
}
