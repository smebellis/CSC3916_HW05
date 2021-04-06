import React, { Component } from 'react';
import { addReview, fetchMovie } from "../actions/movieActions";
import {connect} from 'react-redux';
import {Card, ListGroup, ListGroupItem, Form, Button} from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs'
import { Image } from 'react-bootstrap';


class MovieDetail extends Component {

    constructor(props){
        super(props);
        console.log('props', props);
        
        this.updateDetails = this.updateDetails.bind(this);
        this.submitReview = this.submitReview.bind(this);
        
        //this.updateReview = this.updateReview.bind(this);
        //this.updateRating =  this.updateRating.bind(this);
        
        this.state = {
            details : {
                title: '',              
                comment : '',
                rating : 0
            }
        }
       
    }

    submitReview(){
        //this.setState.details.title = this.props.selectedMovie.title;
        //this.setState.details.rating = this.rating;
        //this.setState.details.review = this.review;

        const {dispatch} = this.props;
        if(this.state.details.comment === "" || this.state.details.rating === 0){
            alert("No rating or review")
        }else {
            dispatch(addReview(this.state.details));
        }
        
    }

    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.selectedMovie == null) {
            dispatch(fetchMovie(this.props.movieId));
        }
    }

    /*updateReview(event) {
        this.review = event.target.value;
    }

    updateRating(event){
        this.rating = event.target.value
    }*/

    updateDetails(event) {
        let updateDetails = Object.assign({}, this.state.details);

        updateDetails[event.target.id] = event.target.value;
        updateDetails['title'] = this.props.selectedMovie.title;
        this.setState({
            details: updateDetails
        });
    }

        
    render() {
        //const DetailInfo = () => {
            if (!this.props.selectedMovie) {
                return <div>Loading....</div>
            }

            return (
                <Card>
                    <Card.Header>Movie Detail</Card.Header>
                    <Card.Body>
                        <Image className="image" src={this.props.selectedMovie.imageUrl} thumbnail />
                    </Card.Body>
                    <ListGroup>
                        <ListGroupItem>{this.props.selectedMovie.title}</ListGroupItem>
                        <ListGroupItem>
                            {this.props.selectedMovie.actors.map((actor, i) =>
                                <p key={i}>
                                    <b>{actor.actor_name}</b> {actor.character_name}
                                </p>)}
                            </ListGroupItem>
                        <ListGroupItem><h4><BsStarFill/> {this.props.selectedMovie.AverageReviews}</h4></ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        {this.props.selectedMovie.MovieReview.map((review, i) =>
                            <p key={i}>
                                <b>{review.username}</b>&nbsp; {review.comment}
                                &nbsp;  <BsStarFill /> {review.rating}
                            </p>
                        )}
                    </Card.Body>
                    <Card.Header>Add a Review</Card.Header>
                    <Form className='form-horizontal'>
                        <Form.Group controlId="comment">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control onChange={this.updateDetails} value={this.state.details.comment} type="Text" placeholder="Enter Comment" />
                        </Form.Group>

                        <Form.Group controlId="rating">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control onChange={this.updateDetails} value={this.state.details.rating}  type="Number" min="1" max="5" placeholder="Enter Rating" />
                        </Form.Group>
                        <Button onClick={this.submitReview}>Submit</Button>
                    </Form>
                </Card>
               
            



            )
        }

//     //     return (
//     //         <DetailInfo />
//     //     )
//     // }
}

const mapStateToProps = (state) => {
    console.log()
    return {
        selectedMovie: state.movie.selectedMovie
        
    }
}

export default connect(mapStateToProps)(MovieDetail);

