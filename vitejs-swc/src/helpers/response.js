import * as MSG from '@/constants/msg';
import { HttpStatusCode } from 'axios';

export class ResponseHelper {
    #status = HttpStatusCode.Ok;
    #message;
    #code;

    /**
     * Constructs a new instance of the ResponseHelper class.
     * If a JSON object is provided, its properties are assigned to the instance.
     * 
     * @param {Object} json - An optional JSON object containing properties to initialize the instance.
     */
    constructor(json) {
        if (json) {
            Object.assign(this, json);
        }
    };

    /**
     * 500
     * @returns 
     */
    static InternalServerError = () => {
        return new ResponseHelper({
            message: MSG.MSG_INTERNAL_SERVER_ERROR,
            status: HttpStatusCode.InternalServerError,
            statusText: "Internal Server Error",
        });
    };

    /**
     * 401
     * @param {*} message 
     * @param {*} code 
     * @returns 
     */
    static UnAuthorized = (message, code) => {
        return new ResponseHelper({
            message,
            status: HttpStatusCode.Unauthorized,
            statusText: "Unauthorized",
        });
    };

    /**
     * 404
     * @param {*} message 
     * @param {*} code 
     * @returns 
     */
    static NotFound = (message, code) => {
        return new ResponseHelper({
            message,
            status: HttpStatusCode.NotFound,
            statusText: "Not Found",
        });
    };

    /**
     * 400
     * @param {*} message 
     * @param {*} code 
     * @returns 
     */
    static BadRequest = (message, code) => {
        return new ResponseHelper({
            message,
            status: HttpStatusCode.BadRequest,
            statusText: "Bad Request",
        });
    };

    /**
     * 403
     * @param {*} message 
     * @param {*} code 
     * @returns 
     */
    static Forbidden = (message, code) => {
        return new ResponseHelper({
            message,
            status: HttpStatusCode.Forbidden,
            statusText: "Forbidden",
        });
    };

    /**
     * 409
     * @param {*} message 
     * @param {*} code 
     * @returns 
     */
    static Conflict = (message, code) => {
        return new ResponseHelper({
            message,
            status: HttpStatusCode.Conflict,
            statusText: "Conflict",
        });
    };

    /**
     * 405
     * @param {*} message 
     * @param {*} code 
     * @returns 
     */
    static MethodNotAllowed = (message, code) => {
        return new ResponseHelper({
            message,
            status: HttpStatusCode.MethodNotAllowed,
            statusText: "Method Not Allowed",
        });
    };

    /**
     * 415
     * @param {*} message 
     * @param {*} code 
     * @returns 
     */
    static UnsupportedMediaType = (message, code) => {
        return new ResponseHelper({
            message,
            status: HttpStatusCode.UnsupportedMediaType,
            statusText: "Unsupported Media Type",
        });
    };

    /**
     * 429
     * @param {*} message 
     * @param {*} code 
     * @returns 
     */
    static TooManyRequest = (message, code) => {
        return new ResponseHelper({
            message,
            status: HttpStatusCode.TooManyRequests,
            statusText: "Too Many Requests",
        });
    };

    /**
     * 422
     * @param {*} message 
     * @param {*} code 
     * @returns 
     */
    static UnprocessableEntity = (message, code) => {
        return new ResponseHelper({
            message,
            status: HttpStatusCode.Forbidden,
            statusText: "Unprocessable Entity",
        });
    };

    /**
     * 200
     * @param {*} message 
     * @param {*} code 
     * @returns 
     */
    static Oke = (message, code) => {
        return new ResponseHelper({
            message,
            status: HttpStatusCode.Ok,
            statusText: "OK",
        });
    };

    static NoContent = (message, code) => {
        return new ResponseHelper({
            message,
            status: HttpStatusCode.NoContent,
            statusText: "No Content",
        });
    };

    static HttpException = (problem) => {
        console.log(problem);
        throw new HttpException(
            {
                message: problem.message,
                code: problem.code
            },
            problem.status,
        );
    };
};