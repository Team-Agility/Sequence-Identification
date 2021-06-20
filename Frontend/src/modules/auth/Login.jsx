import React, { Component } from "react";
import { withRouter } from "react-router";
import { Field, reduxForm , getFormValues } from "redux-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//STYLES
import {
    Form,
    Input,
    InputNumber,
    Button,
    Card,
    PageHeader,
    Divider,
    notification,
    Spin,
    Row,
    Col
  } from "antd";
  
  import { makeField } from "../../Components/Common/Controls/MakeField";
  
  const FormItem = Form.Item;
  const AInputField = makeField(Input);
  const buttonItemLayout = null;

  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 16,
    },
  };


class Login extends Component {
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
        console.log("CreateProject ~ values", values)
        this.props.history.push("/dashboard")
    };

    render() {
        const {handleSubmit,pristine, reset, submitting } = this.props;
        return (
           <Row>
               <Col xl={12} lg={12} md={12}sm={12} xs={24} style={{backgroundColor:"yellow", minHeight:1000}}>
                    
               </Col>

               <Col xl={12} lg={12} md={12}sm={12} xs={24} style={{backgroundColor:"green", minHeight:1000}}>
               <Card style={{margin:50}}>
                <Spin spinning={this.state.dataLoading}>
                <Form layout={layout} onFinish={handleSubmit(this.handleSubmit)}>
                        <FormItem {...layout} label="Email " required>
                            <Field
                                formItemLayout={layout}
                                name="email"
                                component={AInputField}
                                placeholder="Email"
                                hasFeedback
                            />
                            <span
                                style={{
                                    position: "absolute",
                                    right: "10px",
                                    bottom: "-37px",
                                }}
                                >
                            </span>
                        </FormItem>

                        <FormItem {...layout} label="Password" required>
                            <Field
                            formItemLayout={layout}
                            name="password"
                            component={AInputField}
                            placeholder="Passwprd"
                            type="password"
                            hasFeedback
                            />
                            <span
                                style={{
                                    position: "absolute",
                                    right: "10px",
                                    bottom: "-37px",
                                }}
                            >
                            </span>
                        </FormItem>

                        <FormItem {...buttonItemLayout} style={{textAlign:'center'}}>
                            <Button
                                type="primary"
                                disabled={pristine || submitting}
                                htmlType="submit"
                                style={{ marginRight: "10px" }}
                            >
                                <i className="fad fa-check-circle"></i>&nbsp;
                                Login
                            </Button>

                            {/* <Button disabled={pristine || submitting} onClick={reset}>
                                <i className="fad fa-redo-alt"></i>&nbsp;
                                Reset
                            </Button> */}
                        </FormItem>
                    </Form>
                </Spin>
                </Card>             
               </Col>
           </Row>
        )
    }
}

const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Name is required";
    }
    if (!values.email) {
        errors.email = "Email is required";
    }
    if (!values.contactNumber) {
        errors.contactNumber = "Contact number is required";
    }
    return errors;
  };


const mapStateToProps = (state) => {
    return {
      fieldValues: getFormValues("createMember")(state)
    };
  };
  
//   function mapDispatchToProps(dispatch) {
//     return {
//       productManagementActions: bindActionCreators(
//         productManagementActions,
//         dispatch
//       ),
//       dashboardProfileActions: bindActionCreators(
//         dashboardProfileActions,
//         dispatch
//       ),
//     };
//   }
  
  export default withRouter(
    reduxForm({
      form: "login",
      validate,
    })(connect(mapStateToProps, null)(Login))
  );

