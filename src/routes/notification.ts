import { Router } from "express";
import middleware from "../app/middlewares/auth"
import NotificationController from "../app/modules/notification/controllers/notification_controller";

const notificationController = new NotificationController()
const routes = Router()

routes.get('/getNotification', middleware.validateWithoutPolicy(),notificationController.getNotification)
routes.delete('/deleteNotification/:idActionNotification', middleware.validateWithoutPolicy(), notificationController.deleteNotification)

export default routes