import React, {Component} from 'react';
import {Animated, PanResponder, StyleSheet, View} from 'react-native';
import {vh, vw} from 'react-native-css-vh-vw';

export class Movable extends Component {
  constructor(props) {
    super(props);
    // Get radius from StyleSheet rule
    this.componentRadius = vw(12) * 0.5;
    // Set initial position to negative value of component's radius
    this.initialPosition = this.componentRadius * -1;
    // Set property maxOffset to prop value minus component's radius
    this.maxOffset = this.props.maxOffset - this.componentRadius;
    // Initialize state
    this.state = {
      // Create instance of Animated.XY, which interpolates
      // X and Y values
      animate: new Animated.ValueXY(), // Inits both x and y to 0

      latestPosition: this.initialPosition,

      atMinValue: false,
    };

    // Set value of x and y coordinate
    this.state.animate.setValue({x: 0 - this.componentRadius, y: 0});
    // Initialize panResponder and configure handlers
    this._panResponder = PanResponder.create({
      //
      // Asks to be the touch responder for a
      // press on the View
      //
      onMoveShouldSetPanResponder: () => true,
      //
      // Actions taken when the View has begun
      // responding to touch events
      //
      onPanResponderGrant: () => {
        //
        // Set offset state.animate to prevent
        // Animated.View from returning to 0
        // coordinates when it is moved again.
        //
        this.state.animate.setOffset({
          x: this.state.animate.x._value,
          y: 0,
        });
        //
        // Set value to 0/0 to prevent AnimatedView
        // from "jumping" on start of
        // animate. Stabilizes the component.
        //
        this.state.animate.setValue({x: 0, y: 0});
      },
      //
      // The user is moving their finger
      //
      onPanResponderMove: (e, gesture) => {
        // Get the final value that user has dragged to.
        let finalOffset = gesture.dx + this.state.latestPosition;

        // If finalOffset is within bounds of the slider, update state.drag to appropriate position
        if (finalOffset >= 0 && finalOffset <= this.maxOffset) {
          console.log(gesture.dx);
          this.state.animate.setValue({x: gesture.dx, y: 0});
        }
        //
        // Set value of state.animate x/y to the
        // delta value of each
        //
      },
      //
      // Fired at the end of the touch
      //
      onPanResponderRelease: (e, gesture) => {
        this.panResponderReleaseHandler(gesture);
      },
    });
  } // End of constructor

  panResponderReleaseHandler = gesture => {
    // Get the final x value that user has dragged to
    let finalOffset = gesture.dx + this.state.latestPosition;
    // Initialize value we'll use to update this.state.animate.x
    let updatedOffsetX;
    // Initialize value we'll use to update this.state.latestPosition
    let newPosition;

    // If drag is "in bounds"
    if (finalOffset >= 0 && finalOffset <= this.maxOffset) {
      // Set newPosition to that of finalOffset
      newPosition = finalOffset;

      // If moved to the left
      if (gesture.dx < 0) {
        // Set udatedOffsetX to negation of state.latestPosition - newPosition
        updatedOffsetX = (this.state.latestPosition - newPosition) * -1;
      }
      // If moved to the right
      else if (gesture.dx > 0) {
        // Set updatedOffsetX to newPosition - this.state.latestPosition
        updatedOffsetX = newPosition - this.state.latestPosition;
      } else {
        // Set updatedOffsetX to 0
        updatedOffsetX = 0;
      }
    } else {
      // If gesture.dx is positive
      if (gesture.dx > 0) {
        // Set newPosition to maxOffset
        newPosition = this.maxOffset;
        // Set value to update offset x with to maxOffset - latestPosition
        updatedOffsetX = this.maxOffset - this.state.latestPosition;

        // If coming from minValue/0
        if (this.state.atMinValue) {
          // Add component radius to updatedOffsetX
          updatedOffsetX += this.componentRadius;
          // Update state.atMinValue
          this.setState({atMinValue: false});
        }
      }
      // If gesture.dx is the same or negative
      else {
        // Set newPosition to 0
        newPosition = 0;

        // If already at zero
        if (this.state.latestPosition <= 0) {
          // Set updatedOffsetX to 0
          updatedOffsetX = 0;
        }
        // Set value to update offset x with to negation of latestPosition
        else {
          updatedOffsetX = this.state.latestPosition * -1;
          // If not already atMinValue
          if (!this.state.atMinValue) {
            // Subtract component radius from updatedOffsetX
            updatedOffsetX -= this.componentRadius;
          }

          this.setState({atMinValue: true});
        }
      }
    }

    // Update x value of this.state.animate
    this.state.animate.setValue({x: updatedOffsetX, y: 0});

    // Update latestPosition
    this.setState({latestPosition: newPosition});

    // Merges the offset value into the base value and resets the offset to zero
    this.state.animate.flattenOffset();
  };
  render() {
    return (
      <Animated.View
        // Pass all panHandlers to our AnimatedView
        {...this._panResponder.panHandlers}
        //
        // getLayout() converts {x, y} into
        // {left, top} for use in style
        //
        style={[this.state.animate.getLayout(), styles.button]}>
        <View style={styles.dot} />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    zIndex: 99,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: 'white',
    zIndex: 2,
  },
});
