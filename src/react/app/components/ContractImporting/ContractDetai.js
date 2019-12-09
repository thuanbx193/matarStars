import React from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import Container from '@material-ui/core/Container';
// import {
//   Typography,
//   Paper,
//   Grid,
//   Button,
//   TextField,
// } from '@material-ui/core';

// import {
//   MuiPickersUtilsProvider,
//   KeyboardDatePicker,
//   // TimePicker,
//   // DatePicker,
// } from '@material-ui/pickers';
// import DateFnsUtils from '@date-io/date-fns';

// import {
//   CheckToken,
//   insertCarForm
// }         from '../../apis';
// import {default as UUID} from "uuid";

// import { makeStyles } from '@material-ui/core/styles';
class ContractDetai extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  // constructor(props) {
  //   super(props);
  //   const { cookies } = props;
  //   this.state={
  //     userInfo:{},
  //     token: cookies.get('token'),
  //     selectedDate:new Date(),
  //     nameConsignor:'',
  //     sdtConsignor:'',
  //     emailConsignor:'',
  //     nameConsignee:'',
  //     sdtConsignee:'',
  //     emailConsignee:'',
  //     carsDescription:'',
  //     amountOfCars:'',
  //     listOfVin:'',
  //     note:'',
  //     placeOfStufging:'',

  //     loadingDate:new Date(),
  //     plannedDeliveryDate:new Date(),
  //   };

  render() {
    return (
      <Container maxWidth="xl">
        dsaf
      </Container>
    );
  }
}
export default withCookies(ContractDetai);