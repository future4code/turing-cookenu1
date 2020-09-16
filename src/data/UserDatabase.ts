import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    private static TABLE_NAME: string = 'CookenuUsers';

    public async createUser(id: string, name: string, email: string, password: string): Promise<void> {
        await this.getConnection()
        .insert({
            id,
            name,
            email,
            password
        }).into(UserDatabase.TABLE_NAME)
    }
}