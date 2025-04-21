import _ from "lodash";

export const responseMapper = (response) => {
    return {
        data: _.get(response, "data"),
        status: _.get(response, "status"),
        message: _.get(response, "message"),
        statusText: _.get(response, "statusText"),
    };
};