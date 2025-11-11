import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
  Alert,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Loading from '../../components/common/Loading';
import {colors, spacing, typography} from '../../config/theme';
import {RootState} from '../../store';
import ENV from '../../config/env';

const QRCodeDisplayScreen: React.FC = () => {
  const restaurant = useSelector((state: RootState) => state.restaurant.currentRestaurant);
  const qrCode = useSelector((state: RootState) => state.qr.qrCode);
  const [qrUrl, setQrUrl] = useState('');

  useEffect(() => {
    if (restaurant?.qrCodeId) {
      const url = `${ENV.QR_BASE_URL}/${restaurant.qrCodeId}`;
      setQrUrl(url);
    } else if (qrCode) {
      setQrUrl(qrCode.staticUrl);
    } else {
      // Generate default QR URL
      const defaultUrl = `${ENV.QR_BASE_URL}/demo-12345`;
      setQrUrl(defaultUrl);
    }
  }, [restaurant, qrCode]);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Scan this QR code to engage with ${restaurant?.name || 'our restaurant'}!\n\n${qrUrl}`,
        title: 'ReelPerk QR Code',
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share QR code');
    }
  };

  const handleDownload = () => {
    Alert.alert('Download', 'QR code download feature coming soon!');
  };

  if (!qrUrl) {
    return (
      <View style={styles.container}>
        <Loading message="Generating QR code..." />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.qrCard}>
        <Text style={styles.title}>Your QR Code</Text>
        <Text style={styles.subtitle}>
          Customers can scan this to view your latest content and claim rewards
        </Text>

        <View style={styles.qrContainer}>
          <QRCode
            value={qrUrl}
            size={250}
            color={colors.primary}
            backgroundColor={colors.white}
            logo={undefined}
          />
        </View>

        <View style={styles.urlContainer}>
          <Text style={styles.urlLabel}>QR Code URL:</Text>
          <Text style={styles.urlText} selectable>
            {qrUrl}
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Icon name="qr-code-scanner" size={24} color={colors.primary} />
            <Text style={styles.statValue}>156</Text>
            <Text style={styles.statLabel}>Total Scans</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="video-library" size={24} color={colors.secondary} />
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Reels Shared</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="card-giftcard" size={24} color={colors.success} />
            <Text style={styles.statValue}>42</Text>
            <Text style={styles.statLabel}>Rewards Claimed</Text>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <Button
            title="Share QR Code"
            onPress={handleShare}
            fullWidth
            style={styles.actionButton}
          />
          <Button
            title="Download QR Code"
            onPress={handleDownload}
            variant="outline"
            fullWidth
            style={styles.actionButton}
          />
        </View>
      </Card>

      <Card style={styles.infoCard}>
        <View style={styles.infoHeader}>
          <Icon name="info" size={24} color={colors.info} />
          <Text style={styles.infoTitle}>How it works</Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="check-circle" size={20} color={colors.success} />
          <Text style={styles.infoText}>
            This QR code is static and never changes
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="check-circle" size={20} color={colors.success} />
          <Text style={styles.infoText}>
            Content updates automatically when you upload new media
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="check-circle" size={20} color={colors.success} />
          <Text style={styles.infoText}>
            Print once, use forever - no need to reprint
          </Text>
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
  qrCard: {
    margin: spacing.md,
    alignItems: 'center',
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  qrContainer: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: 16,
    marginBottom: spacing.lg,
    ...colors.shadows?.md,
  },
  urlContainer: {
    width: '100%',
    backgroundColor: colors.backgroundSecondary,
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.lg,
  },
  urlLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  urlText: {
    fontSize: typography.fontSize.sm,
    color: colors.text,
    fontFamily: 'monospace',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: spacing.lg,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginTop: spacing.xs,
  },
  statLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  actionsContainer: {
    width: '100%',
    gap: spacing.md,
  },
  actionButton: {
    marginBottom: spacing.xs,
  },
  infoCard: {
    margin: spacing.md,
    marginTop: 0,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  infoTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginLeft: spacing.sm,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  infoText: {
    flex: 1,
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
  },
});

export default QRCodeDisplayScreen;

