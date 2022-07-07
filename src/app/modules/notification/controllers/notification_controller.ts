import { Request, Response } from "express"
import notificationService from "../shared/services/notification_service"
import SequelizeConnect from "../../../../config/sequelize_request"
import AuthController from "../../auth/controllers/auth_controller"
import authService from "../../auth/shared/services/auth_service"
const authController = new AuthController()
const sequelize = SequelizeConnect.sequelizeConnect

class NotificationController {

    async getNotification(req: Request, res: Response) {

        const idUser = req.idUser
        const idOffice = req.idOffice

        try {
            const sector = await authService.verifyUserSector(idUser)

            if(sector.name === 'jurídico' || sector.name === 'financeiro') {

                const notification = await notificationService.getNotificationBySector(idUser, sector) //Pegar pelo setor
                return res.json(notification)

            } else if(sector.name === 'influencer') {

                if(idOffice === 1) { // Se diretor

                    const notification = await notificationService.getNotificationBySector(idUser, sector) //Pegar pelo setor
                    return res.json(notification)

                } else {      
                    const notification = await notificationService.getNotificationInfluencer(idUser, sector)
                    return res.json(notification)

                }
            }
            else {
                const notification: [] = []
                return res.json(notification)
            }

        }
        catch(error){
            return res.status(406).json({error:'Algo ocorreu, não foi possível realizar a ação!'});

        }
    }

    // ==== DELETE ====

    async deleteNotification(req: Request, res: Response): Promise<Response>  {

        const idActionNotification:number = Number(req.params.idActionNotification)

        try {
            await notificationService.deleteNotification(idActionNotification)
            return res.json(true)
        }
        catch(error) {
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

}

export default NotificationController










    
