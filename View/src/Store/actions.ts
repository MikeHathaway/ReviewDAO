import { action } from 'typesafe-actions';

// Async Actions for initial connection to the Smart Contract
export const CONNECT_WEB3 = 'CONNECT_WEB3';
export const CONNECT_WEB3_SUCCESS = 'CONNECT_WEB3_SUCCESS';
export const CONNECT_WEB3_FAILURE = 'CONNECT_WEB3_FAILURE';

export const CHECK_BALANCE = 'CHECK_BALANCE';
export const CHECK_BALANCE_SUCCESS = 'CHECK_BALANCE_SUCCESS';
export const CHECK_BALANCE_FAILURE = 'CHECK_BALANCE_FAILURE';

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
    return action(CONNECT_WEB3_FAILURE, {
        error
    });
}

export function checkBalance(account: string) {
    return action(CHECK_BALANCE, {
        account
    });
}

export function checkBalanceSuccess(account: string, token: number) {
    return action(CHECK_BALANCE_SUCCESS, {
        account,
        token
    });
}

export function checkBalanceFailure(error: object) {
    return action(CHECK_BALANCE_FAILURE, {
        error
    });
}