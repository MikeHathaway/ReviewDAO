import { call, put, select } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions';

import {
    checkBalanceSuccess,
    checkBalanceFailure
} from '../actions'

export type ActionTypes = ActionType<typeof checkBalanceSuccess>;


/** 
    State selectors
*/
const getWeb3FromState = (state: any) => state.mycurrency.web3;
const getContractFromState = (state: any) => state.mycurrency.ReviewDAOContract;
const getAccountFromState = (state: any) => state.mycurrency.account;


/** 
    Effects for checking an accounts balance
*/
function getBalanceForAddress(address: string, web3: any) {
    return Promise.resolve(web3.eth.getBalance(address));
}

function getTokenBalanceForAddress(address: string, ReviewDAOContract: any, web3: any) {
  const tokenBalance = ReviewDAOContract.methods.balanceOf(address).call({from: address})
    .then((balance: any) => {
      // console.log("converted balance from BigNumber", web3.utils.fromWei(balance.toNumber(), "ether"))
      return balance.toNumber()
    })
  return Promise.resolve(tokenBalance);
}

export default function* checkBalance(action: ActionTypes) {
    try {
        const web3 = yield select(getWeb3FromState);
        const address = yield select(getAccountFromState);
        const ReviewDAOContract = yield select(getContractFromState);

        const ethBalance = yield call(getBalanceForAddress, address, web3)
        const tokenBalance = yield call(getTokenBalanceForAddress, address, ReviewDAOContract, web3);

        yield put(checkBalanceSuccess(address, tokenBalance));
    } catch (error) {
        yield put(checkBalanceFailure(error));
    }
}