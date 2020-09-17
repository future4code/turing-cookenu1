import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    private static TABLE_USERS: string = 'CookenuUsers';
    private static TABLE_RECIPES: string = 'Recipes';

    public async createUser(id: string, name: string, email: string, password: string, role: string): Promise<void> {
        await this.getConnection()
        .insert({
            id,
            name,
            email,
            password,
            role
        }).into(UserDatabase.TABLE_USERS)
    }

    public async getUserByEmail(email: string): Promise<any> {
        const result = await this.getConnection()
        .select('*')
        .from(UserDatabase.TABLE_USERS)
        .where({email})
        return result[0]
    }
    
    public async getUserById(id: string): Promise<any> {
        const result = await this.getConnection()
        .select('*')
        .from(UserDatabase.TABLE_USERS)
        .where({id})
        return result[0]
    }

    public async createRecipe(recipe_id: string, title: string, description: string, creation_date: string, user_id: string): Promise<void> {
        await this.getConnection()
        .insert({
            recipe_id,
            title,
            description,
            creation_date,
            user_id
        }).into(UserDatabase.TABLE_RECIPES)
    }
    
    public async getRecipeById(recipe_id: string): Promise<any> {
        const result = await this.getConnection()
        .select('*')
        .from(UserDatabase.TABLE_RECIPES)
        .where({recipe_id})
        return result[0]
    }
}