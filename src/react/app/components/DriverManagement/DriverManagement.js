import React from 'react';
import MaterialTable from 'material-table';
import { instanceOf } from 'prop-types';
import VisibilityIcon from '@material-ui/icons/Visibility';

import {
  Typography,
  Grid,
  TextField,
  Button
} from '@material-ui/core';

import {
  getListDriver,
  CheckToken,
  deleteCarContract,
  createDriver
}         from '../../apis';
import { withCookies, Cookies } from 'react-cookie';

class DriverManagement extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state={
      token: cookies.get('token'),
      userInfo:{},
      columns: [
        { title: 'Driver Email', field: 'driver_email' },
        { title: 'Họ và Tên', field: 'ho_va_ten' },
        { title: 'Phương tiện', field: 'phuong_tien_dieu_khien'},
        { title: 'Sô điện thoại', field: 'so_dien_thoai'}
      ],
      data: [],
      dataAdd:{}
    };   
    this.handleAdd = this.handleAdd.bind(this);
  }
  async componentWillMount(){
    let checkTokenExpired = await  CheckToken(this.state.token);
    if(checkTokenExpired && checkTokenExpired.id){
      this.setState({userInfo: checkTokenExpired});
    }
    let data = {user_email:checkTokenExpired.email}
    let check = await getListDriver(data);
    if(check.length >0){
      this.setState({data:check});
    }    
  }

  async handleDeleteContract(contractId){
    let data = {contract_id:contractId}  
    let checkDel = await deleteCarContract(data);
    if(checkDel.status && checkDel.status === 200){
      alert("Delete thành công");
      window.location.href = this.props.location.pathname
    }else{
      alert("Delete thất bại");
    }
  }

  handleChangeNameDriver =(event) =>{
    let dataAdd  = this.state.dataAdd;
    dataAdd.ho_va_ten = event.target.value
    this.setState({dataAdd: dataAdd});
  }

  handleChangeSdtDriver =(event) =>{
    let dataAdd  = this.state.dataAdd;
    dataAdd.so_dien_thoai = event.target.value
    this.setState({dataAdd: dataAdd});
  }

  handleChangeSoCMT =(event) =>{
    let dataAdd  = this.state.dataAdd;
    dataAdd.so_cmt = event.target.value
    this.setState({dataAdd: dataAdd});
  }

  handleChangeEmailDriver =(event) =>{
    let dataAdd  = this.state.dataAdd;
    dataAdd.driver_email = event.target.value
    this.setState({dataAdd: dataAdd});
  }

  handleChangeFullPart =(event) =>{
    let dataAdd  = this.state.dataAdd;
    dataAdd.full_part = event.target.value
    this.setState({dataAdd: dataAdd});
  }

  handleChangeAddress =(event) =>{
    let dataAdd  = this.state.dataAdd;
    dataAdd.dia_chi = event.target.value
    this.setState({dataAdd: dataAdd});
  }

  handleChangePTDK =(event) =>{
    let dataAdd  = this.state.dataAdd;
    dataAdd.phuong_tien_dieu_khien = event.target.value
    this.setState({dataAdd: dataAdd});
  }

  async handleAdd(){
    let checkAdd = await createDriver(this.state.dataAdd);
    if(checkAdd.status && checkAdd.status === 201){
      alert("Thêm lái xe thành công");
      window.location.href = this.props.location.pathname
    }else{
      alert("Thêm lái xe thất bại");
    }
  }
  render() {
    return (
      <div>
        <MaterialTable
          title="Editable Example"
          columns={this.state.columns}
          data={this.state.data}
          actions={[
            {
              icon: VisibilityIcon,
              tooltip: 'Open',
              onClick: (event, rowData) => {
              	window.location.href = "/drivermanagementdetai/"+rowData.driver_email;
              }          
            }          
          ]}
          components={{

            Action: props => (
              <Button
                onClick={(event) => {props.action.onClick(event, props.data)
                }}
                color="primary"
                variant="contained"
                style={{textTransform: 'none',margin:"5px"}}
                size="small"
              >
              {
              	props.action.tooltip
              }
              </Button>
            ),
          }
      	}        
        />

        <div style={{ flexGrow: 1 }}>
          <Grid container spacing={3} style={{marginTop:"20px"}}>              
            <Grid item xs={3}></Grid>
            <Grid item xs={6} style={{marginTop:"20px"}} >                
                <Typography variant="h3" align="center" component="h1" gutterBottom>
                  Thêm Lái Xe
                </Typography>
                <Grid container alignItems="flex-start" spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      label="Họ và tên"
                      name="nameDriver"
                      value={this.state.dataAdd.ho_va_ten}
                      onChange={this.handleChangeNameDriver}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      label="Số điện thoại"
                      name="sdtDriver"
                      value={this.state.dataAdd.so_dien_thoai}
                      onChange={this.handleChangeSdtDriver}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      label="Số CMT"
                      name="cmtDriver"
                      value={this.state.dataAdd.so_cmt}  
                      onChange={this.handleChangeSoCMT}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      label="Email"
                      name="emailDriver"
                      value={this.state.dataAdd.driver_email}  
                      onChange={this.handleChangeEmailDriver}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      label="Thời gian chạy"
                      name="timeRun"
                      value={this.state.dataAdd.full_part}  
                      onChange={this.handleChangeFullPart}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      label="Địa chỉ"
                      name="addressDriver"
                      value={this.state.dataAdd.dia_chi}  
                      onChange={this.handleChangeAddress}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      label="Biến số xe"
                      name="BSXDriver"
                      value={this.state.dataAdd.phuong_tien_dieu_khien}  
                      onChange={this.handleChangePTDK}
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
                  onClick={this.handleAdd}
                  >
                  Thêm
                </Button>
              </Grid> 
            </Grid> 
          </Grid>
        </div>
      </div>
    );
  }
}

export default withCookies(DriverManagement);