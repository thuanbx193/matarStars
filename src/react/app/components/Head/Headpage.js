import React from 'react';
import { withCookies, Cookies } from 'react-cookie';
// import { instanceOf } from 'prop-types';
import PropTypes,{ instanceOf }  from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// import { 
//   ContractImporting,
//   ContractManagement

// } from '../';

import {CheckToken} from '../../apis';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        window.location.href =props.href;
        event.preventDefault();
      }}
      {...props}
    />
  );
}

class Headpage extends React.Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  
  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      token: cookies.get('token'),
      value: 0
    };

  }

  async componentWillMount(){
    let pathName = window.location.pathname;
    switch(pathName) {
      case "/contractimporting":
        this.setState({value:0})
        break;
      case "/contractdetai":
        this.setState({value:1})
        break
      case "/contractmanagement":
        this.setState({value:1})
        break
      case "/contractmanagementdetai":
        this.setState({value:1})
        break
      case "/qrmanagement":
        this.setState({value:2})
        break
      case "/qrmanagementdetai":
        this.setState({value:2})
        break
      default:
        // code block
    }
    if(pathName !=='/login'){
       const { cookies } = this.props;
      if(this.state.token){
        let checkTokenExpired = await  CheckToken(this.state.token);
        console.log(checkTokenExpired);
        if(checkTokenExpired.error && checkTokenExpired.error.status_code === 401){
          cookies.remove('token');
          cookies.remove('email');
          window.location.href ='/login';
        }
      }else{
        window.location.href ='/login';
      }
    }   
  }

  render() {
    const { cookies } = this.props;
    let welcome = "Welcome  "+cookies.get('email');
    let pathName = window.location.pathname;
    return (
      <div>
      { pathName !=="/login" ?
        <div style={{lexGrow: 1,backgroundColor: "#ffffff"}}>
          <AppBar position="static">
            <Tabs
              variant="fullWidth"
              value={this.state.value}
              aria-label="nav tabs example"
            >
              <LinkTab label="Contract Importing" href="/contractimporting"   {...a11yProps(0)} />
              <LinkTab label="Contract Management "  href="/contractmanagement"  {...a11yProps(1)} />
              <LinkTab label="QR Management" href="/qrmanagement"  {...a11yProps(2)} />
              <LinkTab disabled label={welcome}/>
            </Tabs>
          </AppBar>
        </div>
        : ""        
      }
      </div>
    );
  }
}

export default withCookies(Headpage);