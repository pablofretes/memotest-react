import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { isEmpty } from '../utils/helper_functions';

const Notification = ({ notification }) => {

    if(isEmpty(notification)){
        return null;
    };

    return(
        <div>
            {notification.success ? (
                <Alert severity='success'>{notification.message}</Alert>
            ) : (
                <Alert severity='error'>{notification.message}</Alert>
            )}
        </div>
    );
};

export default Notification;