
import { injectable } from 'inversify';

export interface INotificationService {
    sendNotification(message: string): string;
  }


@injectable()
class NotificationService implements INotificationService {
  sendNotification(message: string) {

    return 'Notification:'+message
  }
}

export default NotificationService;