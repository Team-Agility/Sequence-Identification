import React from 'react'

function Video({data}) {
console.log("Video ~ data", data)
    
    return (
        <div>
           <video width="320" height="240" controls>
                <source src={data} type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
        </div>
    )
}

export default Video
