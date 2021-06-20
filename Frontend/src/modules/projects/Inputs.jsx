import React from "react";
import { withRouter } from "react-router";
import { Field, reduxForm , getFormValues } from "redux-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//STYLES
import {
  Form,
  Input,
  Button,
  Card,
  PageHeader,
  Spin,
  Select
} from "antd";
import { makeField } from "../../Components/Common/Controls/MakeField";
import { projectActions } from "./ducks";
import Uploader from "../../Components/Common/Controls/Uploader";

const FormItem = Form.Item;
const AInputField = makeField(Input);
const ASelectField = makeField(Select);
const { Option } = Select;

const buttonItemLayout = null;

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};

const selectHandler = () => {
    console.log("")
  }
  

class Inputs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCourseList: "",
      dataLoading: false,
      newTitle: "",
      newDescription: "",
      newLevel: "",
      project:[
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
      ]
    };
  }


  handleSubmit = (values) => {
    const { productManagementActions } = this.props
    const projectDto = {
      jiraProjectName: values.jiraProjectName,
      projectCode: values.projectCode,
      projectName: values.projectName
    }
    console.log("Inputs ~ values", values)
    productManagementActions.Inputs({projectDto})
  };

  render() {
    const {handleSubmit,pristine, reset, submitting } = this.props;
    console.log("Inputs ~ render ~ this.props", this.props)

    const options = this.state.project.map((project,i)=>{
      return(
        <Option value={project.jiraCode}>{project.projectName}</Option>
      )
    })
    return (
      <div>
        <Card>
          <PageHeader className="site-page-header" title="Meeting Minutes" />
          <Spin spinning={this.state.dataLoading}>
            <Form layout={layout} onFinish={handleSubmit(this.handleSubmit)}>
                <FormItem {...layout} label="Transcript File " required>
                    <Uploader isAudio={true} />
                </FormItem>

                <FormItem {...buttonItemLayout}>
                    <Button
                        type="submit"
                        // disabled={pristine || submitting}
                        htmlType="submit"
                        style={{ marginRight: "10px" }}
                    >
                        <i className="fad fa-check-circle"></i>&nbsp;
                        Confirm
                    </Button>
                    <Button disabled={pristine || submitting} onClick={reset}>
                        <i className="fad fa-redo-alt"></i>&nbsp;
                        Reset
                    </Button>
                </FormItem>
            </Form>
           </Spin>
         </Card>
       </div>
    );
  }
}

const validate = (values) => {
    const errors = {};
    
    if (!values.sprint) {
      errors.sprint = "Sprint is required";
    }
    if (!values.projectCode) {
      errors.projectCode = "Project code is required";
    }
    if (!values.projectName) {
      errors.projectName = "Project name is required";
    }
    if (!values.jiraProjectName) {
      errors.jiraProjectName = "Project jira name is required";
    }
    return errors;
  };


const mapStateToProps = (state) => {
    return {
      fieldValues: getFormValues("Inputs")(state)
    };
  };
  
  function mapDispatchToProps(dispatch) {
    return {
      productManagementActions: bindActionCreators(projectActions,dispatch)
    };
  }
  
  export default withRouter(
    reduxForm({
      form: "Inputs",
      validate,
    })(connect(mapStateToProps, mapDispatchToProps)(Inputs))
  );
