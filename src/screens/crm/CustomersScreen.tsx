import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import EmptyState from '../../components/common/EmptyState';
import {colors, spacing, typography} from '../../config/theme';
import {RootState} from '../../store';
import {ROUTES} from '../../constants/routes';
import {formatCurrency, formatDate} from '../../utils/formatters';
import {Customer} from '../../types/crm.types';

const CustomersScreen: React.FC = () => {
  const navigation = useNavigation();
  const customers = useSelector((state: RootState) => state.crm.customers);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery),
  );

  const getSegmentColor = (segment: Customer['customerSegment']) => {
    switch (segment) {
      case 'vip':
        return colors.secondary;
      case 'regular':
        return colors.success;
      case 'occasional':
        return colors.info;
      default:
        return colors.gray;
    }
  };

  const renderCustomer = ({item}: {item: Customer}) => (
    <TouchableOpacity
      onPress={() => {
        // Navigation to customer details
        console.log('Navigate to customer:', item.id);
      }}>
      <Card style={styles.customerCard}>
        <View style={styles.customerHeader}>
          <View style={styles.customerInfo}>
            <Text style={styles.customerName}>{item.name}</Text>
            <Text style={styles.customerPhone}>{item.phone}</Text>
          </View>
          <View
            style={[
              styles.segmentBadge,
              {backgroundColor: `${getSegmentColor(item.customerSegment)}20`},
            ]}>
            <Text
              style={[
                styles.segmentText,
                {color: getSegmentColor(item.customerSegment)},
              ]}>
              {item.customerSegment.toUpperCase()}
            </Text>
          </View>
        </View>
        <View style={styles.customerStats}>
          <View style={styles.statItem}>
            <Icon name="shopping-cart" size={16} color={colors.textSecondary} />
            <Text style={styles.statText}>{item.totalVisits} visits</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="attach-money" size={16} color={colors.textSecondary} />
            <Text style={styles.statText}>{formatCurrency(item.totalSpent)}</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="stars" size={16} color={colors.secondary} />
            <Text style={styles.statText}>{item.loyaltyPoints} points</Text>
          </View>
        </View>
        {item.lastVisitDate && (
          <Text style={styles.lastVisit}>
            Last visit: {formatDate(item.lastVisitDate)}
          </Text>
        )}
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Customers</Text>
        <Text style={styles.subtitle}>
          {customers.length} total customers
        </Text>
      </View>

      <Input
        placeholder="Search customers..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        leftIcon="search"
        style={styles.searchInput}
      />

      {filteredCustomers.length === 0 ? (
        <EmptyState
          icon="people"
          title="No customers found"
          message={searchQuery ? 'Try a different search term' : 'Start adding customers'}
        />
      ) : (
        <FlatList
          data={filteredCustomers}
          renderItem={renderCustomer}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
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
  searchInput: {
    margin: spacing.md,
    marginBottom: 0,
  },
  listContent: {
    padding: spacing.md,
  },
  customerCard: {
    marginBottom: spacing.md,
  },
  customerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  customerPhone: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  segmentBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  segmentText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
  },
  customerStats: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  statText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  lastVisit: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
});

export default CustomersScreen;

