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
  CheckToken,
  getListVehicle,
  createVehicle
}         from '../../apis';
import { withCookies, Cookies } from 'react-cookie';

class TruckManagement extends React.Component {
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
        { title: 'Tên xe', field: 'ten' },
        { title: 'Biển số xe', field: 'bien_so_xe' },
        { title: 'Ngày hết hạn đăng kiểm', field: 'ngay_het_han_dang_kiem'}      ],
      data: [],
      dataAdd:{
        ten:'',
        bien_so_xe:'',
        ngay_het_han_dang_kiem:''
      }
    };   
    this.handleAdd = this.handleAdd.bind(this);
  }
  async componentWillMount(){
    let checkTokenExpired = await  CheckToken(this.state.token);
    if(checkTokenExpired && checkTokenExpired.id){
      this.setState({userInfo: checkTokenExpired});
    }
    let check = await getListVehicle({});
    if(check.length >0){
      this.setState({data:check});
    }    
  }

  async handleAdd(){
    let checkAdd = await createVehicle(this.state.dataAdd);
    if(checkAdd.status && checkAdd.status === 201){
      alert("Thêm xe thành công");
      window.location.href = this.props.location.pathname
    }else{
      alert("Thêm xe thất bại");
    }
  }

  handleChangeNameVehicle =(event) =>{
    let dataAdd  = this.state.dataAdd;
    dataAdd.ten = event.target.value
    this.setState({dataAdd: dataAdd});
  }

  handleChangeBiensoxe =(event) =>{
    let dataAdd  = this.state.dataAdd;
    dataAdd.bien_so_xe = event.target.value
    this.setState({dataAdd: dataAdd});
  }

  handleChangeNgayDangKiem =(event) =>{
    let dataAdd  = this.state.dataAdd;
    dataAdd.ngay_het_han_dang_kiem = event.target.value
    this.setState({dataAdd: dataAdd});
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
              	window.location.href = "/truckmanagementdetai/"+rowData.bien_so_xe;
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
                  Thêm Xe
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
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      label="Tên Xe"
                      name="nameVehicle"
                      value={this.state.data.bien_so_xe}
                      onChange={this.handleChangeBiensoxe}
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

export default withCookies(TruckManagement);