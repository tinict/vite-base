"use strict";

import { responseMapper } from "@/mappers/response-mapper";
import { ResponseHelper } from "@/helpers/response";

export const handleApiResponse = (response) => {
    const { status } = response;

    const statusHandlers = {
        200: ResponseHelper.Oke(),
        500: ResponseHelper.InternalServerError(),
        401: ResponseHelper.UnAuthorized(),
        404: ResponseHelper.NotFound(),
        400: ResponseHelper.BadRequest(),
        403: ResponseHelper.Forbidden(),
        409: ResponseHelper.Conflict(),
        405: ResponseHelper.MethodNotAllowed(),
        415: ResponseHelper.UnsupportedMediaType(),
        429: ResponseHelper.TooManyRequest(),
        422: ResponseHelper.UnprocessableEntity(),
        204: ResponseHelper.NoContent(),
    };

    const handler = statusHandlers[status];
    if (!handler) {
        throw new Error(`Unexpected status code: ${status}`);
    }

    return responseMapper({
        ...response,
        ...handler,
    });
};
