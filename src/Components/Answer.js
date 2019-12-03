import React, { Component } from 'react';
import '../css/style.css';


export default class Answer extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            index: this.props.index,
            open: false,
            questionObj: this.props.questionObj,
            changeAnswers: this.props.changeAnswers,
            answer: null,
            tr: true,
            fa: false

        }
        this.togglePanel = this.togglePanel.bind(this);
    }
    handleChange(value) {
        this.state.changeAnswers(value, this.state.index)
    }
    handleCheckBoxChange(value) {
        if(value == "True") {
            this.setState({tr: true})
            this.setState({fa: false})
        } else {
            this.setState({fa: true})
            this.setState({tr: false})
        }
        this.state.changeAnswers(value, this.state.index)
    }
    togglePanel(e){
       this.setState({open: !this.state.open})
    }

    render() {
        let questionType = this.state.questionObj.type
        
        if(questionType==="Text") {
            return <input type={questionType}  onChange={e=>this.handleChange(e.target.value)} style={{margin:10, fontSize:20}} />
        } 
        else if(questionType === "True False") {
            return <div>
            <label><input type="checkbox" checked={this.state.tr} name="TR" class="radio" value="True" onChange={e=>this.handleCheckBoxChange(e.target.value)}/>True</label>
            <label><input type="checkbox" checked={this.state.fa} name="TR" class="radio" value="False" onChange={e=>this.handleCheckBoxChange(e.target.value)}/>False</label>
          </div>
        } 
        else if(questionType === "Multiple") {
            questionType="radio"
        } 
        else if(questionType == "Slider") {

        }
    }

}