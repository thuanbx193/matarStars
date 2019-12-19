import React from 'react';
import MaterialTable from 'material-table';
import { instanceOf } from 'prop-types';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Button from '@material-ui/core/Button';

import {
  getCarFormSubmit,
  CheckToken
}         from '../../apis';
import { withCookies, Cookies } from 'react-cookie';

class ContractManagement extends React.Component {
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
        { title: 'ContactID', field: 'contract_id' },
        { title: 'Người nhận', field: 'ten_nguoi_nhan' },
        { title: 'Địa điểm lấy hàng', field: 'diem_lay_hang'},
        { title: 'Địa điểm giao hàng', field: 'diem_tra_hang'},       
        { title: 'Trạng thái', field: 'status'},       
      ],
      data: [],
    };   
  }
  async componentWillMount(){
    let checkTokenExpired = await  CheckToken(this.state.token);
    if(checkTokenExpired && checkTokenExpired.id){
      this.setState({userInfo: checkTokenExpired});
    }
    let data = {user_email:checkTokenExpired.email}
    let check = await getCarFormSubmit(data);
    if(check.length >0){
      this.setState({data:check});
    }    
  }

  render() {
    return (
      <MaterialTable
        title="Editable Example"
        columns={this.state.columns}
        data={this.state.data}
        actions={[
          {
            icon: VisibilityIcon,
            tooltip: 'Open',
            onClick: (event, rowData) => {
            	window.location.href = "/contractmanagementdetai/"+rowData.contract_id;
            }
          },
           {
            icon: 'delete',
            tooltip: 'delete',
            onClick: (event, rowData) => window.confirm("Bạn có muốn xoá contract này?")
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
    );
  }
}

export default withCookies(ContractManagement);