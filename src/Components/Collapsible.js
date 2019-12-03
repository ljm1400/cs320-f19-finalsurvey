import React, { Component } from 'react';
import '../css/style.css';


export default class Collapsible extends React.Component {
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
        <div>
            <div onClick={(e) => this.togglePanel(e)} className="surveyResults">
                <div className="surveyTitle"  style={{color:'AQUA'}}> {this.props.title} </div>
                <div className='issuedDate'>{this.props.issueDate}</div>
                <div className='closingDate'>{this.props.closingDate}</div>
            </div>                 
            {this.state.open ? (<div className='surveyQuestions'>{this.props.children}</div>) : null }
        </div>);
    }

}