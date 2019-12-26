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
  getVehicleInfo,
  updateVehicle
}         from '../../apis';

class TruckManagementDetai extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state={
      token: cookies.get('token'),
      bienso:props.match.params.bienso,
      data:{},
    };
    this.handleUpdate=this.handleUpdate.bind(this);
    
  }



  async handleUpdate(){
    let data = {
      ten:this.state.data.ten,
      bien_so_xe:this.state.data.bien_so_xe,
      ngay_het_han_dang_kiem:this.state.data.ngay_het_han_dang_kiem
    };
    let update = await updateVehicle(data);
    console.log('updateVehicle',update);
    if(update.status ===200){
      alert(update.message);
      window.location.href = "/truckmanagement";
    }

  }  

  handleChangeNameVehicle =(event) =>{
    let data  = this.state.data;
    data.ten = event.target.value
    this.setState({data: data});
  }

  handleChangeNgayDangKiem =(event) =>{
    let data  = this.state.data;
    data.ngay_het_han_dang_kiem = event.target.value
    this.setState({data: data});
  }

  async componentWillMount(){
    let data = {bien_so_xe: this.state.bienso}  
    let findVehicle = await getVehicleInfo(data);
    console.log(findVehicle);
    if(findVehicle && !findVehicle.status){
      this.setState({data:findVehicle});
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
                  Biên số xe: {this.state.bienso}
                </Typography>
                <Grid container alignItems="flex-start" spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      label="Tên Xe"
                      name="nameVehicle"
                      value={this.state.data.ten}
                      onChange={this.handleChangeNameVehicle}
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
                      label="Ngày hết hạn đăng kiểm"
                      name="sdtDriver"
                      value={this.state.data.ngay_het_han_dang_kiem}  
                      onChange={this.handleChangeNgayDangKiem}
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
export default withCookies(TruckManagementDetai);