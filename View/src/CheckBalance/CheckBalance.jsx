import React from 'react';
import { Button } from 'react-bootstrap';
import style from './index.css'

export default function CheckBalance(props){

	const checkBalance = (address) => {
		return ()=>{};
	}

	return (
		<Button 
			onTap={checkBalance(props.address)} 
			className={style.checkBalance}
		>
		Check Your Token Balance
		</Button>	
	)
}
