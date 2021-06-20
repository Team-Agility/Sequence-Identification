import React from 'react'
import ImageHolder from './ImageHolder'

export default function ImageArrayHolder({data}) {
    console.log("ImageArrayHolder : ", data)
    return (
        <React.Fragment>
            {
                data.map((image, i)=>{
                    return(
                       <React.Fragment key={i}>
                            <ImageHolder data ={image}/>
                            <br/>
                        </React.Fragment>
                    )
                })
            }
          
        </React.Fragment>
       
    )
}
