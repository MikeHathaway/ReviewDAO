import { call, put, takeEvery, select } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions';

import {
    connectWeb3Success,
    connectWeb3Failure,
    checkBalanceSuccess,
    checkBalanceFailure
} from './actions'
import getWeb3 from './getWeb3';

export type ActionTypes = ActionType<typeof connectWeb3Success>;

// Import ABI from compiled smart contracts
// import reviewDAOAbi from "./abi/DappToken.json"
const abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"standard","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"","type":"address"},{"name":"","type":"address"},{"name":"_symbol","type":"string"}],"payable":false,"stateMutability":"view","type":"function","constant":true,"name":"allowance","outputs":[{"name":"","type":"uint256"}]},{"anonymous":false,"inputs":[{"indexed":true,"name":"_initialSupply","type":"uint256"},{"indexed":true,"name":"_name","type":"string"},{"indexed":false,"name":"_symbol","type":"string"}],"name":"Transfer","type":"constructor","payable":false,"stateMutability":"nonpayable"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":false,"inputs":[{"name":"_owner","type":"address","indexed":true},{"name":"_spender","type":"address","indexed":true},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"event","anonymous":false},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]

function getDefaultAccount(web3: any){
    return Promise.resolve(web3.eth.getAccounts());
}

function connectContract(web3: any){
    return Promise.resolve(web3.eth.Contract(abi,'0xb29a99641977E39A90aF9d2bD0cC877801Fa0B74'));
}

const getContractFromState = (state: any) => state.ReviewDAOContract;
const getAccountFromState = (state: any) => state.account;

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* connectWeb3(action: ActionTypes) {
    try {
        const web3 = yield call(getWeb3);
        const accounts = yield call(getDefaultAccount, web3);
        const ReviewDAOContract = yield call(connectContract, web3);

        yield put(connectWeb3Success(web3, accounts, ReviewDAOContract));        

    } catch (error) {
        yield put(connectWeb3Failure(error));
    }
}

function* checkBalance(action: ActionTypes, ReviewDAOContract: any, account: any) {
    try {
        //ReviewDAOContract.methods.approve()
        yield put(checkBalanceSuccess(account, 123));
    } catch (error) {
        yield put(checkBalanceFailure(error));
    }
}

function* transfer(action: ActionTypes, ReviewDAOContract: any) {
    try {
        yield;
    } catch (error) {
        yield;
    }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* rootSaga() {
    const ReviewDAOContract = yield select(getContractFromState);
    const account = yield select(getAccountFromState);

    yield takeEvery("CONNECT_WEB3", connectWeb3);
    yield takeEvery("CHECK_BALANCE", checkBalance, ReviewDAOContract, account);
    yield takeEvery("TRANSFER", transfer, ReviewDAOContract);
}

export default rootSaga;