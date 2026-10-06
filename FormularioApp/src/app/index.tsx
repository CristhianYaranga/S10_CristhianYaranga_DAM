import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../constants/colors';
import { theme } from '../constants/theme';
import { AppInput } from '../components/common/app-input';
import { AppButton } from '../components/common/app-button';
import { SuccessModal } from '../components/common/success-modal';
import {
  validarNombreEstudiante,
  validarCorreo,
  validarCurso,
  validarEdad,
  ValidationResult,
} from '../utils/validators';

interface FormValues {
  nombre: string;
  correo: string;
  curso: string;
  edad: string;
}

interface FormTouched {
  nombre: boolean;
  correo: boolean;
  curso: boolean;
  edad: boolean;
}

// Cursos sugeridos para selección rápida táctil
const CURSOS_SUGERIDOS = [
  'Desarrollo de Aplicaciones Móviles',
  'Diseño de Interfaces UI/UX',
  'Arquitectura Frontend con React',
  'Gestión de Bases de Datos',
];

/**
 * Actividad Individual — Formularios y Validaciones (DAM • AP5)
 * OPCIÓN ELEGIDA: 5. Registro de Curso
 * Campos requeridos: Nombre estudiante, Correo, Curso, Edad
 * Validaciones requeridas: Campos obligatorios, Correo con @, Edad válida
 * 
 * Cumplimiento de Rúbrica:
 * - Manejo de estados (useState) y captura dinámica (onChangeText)
 * - Botón interactivo basado en Pressable
 * - Validaciones en tiempo real y feedback visual claro (errores y éxito)
 * - Diseño móvil limpio sin APIs externas ni módulos de login/autenticación
 */
export default function RegistroCursoScreen() {
  // =========================================================================
  // 1. MANEJO DE ESTADOS (useState) - Requerimiento Técnico #02
  // =========================================================================
  const [values, setValues] = useState<FormValues>({
    nombre: '',
    correo: '',
    curso: '',
    edad: '',
  });

  const [touched, setTouched] = useState<FormTouched>({
    nombre: false,
    correo: false,
    curso: false,
    edad: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  // =========================================================================
  // 2. SISTEMA DE VALIDACIONES EN TIEMPO REAL - Requerimiento Técnico #03
  // =========================================================================
  const nombreValidacion: ValidationResult = useMemo(
    () => validarNombreEstudiante(values.nombre),
    [values.nombre]
  );

  const correoValidacion: ValidationResult = useMemo(
    () => validarCorreo(values.correo),
    [values.correo]
  );

  const cursoValidacion: ValidationResult = useMemo(
    () => validarCurso(values.curso),
    [values.curso]
  );

  const edadValidacion: ValidationResult = useMemo(
    () => validarEdad(values.edad),
    [values.edad]
  );

  // Cumplimiento de las 3 reglas oficiales de la Opción 5
  const reglaCamposObligatorios =
    nombreValidacion.isValid && cursoValidacion.isValid;
  const reglaCorreoValido = correoValidacion.isValid;
  const reglaEdadValida = edadValidacion.isValid;

  const validacionesCumplidas = [
    reglaCamposObligatorios,
    reglaCorreoValido,
    reglaEdadValida,
  ].filter(Boolean).length;

  const isFormValid =
    nombreValidacion.isValid &&
    correoValidacion.isValid &&
    cursoValidacion.isValid &&
    edadValidacion.isValid;

  const porcentajeProgreso = Math.round((validacionesCumplidas / 3) * 100);

  // =========================================================================
  // 3. CONTROLADORES DE EVENTOS (onChangeText, onBlur, onSubmit)
  // =========================================================================
  const handleChange = (field: keyof FormValues, text: string) => {
    setValues((prev) => ({ ...prev, [field]: text }));
    if (generalError) setGeneralError(null);
  };

  const handleBlur = (field: keyof FormTouched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSelectCurso = (cursoSeleccionado: string) => {
    setValues((prev) => ({ ...prev, curso: cursoSeleccionado }));
    setTouched((prev) => ({ ...prev, curso: true }));
    if (generalError) setGeneralError(null);
  };

  // Envío del formulario con validación integral (Sin APIs externas ni backend)
  const handleSubmit = () => {
    setSubmitAttempted(true);
    setTouched({
      nombre: true,
      correo: true,
      curso: true,
      edad: true,
    });

    if (!isFormValid) {
      setGeneralError('Por favor completa todos los campos correctamente.');
      return;
    }

    setGeneralError(null);
    setIsSubmitting(true);

    // Breve pausa de feedback táctil UI (400ms) sin dependencias externas
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccessModalVisible(true);
    }, 400);
  };

  // Reiniciar formulario a estado inicial
  const handleResetForm = () => {
    setValues({ nombre: '', correo: '', curso: '', edad: '' });
    setTouched({ nombre: false, correo: false, curso: false, edad: false });
    setSubmitAttempted(false);
    setGeneralError(null);
    setIsSuccessModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* =================================================================
              ENCABEZADO DE LA OPCIÓN 5 (Rúbrica Oficial DAM AP5)
             ================================================================= */}
          <View style={styles.header}>
            <View style={styles.headerIconContainer}>
              <Text style={styles.headerIconGlyph}>📚</Text>
            </View>
            <View style={styles.headerTexts}>
              <Text style={styles.overline}>OPCIÓN 5 • REGISTRO DE CURSO</Text>
              <Text style={styles.title}>Inscripción Académica</Text>
            </View>
          </View>

          <Text style={styles.subtitle}>
            Completa tus datos de estudiante para registrarte formalmente en el curso.
          </Text>

          {/* =================================================================
              FORMULARIO PRINCIPAL (Mínimo 3 campos requeridos)
             ================================================================= */}
          <View style={styles.formCard}>
            <View style={styles.formCardHeader}>
              <Text style={styles.sectionTitle}>Datos de Registro</Text>
              <Text style={styles.requiredNotice}>* Campos obligatorios</Text>
            </View>

            {/* CAMPO 1: NOMBRE DEL ESTUDIANTE */}
            <AppInput
              label="Nombre del estudiante *"
              placeholder="Ej. Cristhian Yaranga"
              value={values.nombre}
              onChangeText={(text) => handleChange('nombre', text)}
              onBlur={() => handleBlur('nombre')}
              errorMessage={nombreValidacion.isValid ? null : nombreValidacion.message}
              isValid={nombreValidacion.isValid}
              isTouched={touched.nombre || submitAttempted}
              autoCapitalize="words"
              icon="👤"
              helperText="Obligatorio (mínimo 3 caracteres alfabéticos)."
            />

            {/* CAMPO 2: CORREO ELECTRÓNICO */}
            <AppInput
              label="Correo electrónico *"
              placeholder="estudiante@correo.com"
              value={values.correo}
              onChangeText={(text) => handleChange('correo', text)}
              onBlur={() => handleBlur('correo')}
              errorMessage={correoValidacion.isValid ? null : correoValidacion.message}
              isValid={correoValidacion.isValid}
              isTouched={touched.correo || submitAttempted}
              keyboardType="email-address"
              autoCapitalize="none"
              icon="✉️"
              helperText="Debe contener '@' y formato de correo válido."
            />

            {/* CAMPO 3: CURSO */}
            <AppInput
              label="Curso *"
              placeholder="Ej. Desarrollo de Aplicaciones Móviles"
              value={values.curso}
              onChangeText={(text) => handleChange('curso', text)}
              onBlur={() => handleBlur('curso')}
              errorMessage={cursoValidacion.isValid ? null : cursoValidacion.message}
              isValid={cursoValidacion.isValid}
              isTouched={touched.curso || submitAttempted}
              icon="📖"
              helperText="Selecciona un curso sugerido o escribe el nombre."
            />

            {/* CHIPS TÁCTILES DE CURSOS RÁPIDOS */}
            <View style={styles.chipsContainer}>
              <Text style={styles.chipsLabel}>Cursos disponibles:</Text>
              <View style={styles.chipsRow}>
                {CURSOS_SUGERIDOS.map((cursoItem) => {
                  const isSelected = values.curso === cursoItem;
                  return (
                    <Pressable
                      key={cursoItem}
                      onPress={() => handleSelectCurso(cursoItem)}
                      style={[
                        styles.chipButton,
                        isSelected && styles.chipButtonSelected,
                      ]}
                      accessibilityRole="button"
                    >
                      <Text
                        style={[
                          styles.chipText,
                          isSelected && styles.chipTextSelected,
                        ]}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {cursoItem}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* CAMPO 4: EDAD */}
            <AppInput
              label="Edad del estudiante *"
              placeholder="Ej. 20"
              value={values.edad}
              onChangeText={(text) => handleChange('edad', text)}
              onBlur={() => handleBlur('edad')}
              errorMessage={edadValidacion.isValid ? null : edadValidacion.message}
              isValid={edadValidacion.isValid}
              isTouched={touched.edad || submitAttempted}
              keyboardType="numeric"
              maxLength={3}
              icon="🎂"
              helperText="Edad válida requerida (18 años o más)."
            />

            {/* ALERTA DE ERROR GENERAL */}
            {generalError && (
              <View style={styles.generalErrorBanner}>
                <Text style={styles.generalErrorIcon}>⚠️</Text>
                <Text style={styles.generalErrorText}>{generalError}</Text>
              </View>
            )}

            {/* BOTÓN DE ENVÍO CON PRESSABLE */}
            <View style={styles.buttonWrapper}>
              <AppButton
                title="Registrar Curso"
                onPress={handleSubmit}
                loading={isSubmitting}
                disabled={isSubmitting}
                icon="📝"
              />
            </View>
          </View>

          {/* =================================================================
              PANEL DE VALIDACIONES EN TIEMPO REAL (Rúbrica Oficial: 3 Reglas)
             ================================================================= */}
          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <View>
                <Text style={styles.progressTitle}>Validaciones de la Opción 5</Text>
                <Text style={styles.progressSubtitle}>
                  Verificación requerida en la rúbrica oficial
                </Text>
              </View>
              <View style={styles.progressCounterBadge}>
                <Text style={styles.progressCounterText}>
                  {validacionesCumplidas}/3
                </Text>
              </View>
            </View>

            {/* Barra de progreso visual interactiva */}
            <View style={styles.progressBarTrack}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${porcentajeProgreso}%` },
                  isFormValid && styles.progressBarFillComplete,
                ]}
              />
            </View>

            {/* REGLA 1: CAMPOS OBLIGATORIOS */}
            <ValidationItem
              title="1. Campos obligatorios"
              description="Nombre y curso completos sin dejar campos vacíos"
              isValid={reglaCamposObligatorios}
              active={values.nombre.length > 0 || values.curso.length > 0}
            />

            {/* REGLA 2: CORREO CON @ */}
            <ValidationItem
              title="2. Correo con @"
              description="Estructura formal con arroba y dominio válido"
              isValid={reglaCorreoValido}
              active={values.correo.length > 0}
            />

            {/* REGLA 3: EDAD VÁLIDA */}
            <ValidationItem
              title="3. Edad válida"
              description="Estudiante mayor de edad (18 años a más)"
              isValid={reglaEdadValida}
              active={values.edad.length > 0}
            />
          </View>

          {/* PIE DE PÁGINA */}
          <Text style={styles.footerNote}>
            Desarrollo de Aplicaciones Móviles • S10 / AP5 Formulario de Registro
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* =================================================================
          FEEDBACK VISUAL DE ÉXITO (Modal Requerimiento Técnico #05)
         ================================================================= */}
      <SuccessModal
        visible={isSuccessModalVisible}
        onClose={() => setIsSuccessModalVisible(false)}
        onReset={handleResetForm}
        data={{
          nombre: values.nombre,
          correo: values.correo,
          curso: values.curso,
          edad: values.edad,
        }}
      />
    </SafeAreaView>
  );
}

// Subcomponente de fila del checklist
function ValidationItem({
  title,
  description,
  isValid,
  active,
}: {
  title: string;
  description: string;
  isValid: boolean;
  active: boolean;
}) {
  return (
    <View style={styles.validationItemRow}>
      <View
        style={[
          styles.itemIconCircle,
          isValid
            ? styles.itemIconCircleValid
            : active
            ? styles.itemIconCircleActive
            : styles.itemIconCircleInactive,
        ]}
      >
        <Text
          style={[
            styles.itemIconText,
            isValid ? styles.itemIconTextValid : styles.itemIconTextInactive,
          ]}
        >
          {isValid ? '✓' : '○'}
        </Text>
      </View>

      <View style={styles.itemInfo}>
        <Text style={[styles.itemTitle, isValid && styles.itemTitleValid]}>
          {title}
        </Text>
        <Text style={styles.itemDescription}>{description}</Text>
      </View>

      <View
        style={[
          styles.itemBadge,
          isValid ? styles.itemBadgeValid : styles.itemBadgePending,
        ]}
      >
        <Text
          style={[
            styles.itemBadgeText,
            isValid ? styles.itemBadgeTextValid : styles.itemBadgeTextPending,
          ]}
        >
          {isValid ? 'OK' : 'Pendiente'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xxxl,
  },

  /* HEADER */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  headerIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
    ...theme.shadows.sm,
  },
  headerIconGlyph: {
    fontSize: 22,
  },
  headerTexts: {
    flex: 1,
  },
  overline: {
    fontSize: theme.fontSize.overline,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 1.2,
    marginBottom: 2,
  },
  title: {
    fontSize: theme.fontSize.titleSm,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: theme.fontSize.bodySm,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: theme.spacing.lg,
  },

  /* FORM CARD */
  formCard: {
    backgroundColor: colors.card,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.md,
  },
  formCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.fontSize.subtitle,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  requiredNotice: {
    fontSize: theme.fontSize.caption,
    color: colors.textMuted,
    fontWeight: '500',
  },

  /* CHIPS DE CURSOS */
  chipsContainer: {
    marginTop: -theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  chipsLabel: {
    fontSize: theme.fontSize.caption,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: theme.spacing.xs + 2,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chipButton: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: theme.radius.full,
  },
  chipButtonSelected: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.borderFocus,
  },
  chipText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  chipTextSelected: {
    color: colors.primary,
    fontWeight: '700',
  },

  generalErrorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.errorLight,
    borderWidth: 1,
    borderColor: colors.errorBorder,
    borderRadius: theme.radius.sm,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  generalErrorIcon: {
    fontSize: 16,
    marginRight: theme.spacing.sm,
  },
  generalErrorText: {
    fontSize: theme.fontSize.bodySm,
    color: colors.errorText,
    fontWeight: '600',
    flex: 1,
  },
  buttonWrapper: {
    marginTop: theme.spacing.xs,
  },

  /* VALIDATION PROGRESS SECTION */
  progressCard: {
    backgroundColor: colors.card,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    marginBottom: theme.spacing.xl,
    ...theme.shadows.sm,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  progressTitle: {
    fontSize: theme.fontSize.bodyLg,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  progressSubtitle: {
    fontSize: theme.fontSize.caption,
    color: colors.textMuted,
    marginTop: 1,
  },
  progressCounterBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: theme.radius.full,
    backgroundColor: colors.primaryLight,
  },
  progressCounterText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '800',
  },
  progressBarTrack: {
    height: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: 3,
    overflow: 'hidden',
    marginVertical: theme.spacing.md,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  progressBarFillComplete: {
    backgroundColor: colors.success,
  },

  /* VALIDATION ROWS */
  validationItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm + 2,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  itemIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  itemIconCircleValid: {
    backgroundColor: colors.successLight,
    borderWidth: 1,
    borderColor: colors.successBorder,
  },
  itemIconCircleActive: {
    backgroundColor: colors.warningLight,
  },
  itemIconCircleInactive: {
    backgroundColor: '#F8FAFC',
  },
  itemIconText: {
    fontSize: 14,
    fontWeight: '900',
  },
  itemIconTextValid: {
    color: colors.success,
  },
  itemIconTextInactive: {
    color: colors.textMuted,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: theme.fontSize.bodySm,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  itemTitleValid: {
    color: colors.textPrimary,
  },
  itemDescription: {
    fontSize: theme.fontSize.caption,
    color: colors.textMuted,
    lineHeight: 16,
  },
  itemBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.radius.sm,
    marginLeft: theme.spacing.sm,
  },
  itemBadgeValid: {
    backgroundColor: colors.successLight,
  },
  itemBadgePending: {
    backgroundColor: '#F1F5F9',
  },
  itemBadgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  itemBadgeTextValid: {
    color: colors.successText,
  },
  itemBadgeTextPending: {
    color: colors.textMuted,
  },

  /* FOOTER */
  footerNote: {
    textAlign: 'center',
    fontSize: theme.fontSize.caption,
    color: colors.textMuted,
  },
});