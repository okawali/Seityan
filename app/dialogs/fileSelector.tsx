import * as React from "react";
import {TextField, RaisedButton, TouchTapEvent} from "material-ui"
import {remote} from 'electron'

export default class FileSelector extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.onFileSelected = this.onFileSelected.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    state = {path: ""}
    handleChange = (event) => {
        this.setState({
          value: event.target.value,
        });
      };

    onFileSelected(event: TouchTapEvent) {
        remote.dialog.showOpenDialog({title: '播放本地视频', properties: ['openFile']}, (files) => {
            for (let f of files) {
                this.setState({path: f});
                return;
            }
        })
    }

    render() {
        return <div>
            <TextField value={this.state.path} onChange={this.handleChange} 
                floatingLabelText={this.props.floatingLabelText} name='filepath' /> 
            <RaisedButton style={{marginLeft: 5}}
                containerElement='label' // <-- Just add me!
                label='选择文件...' onTouchTap={this.onFileSelected}>
            </RaisedButton>
        </div>
    }
}