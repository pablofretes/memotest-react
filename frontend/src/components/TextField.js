import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  inputs: {
      margin: 10,
      borderRadius: 5,
      padding: 15,
      height: 50,
      width: 300,
      alignSelf: 'center',
      borderColor: 'black',
      borderWidth: 1
  },
}));

const TextField = ({ field, placeholder, type }) => {
  const classes = useStyles();
  return (
    <input className={classes.inputs} placeholder={placeholder} type={type} {...field} />
  );
};

export default TextField;