import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Card from '../common/Card';
import {colors, spacing, typography, borderRadius} from '../../config/theme';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: string;
  iconColor?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  onPress?: () => void;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  iconColor = colors.primary,
  trend,
  onPress,
}) => {
  const CardComponent = onPress ? TouchableOpacity : View;

  return (
    <CardComponent onPress={onPress} activeOpacity={0.7}>
      <Card style={styles.card}>
        <View style={styles.header}>
          {icon && (
            <View style={[styles.iconContainer, {backgroundColor: `${iconColor}20`}]}>
              <Icon name={icon} size={24} color={iconColor} />
            </View>
          )}
          {trend && (
            <View
              style={[
                styles.trendContainer,
                {backgroundColor: trend.isPositive ? `${colors.success}20` : `${colors.error}20`},
              ]}>
              <Icon
                name={trend.isPositive ? 'trending-up' : 'trending-down'}
                size={16}
                color={trend.isPositive ? colors.success : colors.error}
              />
              <Text
                style={[
                  styles.trendText,
                  {color: trend.isPositive ? colors.success : colors.error},
                ]}>
                {Math.abs(trend.value)}%
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.title}>{title}</Text>
      </Card>
    </CardComponent>
  );
};

const styles = StyleSheet.create({
  card: {
    minHeight: 120,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  trendText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    marginLeft: 2,
  },
  value: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
});

export default MetricCard;

