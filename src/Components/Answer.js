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
        if(questionType==="t") {
            questionType="text"
        } else if(questionType==="tr") {
            questionType="radio"
        }
        return ( 
        /* pass in question object { num, name, type, options, category } */
        <div className="answer">
            <p>{'Question ' + this.state.questionObj.num}) {this.state.questionObj.name}</p>
            <p>{'Category: ' + this.state.questionObj.category}</p>
             <input type={questionType} target = "answer" onChange={e=>this.handleChange(e.target.value)} style={{margin:10, fontSize:20}} />
        </div>);
    }

}