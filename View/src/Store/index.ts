import { combineReducers, createStore, Dispatch, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import rootSaga from './sagas'
import {
    CHECK_BALANCE_SUCCESS,
    CONNECT_WEB3,
    CONNECT_WEB3_SUCCESS,
} from './actions'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

export type ActionTypes = ActionType<typeof actions>;

export interface IMyCurrency {
    account: string
    token: number
    isLoading: boolean
}

export interface IRootState {
    mycurrency: IMyCurrency
}

// TODO: Modify type schema

export function sharesReducer(state: IMyCurrency = {account: '', token: 0, isLoading: false}, action: ActionTypes): IMyCurrency {
    switch (action.type) {
        case CONNECT_WEB3:
            return { ...state, ...action.payload, isLoading: true };
        case CONNECT_WEB3_SUCCESS:
            return { ...state, ...action.payload, isLoading: false };
        case CHECK_BALANCE_SUCCESS:
            return { ...state, ...action.payload };            
        default:
            return state;
    }
}

const store = createStore<IRootState, any, any, any>(
    combineReducers({
        mycurrency: sharesReducer
    }), 
    applyMiddleware(sagaMiddleware));

// Start the Saga
sagaMiddleware.run(rootSaga)

export default store;