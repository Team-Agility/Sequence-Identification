import React from 'react'
import { Card } from 'antd';

function AbstractiveSummery({data}) {
    console.log("AbstractiveSummery ~ data", data)
    return (
        <Card title="Meeting Summery" >
            {
                data && data.map((item,i)=>{
                    return(
                        <div>
                            <h3>{item.category}</h3>
                            {item.summery && item.summery.map((content,i)=>{
                                return(
                                    <p>{content}</p>
                                )
                            })}
                        </div>
                    )
                })
            }
        </Card>
    )
}

export default AbstractiveSummery
