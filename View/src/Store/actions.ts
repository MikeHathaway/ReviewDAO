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
    return action(CONNECT_CONTRACT, {
        account,
        token
    });
}

export function connectContractSuccess(web3: any, accounts: any, ReviewDAOContract: object) {
    return action(CONNECT_CONTRACT_SUCCESS, {
        web3,
        accounts
    });
}

export function connectContractFailure(error: object) {
    console.error("Contract Connection Errored:", error)
    return action(CONNECT_CONTRACT_FAILURE, {
        error
    });
}