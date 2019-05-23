import React from 'react';
import { Button } from 'react-bootstrap';
import { Action } from '../Store/actions'
// import styles from './index.css'

type CheckBalanceProps = {
	checkBalance: any,
	mintTokens: any
}

export default function CheckBalance({checkBalance, mintTokens}: CheckBalanceProps){

	return (
		<Button
			variant="primary" size="lg" 
			onClick={() => {
				mintTokens()
				checkBalance()
			}} 
			// className={styles.checkBalance}
		>
		{/* Listen for mint contract event */}
			Check Your Token Balance
		</Button>	
	)
}
