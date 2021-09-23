import {StyleSheet} from 'react-native';
import {Mixins, Typography, Colors} from 'nasco-mobile-styles';

export default StyleSheet.create({
  textInputContainer: (isInvalid, isFocused) => ({
    flexDirection: 'row',
    borderColor: isInvalid
      ? Colors.COLOR_ef2626
      : isFocused
      ? Colors.COLOR_008e5c
      : Colors.COLOR_bfc0c6,
    borderWidth: 1,
    borderRadius: Mixins.scaleSize(3),
    borderStyle: 'solid',
    height: Mixins.scaleSizeHeight(50),
  }),
  textinputStyle: showPasswordButton => ({
    fontSize: Mixins.scaleFont(14),
    width: showPasswordButton
      ? Mixins.scaleSizeWidth(230)
      : Mixins.scaleSizeWidth(280),
    height: '100%',
    padding: Mixins.scaleSize(10),
    color: Colors.COLOR_333333,
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
  }),
  errorMessage: {
    color: Colors.COLOR_ef2626,
    fontSize: Mixins.scaleFont(12),
    marginTop: Mixins.scaleSize(8),
    width: Mixins.scaleSizeWidth(280),
  },
  showPasswordButton: {
    width: Mixins.scaleSize(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelContainer: {
    position: 'absolute',
    marginLeft: Mixins.scaleSize(10),
    backgroundColor: Colors.COLOR_ffffff,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: Mixins.scaleFont(20),
    textAlign: 'left',
    fontFamily: Typography.FONT_FAMILY_BOOK,
    marginHorizontal: Mixins.scaleSize(4),
  },
});
