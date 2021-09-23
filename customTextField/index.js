import React, {Component} from 'react';
import {View, TextInput, Text, Animated, TouchableOpacity} from 'react-native';
import styles from './styles';
import {Colors, Mixins} from 'nasco-mobile-styles';
class CustomTextInput extends Component {
  animatedValue = new Animated.Value(this.props.value === '' ? 0 : 1);
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      secureTextEntry: props.secureTextEntry,
      showPasswordButton: props.showPasswordButton || false,
    };
  }

  componentDidUpdate() {
    Animated.timing(this.animatedValue, {
      toValue: this.state.isFocused || this.props.value !== '' ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }

  handleFocus = () => {
    const {onInputFocus} = this.props;
    this.setState({isFocused: true}, () => onInputFocus && onInputFocus());
  };

  handleBlur = () => {
    const {onInputBlur} = this.props;
    this.setState({isFocused: false}, () => onInputBlur && onInputBlur());
  };

  onShowPasswordButtonTapped = () =>
    this.setState({secureTextEntry: !this.state.secureTextEntry});

  render() {
    const {
      label,
      style,
      containerStyle,
      textinputStyle,
      errorMessage,
      errorMessageStyle,
      inputRef,
      hideErrorMessage,
      ...props
    } = this.props;
    const {isFocused, secureTextEntry, showPasswordButton} = this.state;
    const isErrorMessage = !!errorMessage;
    const hideError = hideErrorMessage || false;
    return (
      <View style={style}>
        <View
          style={[
            styles.textInputContainer(isErrorMessage, isFocused),
            containerStyle,
          ]}>
          <TextInput
            {...props}
            ref={ref => {
              this.textInputRef = ref;
              inputRef && inputRef(ref);
            }}
            secureTextEntry={secureTextEntry}
            style={[styles.textinputStyle(showPasswordButton), textinputStyle]}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
        </View>
        <Animated.View
          style={[
            styles.labelContainer,
            {
              top:
                this.props.label &&
                this.animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [Mixins.scaleSize(20), Mixins.scaleSize(-8)],
                }),
            },
          ]}>
          <TouchableOpacity
            onPress={() => this.textInputRef && this.textInputRef.focus()}>
            <Animated.Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={[
                styles.label,
                {
                  fontSize: this.animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [Mixins.scaleSize(14), Mixins.scaleSize(14)],
                  }),
                  color: isErrorMessage
                    ? Colors.COLOR_ef2626
                    : this.state.isFocused
                    ? Colors.COLOR_008e5c
                    : Colors.COLOR_333333,
                },
              ]}>
              {label}
            </Animated.Text>
          </TouchableOpacity>
        </Animated.View>
        {!!errorMessage && !hideError && (
          <Text style={[styles.errorMessage, errorMessageStyle]}>
            {errorMessage}
          </Text>
        )}
      </View>
    );
  }
}

export default CustomTextInput;
