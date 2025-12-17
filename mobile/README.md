# CRM App - Mobile (Expo)

Este es un scaffold mínimo para la versión móvil de la app.

Pasos para completar la instalación (en tu máquina local con Internet):

1. Desde la raíz de este directorio (`mobile/`) ejecuta:

   - Con `create-expo-app` (recomendado):
     npx create-expo-app . --template expo-template-blank-typescript

   - O bien instala dependencias manualmente:
     npm install

2. Iniciar la app:
   npm start

Notas:
- Si `npx create-expo-app` no funciona en este entorno, usa tu máquina local para completar la instalación. Aquí he incluido archivos esenciales y pantallas placeholder para avanzar con el desarrollo.
- Tras instalar, instala las librerías que necesitamos: `@react-navigation/*`, `@react-native-async-storage/async-storage`, `axios`, `@expo/vector-icons`, etc.
  
Dependencias recomendadas para continuar:

```
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/drawer
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-masked-view/masked-view
npm install axios
expo install @react-native-async-storage/async-storage
npm install @expo/vector-icons
```

Para respaldo y carga de archivos (descargar/leer JSON) usa:

```
expo install expo-file-system expo-sharing expo-document-picker
```

Y si quieres gráficos, considera `react-native-svg` + `victory-native` o `react-native-chart-kit`.
