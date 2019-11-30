import React, { Component } from 'react';
import '../css/style.css';


export default class Answer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
        this.togglePanel = this.togglePanel.bind(this);
    }

    togglePanel(e){
       this.setState({open: !this.state.open})
    }

    render() {
        return ( 
        /* pass in question object 
                num, name, type, options, category
        {num: 1, name: "how satisfied are you?", type: text, 
            options: ["not satisfied", "satisfied"], category: workload} 
        }
        */
        <div className="answer">
            {this.props.question.name}
            {this.props.question.type}
             <input type="text" style={{margin:10, fontSize:20}}/>
        </div>);
    }

}