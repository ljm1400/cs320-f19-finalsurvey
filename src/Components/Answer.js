import React, { Component } from 'react';
import '../css/style.css';


export default class Answer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            questionObj: this.props.questionObj,
            changeAnswers: this.props.changeAnswers,
            answers: []
        }
        this.togglePanel = this.togglePanel.bind(this);
    }
    handleChange(e) {

        this.state.changeAnswers(e)
    }
    togglePanel(e){
       this.setState({open: !this.state.open})
    }

    render() {
        const {changeAnswers} = this.props
        let questionType = this.state.questionObj.type
        
        if(questionType==="t") {
            questionType="text"
        } else if(questionType === "tr") {
            questionType="radio"
        } else if(questionType === "m") {
            questionType="radio"
        }
        return ( 
        /* pass in question object { num, name, type, options, category } */
        <div className="answer">
            <p>{this.state.questionObj.name}</p>
             <input type={questionType} onSubmit={e=>this.handleChange(e)} style={{margin:10, fontSize:20}} />
        </div>);
    }

}