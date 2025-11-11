import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import MetricCard from '../../components/dashboard/MetricCard';
import Card from '../../components/common/Card';
import {colors, spacing, typography} from '../../config/theme';
import {RootState} from '../../store';
import {ROUTES} from '../../constants/routes';
import {formatCurrency} from '../../utils/formatters';

const FinanceDashboardScreen: React.FC = () => {
  const navigation = useNavigation();
  const finance = useSelector((state: RootState) => state.finance);

  // Calculate totals
  const totalIncome = finance.incomes.reduce((sum, income) => sum + income.amount, 0);
  const totalExpenses = finance.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const netProfit = totalIncome - totalExpenses;
  const profitMargin = totalIncome > 0 ? (netProfit / totalIncome) * 100 : 0;

  const menuItems = [
    {
      icon: 'trending-down',
      title: 'Expenses',
      description: 'Manage and track expenses',
      route: ROUTES.EXPENSES,
      color: colors.error,
    },
    {
      icon: 'trending-up',
      title: 'Income',
      description: 'View income sources',
      route: ROUTES.INCOME,
      color: colors.success,
    },
    {
      icon: 'account-balance',
      title: 'Profit & Loss',
      description: 'View P&L statements',
      route: ROUTES.PROFIT_LOSS,
      color: colors.primary,
    },
    {
      icon: 'receipt',
      title: 'Tax Management',
      description: 'GST, TDS, and tax records',
      route: ROUTES.TAX_MANAGEMENT,
      color: colors.info,
    },
    {
      icon: 'store',
      title: 'Vendors',
      description: 'Manage suppliers and vendors',
      route: ROUTES.VENDORS,
      color: colors.secondary,
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Finance & Accounting</Text>
        <Text style={styles.subtitle}>Manage your finances</Text>
      </View>

      <View style={styles.metricsContainer}>
        <MetricCard
          title="Total Income"
          value={formatCurrency(totalIncome)}
          icon="attach-money"
          iconColor={colors.success}
        />
        <MetricCard
          title="Total Expenses"
          value={formatCurrency(totalExpenses)}
          icon="trending-down"
          iconColor={colors.error}
        />
        <MetricCard
          title="Net Profit"
          value={formatCurrency(netProfit)}
          icon="account-balance"
          iconColor={netProfit >= 0 ? colors.success : colors.error}
        />
        <MetricCard
          title="Profit Margin"
          value={`${profitMargin.toFixed(1)}%`}
          icon="percent"
          iconColor={colors.primary}
        />
      </View>

      <Card style={styles.menuCard}>
        <Text style={styles.sectionTitle}>Finance Modules</Text>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => {
              // Navigation handled by screen
              console.log('Navigate to:', item.route);
            }}>
            <View style={[styles.iconContainer, {backgroundColor: `${item.color}15`}]}>
              <Icon name={item.icon} size={24} color={item.color} />
            </View>
            <View style={styles.menuItemInfo}>
              <Text style={styles.menuItemTitle}>{item.title}</Text>
              <Text style={styles.menuItemDescription}>{item.description}</Text>
            </View>
            <Icon name="chevron-right" size={24} color={colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </Card>

      <Card style={styles.recentCard}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <View style={styles.emptyState}>
          <Icon name="receipt-long" size={48} color={colors.grayMedium} />
          <Text style={styles.emptyText}>No recent transactions</Text>
        </View>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  header: {
    padding: spacing.lg,
    backgroundColor: colors.white,
    paddingTop: spacing.xl,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spacing.md,
    gap: spacing.md,
  },
  menuCard: {
    margin: spacing.md,
    marginTop: 0,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  menuItemInfo: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  menuItemDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  recentCard: {
    margin: spacing.md,
    marginTop: 0,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  emptyText: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
});

export default FinanceDashboardScreen;

