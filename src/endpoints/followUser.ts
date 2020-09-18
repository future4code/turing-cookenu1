import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";

export const followUser = async (req: Request, res: Response) => {
    try{
        const token = req.headers.authorization as string;

        const authenticator = new Authenticator();
        const authenticationData = authenticator.getData(token);
        
        const userData = {
            user_follower_id: authenticationData.id,
            user_to_follow_id: req.body.user_to_follow_id
        }

        if (!userData.user_to_follow_id) {
            throw new Error('Insira todas as informações necessárias para seguir o usuário')
        }

        const userDatabase = new UserDatabase();
        await userDatabase.followUser(
            userData.user_follower_id,
            userData.user_to_follow_id
        );

        res.status(200).send({
            message: 'Followed successfully'
        })

    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    } finally {
        await BaseDatabase.destroyConnection()
    }
}