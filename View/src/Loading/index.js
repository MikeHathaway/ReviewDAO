import { Spinner } from 'react-bootstrap';
import React from 'react';

export default function Loading ({isLoading}) {
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

