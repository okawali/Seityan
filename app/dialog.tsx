import * as React from "react";
import * as ReactDOM from "react-dom";
import {MuiThemeProvider, getMuiTheme} from 'material-ui/styles';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import {RaisedButton, FlatButton, Dialog} from "material-ui"
import * as injectTapEventPlugin from "react-tap-event-plugin"
import Autoform, {Form} from './dialogs/autoform'
import { ipcRenderer } from "electron";

injectTapEventPlugin();

class App extends React.Component<{}, {open:boolean, options: Form[]}> {
    constructor(props?: {}, context?: any) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
    }
    private id;
    state = {
        open: false,
        options: []
    };

    componentDidMount() {
        ipcRenderer.on("showDialog", this.onShowDialog.bind(this))
        ipcRenderer.send('dialogFinishedLoading');
    }

    handleOpen() {
        this.setState({open: true});
    };

    handleClose(cancel = false) {
        this.setState({open: false});
        let ans: any[] = [] 
        if (!cancel)
            ans = (this.refs.form as Autoform).getValue();
        ipcRenderer.send("onDialogClose", this.id, ans);
    };



    onShowDialog(event: Electron.IpcRendererEventListener, options: Form[], id: string) {
        this.id = id;
        this.setState({options: options, open: true});
    }

    render() {
        const actions = [
        <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={() => this.handleClose(true)}
        />,
        <FlatButton
            label="Submit"
            primary={true}
            onTouchTap={() => this.handleClose()}
        />,
        ];

        return (
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <Dialog
                    title="Dialog With Actions"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                    overlayStyle={{background: null}}
                >
                    <Autoform ref="form" config={this.state.options}/>
                </Dialog>
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("dialog"));