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
  Select,
  Upload
} from "antd";
import { makeField } from "../../Components/Common/Controls/MakeField";
import { projectActions } from "./ducks";
import Uploader from "../../Components/Common/Controls/Uploader";
import UploadFileContent from "../../Components/Common/UploadFileContent";
import { UploadOutlined } from '@ant-design/icons';

const FormItem = Form.Item;
const AInputField = makeField(Input);
const ASelectField = makeField(Select);
const { Option } = Select;
const { TextArea } = Input;
const ATextAreaField = makeField(TextArea);


const buttonItemLayout = null;

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};

const uploaderProps = {
  progress: {
    strokeColor: {
      '0%': '#108ee9',
      '100%': '#87d068',
    },
    strokeWidth: 3,
    format: percent => `${parseFloat(percent.toFixed(2))}%`,
  },
};

class Inputs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCourseList: "",
      dataLoading: false,
      newTitle: "",
      newDescription: "",
      newLevel: "",
      progress:0,
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
    const { projectActions } = this.props
    const createJobDto = {
      transcript: JSON.parse(values.transcript)
    }
    console.log("Inputs ~ values", values)
    console.log("Inputs ~ createJobDto", createJobDto)

    
    projectActions.createJob({createJobDto})
  };

  render() {
    const {handleSubmit, createJob, projectActions } = this.props;
    console.log("Inputs ~ render ~ this.props", this.props)

    return (
      <div>
        <Card>
          <PageHeader className="site-page-header" title="Meeting Minutes" />
          <Spin spinning={createJob.pending}>
            <Form layout={layout} onFinish={handleSubmit(this.handleSubmit)}>
                <FormItem {...layout} label="Transcript File " required>
                  <Upload
                    accept=".json, .csv"
                    showUploadList={true}
                    beforeUpload={file => {
                        const reader = new FileReader();
                        reader.onload = e => {
                            // debugger
                            console.log(e.target.result);
                            const createJobDto = {
                              transcript: JSON.parse(e.target.result)
                            }
                            projectActions.createJob({createJobDto})

                        };
                        reader.readAsText(file);
                       
                        // Prevent upload
                        return false;
                    }}
                >
                      <Button icon={<UploadOutlined />}>
                         Click to Upload
                    </Button>
                </Upload>
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
    
    if (!values.transcript) {
      errors.transcript = "Transcript is required";
    }
    return errors;
  };


const mapStateToProps = (state) => {
    return {
      createJob:state.Projects.createJob
    };
  };
  
  function mapDispatchToProps(dispatch) {
    return {
      projectActions: bindActionCreators(projectActions,dispatch)
    };
  }
  
  export default withRouter(
    reduxForm({
      form: "Inputs",
      validate,
    })(connect(mapStateToProps, mapDispatchToProps)(Inputs))
  );
