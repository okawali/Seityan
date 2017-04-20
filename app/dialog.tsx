import * as React from "react";
import * as ReactDOM from "react-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {RaisedButton, FlatButton, Dialog} from "material-ui"
import * as injectTapEventPlugin from "react-tap-event-plugin"

injectTapEventPlugin();

class App extends React.Component<{}, {}> {
    constructor(props?: {}, context?: any) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
    }
    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

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
            <MuiThemeProvider>
                <div>
                    <RaisedButton label="click me" onTouchTap={this.handleOpen} />
                    <Dialog
                        title="Dialog With Actions"
                        actions={actions}
                        modal={true}
                        open={this.state.open}
                        overlayStyle={{background: null}}
                    >
                        Only actions can close this dialog.
                    </Dialog>
                </div>
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("dialog"));