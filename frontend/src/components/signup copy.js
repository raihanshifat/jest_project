  
import React,{useState} from 'react';
import { useHistory } from 'react-router';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import axiosInstance from '../axiosinstance';



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp() {
  const classes = useStyles();
  const [userData,setUserData]=useState({})
  const [errorMessage,setErrorMessage]=useState()
  const history=useHistory()

    const handleChange=(e)=>{
      setUserData((prev)=>({...prev,[e.target.name]:e.target.value}))
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        axiosInstance
        .post(`user/signup`, {
          firstName:userData.firstName,
          lastName:userData.lastName,
          email: userData.email,
          username: userData.email,
          password: userData.password,
        })
        .then((res) => {
          history.push('/login',{"message":"Account is created successfully! Please login to continue"});
          // console.log("this is error message"+res);
          // console.log(res.data);
        })
        .catch((error)=>{
          setErrorMessage(error.response.data.message);
        });
    }


    return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {errorMessage?<Alert severity="error">{errorMessage}</Alert>:<></>}
        
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                data-testid = "firstName"
                autoFocus
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                data-testid = "lastName"
                name="lastName"
                autoComplete="lname"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                data-testid = "email"
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                data-testid = "password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Link to="/login" exact>
                Already have an account? Sign in
              </Link>
        </form>
      </div>
    </Container>
  );
}

export default SignUp