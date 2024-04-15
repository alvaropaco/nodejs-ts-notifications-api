import { Notification, NotificationInput, NotificationUpdate, STATUS } from '../dtos/notification.dto';
import NotificationModel from '../models/notifications.model';

export default class NotificationService {
  static async send({ channel, to, body, externalId }: NotificationInput): Promise<Notification> {
    try {
      const data = {
        channel,
        to,
        body,
        externalId,
        status: STATUS.processing
      }
      const notification = await NotificationModel.create({ ...data });
      await notification.save();
      return notification;
    } catch (error) {
      console.error("Failed to send notification", error);
      throw error;
    }
  }

  static async findById(id: string): Promise<Notification | null> {
    try {
      const notification = await NotificationModel.findByPk(id);
      return notification;
    } catch (error) {
      console.error("Failed to find notification", error);
      throw error;
    }
  }

  static async updateStatus(id: string, { status }: NotificationUpdate): Promise<void> {
    try {
      if(status !== STATUS.sent && status !== STATUS.delivered) {
        throw new Error('Invalid status');
      }
      const notification = await NotificationModel.findByPk(id);
      if (!notification) {
        throw new Error('Notification not found');
      }
      notification.status = status;
      await notification.save();
    } catch (error) {
      console.error("Failed to update notification status", error);
      throw error;
    }
  }
}
