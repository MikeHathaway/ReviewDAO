import React from 'react';
import { Button } from 'react-bootstrap';
import styles from './index.css'

export default function CheckBalance({setAccountInfo}){

	const checkBalance = (address) => {
		return () => {
			console.log("address", address)
			setAccountInfo(address, 10)
		};
	}

	return (
		<Button
			variant="primary" size="lg" 
			onClick={checkBalance("0x2F6aA9462D77CcAACe7959652057Ce186e3076a0")} 
			className={styles.checkBalance}
		>
			Check Your Token Balance
		</Button>	
	)
}
