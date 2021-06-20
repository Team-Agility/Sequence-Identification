import React from 'react'
import { Card } from 'antd';
import ImageHolder from "../Image/ImageHolder"
import Acts from '../Sequence/Acts';

function ConfidenceSequence({data}) {
    console.log("ConfidenceSequence - data : ", data)
    return (
        <div>
            {
                data && data.map((seq,i)=>{
                    return(
                        <div key={i}>
                            Title : {seq.title}
                            {
                                seq && seq.acts.map((act, j)=>{
                                    return(
                                        <div>
                                            <p>Act : {act.act}</p>
                                            <p>Confident : {act.confidence}</p>
                                        </div>
                                    )
                                })
                            }
                              <hr />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ConfidenceSequence
