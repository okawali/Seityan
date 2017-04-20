import * as React from "react";
import * as ReactDOM from "react-dom";
import {MuiThemeProvider, getMuiTheme} from 'material-ui/styles';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import {RaisedButton, FlatButton, Dialog} from "material-ui"
import * as injectTapEventPlugin from "react-tap-event-plugin"
import Autoform, {AutoformProps} from './dialogs/autoform'
import { ipcRenderer } from "electron";

injectTapEventPlugin();

class App extends React.Component<{}, {open:boolean, options: AutoformProps | undefined}> {
    constructor(props?: {}, context?: any) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
    }
    private id;
    state = {
        open: false,
        options: undefined
    };

    componentDidMount() {
        ipcRenderer.on("showDialog", this.onShowDialog.bind(this))
    }

    handleOpen() {
        this.setState({open: true});
    };

    handleClose() {
        this.setState({open: false});
        ipcRenderer.send("onDialogClose", this.id, [], 'error');
    };

    onShowDialog(options: AutoformProps, id: string) {
        this.id = id;
        this.setState({options: options, open: true});
    }

    render() {
        const actions = [
        <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={this.handleClose}
        />,
        <FlatButton
            label="Submit"
            primary={true}
            disabled={true}
            onTouchTap={this.handleClose}
        />,
        ];

        return (
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <div>
                    <RaisedButton label="click me" onTouchTap={this.handleOpen} />
                    <Dialog
                        title="Dialog With Actions"
                        actions={actions}
                        modal={true}
                        open={this.state.open}
                        overlayStyle={{background: null}}
                    >
                        <Autoform config={[
                            {name: '用户名', type: 'string', tips: '输入您的用户名'},
                            {name: '密码', type: 'password', tips: '输入您的密码'},
                            {name: '日期', type: 'date', tips: '当前日期'},
                        ]} />
                    </Dialog>
                </div>
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("dialog"));