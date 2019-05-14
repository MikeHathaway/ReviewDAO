import { call, put, select } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions';

import {
    mintTokensSuccess,
    mintTokensFailure
} from '../actions'

export type ActionTypes = ActionType<typeof mintTokensSuccess>;


/*
    State selectors
*/
const getWeb3FromState = (state: any) => state.mycurrency.web3;
const getContractFromState = (state: any) => state.mycurrency.ReviewDAOContract;
const getAccountFromState = (state: any) => state.mycurrency.account;


/** 
    Add tokens to users address
*/
function addMinter(address: string, ReviewDAOContract: any) {

}

function mint(account: string, ReviewDAOContract: any) {
    const tokensToMint = 10
    // TODO: Call mint function from MinterRole
    const mintPromise = ReviewDAOContract.methods.mint(account, tokensToMint).call({from: account})
      .then((mintStatus: boolean) => {
        console.log("Token Minting Successful")
        return tokensToMint;
      })
      .catch((error: Error) => {
        console.error("You do not have permission to mint tokens")
        return error;
      });
    return Promise.resolve(mintPromise);
  }
  
  export default function* mintTokens(action: ActionTypes) {
    try {
      const account = yield select(getAccountFromState);
      const ReviewDAOContract = yield select(getContractFromState);
  
      console.log("mint parameters", account, ReviewDAOContract);
      const mintedTokens = yield call(mint, account, ReviewDAOContract);
  
      console.log("minted tokens: ", mintedTokens)
      yield put(mintTokensSuccess(mintedTokens));
    } catch (error) {
      yield put(mintTokensFailure(error));
    }
  }