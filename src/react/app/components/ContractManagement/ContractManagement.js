import React from 'react';
import MaterialTable from 'material-table';

import VisibilityIcon from '@material-ui/icons/Visibility';
import Button from '@material-ui/core/Button';

import {
  getCarFormSubmit
}         from '../../apis';


class ContractManagement extends React.Component {
// export default function MaterialTableDemo() {
  // static propTypes = {
  //   cookies: instanceOf(Cookies).isRequired
  // };

  constructor(props) {
    super(props);
    // const { cookies } = props;
    this.state={
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
    let data = {user_email: "namhoai@gmail.com"}
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
            onClick: (event, rowData) => confirm("Bạn có muốn xoá contract này?")
          }          
        ]}
        components={{

          Action: props => (
            <Button
              onClick={(event) => {props.action.onClick(event, props.data)
              	console.log("----",props);
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

export default ContractManagement;