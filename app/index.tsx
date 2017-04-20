import * as React from "react";
import * as ReactDOM from "react-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton  from "material-ui/RaisedButton"
import * as injectTapEventPlugin from "react-tap-event-plugin"

injectTapEventPlugin();

class App extends React.Component<{}, {}> {
    constructor(props?: {}, context?: any) {
        super(props, context);
    }

    render() {
        return (
            <MuiThemeProvider>
                <RaisedButton label="click me" />
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("dialog"));