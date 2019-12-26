import React from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import Container from '@material-ui/core/Container';
import {
  Typography,
  Grid,
  TextField,
  Button
} from '@material-ui/core';

import {
  updateDriverByEmail,
  findDriver
}         from '../../apis';

class DriverManagementDetai extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state={
      token: cookies.get('token'),
      email:props.match.params.email,
      data:{},
    };
    this.handleUpdate=this.handleUpdate.bind(this);
    
  }



  async handleUpdate(){
    let data = this.state.data;
    data.driver_email = this.state.email
    let updateDriver = await updateDriverByEmail(data);
    console.log('updateDriver',updateDriver);
    if(updateDriver.status ===200){
      alert(updateDriver.message);
      window.location.href = "/drivermanagement";
    }

  }  

  handleChangeNameDriver =(event) =>{
    let data  = this.state.data;
    data.ho_va_ten = event.target.value
    this.setState({data: data});
  }

  handleChangeSdtDriver =(event) =>{
    let data  = this.state.data;
    data.so_dien_thoai = event.target.value
    this.setState({data: data});
  }

  handleChangeCmtDriver =(event) =>{
    let data  = this.state.data;
    data.so_cmt = event.target.value
    this.setState({data: data});
  }

  handleChangeFullPart =(event) =>{
    let data  = this.state.data;
    data.full_part = event.target.value
    this.setState({data: data});
  }

  handleChangeAddressDriver =(event) =>{
    let data  = this.state.data;
    data.dia_chi = event.target.value
    this.setState({data: data});
  }

  handleChangePTDK =(event) =>{
    let data  = this.state.data;
    data.phuong_tien_dieu_khien = event.target.value
    this.setState({data: data});
  }

  async componentWillMount(){
    let data = {driver_email: this.state.email}  
    let findDriverEmail = await findDriver(data);
    console.log(findDriverEmail);
    if(!findDriverEmail.status){
      this.setState({data:findDriverEmail});
    }
  }

  render() {
    return (
      <Container maxWidth="xl">           
        <div style={{ flexGrow: 1 }}>
          <Grid container spacing={3} style={{marginTop:"20px"}}>              
            <Grid item xs={3}></Grid>
            <Grid item xs={6} style={{marginTop:"20px"}} >                
                <Typography variant="h3" align="center" component="h1" gutterBottom>
                  Email: {this.state.email}
                </Typography>
                <Grid container alignItems="flex-start" spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="nameDriver"
                      label="Họ và tên"
                      name="nameDriver"
                      value={this.state.data.ho_va_ten}
                      onChange={this.handleChangeNameDriver}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      type="number"
                      label="Sô điện thoại"
                      name="sdtDriver"
                      value={this.state.data.so_dien_thoai}  
                      onChange={this.handleChangeSdtDriver}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      label="Số CMT"
                      name="cmtDriver"                      
                      value={this.state.data.so_cmt}  
                      onChange={this.handleChangeCmtDriver}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container alignItems="flex-start" spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="fullPart"
                      label="Time"
                      name="fullPart"
                      value={this.state.data.full_part}
                      onChange={this.handleChangeFullPart}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>                  
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      label="Địa chỉ"
                      name="addressDriver"
                      value={this.state.data.dia_chi}  
                      onChange={this.handleChangeAddressDriver}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      label="Phương tiện điều khiển"
                      name="sdtConsignor"
                      value={this.state.data.phuong_tien_dieu_khien}  
                      onChange={this.handleChangePTDK}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </Grid>
            </Grid>
            <Grid item xs={3}></Grid>                      
            <Grid item xs={12}> 
              <Grid container direction="row" justify="center" alignItems="flex-start" >
                <Button
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"    
                  style={{ margin:"16px 0 0 0"}}
                  onClick={this.handleUpdate}
                  >
                  Update
                </Button>
              </Grid> 
            </Grid> 
          </Grid>
        </div>
      </Container>
    );
  }
}
export default withCookies(DriverManagementDetai);