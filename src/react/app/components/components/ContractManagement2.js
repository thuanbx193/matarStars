import React from 'react';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
// import DeleteIcon from '@material-ui/icons/Delete';
// import VisibilityIcon from '@material-ui/icons/Visibility';
export default function ContractManagement() {
  // const [state, setState] = React.useState({
  const [state] = React.useState({
    columns: [
      { title: 'Contract ID', field: 'contractid' },
      { title: 'Người nhận', field: 'consignee' },
      { title: 'Địa chỉ lấy hàng', field: 'placeOfStuffing'},
      { title: 'Địa chỉ giao hàng', field: 'placeOfDelivery' },
      { title: 'Trạng thái', field: 'status' },
    ],
    data: [
      { contractid: 'Mehmet', consignee: 'Baran', placeOfStuffing: "gfgfg", placeOfDelivery: "hghgh",status:"Done" },
      { contractid: 'fsdf', consignee: 'Barafsfn', placeOfStuffing: "ghfhfh", placeOfDelivery: "hjghg",status:"Delivering" },
     
    ],
  });

  return (
    <MaterialTable
      title=""
      columns={state.columns}
      data={state.data}
      actions={[
          {
            icon: 'save',
            tooltip: 'Save User',
            onClick: (event, rowData) => alert("You saved " + rowData.contractid)
          }
        ]}
        components={{
          Action: props => (
            <Button
              onClick={(event) => {
                // props.action.onClick(event, props.data)
                console.log(props.data.contractid);
              }}
              color="primary"
              variant="contained"
              style={{textTransform: 'none'}}
              size="small"
            >
              Open
            </Button>

          ),
        }}
    />
  );
}