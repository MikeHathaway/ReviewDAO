import { action } from 'typesafe-actions';

export const SET_ACCOUNT_INFO = 'SET_ACCOUNT_INFO';
export const CONNECT_CONTRACT = 'CONNECT_CONTRACT';
export const CONNECT_CONTRACT_SUCCESS = 'CONNECT_CONTRACT_SUCCESS';

export function setAccountInfo(account: string, token: number) {

    return action(SET_ACCOUNT_INFO, {
        account,
        token
    });

}

export function connectContract(account: string, token: number) {

    return action(SET_ACCOUNT_INFO, {
        account,
        token
    });

}

export function connectContractSuccess(account: string, token: number) {

    return action(SET_ACCOUNT_INFO, {
        account,
        token
    });

}