import React, {ReactNode} from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {colors, spacing, borderRadius, shadows} from '../../config/theme';

interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
  shadow?: boolean;
  padding?: number;
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  shadow = true,
  padding = spacing.md,
}) => {
  return (
    <View
      style={[
        styles.card,
        shadow && styles.shadow,
        {padding},
        style,
      ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
  },
  shadow: {
    ...shadows.md,
  },
});

export default Card;

