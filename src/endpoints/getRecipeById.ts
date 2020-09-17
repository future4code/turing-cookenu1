import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import {UserDatabase} from '../data/UserDatabase'
import { BaseDatabase } from "../data/BaseDatabase";

export const getRecipeById = async (req: Request, res: Response) => {
    try {

        const token = req.headers.authorization as string;

        const recipe_id = req.params.id

        new Authenticator().getData(token);

        const userDatabase = new UserDatabase();
        const recipe = await userDatabase.getRecipeById(recipe_id);
        console.log(recipe);

        if(recipe === undefined) {
            throw new Error('Receita não encontrada!')
        }

        res.status(200).send({
            recipe_id: recipe.recipe_id,
            title: recipe.title,
            description: recipe.description,
            creation_date: recipe.creation_date
        })

    } catch(err) {
        res.status(err.statusCode || 400).send({
            message: err.message
        })
    } finally {
        await BaseDatabase.destroyConnection()
    }
}