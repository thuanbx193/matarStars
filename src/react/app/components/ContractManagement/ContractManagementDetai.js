import React from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import Container from '@material-ui/core/Container';
import {
  Typography,
  Paper,
  Grid,
  TextField,
  Card,
  CardActionArea,
  CardMedia,
  Button
} from '@material-ui/core';

import {
  getinfoByContractId,
  getListDriverByContractId,
  updateContractById
}         from '../../apis';

class ContractManagementDetai extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state={
      token: cookies.get('token'),
      contractId:props.match.params.id,
      data:{},
      listDriver:[],
    };
    this.handleUpdate=this.handleUpdate.bind(this);
    
  }



  async handleUpdate(){
    let updateContract = await updateContractById(this.state.data);
    if(updateContract.status ===200){
      alert(updateContract.message);
      window.location.href = this.props.location.pathname
    }

  }  

  handleChangeNameConsignor =() =>{
    let data  = this.state.data;
    data.ten_nguoi_giao = event.target.value
    this.setState({data: data});
  }

  handleChangeSdtConsignor =() =>{
    let data  = this.state.data;
    data.so_dien_thoai_nguoi_giao = event.target.value
    this.setState({data: data});
  }

  handleChangeEmailConsignor =() =>{
    let data  = this.state.data;
    data.email_nguoi_giao = event.target.value
    this.setState({data: data});
  }

  handleChangeNameConsignee =() =>{
    let data  = this.state.data;
    data.ten_nguoi_nhan = event.target.value
    this.setState({data: data});
  }

  handleChangeSdtConsignee =() =>{
    let data  = this.state.data;
    data.so_dien_thoai_nguoi_nhan = event.target.value
    this.setState({data: data});
  }

  handleChangeEmailConsignee =() =>{
    let data  = this.state.data;
    data.email_nguoi_nhan = event.target.value
    this.setState({data: data});
  }

  handleChangeCarsDescription =() =>{
    let data  = this.state.data;
    data.mo_ta_oto = event.target.value
    this.setState({data: data});
  }

  handleChangeAmountOfCars =() =>{
    let data  = this.state.data;
    data.so_luong_oto = event.target.value
    this.setState({data: data});
  }

  handleChangeListOfVin =() =>{
    let data  = this.state.data;
    data.danh_sach_vin = event.target.value
    this.setState({data: data});
  }

  handleChangeNote =() =>{
    let data  = this.state.data;
    data.ghi_chu = event.target.value
    this.setState({data: data});
  }

  handleChangePlaceOfStufging =() =>{
    let data  = this.state.data;
    data.diem_lay_hang = event.target.value
    this.setState({data: data});
  }

  handleChangeLoadingDate =() =>{
    let data  = this.state.data;
    data.ngay_lay_hang = event.target.value
    this.setState({data: data});
  }

  handleChangePlaceOfDelivery =() =>{
    let data  = this.state.data;
    data.diem_tra_hang = event.target.value
    this.setState({data: data});
  }

  handleChangePlannedDeliveryDate =() =>{
    let data  = this.state.data;
    data.ngay_tra_hang = event.target.value
    this.setState({data: data});
  }


  async componentWillMount(){
    let data = {contract_id: this.state.contractId}
    let getInfo = await getinfoByContractId(data);
    let getListDriver = await getListDriverByContractId(data);
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
            <Grid item xs={6} style={{marginTop:"20px"}} >                
                <Typography variant="h3" align="center" component="h1" gutterBottom>
                  Contract ID: {this.state.contractId}
                </Typography>
            </Grid>
            <Grid item xs={6}>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={6}>
                  <Typography style={{marginTop:"45px"}} variant="h3" align="center" component="h1" gutterBottom>
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
               <Paper style={{ padding:"20px", textAlign: 'center', color:"#000", }}>
                <Typography variant="h6" align="center" component="h1" gutterBottom>
                  Thông tin người giao
                </Typography>
                <Typography variant="h6" align="center" component="h1" gutterBottom>
                  ( Consignor's information )
                </Typography>
                <Grid container alignItems="flex-start" spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="nameConsignor"
                      label="Tên người giao (Consignor)"
                      name="nameConsignor"
                      value={this.state.data.ten_nguoi_giao}
                      onChange={this.handleChangeNameConsignor}
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
                      label="Số điện thoại (Phone Number)"
                      name="sdtConsignor"
                      value={this.state.data.so_dien_thoai_nguoi_giao}  
                      onChange={this.handleChangeSdtConsignor}
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
                      label="Email"
                      name="emailConsignor"
                      type="email"
                      value={this.state.data.email_nguoi_giao}  
                      onChange={this.handleChangeEmailConsignor}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </Grid>
               </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper style={{ padding:"20px", textAlign: 'center', color:"#000", }}>
                <Typography variant="h6" align="center" component="h1" gutterBottom>
                  Thông tin người nhận
                </Typography>
                <Typography variant="h6" align="center" component="h1" gutterBottom>
                  ( Consignee's information )
                </Typography>
                <Grid container alignItems="flex-start" spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="nameConsignee"
                      label="Tên người nhận (Consignee)"
                      name="nameConsignee"
                      value={this.state.data.ten_nguoi_nhan}
                      onChange={this.handleChangeNameConsignee}
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
                      label="Số điện thoại (Phone Number)"
                      name="sdtConsignee"
                      value={this.state.data.so_dien_thoai_nguoi_nhan}
                      onChange={this.handleChangeSdtConsignee}
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
                      type="email"                        
                      label="Email"
                      name="emailConsignee"
                      value={this.state.data.email_nguoi_nhan}
                      onChange={this.handleChangeEmailConsignee}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </Grid>
               </Paper>
            </Grid>
            <Grid item xs={12}  style={{ margin:"35px 0 0 0"}} >
              <Paper style={{ padding:"20px", textAlign: 'center', color:"#000", }}>
                <Typography variant="h6" align="center" component="h1" gutterBottom>
                  Thông tin hàng hoá
                </Typography>
                <Grid container alignItems="flex-start" spacing={3}>
                  <Grid item xs={6}>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="carsDescription"
                        label="Mô tả về ô tô (Car's Description)"
                        name="carsDescription"
                        value={this.state.data.mo_ta_oto} 
                        onChange={this.handleChangeCarsDescription}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} style={{marginTop:"16px"}}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="amountOfCars"
                        label="Số lượng ô tô (Amount Of Cars)"
                        name="amountOfCars"
                        type="number"
                        value={this.state.data.so_luong_oto} 
                        onChange={this.handleChangeAmountOfCars}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} style={{marginTop:"16px"}}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="listOfVin"
                        label="Danh sách khung, số máy (List Of Vin)"
                        name="listOfVin"
                        value={this.state.data.danh_sach_vin} 
                        onChange={this.handleChangeListOfVin}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} style={{marginTop:"16px"}}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="note"
                        label="Ghi chú (Note)"
                        name="note"
                        value={this.state.data.ghi_chu} 
                        onChange={this.handleChangeNote}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="placeOfStufging"
                        label="Địa điểm lấy hàng (Place Of Stufging/Loading)"
                        name="placeOfStufging"
                        value={this.state.data.diem_lay_hang} 
                        onChange={this.handleChangePlaceOfStufging}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} style={{marginTop:"16px"}}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="placeOfDelivery"
                        label="Ngày lấy hàng (LoadingDate)"
                        name="LoadingDate"
                        value={this.state.data.ngay_lay_hang} 
                        onChange={this.handleChangeLoadingDate}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />                        
                    </Grid>
                    <Grid item xs={12} style={{marginTop:"16px"}}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="placeOfDelivery"
                        label="Địa điểm trả hàng (Place Of Delivery)"
                        name="placeOfDelivery"
                        value={this.state.data.diem_tra_hang} 
                        onChange={this.handleChangePlaceOfDelivery}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} style={{marginTop:"16px"}}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="placeOfDelivery"
                        label="Ngày trả hàng (Planned Delivery Date)"
                        name="PlannedDeliveryDate"
                        value={this.state.data.ngay_tra_hang} 
                        onChange={this.handleChangePlannedDeliveryDate}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />                        
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>   
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
            {
              this.state.listDriver.map((value, key) => {
                  return (
                      <Grid item xs={6}>
                        <Paper style={{ padding:"20px", textAlign: 'center', color:"#000", }}>
                          <Typography variant="h6" align="center" component="h1" gutterBottom>
                            Thông tin lái xe
                          </Typography>
                          <Grid container alignItems="flex-start" spacing={2}>
                            <Grid item xs={12}>
                              <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="nameConsignee"
                                label="Họ và tên"
                                name="nameConsignee"
                                value={value.name} 
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                variant="outlined"
                                required
                                fullWidth
                                type="number"
                                label="Số điện thoại (Phone Number)"
                                name="sdtConsignee"
                                value={value.phone_number} 
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                type="text"                        
                                label="Loại xe"
                                name="emailConsignee"
                                value={value.car_type} 
                              />
                            </Grid>
                          </Grid>
                         </Paper>
                      </Grid>  
                  );
              })
            }        
          </Grid>
        </div>
      </Container>
    );
  }
}
export default withCookies(ContractManagementDetai);