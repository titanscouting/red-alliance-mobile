import React from "react";
import {
  ViewPropTypes,
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import PropTypes from "prop-types";

import * as Animatable from 'react-native-animatable';


export default class Stepper extends React.Component {
  static propTypes = {
    ...ViewPropTypes,
    size: PropTypes.number,

    value: PropTypes.number,
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
    stepValue: PropTypes.number,

    autoRepeat: PropTypes.bool,

    leftButtonText: PropTypes.string,
    rightButtonText: PropTypes.string,
    buttonsTextColor: PropTypes.string,
    buttonsBackgroundColor: PropTypes.string,
    buttonsContainerWidth: PropTypes.number,

    labelTextColor: PropTypes.string,
    labelBackgroundColor: PropTypes.string,

    cornorRadius: PropTypes.number,
    borderWidth: PropTypes.number,
    borderColor: PropTypes.string,

    onChange: PropTypes.func
  };

  static defaultProps = {
    size: 1,

    value: -1,
    minValue: 0,
    maxValue: 1000,
    stepValue: 1,

    autoRepeat: false,

    leftButtonText: '-',
    rightButtonText: '+',
    buttonsTextColor: '#FFFFFF',
    buttonsBackgroundColor: '#357FC0',

    labelTextColor: '#FFFFFF',
    labelBackgroundColor: '#4098E0',

    buttonsContainerWidth: 50,
    cornorRadius: 8,
    borderWidth: 0,
    borderColor: '#FFF'
  };

  constructor(props) {
    super(props)

    this.state = {
      value: this.props.value
    }
  }

  _renderButton(props) {
    let { buttonsBackgroundColor, cornorRadius, buttonsTextColor, buttonsContainerWidth } = this.props
    let { flex, label, onPress } = props

    return <View style={[styles.buttonContainer, { backgroundColor: buttonsBackgroundColor, borderTopRightRadius: flex === "right" ? cornorRadius : 0, borderTopLeftRadius: flex === "left" ? cornorRadius : 0, borderBottomRightRadius: flex === "right" ? cornorRadius : 0, borderBottomLeftRadius: flex === "left" ? cornorRadius : 0, width: buttonsContainerWidth }]}>
        <TouchableOpacity onPress={() => {
            onPress();
          }}
          style={{flex: 1}}
        >
          <View style={[styles.buttonSubContainer]}>
          <Text style={[styles.buttonLabelContainer, { color: buttonsTextColor }]} adjustsFontSizeToFit={true} numberOfLines={1}>
              {label}
            </Text>
          </View>
        </TouchableOpacity>
      </View>;
  }

  _renderLeftButton() {
    let { leftButtonText, autoRepeat, stepValue, minValue, maxValue, onChange } = this.props;
    let { value } = this.state

    return this._renderButton({
      flex: 'left',
      label: leftButtonText,
      onPress: () => {
        let newValue = value - stepValue
        if (newValue < minValue) {
          if (autoRepeat) newValue = maxValue
          else newValue = value
        }

        this._animate();
        this.setState({value: newValue}, () => {
          onChange && onChange(newValue, value);
        })
      }
    })
  }
  _renderRightButton() {
    let { rightButtonText, autoRepeat, stepValue, minValue, maxValue, onChange } = this.props;
    let { value } = this.state

    return this._renderButton({
      flex: 'right',
      label: rightButtonText,
      onPress: () => {
        let newValue = value + stepValue;
        if (newValue > maxValue) {
          if (autoRepeat) newValue = minValue;
          else newValue = value;
        }

        this._animate()
        this.setState({ value: newValue }, () => {
          onChange && onChange(newValue, value)
        });
      }
    })
  }

  _animate () {
    // this.labelContainerRef && this.labelContainerRef
    //     .fadeIn(10000)
    //     .then(endState =>{ });
  }

  _renderLabelContainer() {
    let { labelBackgroundColor, labelTextColor, size } = this.props
    let { value } = this.state

    return <Animatable.View ref={ref => {
          ref && (this.labelContainerRef = ref);
        }} style={[styles.labelContainer, { backgroundColor: labelBackgroundColor }]} useNativeDriver={true}>
        <Text style={[styles.valueStyle, { color: labelTextColor }]} adjustsFontSizeToFit={true} numberOfLines={1}>
          {value.toString()}
        </Text>
      </Animatable.View>;
  }

  render() {
    let { cornorRadius, size, width, height, labelBackgroundColor, borderWidth, borderColor } = this.props;

    return <View style={[styles.container, {
      borderRadius: cornorRadius,
      borderWidth: borderWidth,
      borderColor: borderColor
    }]}>
      {this._renderLeftButton()}
      {this._renderLabelContainer()}
      {this._renderRightButton()}
    </View>;
  }
  
}

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      flex: 1,
      height: 40
    },
    buttonContainer: {
      height: "100%"
    },
    buttonSubContainer: {
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    },
    buttonLabelContainer: {
      textAlign: "center",
      textAlignVertical: "center",
      fontSize: 12,
      fontWeight: "bold"
    },
    labelContainer: {
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    },
    valueStyle: {
      textAlign: "center",
      textAlignVertical: "center",
      fontWeight: "bold",
      fontSize: 16
    },
  });
  