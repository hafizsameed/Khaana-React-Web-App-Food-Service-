import React from 'react';

import StarRatingComponent from 'react-star-rating-component';
 
class Ratings extends React.Component {
    state={
        rating : 3
    }
  render() {
    const { rating } = this.state;
 
    return (                
      <div>
        <StarRatingComponent 
          name="rate2" 
          editing={false}
          renderStarIcon={() => <span className="fa fa-star-o"></span>}
          starCount={4}
          value={this.props.ratingVal}
        />
      </div>
    );
  }
}
export default Ratings