import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/idGenerator";

export const signup = async (req: Request, res: Response) => {
    try{
        const userData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        }

        if (!userData.name || !userData.email || !userData.password) {
            throw new Error('Insira todas as informações necessárias para o cadastro')
        }
        
        if (userData.email.indexOf('@') === -1) {
            throw new Error('E-mail inválido')
        }
        
        if (!req.body.password || req.body.password.length < 6) {
            throw new Error("Invalid password");
        }

        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        const hashManager = new HashManager();
        const cypherPassword = await hashManager.hash(userData.password);

        const userDatabase = new UserDatabase();
        await userDatabase.createUser(
            id,
            userData.name,
            userData.email,
            cypherPassword,
            userData.role
        );

        const auth = new Authenticator();
        const token = auth.generateToken({id, role: userData.role });

        res.status(200).send({
            token
        })

    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    } finally {
        await BaseDatabase.destroyConnection()
    }
}