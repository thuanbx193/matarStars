import React from 'react';
import { withCookies, Cookies } from 'react-cookie';
// import { instanceOf } from 'prop-types';
import PropTypes,{ instanceOf }  from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { 
  ContractImporting,
  ContractManagement

} from '../';

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
        event.preventDefault();
      }}
      {...props}
    />
  );
}

class Homepage extends React.Component {

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
    this.handleChange=this.handleChange.bind(this);

  }
  handleChange = (event, newValue) => {
    this.setState({value:newValue});
  };

  async componentWillMount(){
    const { cookies } = this.props;
    if(this.state.token){
      let checkTokenExpired = await  CheckToken(this.state.token);
      console.log(checkTokenExpired);
      if(checkTokenExpired.error && checkTokenExpired.error.status_code == 401){
        cookies.remove('token');
        cookies.remove('email');
        window.location.href ='/login';
      }
    }else{
      window.location.href ='/login';
    }
  }

  render() {
    const { cookies } = this.props;
    let welcome = "Welcome  "+cookies.get('email');
    return (
      <div style={{lexGrow: 1,backgroundColor: "#ffffff"}}>
        <AppBar position="static">
          <Tabs
            variant="fullWidth"
            value={this.state.value}
            onChange={this.handleChange}
            aria-label="nav tabs example"
          >
            <LinkTab label="Contract Importing"  {...a11yProps(0)} />
            <LinkTab label="Contract Management " {...a11yProps(1)} />
            <LinkTab label="QR Management" {...a11yProps(2)} />
            <LinkTab label={welcome}     {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.value} index={0}>
          <ContractImporting/>
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          <ContractManagement/>
        </TabPanel>
        <TabPanel value={this.state.value} index={2}>
          Page Three
        </TabPanel>
      </div>
    );
  }
}

export default withCookies(Homepage);