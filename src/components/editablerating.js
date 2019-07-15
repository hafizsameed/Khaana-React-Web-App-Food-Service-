import React from 'react';
import ReactDOM from 'react-dom';
import StarRatingComponent from 'react-star-rating-component';
 
class EditableRating extends React.Component {
  constructor() {
    super();
 
    this.state = {
      rating: 1
    };
  }
 
  onStarClick(nextValue, prevValue, name) {
    console.log('clicked on star')
    this.setState({rating: nextValue});
  }
 
  render() {
    const { rating } = this.state;
    
    return (                
      <div>
        <StarRatingComponent 
          name="rate1" 
          starCount={4}
          value={this.props.ratingVal}
          onStarClick={this.onStarClick.bind(this)}
        />
      </div>
    );
  }
}
 
export default EditableRating