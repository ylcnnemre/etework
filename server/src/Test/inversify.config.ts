import {Container} from "inversify"
import NotificationService, { INotificationService } from "./Notificate"
import { UserManager } from "./UserManager";

const container=new Container()

container.bind<INotificationService>('INotificationService').to(NotificationService);
container.bind<UserManager>(UserManager).to(UserManager);


export {
    container
}