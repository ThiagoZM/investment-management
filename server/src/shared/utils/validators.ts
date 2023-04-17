import { isIPv4 } from 'net'
import { throwInvalidParamError } from './helpers/throw-helpers';

export const isString = (param: string) => {
    return Object.prototype.toString.call(param) == '[object String]';
}

export const isNumber = (param: number) => {
    return typeof param === 'number';
}

export const isBoolean = (param: boolean) => {
    return typeof param === 'boolean';
}

export const isObject = (param: object) => {
    return typeof param === 'object';
}

export const isArray = (param: Array<any>) => {
    return param.constructor === Array;
}

export const isUUID = (id: string) => {
    return /^([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[0-9a-d][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i
        .test(id);
}

export const isIpv4 = (address: string) => {
    return isIPv4(address) || address == '';
}

export const isNumericString = (param: string) => {
    return /^\d+$/.test(param);
};

export const isIsoDate = (date: string) => {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(date)) return false;
    var d = new Date(date);
    return d.toISOString() === date;
};

export function validateNumberZeroOrHigher(attribute: string, value: any) {
    if (!isNumber(value)) {
        throwInvalidParamError(attribute + ' must be a number');
    }
    if (value < 0) {
        throwInvalidParamError(attribute + ' must be 0 or higher');
    }
    return true;
}

export function validateString(attribute: string, value: any) {
    if (!isString(value)) {
        throwInvalidParamError(attribute + ' must be a string');
    }
    return true;
}

export function validateNumber(attribute: string, value: any) {
    if (!isNumber(value)) {
        throwInvalidParamError(attribute + ' must be a number');
    }
    return true;
}

export function validateBoolean(attribute: string, value: any) {
    if (!isBoolean(value)) {
        throwInvalidParamError(attribute + ' must be a boolean');
    }
    return true;
}

export function validateUuid(attribute: string, value: any) {
    if (!isUUID(value)) {
        throwInvalidParamError(attribute + ' must be a uuid');
    }
    return true;
}

export function validateArray(attribute: string, value: any) {
    if (!isArray(value)) {
        throwInvalidParamError(attribute + ' must be a array');
    }
    return true;
}