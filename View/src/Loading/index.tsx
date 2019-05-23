import { Spinner } from 'react-bootstrap';
import React from 'react';
import styled from 'styled-components'

type LoadingProps = {
    isLoading: any
}

interface ILoadingSpinner {
	Loading?: boolean
  }

const Button = styled.div<ILoadingSpinner>`
	background: transparent;
	border-radius: 3px;
	border: 2px solid palevioletred;
	color: palevioletred;
	margin: 0.5em 1em;
	padding: 0.25em 1em;

        ${(props: any) => !props.loading`
        background: palevioletred;
        color: white;
    `}
  `

export default function Loading ({isLoading}: LoadingProps) {
    if (isLoading){
        return (
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        )
    }
    else {
        return null;
    }
}

