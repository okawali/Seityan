import * as React from "react";
import "./fixDatePicker";
import {TextField, DatePicker, RaisedButton} from "material-ui"
import FileSelector from './fileSelector'
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
            return <TextField ref={form.name}
                hintText={form.tips}
                floatingLabelText={form.name}
            />  
        if (form.type == 'Password') 
            return <TextField ref={form.name}
                hintText={form.tips}
                floatingLabelText={form.name}
                type="password"
                />
        if (form.type == 'Date') 
            return <DatePicker ref={form.name} floatingLabelText={form.name} hintText={form.tips} container="inline" mode="landscape" />
        if (form.type == 'File')
            return <FileSelector ref={form.name} floatingLabelText={form.name} hintText={form.tips}/>
                
        if (form.type == 'Path')
            return <TextField />

        return <div/>
    }

    getValue() {
        var result:any[] = []
        this.props.config.forEach((element, index) => {
            let ref:any = this.refs[element.name];
            console.log(ref.getValue());
            result.push(ref.getValue());
        });
        return result
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