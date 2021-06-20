import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//STYLES
import {
  Button,
  Card,
  PageHeader,
  Spin,
  Steps, message
} from "antd";
import { projectActions } from "./ducks";
import { dummySteps } from "../../dummy";
import Transcript from "./OutputTypes/Transcript/Transcript";
import ImageHolder from "./OutputTypes/Image/ImageHolder";
import StringList from "./OutputTypes/String/StringList";
import Sequence from "./OutputTypes/Sequence/Sequence";




const { Step } = Steps;

class Process extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current:0,
      currentCourseList: "",
      dataLoading: false,
      newTitle: "",
      newDescription: "",
      newLevel: "",
      getMeetingsStatus:null,
      steps:[]
    };
  }

  componentDidMount(){
    const { projectActions, match } = this.props
    const id = match.params.id;
    
    projectActions.getMeetingStatus({id});
  }

  componentDidUpdate(prevProps, prevState){
    if(!this.props.getMeetingsStatus.loading && JSON.stringify(prevProps.getMeetingsStatus) != JSON.stringify(this.props.getMeetingsStatus)){

      this.setState({
        steps : this.props.getMeetingsStatus && this.props.getMeetingsStatus.data && this.props.getMeetingsStatus.data.data.steps
      })
    }
  }

  next = () => {
      this.setState({
          current: this.state.current+1
      })
  };

  prev = () => {
    this.setState({
        current: this.state.current-1
    })
  };

  render() {
    const { current, steps } = this.state
    const { getMeetingsStatus } = this.props

    console.log("Process ~ render ~ this.props", this.props)
    console.log("Process ~ render ~ this.state", this.state)

    if(getMeetingsStatus.loading){
      return(
        <div>
          Loading...
        </div>
      )

    }else{
      return (
        <Spin spinning={getMeetingsStatus.pending}>
          <Card>
            <PageHeader className="site-page-header" title="Process" />
  
            <React.Fragment>
              <Steps current={current}>
                {steps.map(step => (
                  <Step key={step.step} title={step.step} />
                ))}
              </Steps>
              <div className="steps-action" style={{paddingTop: 10, paddingBottom:10}}>
                  {current < steps.length - 1 && (
                  <Button type="primary" onClick={() => this.next()}>
                      Next
                  </Button>
                  )}
                  {current === steps.length - 1 && (
                  <Button type="primary" onClick={() => message.success('Processing complete!')}>
                      Done
                  </Button>
                  )}
                  {current > 0 && (
                  <Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>
                      Previous
                  </Button>
                  )}
              </div>
              {/* <div className="steps-content">{steps[current].content}</div> */}
              <div className="steps-content">
              {
                steps[current] && steps[current].type == "transcript" ? 
                  <Transcript data ={steps[current].data}/>
                  :
                  steps[current] &&  steps[current].type == "image" ? 
                    <ImageHolder data ={steps[current].data}/>
                  :
                  steps[current] &&  steps[current].type == "string_list" ? 
                  <StringList data ={steps[current].data}/>
                  :
                  steps[current] &&  steps[current].type == "sequence" ? 
                  <Sequence data ={steps[current].data}/>
                  :
                    null
              }
              </div>
            </React.Fragment>
            
           </Card>
         </Spin>
      );
    }
  }
}


const mapStateToProps = (state) => {
    return {
      getMeetingsStatus: state.Projects.getMeetingsStatus
    };
  };
  
  function mapDispatchToProps(dispatch) {
    return {
      projectActions: bindActionCreators(projectActions,dispatch)
    };
  }
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Process));
