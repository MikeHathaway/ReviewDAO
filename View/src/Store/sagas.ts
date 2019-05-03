import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions';

import {
    connectWeb3Success,
    connectWeb3Failure
} from './actions'
import getWeb3 from './getWeb3';

export type ActionTypes = ActionType<typeof connectWeb3Success>;

// Import ABI from compiled smart contracts
import reviewDAOAbi from "./abi/DappToken.json"

// https://ethereum.stackexchange.com/questions/60546/using-web3-js-in-a-react-redux-saga-app-uncaught-at-check-call-error

function getDefaultAccount(web3: any){
    return Promise.resolve(web3.eth.getAccounts());
}

function connectContract(web3: any){
    console.log("connecting to contract")
    return Promise.resolve(web3.eth.Contract(reviewDAOAbi,'0x2F6aA9462D77CcAACe7959652057Ce186e3076a0'))
}


// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* connectWeb3(action: ActionTypes) {
    try {

        const web3 = yield call(getWeb3);
        const accounts = yield call(getDefaultAccount, web3);
        const ReviewDAOContract = yield call(connectContract, web3);

        console.log("Retreived information", ReviewDAOContract, accounts)
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