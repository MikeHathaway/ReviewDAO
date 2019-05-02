import { action } from 'typesafe-actions';

export const SET_ACCOUNT_INFO = 'SET_ACCOUNT_INFO';

// Async Actions for initial connection to the Smart Contract
export const CONNECT_CONTRACT = 'CONNECT_CONTRACT';
export const CONNECT_CONTRACT_SUCCESS = 'CONNECT_CONTRACT_SUCCESS';
export const CONNECT_CONTRACT_FAILURE = 'CONNECT_CONTRACT_FAILURE';

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