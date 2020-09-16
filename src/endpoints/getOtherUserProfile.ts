import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import {UserDatabase} from '../data/UserDatabase'
import { BaseDatabase } from "../data/BaseDatabase";

export const getOtherUserProfile = async (req: Request, res: Response) => {
    try {

        const token = req.headers.authorization as string;

        const id = req.params.id

        new Authenticator().getData(token);

        const userDatabase = new UserDatabase();
        const user = await userDatabase.getUserById(id);

        if(user === undefined) {
            throw new Error('Usuário não encontrado!')
        }

        res.status(200).send({
            id: user.id,
            name: user.name,
            email: user.email
        })

    } catch(err) {
        res.status(err.statusCode || 400).send({
            message: err.message
        })
    } finally {
        await BaseDatabase.destroyConnection()
    }
}