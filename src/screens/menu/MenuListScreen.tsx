import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors, spacing, typography} from '../../config/theme';

const MenuListScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <Text style={styles.comingSoon}>Menu management coming soon...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  comingSoon: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
});

export default MenuListScreen;

