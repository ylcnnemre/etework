import { injectable,inject } from "inversify";
import { INotificationService } from "./Notificate";


@injectable()
export class UserManager {
  private notificationService: INotificationService;

  constructor(@inject('INotificationService') notificationService?: INotificationService) {
    this.notificationService = notificationService;
  }

  registerUser()
  {
    return   this.notificationService.sendNotification("çalıştır babaaa")
  }
}
