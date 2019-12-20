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
} from '@material-ui/core';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import {
  CheckToken,
  insertCarForm
}         from '../../apis';
import {default as UUID} from "uuid";

class ContractImporting extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state={
      userInfo:{},
      token: cookies.get('token'),
      selectedDate:new Date(),
      nameConsignor:'',
      sdtConsignor:'',
      emailConsignor:'',
      nameConsignee:'',
      sdtConsignee:'',
      emailConsignee:'',
      carsDescription:'',
      amountOfCars:'',
      listOfVin:'',
      note:'',
      placeOfStufging:'',
      placeOfDelivery:'',
      loadingDate:new Date(),
      plannedDeliveryDate:new Date(),
    };

    
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleDateChange = (date) => {
    this.setState({selectedDate: date});
  }
  handleChangeNameConsignor = (event)=> {
    this.setState({nameConsignor: event.target.value});
  }

  handleChangeSdtConsignor = (event)=> {
    this.setState({sdtConsignor: event.target.value});
  }
  handleChangeEmailConsignor = (event)=> {
    this.setState({emailConsignor: event.target.value});
  }
  handleChangeNameConsignee = (event)=> {
    this.setState({nameConsignee: event.target.value});
  }
  handleChangeSdtConsignee = (event)=> {
    this.setState({sdtConsignee: event.target.value});
  }
  handleChangeEmailConsignee = (event)=> {
    this.setState({emailConsignee: event.target.value});
  }

  handleChangeCarsDescription = (event) => {
    this.setState({carsDescription: event.target.value});
  }

  handleChangeAmountOfCars = (event) => {
    this.setState({amountOfCars: event.target.value});
  }

  handleChangeListOfVin = (event) => {
    this.setState({listOfVin: event.target.value});
  }

  handleChangeNote = (event) => {
    this.setState({note: event.target.value});
  }

  handleChangePlaceOfStufging = (event) => {
    this.setState({placeOfStufging: event.target.value});
  }
  handleChangeLoadingDate = (date) => {
    this.setState({loadingDate: date});
  }

  handlePlannedDeliveryDate = (date) => {
    this.setState({plannedDeliveryDate: date});
  }
  handleChangePlaceOfDelivery = (event) => {
    this.setState({placeOfDelivery: event.target.value});
  }
  


  async handleSubmit(event) {
    event.preventDefault();
    let param = {
        "contract_id": "matar_car_form_"+UUID.v4().substr(24, UUID.v4().length),
        "ten_nguoi_giao": this.state.nameConsignor,
        "so_dien_thoai_nguoi_giao": this.state.sdtConsignor,
        "email_nguoi_giao": this.state.emailConsignor,
        "ten_nguoi_nhan": this.state.nameConsignee,
        "so_dien_thoai_nguoi_nhan": this.state.sdtConsignee,
        "email_nguoi_nhan": this.state.emailConsignee,
        "mo_ta_oto": this.state.carsDescription,
        "so_luong_oto":  this.state.amountOfCars,
        "danh_sach_vin": this.state.listOfVin,
        "diem_lay_hang": this.state.placeOfStufging,
        "ngay_lay_hang": this.state.loadingDate.getDate()+"-"+this.state.loadingDate.getMonth()+"-"+this.state.loadingDate.getFullYear(),
        "diem_tra_hang": this.state.placeOfDelivery,
        "ngay_tra_hang": this.state.plannedDeliveryDate.getDate()+"-"+this.state.plannedDeliveryDate.getMonth()+"-"+this.state.plannedDeliveryDate.getFullYear(),
        "user_email": this.state.userInfo.email,
        "status": "submitted",
        "ghi_chu": this.state.note
    }
    let checkInsert = await insertCarForm(param);
    if(checkInsert.status === 201){
      alert(" SUBMIT SUCCESS");
    }else{
      alert(" SUBMIT ERROR");
    }
  }

  async componentWillMount(){
    if(this.state.token){
      let checkTokenExpired = await  CheckToken(this.state.token);
      if(checkTokenExpired && checkTokenExpired.id){
        this.setState({userInfo: checkTokenExpired});
      }
    }else{
      window.location.href ='/login';
    }
  }

  render() {
    return (
      <Container maxWidth="xl">
        <form style={{ width: '100%',marginTop:"8px"}} onSubmit={this.handleSubmit}  noValidate>              
          <div style={{ flexGrow: 1 }}>
            <Grid container spacing={3}>              
              <Grid item xs={6}>                
                 <Paper style={{ padding:"16px", textAlign: 'center', color:"#000", }}>
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
                        value={this.state.nameConsignor} 
                        onChange={this.handleChangeNameConsignor}
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
                        value={this.state.sdtConsignor} 
                        onChange={this.handleChangeSdtConsignor}
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
                        value={this.state.emailConsignor} 
                        onChange={this.handleChangeEmailConsignor}
                      />
                    </Grid>
                  </Grid>
                 </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper style={{ padding:"16px", textAlign: 'center', color:"#000", }}>
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
                        label="Tên người giao (Consignee)"
                        name="nameConsignee"
                        value={this.state.nameConsignee} 
                        onChange={this.handleChangeNameConsignee}
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
                        value={this.state.sdtConsignee} 
                        onChange={this.handleChangeSdtConsignee}
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
                        value={this.state.emailConsignee} 
                        onChange={this.handleChangeEmailConsignee}
                      />
                    </Grid>
                  </Grid>
                 </Paper>
              </Grid>
              <Grid item xs={12}  style={{ margin:"35px 0"}} >
                <Paper style={{ padding:"16px", textAlign: 'center', color:"#000", }}>
                  <Typography variant="h6" align="center" component="h1" gutterBottom>
                    Thông tin hàng hoá
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <Grid item xs={12} style={{marginTop:"16px"}}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="carsDescription"
                          label="Mô tả về ô tô (Car's Description)"
                          name="carsDescription"
                          value={this.state.carsDescription} 
                          onChange={this.handleChangeCarsDescription}
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
                          value={this.state.amountOfCars} 
                          onChange={this.handleChangeAmountOfCars}
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
                          value={this.state.listOfVin} 
                          onChange={this.handleChangeListOfVin}
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
                          value={this.state.note} 
                          onChange={this.handleChangeNote}
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid item xs={12} style={{marginTop:"16px"}}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="placeOfStufging"
                          label="Địa điểm lấy hàng (Place Of Stufging/Loading)"
                          name="placeOfStufging"
                          value={this.state.placeOfStufging} 
                          onChange={this.handleChangePlaceOfStufging}
                        />
                      </Grid>
                      <Grid item xs={12} >
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            fullWidth
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="loadingDate"
                            label="Ngày lấy hàng (LoadingDate)"
                            value={this.state.loadingDate}
                            onChange={this.handleChangeLoadingDate}
                            KeyboardButtonProps={{
                              'aria-label': 'change date',
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </Grid>
                      <Grid item xs={12} style={{marginTop:"16px"}}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="placeOfDelivery"
                          label="Địa điểm trả hàng (Place Of Delivery)"
                          name="placeOfDelivery"
                          value={this.state.placeOfDelivery} 
                          onChange={this.handleChangePlaceOfDelivery}
                        />
                      </Grid>
                      <Grid item xs={12} >
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            fullWidth
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="plannedDeliveryDate"
                            label="Ngày trả hàng (Planned Delivery Date)"
                            value={this.state.plannedDeliveryDate}
                            onChange={this.handlePlannedDeliveryDate}
                            KeyboardButtonProps={{
                              'aria-label': 'change date',
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>              
            </Grid>
          </div>
          <Button
            size="large"
            type="submit"
            variant="contained"
            color="primary"    
            style={{ margin:"35px 47%"}}       
            >
            SUBMIT
          </Button>
        </form> 
      </Container>
    );
  }
}
export default withCookies(ContractImporting);