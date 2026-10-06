import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';

import { colors } from '../../constants/colors';
import { theme } from '../../constants/theme';
import { AppButton } from './app-button';

export type SuccessModalProps = {
  visible: boolean;
  onClose: () => void;
  onReset: () => void;
  data: {
    nombre: string;
    correo: string;
    curso: string;
    edad: string;
  };
};

/**
 * Modal de Confirmación de Éxito
 * Criterio #4 de la Rúbrica: Notificación emergente modal de éxito con feedback visual claro y resumen de datos
 */
export const SuccessModal: React.FC<SuccessModalProps> = ({
  visible,
  onClose,
  onReset,
  data,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          {/* Badge de éxito circular */}
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>✓</Text>
          </View>

          {/* Títulos de confirmación */}
          <Text style={styles.title}>¡Registro Exitoso!</Text>
          <Text style={styles.subtitle}>
            El estudiante ha sido registrado correctamente en el curso.
          </Text>

          {/* Tarjeta resumen de datos ingresados */}
          <View style={styles.summaryBox}>
            <Text style={styles.summaryHeader}>Resumen de la inscripción</Text>

            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Estudiante:</Text>
              <Text style={styles.summaryValue}>{data.nombre}</Text>
            </View>

            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Correo:</Text>
              <Text style={styles.summaryValue}>{data.correo}</Text>
            </View>

            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Curso:</Text>
              <Text style={styles.summaryValue}>{data.curso}</Text>
            </View>

            <View style={[styles.summaryItem, styles.summaryItemLast]}>
              <Text style={styles.summaryLabel}>Edad:</Text>
              <Text style={styles.summaryValue}>{data.edad} años</Text>
            </View>
          </View>

          {/* Acciones principales */}
          <View style={styles.actionContainer}>
            <AppButton
              title="Registrar nuevo curso"
              onPress={onReset}
              icon="➕"
            />
            <View style={{ height: theme.spacing.sm }} />
            <Pressable
              style={styles.closeButton}
              onPress={onClose}
              accessibilityRole="button"
            >
              <Text style={styles.closeButtonText}>Cerrar ventana</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: colors.card,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.xxl,
    alignItems: 'center',
    ...theme.shadows.modal,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.successLight,
    borderWidth: 2,
    borderColor: colors.successBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
  },
  iconText: {
    color: colors.success,
    fontSize: 32,
    fontWeight: '900',
  },
  title: {
    fontSize: theme.fontSize.title,
    fontWeight: '800',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.fontSize.bodySm,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: theme.spacing.lg,
  },
  summaryBox: {
    width: '100%',
    backgroundColor: colors.background,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryHeader: {
    fontSize: theme.fontSize.caption,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: theme.spacing.sm,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
  },
  summaryItemLast: {
    borderBottomWidth: 0,
  },
  summaryLabel: {
    fontSize: theme.fontSize.caption,
    color: colors.textMuted,
    fontWeight: '600',
  },
  summaryValue: {
    fontSize: theme.fontSize.caption,
    color: colors.textPrimary,
    fontWeight: '700',
    maxWidth: '65%',
    textAlign: 'right',
  },
  actionContainer: {
    width: '100%',
  },
  closeButton: {
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: theme.fontSize.bodySm,
    color: colors.textSecondary,
    fontWeight: '600',
  },
});
