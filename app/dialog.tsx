import * as React from "react";
import * as ReactDOM from "react-dom";
import {MuiThemeProvider, getMuiTheme} from 'material-ui/styles';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import {RaisedButton, FlatButton, Dialog} from "material-ui"
import * as injectTapEventPlugin from "react-tap-event-plugin"
import Autoform, {Form} from './dialogs/autoform'
import Weather from './dialogs/weather'
import { ipcRenderer } from "electron"

injectTapEventPlugin();

export interface WeatherConfig {
    date: number  // 0 is today, 1 tomorrow, 2 the day after tomorrow
    data: any 
}

export interface DialogConfig {
    title?: string
    form?: Form[]
    weather?: WeatherConfig
}

class App extends React.Component<{}, {open:boolean, options: DialogConfig, type: string}> {
    constructor(props?: {}, context?: any) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
    }
    private id;
    state = {
        open: false,
        type: "form",
        options: {} as DialogConfig
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

    onShowDialog(event: any, options: DialogConfig, id: string) {
        this.id = id;
        var type = "";
        if (options.form) type = "form";
        if (options.weather) type = "weather" 
        this.setState({options: options, open: true, type: type});
    }

    render() {
        let actions:any[] = [];
        if (this.state.type == 'form') {
            actions.push(
                <FlatButton
                    label="Cancel"
                    primary={true}
                    onTouchTap={() => this.handleClose(true)}
                />,
                <FlatButton
                    label="Submit"
                    primary={true}
                    onTouchTap={() => this.handleClose()}
                />);
        } else  if (this.state.type == 'weather') {
            actions.push(
                <FlatButton
                    label="OK"
                    primary={true}
                    onTouchTap={() => this.handleClose(true)}
                />);
        }


        return (
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <Dialog
                    title={this.state.options.title ? this.state.options.title : ""}
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                    overlayStyle={{background: null}}
                >
                    {this.state.type == 'form' ? <Autoform ref="form" config={this.state.options.form!}/> : null}
                    {this.state.type == 'weather' ? <Weather config={this.state.options.weather!}/> : null}
                </Dialog>
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("dialog"));