import React from "react";
import { withRouter } from "react-router";
import { Field, reduxForm , getFormValues } from "redux-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


//STYLES
import {
  Card,
  PageHeader,
  Spin,
  Table, 
  Button, 
  Space
} from "antd";
import { projectActions } from "./ducks";


const data = [
  {
    key: '1',
    date: '2021/06/19',
    time: "3.28 PM",
    status: "PENDING"
  },
  {
    key: '2',
    date: '2021/06/19',
    time: "1.28 PM",
    status: "COMPLETE",
  },
  {
    key: '3',
    date: '2021/06/19',
    time: "11.28 PM",
    status: "COMPLETE",
  },
  {
    key: '4',
    date: '2021/06/19',
    time: "5.28 PM",
    status: "COMPLETE",
  },
];

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoading:false
    };
  }

  componentDidMount() {
  }

  render() {
    const columns = [
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'key',
      },
      {
        title: 'Time',
        dataIndex: 'time',
        key: 'key',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'key',
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <span>
            <Button type="primary" onClick={()=>this.props.history.push(`output/${record.key}`)}>View</Button>
          </span>
        ),
      },
    ];
    return (
      <div>
        <Card>
          <PageHeader className="site-page-header" title="All List" />

          <React.Fragment>
            <Table columns={columns} dataSource={data} onChange={this.handleChange} loading={this.state.dataLoading} />
          </React.Fragment>
        </Card>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    fieldValues: getFormValues("createProject")(state)
  };
};

function mapDispatchToProps(dispatch) {
  return {
    productManagementActions: bindActionCreators(projectActions,dispatch)
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(List)
);

