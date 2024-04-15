// models/notification.model.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '.'; // Adjust the import based on your setup
import { Channel, Notification } from '../dtos/notification.dto';

class NotificationModel extends Model<Notification> implements Notification {
    public id!: string;
    public channel!: Channel;
    public to!: string;
    public body!: string;
    public externalId!: string;
    public status!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

NotificationModel.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    channel: {
        type: DataTypes.ENUM,
        values: Object.values(Channel)
    },
    to: DataTypes.STRING,
    body: DataTypes.STRING,
    externalId: DataTypes.STRING,
    status: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, {
    sequelize,
    tableName: 'notifications'
});

export default NotificationModel;
