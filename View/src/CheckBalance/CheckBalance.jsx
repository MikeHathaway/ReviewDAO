import React from 'react';
import { Button } from 'react-bootstrap';
import styles from './index.css'

export default function CheckBalance({checkBalance}){

	return (
		<Button
			variant="primary" size="lg" 
			onClick={checkBalance} 
			// className={styles.checkBalance}
		>
			Check Your Token Balance
		</Button>	
	)
}
