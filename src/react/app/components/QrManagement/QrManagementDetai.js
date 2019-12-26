import React from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import Container from '@material-ui/core/Container';
import {
  Typography,
  Paper,
  Grid,
  Button,
  TextField,
  Card,
  CardActionArea,
  CardMedia
} from '@material-ui/core';

import {
  findDriver,
  assignDriver,
  // createDriver,
  getListDriverByContractId,
  getinfoByContractId
}         from '../../apis';

class QrManagementDetai extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state={
      userInfo:{},
      data:{},
      token: cookies.get('token'),
      contractId:props.match.params.id,
      listDriver:[],
      driverEmail:'',
      driverEmailQR:'',
      addDriverName:'',
      addDriverEmail:'',
      addDriverSDT:'',
      addDriverType:''
    };

    
    this.handleSubmitSeach=this.handleSubmitSeach.bind(this);
    this.handleSubmitAssign=this.handleSubmitAssign.bind(this);
    // this.handleSubmitAddDriver=this.handleSubmitAddDriver.bind(this);
  }

  // async handleSubmitAddDriver(event){
  //   event.preventDefault();
  //   if(!this.state.addDriverName || !this.state.addDriverSDT || !this.state.addDriverType || !this.state.addDriverEmail){
  //     alert("Vui lòng điền đủ thông tin");
  //     return
  //   }
  //   let data = {
  //          name: this.state.addDriverName,
  //          phone_number: this.state.addDriverSDT,
  //          car_type: this.state.addDriverType,
  //          driver_email: this.state.addDriverEmail    
  //   }
  //   let checkAddDriver = await createDriver(data);
  //   if(checkAddDriver.status===201){
  //     alert("Thêm lái xe thành công");
  //   }else{
  //     alert("Thêm lái xe thất bại");
  //   }
  // }

  async handleSubmitSeach(event){
    event.preventDefault();
    let data = {driver_email: this.state.driverEmail}
    let find = await findDriver(data);
    console.log(find)
    if(find.status === 400){
      alert("xin lỗi không tìm thấy email tài xế yêu cầu,\n vui lòng nhập lại");
    }else{
      alert("Thông tin tài xế \n Tên:  "+find.ho_va_ten+" \n SĐT:  "+find.so_dien_thoai+"\n Biển số xe : "+ find.phuong_tien_dieu_khien+"\n Địa chỉ:  "+find.dia_chi);
    }
  }

  async handleSubmitAssign(event){
    event.preventDefault();
    
    let find = await findDriver({driver_email: this.state.driverEmailQR});
    if(find.status === 400){
      alert("xin lỗi không tìm thấy email tài xế yêu cầu,\n vui lòng nhập lại");
    }else{
      let data = {
        driver_email: this.state.driverEmailQR,
        contract_id:this.state.contractId
      }
      let checkConfirm = window.confirm("Bạn có muốn gán đơn hàng này cho tài xế \n "+find.name+",\n SĐT:"+find.phone_number);
      if(checkConfirm){
        let assign = await assignDriver(data);
        if(assign.status === 200){
          alert(assign.message)
        }else{
          alert("Driver assigned ERROR");
        }
      }
    }
  }

  handleChangeDriverEmail = (event)=> {
    this.setState({driverEmail: event.target.value});
  }
  handleChangeDriverEmailQR = (event)=> {
    this.setState({driverEmailQR: event.target.value});
  }  
  // handleChangeAddDriverName = (event)=> {
    // this.setState({addDriverName: event.target.value});
  // }
  // handleChangeAddDriverEmail = (event)=> {
    // this.setState({addDriverEmail: event.target.value});
  // }
  // handleChangeAddDriverSDT = (event)=> {
    // this.setState({addDriverSDT: event.target.value});
  // }
  // handleChangeAddDriverType = (event)=> {
    // this.setState({addDriverType: event.target.value});
  // }
  async componentWillMount(){
    let getListDriver = await getListDriverByContractId({contract_id:this.state.contractId});
    let getInfo = await getinfoByContractId({contract_id: this.state.contractId});
    if(getInfo){
      this.setState({data:getInfo});
    }
    if(getListDriver.length > 0){
      this.setState({listDriver:getListDriver});
    }
  }

  render() {
    return (
      <Container maxWidth="xl">           
        <div style={{ flexGrow: 1 }}>
          <Grid container spacing={3} style={{marginTop:"20px"}}>              
            <Grid item xs={6} style={{marginTop:"45px"}} >                
                <Typography variant="h3" align="center" component="h1" gutterBottom>
                  Contract ID: matar-flc-addkc
                </Typography>
            </Grid>
            <Grid item xs={6}>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={6} style={{marginTop:"45px"}}>
                  <Typography variant="h3" align="center" component="h1" gutterBottom>
                    Master Bill
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Card style={{maxWidth: "200px"}}>
                    <CardActionArea>
                      <CardMedia
                        style={{height: "200px"}}
                        image={this.state.data.qr_code_link}
                        title="Contemplative Reptile"
                      />
                    </CardActionArea>
                  </Card>
                </Grid>                    
              </Grid>
            </Grid>
            <Grid item xs={6}>   
              <form style={{ width: '100%',marginTop:"8px"}} onSubmit={this.handleSubmitAssign}  noValidate>             
               <Paper style={{ padding:"20px", textAlign: 'center', color:"#000", }}>
                <Typography variant="h4" align="center" component="h1" gutterBottom>
                  Gán QR Code cho lái xe
                </Typography>
                <Grid container alignItems="flex-start" spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      variant="outlined"
                      id="driverEmailQR"
                      label="Driver Email"
                      name="nameConsignor"
                      value={this.state.driverEmailQR} 
                      onChange={this.handleChangeDriverEmailQR}
                    />
                  </Grid>
                </Grid>
                <Button
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"    
                  style={{ margin:"16px 0 0 0"}}       
                  >
                  Assign
                </Button>
               </Paper>                
              </form>
            </Grid>
            <Grid item xs={6}>
              <form style={{ width: '100%',marginTop:"8px"}} onSubmit={this.handleSubmitSeach}  noValidate>             
               <Paper style={{ padding:"20px", textAlign: 'center', color:"#000", }}>
                <Typography variant="h4" align="center" component="h1" gutterBottom>
                  Tìm kiếm lái xe
                </Typography>
                <Grid container alignItems="flex-start" spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      variant="outlined"
                      id="driverEmail"
                      label="Driver Email"
                      name="nameConsignor"
                      value={this.state.driverEmail} 
                      onChange={this.handleChangeDriverEmail}
                    />
                  </Grid>
                </Grid>
                <Button
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"    
                  style={{ margin:"16px 0 0 0"}}       
                  >
                  Search
                </Button>
               </Paper>                
              </form>
            </Grid>            
            <Grid item xs={12} style={{margin:"16px 0 0 0"}}>
              <Typography variant="h4" align="center" component="h1" gutterBottom>
                Danh sách lái xe đã gán
              </Typography>
            </Grid>
            {
              this.state.listDriver.map((value, key) => {
                return (
                  <Grid item xs={6}  style={{ margin:"16px 0"}} >
                    <Paper style={{ padding:"20px", textAlign: 'center', color:"#000", }}>               
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Typography variant="h4" align="center" component="h1" gutterBottom>
                            Thông tin lái xe
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            variant="outlined"
                            fullWidth
                            id="carsDescription"
                            label="Họ và tên"
                            value={value.name} 
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            variant="outlined"                        
                            fullWidth
                            id="amountOfCars"
                            type="number"
                            label="Số điện thoại"
                            value={value.phone_number} 

                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            variant="outlined"
                            fullWidth
                            id="listOfVin"
                            label="Loại xe"
                            value={value.car_type} 
                          />
                        </Grid>     
                      </Grid>
                    </Paper>
                  </Grid>
                )                
              })
            }
            
          </Grid>
        </div>
      </Container>
    );
  }
}
export default withCookies(QrManagementDetai);