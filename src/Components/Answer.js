import React, { Component } from 'react';
import '../css/style.css';
import {Slider} from "@material-ui/core"

const marks = [
    {
      value: 0,
      label: '1',
    },
    {
      value: 25,
      label: '2',
    },
    {
      value: 50,
      label: '3',
    },
    {
      value: 75,
      label: '4',
    },
    {
      value: 100,
      label: '5',
    },
  ];
export default class Answer extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            index: this.props.index,
            open: false,
            questionObj: this.props.questionObj,
            changeAnswers: this.props.changeAnswers,
            answer: null,
            tr: false,
            fa: false,
            one: false,
            two: false,
            three: false,
            four: false
        }
        this.togglePanel = this.togglePanel.bind(this);
        
    }
    
    handleChange(value) {
        this.state.changeAnswers(value, this.state.index)
    }
    handleCheckBoxChange(value) {
        if(value == "True") {
            this.setState({
                tr: true,
                fa: false
            })
        } else {
            this.setState({
                fa: true,
                tr: false
            })
        }
        this.state.changeAnswers(value, this.state.index)
    }

    handleMC(value){
        if(this.state.questionObj.options[0] && value === this.state.questionObj.options[0]){
            this.setState({
                one: true,
                two: false,
                three: false,
                four: false
            })
        }
        if(this.state.questionObj.options[1] && value === this.state.questionObj.options[1]){
            this.setState({
                one: true,
                two: true,
                three: false,
                four: false
            })
        }
        if(this.state.questionObj.options[2] && value === this.state.questionObj.options[2]){
            this.setState({
                one: true,
                two: false,
                three: true,
                four: false
            })
        }
        if(this.state.questionObj.options[3] && value === this.state.questionObj.options[3]){
            this.setState({
                one: true,
                two: false,
                three: true,
                four: false
            })
        }
        this.state.changeAnswers(value, this.state.index)
    }

    handleSlider(event, value){
        let answer = ""
        if(value === -1){
            answer = "No Answer"
        }
        if(value === 0){
            answer = "Strongly Disagree"
        }
        if(value === 25){
            answer = "Somewhat Disagree"
        }
        if(value === 50){
            answer = "No Opinion"
        }
        if(value === 75){
            answer = "Somewhat Agree"
        }
        if(value === 100){
            answer = "Strongly Agree"
        }
        console.log(answer)
        this.state.changeAnswers(answer, this.state.index)
    }
    togglePanel(e){
       this.setState({open: !this.state.open})
    }
    
    valuetext(value) {
        return `${value}`;
      }
      
    valueLabelFormat(value) {
        return marks.findIndex(mark => mark.value === value) + 1;
      }

    render() {
        let questionType = this.state.questionObj.type
        
        if(questionType==="Text") {
            return <input type={questionType}  onChange={e=>this.handleChange(e.target.value)} style={{margin:10, fontSize:20}} />
        } 
        else if(questionType === "True False") {
            return <div>
            <label><input type="checkbox" checked={this.state.tr} name="TR" class="radio" value="True" onChange={e=>this.handleCheckBoxChange(e.target.value)}/>True</label>
            <label><input type="checkbox" checked={this.state.fa} name="FA" class="radio" value="False" onChange={e=>this.handleCheckBoxChange(e.target.value)}/>False</label>
          </div>
        } 
        else if(questionType === "Multiple Choice") {
           return <div>
            {this.state.questionObj.options[0] ?
            <label><input type="checkbox" checked={this.state.one} name="one" class="radio" 
            value={this.state.questionObj.options[0]} onChange={e=>this.handleMC(e.target.value)}/>
            {this.state.questionObj.options[0]}</label>: ""}

            {this.state.questionObj.options[1] ?
            <label><input type="checkbox" checked={this.state.two} name="two" class="radio" value={this.state.questionObj.options[1]} onChange={e=>this.handleMC(e.target.value)}/>{this.state.questionObj.options[1]}</label>: ""}
            {this.state.questionObj.options[2] ?
            <label><input type="checkbox" checked={this.state.three} name="three" class="radio" value={this.state.questionObj.options[2]} onChange={e=>this.handleMC(e.target.value)}/>{this.state.questionObj.options[3]}</label>: ""}
            {this.state.questionObj.options[3] ?
            <label><input type="checkbox" checked={this.state.four} name="four" class="radio" value={this.state.questionObj.options[3]} onChange={e=>this.handleMC(e.target.value)}/>{this.state.questionObj.options[4]}</label>: ""}
           </div>
        } 
        else if(questionType == "Slider") {
            return<div><Slider
                valueLabelFormat={this.valueLabelFormat}
                getAriaValueText={this.valuetext}
                aria-labelledby="discrete-slider-restrict"
                step={null}
                valueLabelDisplay="off"
                marks={marks}
                onChange= { (event, value) => this.handleSlider(event,  value) }
            />
            <label>1: Strongly Disagree,  3: No Opinion, 5: Strongly Agree</label>
            </div>
        }
    }

}