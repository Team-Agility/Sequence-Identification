import React, { Component } from 'react'

class UploadFileContent extends Component {
    constructor(props) {
        super(props)
    }
      
    uploadFile=(event)=> {
    console.log("🚀 ~ file: UploadFileContent.js ~ line 9 ~ UploadFileContent ~ event", event)
        let file = event.target.files[0];
        console.log(file);

        if (file) {
        let data = new FormData();
        data.append('file', file);
        console.log("----------------");
        console.log(data);
        console.log("----------------");

        // axios.post('/files', data)...
        }
    }

    render() {
        return (
            <span>
                <input type="file"
                name="myFile"
                onChange={this.uploadFile} />
            </span>
        )
    }
}

export default UploadFileContent
