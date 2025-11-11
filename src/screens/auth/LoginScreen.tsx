/**
 * Login Screen
 * User authentication screen
 */

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch} from 'react-redux';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import {colors, spacing, typography} from '../../config/theme';
import {ROUTES} from '../../constants/routes';
import {AuthStackParamList} from '../../navigation/AuthNavigator';
import {setCredentials} from '../../store/slices/authSlice';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement actual API call
      // For now, mock login
      const mockUser = {
        id: '1',
        email,
        name: 'Test User',
        role: 'owner' as const,
        restaurantId: '1',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      dispatch(
        setCredentials({
          user: mockUser,
          token: 'mock-token',
          refreshToken: 'mock-refresh-token',
        }),
      );
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.title}>ReelPerk ERP</Text>
          <Text style={styles.subtitle}>Sign in to your account</Text>
        </View>

        <Input
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          leftIcon="email"
        />

        <Input
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          leftIcon="lock"
        />

        <Button
          title="Sign In"
          onPress={handleLogin}
          loading={isLoading}
          fullWidth
          style={styles.loginButton}
        />

        <Button
          title="Forgot Password?"
          onPress={() => navigation.navigate(ROUTES.FORGOT_PASSWORD)}
          variant="outline"
          size="small"
          style={styles.forgotButton}
        />

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <Button
            title="Sign Up"
            onPress={() => navigation.navigate(ROUTES.REGISTER)}
            variant="outline"
            size="small"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  loginButton: {
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  forgotButton: {
    alignSelf: 'center',
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
  registerText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginRight: spacing.xs,
  },
});

export default LoginScreen;


