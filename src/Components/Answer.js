import React, { Component } from 'react';
import '../css/style.css';


export default class Answer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            questionObj: this.props.questionObj
        }
        this.togglePanel = this.togglePanel.bind(this);
    }

    togglePanel(e){
       this.setState({open: !this.state.open})
    }

    render() {
        let questionType = ""
        if(this.state.questionObj.type="t") {
            questionType="text"
        }
        return ( 
        /* pass in question object 
                num, name, type, options, category
        {num: 1, name: "how satisfied are you?", type: text, 
            options: ["not satisfied", "satisfied"], category: workload} 
        }
        */
        <div className="answer">
            <p>{'Question ' + this.state.questionObj.num}) {this.state.questionObj.name}</p>
            <p>{'Category: ' + this.state.questionObj.category}</p>
             <input type={questionType} style={{margin:10, fontSize:20}}/>
        </div>);
    }

}