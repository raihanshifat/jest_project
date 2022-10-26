
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import React,{useState,useEffect} from 'react';
import { useLocation,useParams } from 'react-router';
import { useHistory } from 'react-router-dom'
import axiosInstance from '../axiosinstance';
import {CredentialType} from '../interface/commonInterfaces';



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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [userData,setUserData]=useState<CredentialType>({
    email:"",
    password:""
  })
  const [historyData,setHistoryData]=useState<string>()
  const [errorMessage,setErrorMessage]=useState<string>()
  const location:any=useLocation<Location>()
  const history:any=useHistory()

  useEffect(()=>{
    try{
      setHistoryData(location.state.message)
    }
    catch{
    }
    
  })
  const handleChange = (e:any) => {
		setUserData({
			...userData,
			[e.target.name]: e.target.value.trim(),
		});
	};

	const handleSubmit = (e:any) => {
		e.preventDefault();
		

		axiosInstance
			.post(`user/token/access`, {
				username: userData.email,
				password: userData.password,
			})
			.then((res) => {
				localStorage.setItem('access_token', res.data.access);
				localStorage.setItem('refresh_token', res.data.refresh);
				axiosInstance.defaults.headers['Authorization'] =
					'JWT ' + localStorage.getItem('access_token');
				history.push('/');
				//console.log(res);
				//console.log(res.data);
			}).catch((err)=>{
        setErrorMessage("Invalid Credentials")
        console.log(err)
      });
	};

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <h4 style={{color:"green"}}>{historyData}</h4>
        <p style={{color:"red"}}>{errorMessage}</p>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            data-testid = "email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            data-testid = "password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}