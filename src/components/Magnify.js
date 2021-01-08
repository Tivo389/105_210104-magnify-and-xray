import React, { Component } from 'react';
import limeExteriorMini from '../images/lime-exterior-mini.jpg';
import limeExterior from '../images/lime-exterior.jpg';


class Magnify extends Component {
  // COMPONENT VARIABLES
  state = { foo: true };
  // - As a state it would require setState(), resulting in a rapid-rendering.
  bar = false;

  // LIFECYCLE METHODS
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}

  // RENDER OF COMPONENT
  render() {
    return (
      <>
        <div className="limeImageSection">
          <div
          className="limeImageContainer"
          onMouseEnter={this.handleOnMouseEnter}
          onMouseLeave={this.handleOnMouseLeave}>
            <div className="magnifiedArea"></div>
            <img
            className="limeImage"
            src={limeExteriorMini}
            alt="Lime Exterior Mini"
            width="100%"/>
          </div>
        </div>
        <div className="magnifiedImageContainer">
          <div className="magnifiedImageArea">
            <img className="magnifiedImage" src={limeExterior} alt="Lime Exterior"/>
          </div>
        </div>
      </>
    );
  }

  // FUNCTION: BASIC EXPLANATION HERE
  // - Detailed explanation here
  handleOnMouseEnter = () => {
    console.log('handleOnMouseEnter!');
  };
  // - Detailed explanation here
  handleOnMouseLeave = () => {
    console.log('handleOnMouseLeave!');
  };
}

export default Magnify;
