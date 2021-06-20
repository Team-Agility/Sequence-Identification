import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
//STYLES
import { Card,PageHeader,Table, Button } from "antd";
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
    const { projectActions, getAllMeetings } = this.props

    if(getAllMeetings.loading){
      projectActions.getAllMeetings();
    }
  }

  render() {
    const { getAllMeetings } = this.props
    const columns = [
      {
        title: 'Date',
        dataIndex: 'updated_at',
        key: 'key',
        render: (text, record) => (
          <span>
            {moment(record.updated_at).format("LLLL")}
          </span>
        ),
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
            <Button type="primary" onClick={()=>this.props.history.push(`output/${record.id}`)}>View</Button>
          </span>
        ),
      },
    ];
    return (
      <div>
        <Card>
          <PageHeader className="site-page-header" title="All List" />

          <React.Fragment>
            <Table 
              columns={columns} 
              // dataSource={data} 
              dataSource={getAllMeetings.data && getAllMeetings.data.data} 
              onChange={this.handleChange} 
              loading={getAllMeetings.pending} 
            />
          </React.Fragment>
        </Card>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    getAllMeetings: state.Projects.getAllMeetings
  };
};

function mapDispatchToProps(dispatch) {
  return {
    projectActions: bindActionCreators(projectActions,dispatch)
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(List)
);

