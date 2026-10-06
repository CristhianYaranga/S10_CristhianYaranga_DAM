/**
 * Módulo de Validaciones Dinámicas - Actividad AP5 / DAM
 * Opción 5: Registro de Curso
 * 
 * Reglas solicitadas en la rúbrica oficial:
 * 1. Campos obligatorios
 * 2. Correo con formato válido (@ y dominio)
 * 3. Edad válida (entero, mayor o igual a 18 años)
 */

export interface ValidationResult {
  isValid: boolean;
  message: string;
}

/**
 * Valida el nombre del estudiante:
 * - Campo obligatorio
 * - Mínimo 3 caracteres
 * - Solo caracteres alfabéticos y espacios
 */
export function validarNombreEstudiante(nombre: string): ValidationResult {
  const limpio = nombre.trim();

  if (!limpio) {
    return {
      isValid: false,
      message: 'El nombre del estudiante es obligatorio.',
    };
  }

  if (limpio.length < 3) {
    return {
      isValid: false,
      message: 'Debe contener al menos 3 caracteres.',
    };
  }

  const regexSoloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
  if (!regexSoloLetras.test(limpio)) {
    return {
      isValid: false,
      message: 'El nombre solo debe contener letras y espacios.',
    };
  }

  return {
    isValid: true,
    message: 'Nombre válido',
  };
}

/**
 * Valida el correo electrónico:
 * - Campo obligatorio
 * - Debe contener arroba y estructura formal de correo
 */
export function validarCorreo(correo: string): ValidationResult {
  const limpio = correo.trim();

  if (!limpio) {
    return {
      isValid: false,
      message: 'El correo electrónico es obligatorio.',
    };
  }

  // Regex formal con @ y dominio requerido
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regexEmail.test(limpio)) {
    return {
      isValid: false,
      message: 'Ingresa un correo válido con @ (ej. estudiante@correo.com).',
    };
  }

  return {
    isValid: true,
    message: 'Correo válido',
  };
}

/**
 * Valida el curso seleccionado / ingresado:
 * - Campo obligatorio
 * - Mínimo 3 caracteres
 */
export function validarCurso(curso: string): ValidationResult {
  const limpio = curso.trim();

  if (!limpio) {
    return {
      isValid: false,
      message: 'El nombre del curso es obligatorio.',
    };
  }

  if (limpio.length < 3) {
    return {
      isValid: false,
      message: 'El nombre del curso debe tener al menos 3 caracteres.',
    };
  }

  return {
    isValid: true,
    message: 'Curso válido',
  };
}

/**
 * Valida la edad del estudiante:
 * - Campo obligatorio
 * - Debe ser un número entero
 * - Edad válida (18 a 120 años)
 */
export function validarEdad(edad: string): ValidationResult {
  const limpio = edad.trim();

  if (!limpio) {
    return {
      isValid: false,
      message: 'La edad es obligatoria.',
    };
  }

  if (!/^\d+$/.test(limpio)) {
    return {
      isValid: false,
      message: 'La edad debe ser un número entero.',
    };
  }

  const numero = parseInt(limpio, 10);

  if (isNaN(numero)) {
    return {
      isValid: false,
      message: 'Ingresa una edad numérica válida.',
    };
  }

  if (numero < 18) {
    return {
      isValid: false,
      message: 'Debes tener 18 años o más para matricularte.',
    };
  }

  if (numero > 120) {
    return {
      isValid: false,
      message: 'Ingresa una edad válida (máximo 120 años).',
    };
  }

  return {
    isValid: true,
    message: 'Edad válida',
  };
}