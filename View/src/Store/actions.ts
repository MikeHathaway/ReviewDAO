import { action } from 'typesafe-actions';

export const SET_ACCOUNT_INFO = 'SET_ACCOUNT_INFO';

// Async Actions for initial connection to the Smart Contract
export const CONNECT_WEB3 = 'CONNECT_WEB3';
export const CONNECT_WEB3_SUCCESS = 'CONNECT_WEB3_SUCCESS';
export const CONNECT_WEB3_FAILURE = 'CONNECT_WEB3_FAILURE';

export function setAccountInfo(account: string, token: number) {
    return action(SET_ACCOUNT_INFO, {
        account,
        token
    });
}

export function connectWeb3(account: string, token: number) {
    return action(CONNECT_WEB3, {
        account,
        token
    });
}

export function connectWeb3Success(web3: any, accounts: any, ReviewDAOContract: object) {
    return action(CONNECT_WEB3_SUCCESS, {
        web3,
        accounts,
        ReviewDAOContract
    });
}

export function connectWeb3Failure(error: object) {
    console.error("Contract Connection Errored:", error)
    return action(CONNECT_WEB3_FAILURE, {
        error
    });
}