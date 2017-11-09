import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
// import { Input, TextArea, FormBtn } from "../../components/Form";
import ScrapeBtn from "../../components/ScrapeBtn";
import Comments from "../../components/Comments";

class Stories extends Component {
  // Setting our component's initial state
  state = {
    stories: [],
    name: "",
    body: "",
    activeArticle: 123456
  };

  // When the component mounts, load all stories and save them to this.state.stories
  componentDidMount() {
    this.loadStories();
  }

  // Loads all stories  and sets them to this.state.stories
  //stories are listed based on article_id and will always print the newest first.
  loadStories = () => {
    API.getStories()
      .then(res =>
        this.setState({ stories: res.data, name: "", body: ""})
      )
      .catch(err => console.log(err));
  };

  // Deletes a story from the database with a given id, then reloads stories from the db
  deleteStory = id => {
    API.deleteStory(id)
      .then(res => this.loadStories())
      .catch(err => console.log(err));
  };

  scrape = () =>{
    API.scrape()
      .then(() =>{this.loadStories()});
  };

  loadComments = id => {
    this.setState({activeArticle: id});
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Blizzard News Stories</h1>
              <ScrapeBtn onClick={()=> this.scrape()}/>
            </Jumbotron>
            {this.state.stories.length ? (
              <List>
                {this.state.stories.map(story => {
                  return (
                    <ListItem key={story._id}>
                      <a href={"" + story.link} target="_blank">
                        <strong>
                          {story.game}: 
                        </strong>
                        <span> {story.title} </span>
                      </a>
                      <button onClick={()=> this.loadComments(story._id)}>
                        Comments
                      </button>
                      <DeleteBtn onClick={() => this.deleteStory(story._id)} />
                    </ListItem>
                  );
                })}
              </List>
            ) : (
            <div>
              <h3>No Stories to Display</h3>
              <span>Please click 'Get new Articles'</span>
            </div>
            )}
          </Col>
          <Col size="md-6">
            <Comments article_id={this.state.activeArticle}/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Stories;
