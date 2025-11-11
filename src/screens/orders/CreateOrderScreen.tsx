import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import {colors, spacing, typography, borderRadius} from '../../config/theme';
import {RootState} from '../../store';
import {formatCurrency} from '../../utils/formatters';
import {OrderType} from '../../types/order.types';

const CreateOrderScreen: React.FC = () => {
  const menuItems = useSelector((state: RootState) => state.menu.items);
  const [selectedType, setSelectedType] = useState<OrderType>(OrderType.DINE_IN);
  const [tableNumber, setTableNumber] = useState('');
  const [cart, setCart] = useState<Array<{id: string; name: string; price: number; quantity: number}>>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const addToCart = (item: typeof menuItems[0]) => {
    const existingItem = cart.find(c => c.id === item.id);
    if (existingItem) {
      setCart(cart.map(c => c.id === item.id ? {...c, quantity: c.quantity + 1} : c));
    } else {
      setCart([...cart, {id: item.id, name: item.name, price: item.price, quantity: 1}]);
    }
  };

  const removeFromCart = (itemId: string) => {
    const item = cart.find(c => c.id === itemId);
    if (item && item.quantity > 1) {
      setCart(cart.map(c => c.id === itemId ? {...c, quantity: c.quantity - 1} : c));
    } else {
      setCart(cart.filter(c => c.id !== itemId));
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card style={styles.orderTypeCard}>
          <Text style={styles.sectionTitle}>Order Type</Text>
          <View style={styles.orderTypeContainer}>
            {Object.values(OrderType).map(type => (
              <TouchableOpacity
                key={type}
                style={[styles.orderTypeButton, selectedType === type && styles.orderTypeButtonActive]}
                onPress={() => setSelectedType(type)}>
                <Text style={[styles.orderTypeText, selectedType === type && styles.orderTypeTextActive]}>
                  {type.replace('_', ' ').toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {selectedType === OrderType.DINE_IN && (
            <Input
              label="Table Number"
              placeholder="Enter table number"
              value={tableNumber}
              onChangeText={setTableNumber}
              leftIcon="table-restaurant"
            />
          )}
        </Card>

        <Input
          placeholder="Search menu items..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          leftIcon="search"
          style={styles.searchInput}
        />

        <Card style={styles.menuCard}>
          <Text style={styles.sectionTitle}>Menu Items</Text>
          <FlatList
            data={filteredItems}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => addToCart(item)}>
                <View style={styles.menuItemInfo}>
                  <Text style={styles.menuItemName}>{item.name}</Text>
                  <Text style={styles.menuItemPrice}>{formatCurrency(item.price)}</Text>
                </View>
                <Icon name="add-circle" size={24} color={colors.primary} />
              </TouchableOpacity>
            )}
            scrollEnabled={false}
          />
        </Card>
      </ScrollView>

      {cart.length > 0 && (
        <View style={styles.cartContainer}>
          <View style={styles.cartHeader}>
            <Text style={styles.cartTitle}>Cart ({cart.length})</Text>
            <Text style={styles.cartTotal}>{formatCurrency(total)}</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cartItems}>
            {cart.map(item => (
              <View key={item.id} style={styles.cartItem}>
                <View style={styles.cartItemInfo}>
                  <Text style={styles.cartItemName}>{item.name}</Text>
                  <Text style={styles.cartItemPrice}>{formatCurrency(item.price)}</Text>
                </View>
                <View style={styles.cartItemControls}>
                  <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                    <Icon name="remove-circle" size={20} color={colors.error} />
                  </TouchableOpacity>
                  <Text style={styles.cartItemQuantity}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => addToCart({...item, id: item.id, name: item.name, price: item.price} as any)}>
                    <Icon name="add-circle" size={20} color={colors.success} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
          <Button
            title={`Place Order - ${formatCurrency(total)}`}
            onPress={() => {}}
            fullWidth
            style={styles.placeOrderButton}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  scrollView: {
    flex: 1,
  },
  orderTypeCard: {
    margin: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  orderTypeContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  orderTypeButton: {
    flex: 1,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  orderTypeButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  orderTypeText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.text,
  },
  orderTypeTextActive: {
    color: colors.white,
  },
  searchInput: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  menuCard: {
    margin: spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  menuItemInfo: {
    flex: 1,
  },
  menuItemName: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  menuItemPrice: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: typography.fontWeight.medium,
  },
  cartContainer: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: spacing.md,
    maxHeight: 200,
  },
  cartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  cartTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  cartTotal: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  cartItems: {
    marginBottom: spacing.md,
  },
  cartItem: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    marginRight: spacing.sm,
    minWidth: 150,
  },
  cartItemInfo: {
    marginBottom: spacing.xs,
  },
  cartItemName: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.text,
  },
  cartItemPrice: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
  cartItemControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cartItemQuantity: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  placeOrderButton: {
    marginTop: spacing.sm,
  },
});

export default CreateOrderScreen;

