import * as jwt from 'jsonwebtoken';
import { Request, Response } from "express";

import { RequestUserInfo, RequestData } from "../adapters/controllers/interfaces";
import { getTokenFromHeader } from "./Hash";
import { reponseJson } from "./responseJson";

/**
 * @author Alexis Noriega
 * @description Function to validate internal and external JWT
 * @param controller Function to start service and process data
 * this function receive as paremeter usr_id (id of user that be request).
 * @param role Id of the rol with which to define who can call and execute this function.
 * Example: role = 1 Only tokens with information can make this request.
 * @param request get all parameters haders, body, queryParams, etc.
 * @param response response request
 * @version 1.0 Function version
 */
export function authMiddleware(controller: any, role: number[]) {
    return async (request: Request, response: Response) => {
        const token = getTokenFromHeader(request.headers.authorization || '');
        const token_externo = getTokenFromHeader(request.headers['authorization-external'] || '');
        await jwt.verify(token_externo, process.env.SECRET_EXTERNO, async (error: Error) => {
            if (error) {
                console.log('*************** ERROR authMiddleware token_external ***************', error.message);
                reponseJson(true, 'authMiddleware -> token external', 'Not authorized token external', 401, {}, response);
            } else {
                await jwt.verify(token, process.env.SECRET, async (error: Error, decoded: any) => {
                    if (error) {
                        console.log('*************** ERROR authMiddleware token ***************', error.message);
                        reponseJson(true, 'authMiddleware', 'Not authorized', 401, {}, response);
                    } else {
                        const { usr_id, usr_role_id, usr_username } = decoded;
                        const rol = role.filter((i: any) => i === usr_role_id);
                        if (rol.length > 0 || role[0] === 0) {
                            const requestData: RequestData = {
                                headers: request.headers,
                                body: request.body,
                                params: request.params,
                                queryParams: request.query,
                            };
                            const requestUserInfo: RequestUserInfo = {
                                usr_id,
                                usr_role_id,
                                usr_username,
                            };
                            try {
                                const result = await controller(requestUserInfo, requestData);
                                reponseJson(false, result.nameFunction, 'success', 200, result.entity, response);
                            } catch (error) {
                                reponseJson(true, 'authMiddleware' + error, 'Error', 500, {}, response);
                            }
                        } else {
                            reponseJson(true, 'authMiddleware role', 'Not authorized role', 401, {}, response);
                        }
                    }
                });
            }
        });
    };
}

/**
 * @author Alexis Noriega
 * @description Function to validate external JWT
 * @param controller Function to start service and process data
 * this function receive as paremeter usr_id (id of user that be request).
 * @param request get all parameters haders, body, queryParams, etc.
 * @param response response request
 * @version 1.0 Function version
 */
export function authMiddlewareSimple(controller: any) {
    return async (request: Request, response: Response) => {
        const token_externo = getTokenFromHeader(request.headers['authorization-external'] || '');
        await jwt.verify(token_externo, process.env.SECRET_EXTERNO, async (error: Error) => {
            if (error) {
                console.log('*************** ERROR authMiddleware token_external ***************', error.message);
                reponseJson(true, 'authMiddleware -> token external', 'Not authorized token external', 401, {}, response);
            } else {
                const requestData: RequestData = {
                    headers: request.headers,
                    body: request.body,
                    params: request.params,
                    queryParams: request.query,
                };
                const requestUserInfo: RequestUserInfo = {
                    usr_id: 1,
                    usr_role_id: 1,
                    usr_username: '',
                };
                try {
                    const result = await controller(requestUserInfo, requestData);
                    reponseJson(false, result.nameFunction, 'success', 200, result.entity, response);
                } catch (error) {
                    reponseJson(true, 'authMiddleware' + error, 'Error', 500, {}, response);
                }
            }
        });
    };
}

/**
 * @author Alexis Noriega
 * @description Function to validate external JWT and userAuth
 * @param controller Function to start service and process data
 * this function receive as paremeter usr_id (id of user that be request).
 * @param request get all parameters haders, body, queryParams, etc.
 * @param response response request
 * @version 1.0 Function version
 */
export function authMiddlewareAuth(controller: any) {
    return async (request: Request, response: Response) => {
        const token_externo = getTokenFromHeader(request.headers['authorization-external'] || '');
        await jwt.verify(token_externo, process.env.SECRET_EXTERNO, async (error: Error) => {
            if (error) {
                console.log('*************** ERROR authMiddlewareAuth ***************', error.message);
                reponseJson(true, 'authMiddlewareAuth', 'Not authorized token', 401, {}, response);
            } else {
                let result: any;
                try {
                    result = await controller(request.body);
                    if (result.entity === 'userNotExist' ) {
                        reponseJson(true, result.nameFunction, 'User doest not exist', 401, null, response);
                    } else if (result.entity === 'userExist') {
                        reponseJson(true, result.nameFunction, 'User exist', 401, null, response);
                    }
                    reponseJson(false, result.nameFunction, 'success', 200, result.entity, response);
                } catch (error) {
                    reponseJson(true, result.nameFunction, 'Incorrect data or No result', 401, {}, response);
                }
            }
        });
    };
}
