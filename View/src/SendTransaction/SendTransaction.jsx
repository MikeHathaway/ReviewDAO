import React from 'react';
import styles from './index.css'

export default function SendTransaction({transferToken}){

	return (
        <form>
            Address to send to: <input type="text"/>
            <input type="submit" value="Submit" />
        </form>
	)
}
