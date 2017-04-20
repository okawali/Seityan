import * as React from "react";
import {TextField, DatePicker} from "material-ui"

export interface Form {
    name: string
    type: string
    tips: string
}

export interface AutoformProps {
    config: Form[]
}

export default class Autoform extends React.Component<AutoformProps, any> {

    renderForm(form: Form, key: number) {
        if (form.type == 'string') 
            return <TextField
                hintText={form.tips}
                floatingLabelText={form.name}
            />
        if (form.type == 'password') 
            return <TextField
                hintText={form.tips}
                floatingLabelText={form.name}
                type="password"
                />
        if (form.type == 'date') 
            return <DatePicker hintText={form.tips} container="inline" mode="landscape" />
        return <div key={key} />
    }

    render() {
        var result:any[] = []
        this.props.config.forEach((element, index) => {
            result.push(<p>{this.renderForm(element, index)}</p>);
        });

        return <div>
            {result}
        </div>
    }
}