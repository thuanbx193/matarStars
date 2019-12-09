import React from 'react';
import MaterialTable from 'material-table';

import VisibilityIcon from '@material-ui/icons/Visibility';


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
        { title: 'Name', field: 'name' },
        { title: 'Surname', field: 'surname' },
        { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
        {
          title: 'Birth Place',
          field: 'birthCity',
          lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
        },
      ],
      data: [
        { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
        {
          name: 'Zerya Betül',
          surname: 'Baran',
          birthYear: 2017,
          birthCity: 34,
        },
      ],
    };

   
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
            onClick: (event, rowData) => alert("You Open " + rowData.name)
          },
          {
            icon: 'delete',
            tooltip: 'delete',
            onClick: (event, rowData) => alert("You delete " + rowData.name)
          }          
        ]}        
      />
    );
  }
}

export default ContractManagement;