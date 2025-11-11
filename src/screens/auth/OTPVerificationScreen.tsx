import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors, typography} from '../../config/theme';

const OTPVerificationScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>OTP Verification Screen - Coming Soon</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  text: {
    fontSize: typography.fontSize.lg,
    color: colors.text,
  },
});

export default OTPVerificationScreen;

