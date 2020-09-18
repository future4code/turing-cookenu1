import express from "express";
import { AddressInfo } from "net";
import dotenv from 'dotenv';
import { signup } from "./endpoints/signup";
import { login } from "./endpoints/login";
import { getUserProfile } from "./endpoints/getUserProfile";
import { getOtherUserProfile } from "./endpoints/getOtherUserProfile";
import { createRecipe } from "./endpoints/createRecipe";
import { getRecipeById } from "./endpoints/getRecipeById";
import { followUser } from "./endpoints/followUser";
import { unfollowUser } from "./endpoints/unfollowUser";
import { getRecipesFeed } from "./endpoints/getRecipesFeed";

dotenv.config();

const app = express();
app.use(express.json());

const server = app.listen(process.env.PORT || 3000, () => {
    if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
    } else {
    console.error(`Failure upon starting server.`);
    }
    });

    app.post('/user/signup', signup);
    app.post('/login', login);
    app.get('/user/profile', getUserProfile);
    app.post('/recipe', createRecipe);
    app.post('/user/follow', followUser);
    app.post('/user/unfollow', unfollowUser);
    app.get('/user/feed', getRecipesFeed);
    app.get('/recipe/:id', getRecipeById);
    app.get('/user/:id', getOtherUserProfile);