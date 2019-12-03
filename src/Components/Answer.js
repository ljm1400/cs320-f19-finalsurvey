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
            answer: null
        }
        this.togglePanel = this.togglePanel.bind(this);
    }
    handleChange(value) {

        this.state.changeAnswers(value, this.state.index)
    }
    togglePanel(e){
       this.setState({open: !this.state.open})
    }

    render() {
        let questionType = this.state.questionObj.type
        
        if(questionType==="Text") {
            questionType="text"
        } else if(questionType === "True False") {
            questionType="radio"
        } else if(questionType === "Multiple") {
            questionType="radio"
        } else if(questionType == "Slider") {
            
        }
        return ( 
        /* pass in question object { num, name, type, options, category } */
        <div className="answer">
            
             <input type={questionType}  onChange={e=>this.handleChange(e.target.value)} style={{margin:10, fontSize:20}} />
        </div>);
    }

}