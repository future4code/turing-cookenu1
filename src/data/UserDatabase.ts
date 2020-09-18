import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    private static TABLE_USERS: string = 'CookenuUsers';
    private static TABLE_RECIPES: string = 'Recipes';
    private static TABLE_USER_FOLLOW: string = 'UserFollowList';

    public async createUser(id: string, name: string, email: string, password: string, role: string): Promise<void> {
        await this.getConnection()
        .insert({
            id,
            name,
            email,
            password,
            role
        }).into(UserDatabase.TABLE_USERS);
    };

    public async getUserByEmail(email: string): Promise<any> {
        const result = await this.getConnection()
        .select('*')
        .from(UserDatabase.TABLE_USERS)
        .where({email})
        return result[0]
    };
    
    public async getUserById(id: string): Promise<any> {
        const result = await this.getConnection()
        .select('*')
        .from(UserDatabase.TABLE_USERS)
        .where({id})
        return result[0]
    };

    public async createRecipe(recipe_id: string, title: string, description: string, creation_date: string, user_id: string): Promise<void> {
        await this.getConnection()
        .insert({
            recipe_id,
            title,
            description,
            creation_date,
            user_id
        }).into(UserDatabase.TABLE_RECIPES)
    };
    
    public async getRecipeById(recipe_id: string): Promise<any> {
        const result = await this.getConnection()
        .select('*')
        .from(UserDatabase.TABLE_RECIPES)
        .where({recipe_id})
        return result[0]
    };
    
    public async followUser(user_follower_id: string, user_to_follow_id: string): Promise<void> {
        await this.getConnection()
        .insert({user_follower_id, user_to_follow_id})
        .into(UserDatabase.TABLE_USER_FOLLOW)
    };
    
    public async unfollowUser(user_follower_id: string, user_to_follow_id: string): Promise<void> {
        await this.getConnection()
        .from(UserDatabase.TABLE_USER_FOLLOW)
        .where({user_to_follow_id, user_follower_id})
        .delete()
    };
    
    public async getRecipesFeed(user_id: string): Promise<any> {
        const result = await this.getConnection().raw(`
        SELECT
        CookenuUsers.id,
        CookenuUsers.name,
        Recipes.recipe_id,
        Recipes.title,
        Recipes.description,
        Recipes.creation_date
        FROM CookenuUsers
        JOIN Recipes
        ON CookenuUsers.id = Recipes.user_id
        JOIN UserFollowList
        ON Recipes.user_id = user_to_follow_id
        WHERE user_follower_id = '${user_id}';
        `)
        return result[0];
    };
};