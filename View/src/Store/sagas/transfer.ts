import { call, put, select } from 'redux-saga/effects'

import {
    ActionTypes,
    transferTokenSuccess,
    transferTokenFailure
} from '../actions';

import {
    getAccountFromState,
    getContractFromState
} from '../selectors'

/** 
    Effects for sending a token transaction
*/
function approveTransaction(account: string, ReviewDAOContract: any){
    return Promise.resolve(ReviewDAOContract.methods.approve(account).call({}))
}

export default function* transfer(action: ActionTypes) {
    try {
        const account = yield select(getAccountFromState);
        const ReviewDAOContract = yield select(getContractFromState);

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