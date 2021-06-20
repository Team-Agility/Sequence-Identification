import React from 'react'
import { Card } from 'antd';
import Acts from './Acts';


function FeatureExtraction({data}) {
    console.log("FeatureExtraction ~ data", data)
    return (
        <Card title="Feature Extraction" >
            {
                data && data.map((seq,i)=>{
                    return(
                        <div>
                            <div>
                                <h3>Sequences : </h3>
                                <Acts data={seq.acts}/>
                            </div>

                            <p>Probability of Confidence : {seq.probConfidence} </p>
                            <p>Probability of Neutral : {seq.probNeutral} </p>
                            <p>Probability of un-confidence : {seq.probUnConfidence} </p>
                            <p>noOfSpeakers : {seq.noOfSpeakers} </p>
                            <p>noOfUtterances : {seq.noOfUtterances} </p>
                            <p>totalTimeDifference : {seq.totalTimeDifference} </p>
                            <p>overlappingTime : {seq.overlappingTime} </p>
                            <p>seqLength : {seq.seqLength} </p>



                        </div>
                    )
                })
            }
        </Card>
    )
}

export default FeatureExtraction
