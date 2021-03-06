import React, {Component} from "react";
import "./Comments.css";
import Jumbotron from "../Jumbotron";
import API from "../../utils/API";
import {Input, TextArea, FormBtn} from "../Form";
import {List, ListItem} from "../List";
import CommentHistory from "../CommentHistory";

class Comments extends Component {

	state = {
		article: {note:[]}
		,name: ""
		,body: ""
		,activeArticleId: ""
	}
	//When the component mounts load all comments for the active article.
	componentDidMount() {
		this.loadComments();
	}

	componentWillReceiveProps(nextProps){
		this.setState({activeArticleId:nextProps.article_id}, () => {this.loadComments();});
	}

	loadComments = () => {
		API.getStory(this.state.activeArticleId)
			.then( res => {
				this.setState({article: res.data, body: ""});
				console.log("got story!", res.data);
			})
			.catch(err => console.log(err));
	}

	handleInputChange = (event) =>{
		const { name, value} = event.target;
		this.setState({[name]: value});
	}

	handleFormSubmit = (event) => {
		event.preventDefault();
		if(this.state.name && this.state.body){
			API.addComment({
				name:this.state.name,
				body: this.state.body
			}, this.state.activeArticleId)
			.then(res => this.loadComments())
			.catch(err => console.log(err));
		}
	}

	render(){
		return (
			<div>
				<Jumbotron>
					<span>Disscussion about </span>
					<h1>{this.state.article.title}</h1>
				</Jumbotron>
				<form>
					<Input
						value={this.state.name}
						onChange={this.handleInputChange}
						name="name"
						placeholder="Name (required)" 
					/>
					<TextArea
					value={this.state.body}
					onChange={this.handleInputChange}
					name="body"
					placeholder="Write your comment here (required)"
					/>
					<FormBtn
		                disabled={!(this.state.name && this.state.body)}
		                onClick={this.handleFormSubmit}
		            > Submit Comment </FormBtn>
				</form>
				<CommentHistory />
			</div>
		)
	}
}

export default Comments;