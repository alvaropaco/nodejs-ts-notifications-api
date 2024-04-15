export enum Channel {
  SMS = 'sms',
  WhatsApp = 'whatsApp',
}

export enum STATUS {
  sent = 'sent',
  delivered = 'delivered',
  processing = 'processing',
}

export interface Notification {
  id?: string;
  channel: Channel;
  to: string;
  body: string;
  externalId: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface NotificationUpdate {
  status: string;
}

export interface NotificationInput {
  channel: Channel;
  to: string;
  body: string;
  externalId: string;
}
