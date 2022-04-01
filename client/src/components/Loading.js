import React from 'react';
import { Spinner } from 'reactstrap';

export const Loading = () => {
    return (
        <div className="col-12 text-center">
            <Spinner style={{ width: '20vw', height: '20vw' }} size='lg' color="info" />
        </div>
    )
}