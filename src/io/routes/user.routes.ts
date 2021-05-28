import { authMiddlewareAuth } from "../authorization";

import { UserController } from "../../adapters/controllers/user.controller";

const userController = new UserController();

export default [
    {
        path: '/auth',
        method: 'post',
        action: authMiddlewareAuth(userController.auth),
    },
    {
        path: '/register',
        method: 'post',
        action: authMiddlewareAuth(userController.register),
    },
    
]