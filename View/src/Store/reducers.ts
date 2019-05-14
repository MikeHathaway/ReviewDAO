import {
    ActionTypes,
    CHECK_BALANCE_SUCCESS,
    CONNECT_WEB3,
    CONNECT_WEB3_SUCCESS
} from './actions'

export interface IReviewCoin {
    account: string
    token: number
    isLoading: boolean
}

export function web3Reducer(state: IReviewCoin = {account: '', token: 0, isLoading: false}, action: ActionTypes): IReviewCoin {
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