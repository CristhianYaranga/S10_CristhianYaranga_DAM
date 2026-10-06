# S10_CristhianYaranga_DAM — Formularios y Validaciones (DAM)

**Estudiante:** Cristhian Yaranga  
**Entorno:** React Native + Expo  
**Opción Seleccionada:** **5. Registro de Curso**  

---

## 📋 Descripción del Proyecto
Aplicación móvil desarrollada con **React Native** y **Expo Router** que implementa un formulario interactivo Mobile-First con validaciones dinámicas en tiempo real y retroalimentación visual clara, cumpliendo estrictamente con la rúbrica de la actividad **AP5**.

---

## 🎯 Opción 5: Registro de Curso

### Campos del Formulario:
1. **Nombre del estudiante** (`TextInput` con soporte para mayúsculas por palabra).
2. **Correo electrónico** (`TextInput` con teclado `email-address`).
3. **Curso** (`TextInput` + Chips táctiles de selección rápida).
4. **Edad** (`TextInput` numérico).

### Reglas de Validación Aplicadas:
1. **Campos obligatorios:** Validación de que el nombre del estudiante y el curso no estén vacíos y tengan al menos 3 caracteres alfabéticos.
2. **Correo con @:** Validación formal de correo electrónico con estructura de usuario, `@` y dominio.
3. **Edad válida:** Verificación de que el estudiante sea mayor de edad (18 años o más y hasta 120 años).

---

## 🚀 Requerimientos Técnicos Cumplidos

- [x] **01 Formulario:** 4 campos de entrada (superando el mínimo de 3) y botón interactivo.
- [x] **02 Estado:** Manejo reactivo de estados con `useState` para valores, blur (`touched`), errores y carga.
- [x] **03 Validación:** Validaciones en tiempo real (`onChangeText`) y al perder el foco (`onBlur`).
- [x] **04 Mensaje:** Mensajes de error específicos con advertencia debajo de cada campo.
- [x] **05 Resultado:** Ventana modal de éxito (`SuccessModal`) con resumen de la inscripción y opción de reiniciar.
- [x] **Componentes Clave:** `TextInput`, `useState`, `onChangeText`, `Pressable`, `Validaciones`, `Feedback UI`.
- [x] **Restricción:** Sin bases de datos externas, sin APIs de terceros y sin módulos de login/autenticación.

---

## 📱 Guía para Capturas de Evidencia (Entregable)

| Evidencia | Descripción | Cómo obtenerla |
| :--- | :--- | :--- |
| **Captura 1 — Formulario** | Pantalla principal del formulario limpia y ordenada. | Abrir la app con los campos vacíos y la barra en 0/3. |
| **Captura 2 — Validación** | Formulario con datos incorrectos y mensajes de error. | Presionar *"Registrar Curso"* sin llenar los campos o ingresar un correo sin `@` y edad menor a 18 años. |
| **Captura 3 — Resultado Exitoso** | Formulario con datos válidos y mensaje de éxito. | Llenar los datos válidos y presionar *"Registrar Curso"* para abrir el modal de confirmación con el resumen. |

---

## 🛠️ Instalación y Ejecución Local

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/CristhianYaranga/S26_CristhianYaranga_DAM.git
   ```

2. Entrar al proyecto e instalar dependencias:
   ```bash
   cd FormularioApp
   npm install
   ```

3. Iniciar en navegador web:
   ```bash
   npx expo start --web
   ```

4. Iniciar en dispositivo móvil con Expo Go (Android / iOS):
   ```bash
   npx expo start
   ```
