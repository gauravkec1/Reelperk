import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import MetricCard from '../../components/dashboard/MetricCard';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import {colors, spacing, typography} from '../../config/theme';
import {RootState} from '../../store';
import {ROUTES} from '../../constants/routes';
import {formatCurrency} from '../../utils/formatters';

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation();
  const user = useSelector((state: RootState) => state.auth.user);
  const restaurant = useSelector((state: RootState) => state.restaurant.currentRestaurant);

  // Mock data - replace with real API data
  const metrics = {
    todaySales: 12500,
    todayOrders: 24,
    qrScans: 156,
    reelsShared: 8,
    salesTrend: 12.5,
    ordersTrend: 8.3,
  };

  const quickActions = [
    {icon: 'add-shopping-cart', title: 'New Order', route: ROUTES.CREATE_ORDER},
    {icon: 'restaurant-menu', title: 'Add Menu Item', route: ROUTES.MENU_ITEM_FORM},
    {icon: 'qr-code-scanner', title: 'View QR Code', route: ROUTES.QR_CODE},
    {icon: 'upload', title: 'Upload Reel', route: ROUTES.MEDIA_UPLOAD},
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.userName}>{user?.name || 'User'}! 👋</Text>
          {restaurant && (
            <Text style={styles.restaurantName}>{restaurant.name}</Text>
          )}
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Icon name="notifications" size={24} color={colors.text} />
          <View style={styles.badge} />
        </TouchableOpacity>
      </View>

      <View style={styles.metricsContainer}>
        <MetricCard
          title="Today's Sales"
          value={formatCurrency(metrics.todaySales)}
          icon="attach-money"
          iconColor={colors.success}
          trend={{value: metrics.salesTrend, isPositive: true}}
        />
        <MetricCard
          title="Orders"
          value={metrics.todayOrders}
          icon="receipt"
          iconColor={colors.primary}
          trend={{value: metrics.ordersTrend, isPositive: true}}
        />
        <MetricCard
          title="QR Scans"
          value={metrics.qrScans}
          icon="qr-code-scanner"
          iconColor={colors.secondary}
        />
        <MetricCard
          title="Reels Shared"
          value={metrics.reelsShared}
          icon="video-library"
          iconColor={colors.info}
        />
      </View>

      <Card style={styles.quickActionsCard}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.quickActionItem}
              onPress={() => {
                // Navigation will be handled by screen implementation
                console.log('Navigate to:', action.route);
              }}>
              <View style={styles.quickActionIcon}>
                <Icon name={action.icon} size={28} color={colors.primary} />
              </View>
              <Text style={styles.quickActionText}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Card>

      <Card style={styles.recentOrdersCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          <Button
            title="View All"
            variant="outline"
            size="small"
            onPress={() => {
              console.log('Navigate to orders');
            }}
          />
        </View>
        <View style={styles.emptyState}>
          <Icon name="receipt-long" size={48} color={colors.grayMedium} />
          <Text style={styles.emptyText}>No recent orders</Text>
          <Text style={styles.emptySubtext}>Orders will appear here</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: spacing.lg,
    backgroundColor: colors.white,
    paddingTop: spacing.xl,
  },
  welcomeText: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  userName: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  restaurantName: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  notificationButton: {
    position: 'relative',
    padding: spacing.xs,
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.error,
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spacing.md,
    gap: spacing.md,
  },
  quickActionsCard: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  quickActionItem: {
    width: '47%',
    alignItems: 'center',
    padding: spacing.md,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: `${colors.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  quickActionText: {
    fontSize: typography.fontSize.sm,
    color: colors.text,
    textAlign: 'center',
  },
  recentOrdersCard: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.xl,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  emptyText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: colors.text,
    marginTop: spacing.md,
  },
  emptySubtext: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
});

export default DashboardScreen;

