import React, { useEffect } from 'react';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { Button, makeStyles, Paper } from '@material-ui/core';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import TextField from './TextField';
import { CREATE_USER } from '../mutations';
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
    signUp: {
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
        .min(4, 'Username must contain at least 4 characters')
        .max(20, 'Username must not contain more than 20 characters'),
    password: yup
        .string()
        .required()
        .min(4, 'Password must contain at least 4 characters')
        .max(20, 'Password must not contain more than 20 characters'),
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Password must be the same!')
});

const SignUp = ({ setNotification }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [signUp, result] = useMutation(CREATE_USER);

    useEffect(() => {
        if(result.data) {
            const notification = {
                message: 'You have successfully created your account!',
                success: true,
            };
            setNotification(notification);
            setTimeout(() => {
                setNotification({});
            }, 5000);
            navigate('/');
        };
        // eslint-disable-next-line
    }, [result.data]);

    const onSubmit = async (event) => {
        const username = event.username;
        const password = event.password;

        try {
            await signUp({ variables: { username: username, password: password } });
        } catch (error) {
            const notification = {
                message: 'There was an error creating your account',
                success: false,
            };
            console.log(error);
            setNotification(notification);
            setTimeout(() => {
                setNotification({});
            }, 5000);
            return null;
        }
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Formik
                    initialValues={{
                        username:'',
                        password:'',
                        passwordConfirmation: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
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
                        <Field
                            label="Password Confirmation"
                            placeholder="Password Confirmation"
                            name="passwordConfirmation"
                            component={TextField}
                            type="password"
                        />
                        <div className={classes.error}>
                            <ErrorMessage name="passwordConfirmation" />
                        </div>
                        <Button
                            className={classes.signUp}
                            type="submit"
                            data-cy="button-signUp"
                        >
                            Sign Up
                        </Button>
                    </Form>
                </Formik>
            </Paper>
        </div>
    );
};

export default SignUp;