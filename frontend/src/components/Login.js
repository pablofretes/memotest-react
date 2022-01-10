import React, { useEffect } from 'react';
import TextField from './TextField';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { Button, makeStyles, Paper } from '@material-ui/core';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { LOG_IN } from '../mutations';
import { useMutation } from '@apollo/client';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 100,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundColor: '#ADD8E6',
        flexDirection: 'row',
        flexWrap: 'nowrap',
    },
    logIn: {
        backgroundColor: '#189ab4',
        alignSelf: 'center',
        borderRadius: 5,
        padding: 8,
        height: 50,
        width: 300,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        margin: 10
    },
    error: {
        fontFamily: 'Roboto, monospace',
        fontWeight: 'bold',
        fontSize: 14,
        color: 'red'
    },
}));

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required()
        .min(5, 'Username must contain at least 4 characters'),
    password: yup
        .string()
        .required()
        .min(5, 'Username must contain at least 4 characters'),
});

const Login = ({ setToken, setNotification }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [login, result] = useMutation(LOG_IN);

    useEffect(() => {
        if(result.data) {
            const token = result.data.login.value;
            setToken(token);
            localStorage.setItem('memotest-user-token', token);
            const notification = {
                message: 'You have successfully logged-in!',
                success: true,
            };
            setNotification(notification);
            setTimeout(() => {
                setNotification({});
            }, 5000);
            navigate('/');
        };
        // eslint-disable-next-line
    }, [result.data, setToken]);

    const onSubmit = async (event) => {
        const username = event.username;
        const password = event.password;

        try {
            await login({ variables: { username, password } });
        } catch (error) {
            const notification = {
                message: 'There was an error logging into your account',
                success: false,
            };
            setNotification(notification);
            setTimeout(() => {
                setNotification({});
            }, 5000);
            return null;
        }
    };

    return(
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Formik
                    initialValues={{
                        username:'',
                        password:'',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    style={{backgroundColor: '#222222'}}
                >
                    <Form>
                        <Field
                            label="Username"
                            placeholder="Username"
                            name="username"
                            component={TextField}
                        />
                        <div className={classes.error}>
                            <ErrorMessage name="username" />
                        </div>
                        <Field
                            label="Password"
                            placeholder="Password"
                            name="password"
                            component={TextField}
                            type="password"
                        />
                        <div className={classes.error}>
                            <ErrorMessage name="password" />
                        </div>
                        <Button
                            className={classes.logIn}
                            type="submit"
                            data-cy="login-form-button"
                        >
                            Log In
                        </Button>
                    </Form>
                </Formik>
            </Paper>
        </div>
        
    );
};

export default Login;