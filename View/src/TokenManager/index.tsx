import React from 'react';
import { Action } from 'typesafe-actions';

import SendTransaction from './SendTransaction/SendTransaction'
import CheckBalance from './CheckBalance/CheckBalance';
import Loading from '../Loading/index'
import Header from './Header/index'

type TokenManagerProps = {
    mycurrency: {
      isLoading: boolean,
      token: Number
    },
    checkBalance: Action,
    transferToken: Action,
    mintTokens: Action
  }
  
export default function TokenManager(props: TokenManagerProps) {
    const {
        mycurrency,
        mycurrency: {
        isLoading
        },
        checkBalance,
        transferToken,
        mintTokens
    } = props;

    return (
        <div>
            <Loading isLoading={isLoading} />
            <Header mycurrency={mycurrency} />
            <CheckBalance checkBalance={checkBalance} mintTokens={mintTokens} />
            <SendTransaction transferToken={transferToken} />
        </div>
    )
}