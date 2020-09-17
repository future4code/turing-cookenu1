import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/idGenerator";
import moment from 'moment';
moment.locale('pt-br');

export const createRecipe = async (req: Request, res: Response) => {
    try{
        const token = req.headers.authorization as string;
        console.log(token)

        const authenticator = new Authenticator();
        const authenticationData = authenticator.getData(token);

        const userData = {
            recipe_id: req.body.recipe_id,
            title: req.body.title,
            description: req.body.description,
            creation_date: req.body.creation_date,
            user_id: authenticationData.id
        }

        if (!userData.title || !userData.description) {
            throw new Error('Insira todas as informações necessárias para o criar a receita')
        }

        const idGenerator = new IdGenerator();
        const recipe_id = idGenerator.generate();

        const creation_date: string = moment().format('YYYY-MM-DD')

        const userDatabase = new UserDatabase();
        await userDatabase.createRecipe(
            recipe_id,
            userData.title,
            userData.description,
            creation_date,
            authenticationData.id
        );

        res.status(200).send({
            message: 'Receita criada!'
        })

    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    } finally {
        await BaseDatabase.destroyConnection()
    }
}