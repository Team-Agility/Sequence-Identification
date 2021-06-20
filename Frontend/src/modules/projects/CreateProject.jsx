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

const Option = Select.Option;
const FormItem = Form.Item;
const AInputField = makeField(Input);
const ASelectField = makeField(Select);


const buttonItemLayout = null;

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};

class CreateProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCourseList: "",
      dataLoading: false,
      newTitle: "",
      newDescription: "",
      newLevel: "",
    };
  }


  handleSubmit = (values) => {
    const { projectActions } = this.props
    const projectDto = {
      projectName: values.projectName,
      jiraCode: values.jiraCode,
      description: values.description
    }
    console.log("CreateProject ~ values", values)
    projectActions.createProject({projectDto})
  };

  render() {
    const {handleSubmit,pristine, reset, submitting } = this.props;
    console.log("CreateProject ~ render ~ this.props", this.props)
    return (
      <div>
        <Card>
          <PageHeader className="site-page-header" title="Add New Project" />
          <Spin spinning={this.state.dataLoading}>
            <Form layout={layout} onFinish={handleSubmit(this.handleSubmit)}>
               <FormItem {...layout} label="Project Name" required>
                    <Field
                        formItemLayout={layout}
                        name="projectName"
                        component={AInputField}
                        placeholder="Project Name"
                        hasFeedback
                    />
                </FormItem>

                <FormItem {...layout} label="Jira Code " required>
                    <Field
                        formItemLayout={layout}
                        name="jiraCode"
                        component={AInputField}
                        placeholder="Jira Code"
                        hasFeedback
                    />
                </FormItem>

                <FormItem {...layout} label="Description" required>
                    <Field
                        formItemLayout={layout}
                        name="description"
                        component={AInputField}
                        placeholder="Description"
                        hasFeedback
                    />
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
    if (!values.projectName) {
      errors.projectName = "Project name is required";
    }
    if (!values.jiraCode) {
      errors.jiraCode = "Jira code is required";
    }
    if (!values.description) {
      errors.description = "Description is required";
    }
    return errors;
  };


const mapStateToProps = (state) => {
    return {
      fieldValues: getFormValues("createProject")(state)
    };
  };
  
  function mapDispatchToProps(dispatch) {
    return {
      projectActions: bindActionCreators(projectActions,dispatch)
    };
  }
  
  export default withRouter(
    reduxForm({
      form: "createProject",
      validate,
    })(connect(mapStateToProps, mapDispatchToProps)(CreateProject))
  );
