import * as React from "react";
import {TextField, DatePicker, RaisedButton} from "material-ui"

export interface WeatherProps {
    config: any
}

export default class Weather extends React.Component<WeatherProps, any> {
    render() {
        console.log(this.props.config);
        let date = this.props.config.date;
        let data = this.props.config.data;
        let last_update = data.last_update;
        let daily:any[] = data.daily;
        let today = daily[date];
        let time = new Date();
        let img_url = "assets/weather-icons/" + ((time.getHours() >= 18 || time.getHours() < 6) ? today.code_night : today.code_day) + ".png";
        let text = ((time.getHours() >= 18 || time.getHours() < 6) ? today.text_night : today.night_day);
        return <div>
            <div style={{height: 600}}>
                <div style={{height: 300, textAlign: 'center'}}>
                    <img src={img_url} alt={text}/>
                    <h3 style={{marginTop: -40}}>{text}</h3>
                    <h1 style={{fontSize: 56, fontWeight: "lighter", margin: "-10px -20px 0px 0px"}}>{today.high}°</h1>
                    <h3>{today.wind_direction}风 {today.wind_scale}级</h3>
                </div>
                <hr/>
                <div>
                    {daily.map((data, index) => {
                        return this.renderOneDay(data, index);
                    })}
                </div>
            </div>
        </div>
    }

    renderOneDay(data, index: number) : JSX.Element {
        let img_url =  "assets/weather-icons/" + data.code_day + ".png";
        return <div key={index} style={{width: "33.333%", height: 200, textAlign: 'center', display:'inline-block'}}>
            <img src={img_url} alt={data.text_day} style={{width: 50}}/>
            <div>{data.text_day}</div>
            <div style={{fontWeight: "lighter"}}>{data.low}°/{data.high}°</div>
            <div>{data.wind_direction}风 {data.wind_scale}级</div>
        </div>
    }

}