import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import Card from '../../components/common/Card';
import {colors, spacing, typography} from '../../config/theme';
import {ROUTES} from '../../constants/routes';

const QRCodeScreen: React.FC = () => {
  const navigation = useNavigation();

  const menuItems = [
    {
      icon: 'qr-code-scanner',
      title: 'View QR Code',
      description: 'Display and share your QR code',
      route: ROUTES.QR_CODE,
      color: colors.primary,
    },
    {
      icon: 'upload',
      title: 'Upload Media',
      description: 'Upload reels, photos, and stories',
      route: ROUTES.MEDIA_UPLOAD,
      color: colors.secondary,
    },
    {
      icon: 'card-giftcard',
      title: 'Rewards',
      description: 'Manage customer rewards',
      route: ROUTES.REWARDS,
      color: colors.success,
    },
    {
      icon: 'analytics',
      title: 'Engagement Analytics',
      description: 'View QR scans and engagement stats',
      route: ROUTES.ENGAGEMENT_ANALYTICS,
      color: colors.info,
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>QR & Engagement</Text>
        <Text style={styles.subtitle}>Manage your customer engagement</Text>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              console.log('Navigate to:', item.route);
            }}>
            <Card style={styles.menuCard}>
              <View style={[styles.iconContainer, {backgroundColor: `${item.color}15`}]}>
                <Icon name={item.icon} size={32} color={item.color} />
              </View>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuDescription}>{item.description}</Text>
              <Icon name="chevron-right" size={24} color={colors.textSecondary} style={styles.chevron} />
            </Card>
          </TouchableOpacity>
        ))}
      </View>

      <Card style={styles.statsCard}>
        <Text style={styles.statsTitle}>Quick Stats</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>156</Text>
            <Text style={styles.statLabel}>QR Scans</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Reels Shared</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>42</Text>
            <Text style={styles.statLabel}>Rewards Claimed</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>12.5%</Text>
            <Text style={styles.statLabel}>Engagement Rate</Text>
          </View>
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
  menuContainer: {
    padding: spacing.md,
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    position: 'relative',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  menuTitle: {
    flex: 1,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  menuDescription: {
    flex: 1,
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  chevron: {
    position: 'absolute',
    right: spacing.md,
  },
  statsCard: {
    margin: spacing.md,
    marginTop: 0,
  },
  statsTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  statBox: {
    width: '47%',
    backgroundColor: colors.backgroundSecondary,
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  statValue: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default QRCodeScreen;

