import React from 'react'
import { Card } from 'antd';
import ImageHolder from "../Image/ImageHolder"
import Acts from '../Sequence/Acts';

function Summery({data}) {
    console.log("Summery - data : ", data)
    return (
        <div>
            {
                data.map((summery,i)=>{
                   return(
                    <Card title="Summery" >
                        <ImageHolder data ={summery.wordGraph}/>
                        <div>
                            <h3>Category : {summery.category}</h3>
                        </div>
                        <Acts data={summery.acts}/>

                        <div>
                            <h3>
                                Summery : {summery.summery}
                            </h3>
                        </div>

                    </Card>

                   )
                })
            }
        </div>
    )
}

export default Summery
