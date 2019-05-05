import React from 'react';
import { Button } from 'react-bootstrap';
import styles from './index.css'

export default function CheckBalance({checkBalance}){

	const checkAddressBalance = (address) => {
		return () => {
			console.log("address", address)
			checkBalance(address)
		};
	}

	return (
		<Button
			variant="primary" size="lg" 
			onClick={checkAddressBalance("0x2F6aA9462D77CcAACe7959652057Ce186e3076a0")} 
			className={styles.checkBalance}
		>
			Check Your Token Balance
		</Button>	
	)
}
