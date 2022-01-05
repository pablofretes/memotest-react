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
        .min(5, 'Username must contain at least 5 characters')
        .max(20, 'Username must not contain more than 20 characters'),
    password: yup
        .string()
        .required()
        .min(5, 'Password must contain at least 5 characters')
        .max(20, 'Password must not contain more than 20 characters'),
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Password must be the same!')
});

const SignUp = ({ setToken }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [signUp, result] = useMutation(CREATE_USER);

    useEffect(() => {
        if(result.data) {
            const token = result.data.login.value;
            setToken(token);
            localStorage.setItem('memotest-user-token', token);
            navigate('/');
        };
        // eslint-disable-next-line
    }, [result.data, setToken]);

    const onSubmit = async (event) => {
        const username = event.username;
        const password = event.password;

        signUp({ variables: { username: username, password: password } });
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