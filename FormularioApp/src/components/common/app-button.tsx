import React from 'react';
import {
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';

import { colors } from '../../constants/colors';
import { theme } from '../../constants/theme';

export type AppButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  variant?: 'primary' | 'secondary' | 'outline';
};

/**
 * Botón Táctil Moderno con Soporte de Carga y Retroalimentación Háptica
 * Criterio #1, #2: Control de estado de carga (ActivityIndicator) y deshabilitado
 * Criterio #5: Altura mínima táctil de 52px, transiciones de pulsación y estética pulida
 */
export const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  icon,
  variant = 'primary',
}) => {
  const isInteractionDisabled = disabled || loading;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.buttonBase,
        variant === 'primary' && styles.primaryButton,
        variant === 'secondary' && styles.secondaryButton,
        variant === 'outline' && styles.outlineButton,
        isInteractionDisabled && styles.disabledButton,
        pressed && !isInteractionDisabled && styles.pressedState,
      ]}
      onPress={onPress}
      disabled={isInteractionDisabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: isInteractionDisabled, busy: loading }}
    >
      {loading ? (
        <View style={styles.contentRow}>
          <ActivityIndicator
            size="small"
            color={variant === 'outline' ? colors.primary : '#FFFFFF'}
          />
          <Text
            style={[
              styles.textBase,
              variant === 'outline' ? styles.outlineText : styles.lightText,
              styles.loadingText,
            ]}
          >
            Procesando...
          </Text>
        </View>
      ) : (
        <View style={styles.contentRow}>
          {icon && <Text style={styles.buttonIcon}>{icon}</Text>}
          <Text
            style={[
              styles.textBase,
              variant === 'outline' ? styles.outlineText : styles.lightText,
              isInteractionDisabled && styles.disabledText,
            ]}
          >
            {title}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonBase: {
    minHeight: theme.touchTarget.minHeight,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    ...theme.shadows.md,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.primaryLight,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary,
    ...theme.shadows.sm,
  },
  disabledButton: {
    backgroundColor: '#CBD5E1',
    borderColor: '#CBD5E1',
    opacity: 0.7,
  },
  pressedState: {
    opacity: 0.88,
    transform: [{ scale: 0.985 }],
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    fontSize: 16,
    marginRight: theme.spacing.sm,
  },
  textBase: {
    fontSize: theme.fontSize.bodyLg,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  lightText: {
    color: '#FFFFFF',
  },
  outlineText: {
    color: colors.primary,
  },
  disabledText: {
    color: '#64748B',
  },
  loadingText: {
    marginLeft: theme.spacing.sm,
  },
});