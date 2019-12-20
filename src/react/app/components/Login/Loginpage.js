import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import {
  CheckToken,
  loginAPI
} from '../../apis';


class Loginpage extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state={
      email: '',
      password:'',
      emailError: 0,
      passwordError: 0 ,
      token: cookies.get('token')
    };

    this.handleChangeEmail=this.handleChangeEmail.bind(this);
    this.handleChangePass=this.handleChangePass.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleChangeEmail(event) {
    this.setState({email: event.target.value});
    this.setState({emailError:0})
  }

  handleChangePass(event) {
    this.setState({password: event.target.value});
    this.setState({passwordError:0})
  }


  async handleSubmit(event) {
  	event.preventDefault();
    const { cookies } = this.props;
    if(!this.state.email){
    	this.setState({emailError:1})
    }
    if(!this.state.password){
    	this.setState({passwordError:1})
    }
    let checkLogin = await loginAPI({
        email:this.state.email,
        password:this.state.password
      });
    console.log("checkLogin--",checkLogin);
    if(checkLogin.token){
      cookies.set('token', checkLogin.token, { path: '/' });
      cookies.set('email', this.state.email, { path: '/' });
      window.location.href ='/contractimporting';
    }else{
      alert("Vui lòng đăng nhập lại");
      this.setState({emailError:1});
      this.setState({passwordError:1});
    }   
  }

  async componentWillMount(){
    const { cookies } = this.props;
      console.log("--token ",this.state.token);

    if(this.state.token){
      let checkTokenExpired = await  CheckToken(this.state.token);
      if(checkTokenExpired && checkTokenExpired.id){
        window.location.href ='/';
      }
      if(checkTokenExpired && checkTokenExpired.error.status_code === 401){
        cookies.remove('token');
        cookies.remove('email');
      }
    }
  }

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div style={{marginTop:"16px", display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Avatar style={{margin:"8px", backgroundColor: 'red',}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form style={{ width: '100%',marginTop:"8px"}} onSubmit={this.handleSubmit}  noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={this.state.value} 
              onChange={this.handleChangeEmail}
              error={this.state.emailError ===1 ? true : false}
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
              autoComplete="current-password"
              value={this.state.value} 
              onChange={this.handleChangePass}
              error={this.state.passwordError === 1 ? true : false}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"    
              style={{ margin:"24px 0 16px 0 "}}       
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
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
        </Box>
      </Container>
    );
  }
}
export default withCookies(Loginpage);