import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions';

import {
    connectWeb3Success,
    connectWeb3Failure
} from './actions'
import getWeb3 from './getWeb3';

export type ActionTypes = ActionType<typeof connectWeb3Success>;

// Import ABI from compiled smart contracts
// import reviewDAOAbi from "./abi/DappToken.json"
const abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"standard","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"","type":"address"},{"name":"","type":"address"},{"name":"_symbol","type":"string"}],"payable":false,"stateMutability":"view","type":"function","constant":true,"name":"allowance","outputs":[{"name":"","type":"uint256"}]},{"anonymous":false,"inputs":[{"indexed":true,"name":"_initialSupply","type":"uint256"},{"indexed":true,"name":"_name","type":"string"},{"indexed":false,"name":"_symbol","type":"string"}],"name":"Transfer","type":"constructor","payable":false,"stateMutability":"nonpayable"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":false,"inputs":[{"name":"_owner","type":"address","indexed":true},{"name":"_spender","type":"address","indexed":true},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"event","anonymous":false},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]
// https://ethereum.stackexchange.com/questions/60546/using-web3-js-in-a-react-redux-saga-app-uncaught-at-check-call-error

function getDefaultAccount(web3: any){
    return Promise.resolve(web3.eth.getAccounts());
}

function connectContract(web3: any){
    return Promise.resolve(web3.eth.Contract(abi,'0xe7c5595A9c65Dc3A60F7b82031Fc24aabB28c6f0'));
}

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* connectWeb3(action: ActionTypes) {
    try {

        const web3 = yield call(getWeb3);
        const accounts = yield call(getDefaultAccount, web3);
        const ReviewDAOContract = yield call(connectContract, web3);

        // Add this as a saga listening in on transfer events being dispatched from the UI
        // Promise
        console.log(ReviewDAOContract.methods.approve())

        yield put(connectWeb3Success(web3, accounts, ReviewDAOContract));        

    } catch (e) {
        yield put(connectWeb3Failure(e));
    }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* mySaga() {
    yield takeEvery("CONNECT_WEB3", connectWeb3);
}

export default mySaga;