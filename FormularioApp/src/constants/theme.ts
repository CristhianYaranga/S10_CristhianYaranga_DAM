import { Platform } from 'react-native';

/**
 * Sistema de Diseño y Tokens UI/UX Mobile-First
 * Criterio #5: Espaciado generoso, áreas de toque óptimas y escala visual pulida
 */
export const theme = {
  // Espaciado generoso (8pt grid system)
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },

  // Radios de esquina modernos y suaves
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 9999,
  },

  // Escala tipográfica móvil con excelente jerarquía
  fontSize: {
    overline: 11,
    caption: 12,
    bodySm: 13,
    body: 15,
    bodyLg: 16,
    subtitle: 17,
    titleSm: 20,
    title: 24,
    headline: 28,
  },

  // Áreas de toque mínimas recomendadas por Apple HIG (44pt) y Google Material (48dp)
  touchTarget: {
    minHeight: 52, // 52px para una pulsación cómoda con el pulgar en móviles
  },

  // Sombras sutiles y naturales (iOS / Android / Web)
  shadows: {
    sm: Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 1,
      },
      default: {
        boxShadow: '0 1px 3px rgba(15, 23, 42, 0.06)',
      },
    }),
    md: Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
      },
      android: {
        elevation: 3,
      },
      default: {
        boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)',
      },
    }),
    modal: Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.18,
        shadowRadius: 24,
      },
      android: {
        elevation: 8,
      },
      default: {
        boxShadow: '0 12px 32px rgba(15, 23, 42, 0.2)',
      },
    }),
  },
};