import { call, put, takeEvery, select } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions';

import {
    connectWeb3Success,
    connectWeb3Failure,
    transferTokenSuccess,
    transferTokenFailure,
    checkBalanceSuccess,
    checkBalanceFailure
} from './actions'
import getWeb3 from './getWeb3';

export type ActionTypes = ActionType<typeof connectWeb3Success>;

// Import ABI from compiled smart contracts
// import reviewDAOAbi from "./abi/DappToken.json"
const abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"standard","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"","type":"address"},{"name":"","type":"address"},{"name":"_symbol","type":"string"}],"payable":false,"stateMutability":"view","type":"function","constant":true,"name":"allowance","outputs":[{"name":"","type":"uint256"}]},{"anonymous":false,"inputs":[{"indexed":true,"name":"_initialSupply","type":"uint256"},{"indexed":true,"name":"_name","type":"string"},{"indexed":false,"name":"_symbol","type":"string"}],"name":"Transfer","type":"constructor","payable":false,"stateMutability":"nonpayable"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":false,"inputs":[{"name":"_owner","type":"address","indexed":true},{"name":"_spender","type":"address","indexed":true},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"event","anonymous":false},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]


/** 
    Use Web3.js to connect to Ethereum blockchain and store contract instance to state
*/
// getAccounts() is returning the set of addresses associated with Ganache node
// https://github.com/MetaMask/metamask-extension/issues/3488
function getDefaultAccount(web3: any){
    console.log("get default account", web3.eth.accounts)
    return Promise.resolve(web3.eth.getAccounts());
}

function connectContract(web3: any){
    return Promise.resolve(web3.eth.Contract(abi,'0xb29a99641977E39A90aF9d2bD0cC877801Fa0B74'));
}

function* connectWeb3(action: ActionTypes) {
    try {
        const web3 = yield call(getWeb3);
        const accounts = yield call(getDefaultAccount, web3);
        const ReviewDAOContract = yield call(connectContract, web3);

        // TODO: Initialize main account to be used to state
        yield put(connectWeb3Success(web3, accounts, ReviewDAOContract));        

    } catch (error) {
        yield put(connectWeb3Failure(error));
    }
}


/** 
    Effects for sending a token transaction
*/
function approveTransaction(account: string, ReviewDAOContract: any){
    return Promise.resolve(ReviewDAOContract.methods.approve(account).call({}))
}

function* transfer(action: ActionTypes, ReviewDAOContract: any) {
    try {
        const account = yield select(getAccountFromState);

        // Token transfers require approval prior to sending the transaction
        const isApproved = yield call(approveTransaction, account, ReviewDAOContract);
        console.log(isApproved)

        if(isApproved) {
            const sendTransaction = yield call(approveTransaction, account, ReviewDAOContract);
            yield put(transferTokenSuccess());
        }

    } catch (error) {
        yield put(transferTokenFailure(error));
    }
}


/** 
    Effects for checking an accounts balance
*/
function getBalanceForAddress(address: string, web3: any) {
    return Promise.resolve(web3.eth.getBalance(address));
}

// TODO: Figureo out why account has become an action
function* checkBalance(action: ActionTypes, web3: any) {
    try {
        const account = yield select(getAccountFromState);
        const balance = yield call(getBalanceForAddress, account, web3)

        yield put(checkBalanceSuccess(account.payload.account, balance));
    } catch (error) {
        yield put(checkBalanceFailure(error));
    }
}


/*
    Root saga that spins up worker sagas to handle contract events
*/
const getWeb3FromState = (state: any) => state.web3;
const getContractFromState = (state: any) => state.mycurrency.ReviewDAOContract;
const getAccountFromState = (state: any) => {
    console.log("getAccountFromState", state, state.mycurrency, state.mycurrency.account)
    return state.mycurrency.account;
}

function* rootSaga() {
    const ReviewDAOContract = yield select(getContractFromState);
    const web3 = yield select(getWeb3FromState)

    yield takeEvery("CONNECT_WEB3", connectWeb3);
    yield takeEvery("TRANSFER", transfer, ReviewDAOContract);
    yield takeEvery("CHECK_BALANCE", checkBalance, web3);
}

export default rootSaga;