import { combineReducers, createStore, Dispatch, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import mySaga from './sagas'
// import * as web3client from './web3client';
import {
    SET_ACCOUNT_INFO,
    CONNECT_CONTRACT,
    connectContractSuccess
} from './actions'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

export type ActionTypes = ActionType<typeof actions>;

export interface IMyCurrency {
    account: string
    token: number
}

export interface IRootState {
    mycurrency: IMyCurrency
}

// TODO: Modify type schema
// TODO: Add reducer for handling CONNECT_CONTRACT_SUCCESS

export function sharesReducer(state: IMyCurrency = {account: '', token: 0}, action: ActionTypes): IMyCurrency {

    switch (action.type) {
        case SET_ACCOUNT_INFO:
            return { ...state, ...action.payload };
        // case CONNECT_CONTRACT:
        //     return { ...state, ...action.payload, isLoading: true};
        // case CONNECT_CONTRACT_SUCCESS:
        //     connectContractSuccess()
        //     return { ...state, isLoading: false } 
            default:
                return state;
        }
}

// export async function loadAccountInfo(dispatch: Dispatch<ActionTypes>) {

//     const account = web3client.getAccount();

//     const token = await web3client.getToken(account);

//     dispatch(actions.setAccountInfo(account, token));

// }

// export async function transferToken(dispatch: Dispatch<ActionTypes>, to: string, amount: number) {

//     await web3client.transferToken(amount, to);

//     await loadAccountInfo(dispatch);

// }

const store = createStore<IRootState, any, any, any>(
    combineReducers({
        mycurrency: sharesReducer
    }), 
    applyMiddleware(sagaMiddleware));

// Start the Saga
sagaMiddleware.run(mySaga)

export default store;