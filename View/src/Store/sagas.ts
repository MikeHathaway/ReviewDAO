import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import Web3 from "web3";

import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type ActionTypes = ActionType<typeof actions>;

const abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"standard","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"","type":"address"},{"name":"","type":"address"},{"name":"_symbol","type":"string"}],"payable":false,"stateMutability":"view","type":"function","constant":true,"name":"allowance","outputs":[{"name":"","type":"uint256"}]},{"anonymous":false,"inputs":[{"indexed":true,"name":"_initialSupply","type":"uint256"},{"indexed":true,"name":"_name","type":"string"},{"indexed":false,"name":"_symbol","type":"string"}],"name":"Transfer","type":"constructor","payable":false,"stateMutability":"nonpayable"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":false,"inputs":[{"name":"_owner","type":"address","indexed":true},{"name":"_spender","type":"address","indexed":true},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"event","anonymous":false},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* connectContract(action: ActionTypes) {
    try {

        let web3;
        if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
        } 
        else {
            // set the provider you want from Web3.providers
            web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        }

        web3.eth.defaultAccount = web3.eth.accounts[0];

        const ReviewDAOContract = web3.eth.Contract(abi,'0x2F6aA9462D77CcAACe7959652057Ce186e3076a0');

        // this is a suboptimal place to connect web3. Lifecycle is different on Chrome, and global will not be defined on mount.
        // global.web3 = web3;

    //   const user = yield call(Api.fetchUser, action.payload.userId);
    //   yield put({type: "CONNECT_CONTRACT_SUCCESS", web3});
    } catch (e) {
        yield put({type: "CONNECT_CONTRACT_FAILURE", message: e.message});
    }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* mySaga() {
  yield takeEvery("CONNECT_CONTRACT", connectContract);
}

export default mySaga;