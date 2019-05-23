import { Spinner } from 'react-bootstrap';
import React from 'react';

type LoadingProps = {
    isLoading: any
}

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

