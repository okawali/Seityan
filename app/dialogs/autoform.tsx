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

    renderForm(form: Form) {
        if (form.type == 'String') 
            return <TextField
                hintText={form.tips}
                floatingLabelText={form.name}
            />  
        if (form.type == 'Password') 
            return <TextField
                hintText={form.tips}
                floatingLabelText={form.name}
                type="password"
                />
        if (form.type == 'Date') 
            return <DatePicker hintText={form.tips} container="inline" mode="landscape" />
        if (form.type == 'File')
            return <TextField type="file" name={form.name} hintText={form.tips} />
        if (form.type == 'Path')
            return <TextField />

        return <div/>
    }

    render() {
        var result:any[] = []
        console.log(this.props.config)
        this.props.config.forEach((element, index) => {
            result.push(<div key={index}>{this.renderForm(element)}</div>);
        });

        return <div>
            {result}
        </div>
    }
}