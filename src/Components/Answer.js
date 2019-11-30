import React, { Component } from 'react';
import '../css/style.css';


export default class Answer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            questionObj: this.props.questionObj,
            answers: []
        }
        this.togglePanel = this.togglePanel.bind(this);
    }

    togglePanel(e){
       this.setState({open: !this.state.open})
    }

    render() {
        let questionType = this.state.questionObj.type
        if(questionType="t") {
            questionType="text"
        } else if(questionType="tr") {
            questionType="radio"
        }

        function handleChange(e) {
            this.props.changeAnswers(e)
        }

        return ( 
        /* pass in question object { num, name, type, options, category } */
        <div className="answer">
            <p>{'Question ' + this.state.questionObj.num}) {this.state.questionObj.name}</p>
            <p>{'Category: ' + this.state.questionObj.category}</p>
             <input type={questionType} onChange={e=>handleChange(e)} style={{margin:10, fontSize:20}} />
        </div>);
    }

}