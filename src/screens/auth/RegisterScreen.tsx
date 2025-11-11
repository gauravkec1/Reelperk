import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch} from 'react-redux';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import {colors, spacing, typography, borderRadius} from '../../config/theme';
import {ROUTES} from '../../constants/routes';
import {AuthStackParamList} from '../../navigation/navigationTypes';
import {setCredentials} from '../../store/slices/authSlice';
import {isValidEmail, isValidPhone, isValidPassword} from '../../utils/validators';
import {UserRole} from '../../types/auth.types';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    restaurantName: '',
    restaurantAddress: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!isValidPassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters with letters and numbers';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.restaurantName.trim()) {
      newErrors.restaurantName = 'Restaurant name is required';
    }

    if (!formData.restaurantAddress.trim()) {
      newErrors.restaurantAddress = 'Restaurant address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) {
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement actual API call
      const mockUser = {
        id: '1',
        email: formData.email,
        name: formData.name,
        phone: formData.phone,
        role: UserRole.OWNER,
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

      Alert.alert('Success', 'Account created successfully!');
    } catch (error) {
      Alert.alert('Error', 'Registration failed. Please try again.');
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
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Start managing your restaurant</Text>
        </View>

        <Input
          label="Full Name"
          placeholder="Enter your name"
          value={formData.name}
          onChangeText={text => {
            setFormData({...formData, name: text});
            if (errors.name) setErrors({...errors, name: ''});
          }}
          error={errors.name}
          leftIcon="person"
        />

        <Input
          label="Email"
          placeholder="Enter your email"
          value={formData.email}
          onChangeText={text => {
            setFormData({...formData, email: text});
            if (errors.email) setErrors({...errors, email: ''});
          }}
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
          leftIcon="email"
        />

        <Input
          label="Phone Number"
          placeholder="Enter your phone"
          value={formData.phone}
          onChangeText={text => {
            setFormData({...formData, phone: text});
            if (errors.phone) setErrors({...errors, phone: ''});
          }}
          error={errors.phone}
          keyboardType="phone-pad"
          leftIcon="phone"
        />

        <Input
          label="Password"
          placeholder="Create a password"
          value={formData.password}
          onChangeText={text => {
            setFormData({...formData, password: text});
            if (errors.password) setErrors({...errors, password: ''});
          }}
          error={errors.password}
          secureTextEntry
          leftIcon="lock"
        />

        <Input
          label="Confirm Password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChangeText={text => {
            setFormData({...formData, confirmPassword: text});
            if (errors.confirmPassword) setErrors({...errors, confirmPassword: ''});
          }}
          error={errors.confirmPassword}
          secureTextEntry
          leftIcon="lock"
        />

        <Input
          label="Restaurant Name"
          placeholder="Enter restaurant name"
          value={formData.restaurantName}
          onChangeText={text => {
            setFormData({...formData, restaurantName: text});
            if (errors.restaurantName) setErrors({...errors, restaurantName: ''});
          }}
          error={errors.restaurantName}
          leftIcon="restaurant"
        />

        <Input
          label="Restaurant Address"
          placeholder="Enter restaurant address"
          value={formData.restaurantAddress}
          onChangeText={text => {
            setFormData({...formData, restaurantAddress: text});
            if (errors.restaurantAddress) setErrors({...errors, restaurantAddress: ''});
          }}
          error={errors.restaurantAddress}
          leftIcon="location-on"
          multiline
          numberOfLines={3}
        />

        <Button
          title="Create Account"
          onPress={handleRegister}
          loading={isLoading}
          fullWidth
          style={styles.registerButton}
        />

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <Button
            title="Sign In"
            onPress={() => navigation.navigate(ROUTES.LOGIN)}
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
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
  registerButton: {
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
  },
  loginText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
});

export default RegisterScreen;

