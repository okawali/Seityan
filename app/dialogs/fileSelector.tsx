import * as React from "react";
import { TextField, RaisedButton } from "material-ui"
import { remote } from 'electron'

export default class FileSelector extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.onFileSelected = this.onFileSelected.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    state = { path: "" }
    handleChange = (event: any) => {
        this.setState({
            value: event.target.value,
        });
    };

    onFileSelected(event: any) {
        remote.dialog.showOpenDialog({ title: '选择本地文件', properties: ['openFile'] }, (files) => {
            for (let f of files) {
                this.setState({ path: f });
                return;
            }
        })
    }

    getValue() {
        return this.state.path;
    }

    render() {
        return <div>
            <TextField value={this.state.path} onChange={this.handleChange}
                floatingLabelText={this.props.floatingLabelText} name='filepath' />
            <RaisedButton style={{ marginLeft: 5 }}
                containerElement='label' // <-- Just add me!
                label='选择文件...' onClick={this.onFileSelected}>
            </RaisedButton>
        </div>
    }
}