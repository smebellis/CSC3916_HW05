import React, { Component } from 'react';
import { fetchMovie } from "../actions/movieActions";
import { setReviews } from "../actions/reviewActions";
import {connect} from 'react-redux';
import {Card, ListGroup, ListGroupItem, Form, Button} from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs'
import { Image } from 'react-bootstrap';


class MovieDetail extends Component {

    constructor(props){
        super(props);
        this.setReview = this.setReview.bind(this);
        this.enterData = this.enterData.bind(this);

        this.state = {
            reviews : {
                comment : '',
                rating : Number,
            }
        };
    }

    setReview(event) {
        let setReview = Object.assign({}, this.state.reviews);

        setReview[event.target.id] = event.target.value;
        this.setState({
            reviews: setReview
        });
    }

    enterData(){
        const {dispatch} = this.props;
        dispatch(setReviews(this.state.reviews));
    }

    
    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.selectedMovie == null) {
            dispatch(fetchMovie(this.props.movieId));
        }
    }
     
    

    render() {
        const DetailInfo = () => {
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
                        <Form.Group controlId="Comment">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control onChange={this.setReview} value={this.state.reviews.comment} type="Text" placeholder="Enter Comment" />
                        </Form.Group>

                        <Form.Group controlId="Rating">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control onChange={this.setReview} value={this.state.reviews.rating}  type="Number" placeholder="Enter Rating" />
                        </Form.Group>
                        <Button onClick={this.enterData}>Submit</Button>
                     </Form>
                </Card>
               
            



            )
        }

        return (
            <DetailInfo />
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedMovie: state.movie.selectedMovie
    }
}

export default connect(mapStateToProps)(MovieDetail);

