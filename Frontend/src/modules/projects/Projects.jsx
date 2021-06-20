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
    projectName: 'Tradedsbarn',
    jiraCode: "TB",
    description: 'New York No. 1 Lake Park',
    members: 7,
  },
  {
    key: '2',
    projectName: 'Apparal Connects',
    jiraCode: "AC",
    description: 'London No. 1 Lake Park',
    members: 3,
  },
  {
    key: '3',
    projectName: 'Swiss Rank',
    jiraCode: "SR",
    description: 'Sidney No. 1 Lake Park',
    members: 6,
  },
  {
    key: '4',
    projectName: 'SLT PEO TV',
    jiraCode: "PEO",
    description: 'London No. 2 Lake Park',
    members: 12,
  },
];

class Projects extends React.Component {
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
        title: 'Project',
        dataIndex: 'projectName',
      },
      {
        title: 'Jira Code',
        dataIndex: 'jiraCode'
      },
      {
        title: 'Description',
        dataIndex: 'description',
      },
      {
        title: 'Members',
        dataIndex: 'members',
      },
    ];
    return (
      <div>
        <Card>
          <PageHeader className="site-page-header" title="All Projects" />

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
  connect(mapStateToProps, mapDispatchToProps)(Projects)
);

