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
import reviewDAOAbi from "./abi/DappToken.json"

/** 
    Use Web3.js to connect to Ethereum blockchain and store contract instance to state
*/

function getDefaultAccount(web3: any){
    const injectedAccount = window.ethereum.enable().then((account: any) => {
      const defaultAccount = account[0];
      web3.eth.defaultAccount = defaultAccount;
      return defaultAccount
    })
    return Promise.resolve(injectedAccount);
}

function connectContract(web3: any){
    // Contract ABI, Contract Address
    return Promise.resolve(web3.eth.Contract(reviewDAOAbi.abi,'0x83b644E52822EB120b4d68FdAb639e04C9483000'));
}

function* connectWeb3(action: ActionTypes) {
    try {
        const web3 = yield call(getWeb3);
        const account = yield call(getDefaultAccount, web3);
        const ReviewDAOContract = yield call(connectContract, web3);

        yield put(connectWeb3Success(web3, account, ReviewDAOContract));        

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

function getTokenBalanceForAddress(address: string, ReviewDAOContract: any, web3: any) {
  const tokenBalance = ReviewDAOContract.methods.balanceOf(address).call({from: address})
    .then((balance: any) => {
      // console.log("dank balance", web3.utils.fromWei(balance.toNumber(), "ether"))
      return balance.toNumber()
    })
  return Promise.resolve(tokenBalance);
}

// TODO: Figureo out why account has become an action
function* checkBalance(action: ActionTypes) {
    try {
        const web3 = yield select(getWeb3FromState);
        const account = yield select(getAccountFromState);
        const ReviewDAOContract = yield select(getContractFromState);

        const ethBalance = yield call(getBalanceForAddress, account, web3)
        const tokenBalance = yield call(getTokenBalanceForAddress, account, ReviewDAOContract, web3);

        yield put(checkBalanceSuccess(account, tokenBalance));
    } catch (error) {
        yield put(checkBalanceFailure(error));
    }
}


/*
    State selectors
*/
const getWeb3FromState = (state: any) => state.mycurrency.web3;
const getContractFromState = (state: any) => state.mycurrency.ReviewDAOContract;
const getAccountFromState = (state: any) => state.mycurrency.account;


/*
    Root saga that spins up worker sagas to handle contract events
*/
function* rootSaga() {
    const ReviewDAOContract = yield select(getContractFromState);
    const web3 = yield select(getWeb3FromState)

    yield takeEvery("CONNECT_WEB3", connectWeb3);
    yield takeEvery("TRANSFER", transfer, ReviewDAOContract);
    yield takeEvery("CHECK_BALANCE", checkBalance);
}

export default rootSaga;