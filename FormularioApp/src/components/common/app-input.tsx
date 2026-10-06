import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  KeyboardTypeOptions,
} from 'react-native';

import { colors } from '../../constants/colors';
import { theme } from '../../constants/theme';

export type AppInputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  errorMessage?: string | null;
  isValid?: boolean;
  isTouched?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  maxLength?: number;
  icon?: string;
  helperText?: string;
};

/**
 * Componente de Entrada Táctil Optimizado para Mobile
 * Criterio #5: Áreas de toque generosas (>= 52px), estados de foco visuales de alto contraste
 * Criterio #4: Feedback visual dinámico (borde/fondo de error, borde de foco, badge de éxito)
 */
export const AppInput: React.FC<AppInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  onBlur,
  onFocus,
  errorMessage,
  isValid = false,
  isTouched = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  maxLength,
  icon,
  helperText,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  // Determinar estados visuales
  const hasError = isTouched && !!errorMessage;
  const showSuccess = isTouched && isValid && !errorMessage;

  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) onFocus();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) onBlur();
  };

  const handleClear = () => {
    onChangeText('');
  };

  return (
    <View style={styles.wrapper}>
      {/* Etiqueta superior con indicador de requerido */}
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        {showSuccess && (
          <View style={styles.validBadge}>
            <Text style={styles.validBadgeText}>✓ Correcto</Text>
          </View>
        )}
      </View>

      {/* Contenedor del Input interactivo táctil */}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          hasError && styles.inputContainerError,
          showSuccess && !isFocused && styles.inputContainerSuccess,
        ]}
      >
        {/* Ícono descriptivo para rápida identificación visual */}
        {icon && (
          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>{icon}</Text>
          </View>
        )}

        {/* Campo de texto nativo */}
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          maxLength={maxLength}
          selectionColor={colors.primary}
        />

        {/* Botón de borrado rápido cuando hay contenido y tiene foco */}
        {value.length > 0 && isFocused && (
          <Pressable
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            onPress={handleClear}
            style={styles.clearButton}
          >
            <Text style={styles.clearButtonText}>✕</Text>
          </Pressable>
        )}
      </View>

      {/* Criterio #4: Mensaje de error amigable debajo del campo */}
      {hasError ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : helperText && !showSuccess ? (
        <Text style={styles.helperText}>{helperText}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: theme.spacing.lg,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xs + 2,
  },
  label: {
    fontSize: theme.fontSize.bodySm,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: 0.2,
  },
  validBadge: {
    backgroundColor: colors.successLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: theme.radius.full,
  },
  validBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.success,
  },
  inputContainer: {
    minHeight: theme.touchTarget.minHeight,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: theme.radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingHorizontal: theme.spacing.md,
    ...theme.shadows.sm,
  },
  inputContainerFocused: {
    borderColor: colors.borderFocus,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.8,
  },
  inputContainerError: {
    borderColor: colors.errorBorder,
    backgroundColor: colors.errorLight,
  },
  inputContainerSuccess: {
    borderColor: colors.successBorder,
  },
  iconContainer: {
    marginRight: theme.spacing.sm + 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 17,
  },
  textInput: {
    flex: 1,
    height: '100%',
    minHeight: theme.touchTarget.minHeight,
    fontSize: theme.fontSize.body,
    color: colors.textPrimary,
    paddingVertical: 0, // Centrado vertical en Android e iOS
  },
  clearButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: theme.spacing.xs,
  },
  clearButtonText: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: 'bold',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.xs + 2,
    paddingHorizontal: 2,
  },
  errorIcon: {
    fontSize: 12,
    marginRight: 5,
  },
  errorText: {
    fontSize: theme.fontSize.caption,
    color: colors.errorText,
    fontWeight: '600',
    lineHeight: 16,
    flex: 1,
  },
  helperText: {
    fontSize: theme.fontSize.caption,
    color: colors.textMuted,
    marginTop: theme.spacing.xs,
    paddingHorizontal: 2,
  },
});