export enum Channel {
  SMS = 'sms',
  WhatsApp = 'whatsApp',
}

export interface Notification {
  id?: string;                // Unique identifier for the notification
  channel: Channel;          // Channel through which the notification was sent
  to: string;                // Recipient of the notification
  body: string;              // Content of the notification
  externalId: string;        // ID from an external system
  status: string;            // Current status of the notification (e.g., 'sent', 'delivered')
  createdAt?: Date;          // Optional: Date when the notification was created
  updatedAt?: Date;          // Optional: Date when the notification was last updated
}
