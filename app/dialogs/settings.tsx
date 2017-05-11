import * as React from "react";
import { TextField, RaisedButton, TouchTapEvent, FlatButton } from "material-ui"
import axios from 'axios';
import { remote } from 'electron';
import { PluginsLoader } from '../../electronMain/pluginsLoader'

export default class Settings extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }
    componentDidMount() {
        this.update();
    }

    update() {
        let loader: PluginsLoader = remote.getGlobal('pluginLoader');
        let index = loader.listAll();
        let installed = loader.listInstalled();
        let list: any[] = []
        for (let i in index) {
            if (index[i]) {
                let isd = installed[index[i]!.name] ? true : false;
                list.push({ name: index[i]!.name, version: index[i]!.version, installed: isd });
            }
        }
        console.log(list);
        this.setState({ list: list });
    }

    onInstallClick(name: string) {
        let loader: PluginsLoader = remote.getGlobal('pluginLoader');
        loader.install(name).then(() => {
            this.update();
        });
    }

    onUnInstallClick(name: string) {
        let loader: PluginsLoader = remote.getGlobal('pluginLoader');
        loader.uninstall(name).then(() => {
            this.update();
        });
    }

    render() {
        var plist: any[] = [];
        for (var i of this.state.list) {
            plist.push(<div key={i.name}>
                {i.name}: {i.version} &nbsp;&nbsp;
                {i.installed ? (<FlatButton label='uninstall' onClick={() => this.onUnInstallClick(i.name)} />) : 
                    (<FlatButton label='install' onClick={() => this.onInstallClick(i.name)} />)}
            </div>);
        }

        return <div>
            {plist}
        </div>
    }
}