import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';

// Tipos (copiados/adaptados)
export interface Usuario {
  id: string;
  nombre: string;
  rol: 'superadmin' | 'admin' | 'empleado';
  contraseña: string;
}

export interface Producto {
  id: string;
  nombre: string;
  categoria: 'cocina' | 'cantina';
  cantidad: number;
  unidad: string;
  precioUnitario: number;
  fechaActualizacion: string;
}

export interface Movimiento {
  id: string;
  tipo: 'entrada' | 'salida' | 'consumo' | 'suministro';
  productoId: string;
  cantidad: number;
  origen?: string;
  destino?: string;
  fecha: string;
  mesa?: number;
}

export interface Local {
  id: string;
  nombre: string;
  activo: boolean;
  almacen: Producto[];
}

export interface AppData {
  usuarios: Usuario[];
  almacenCentral: Producto[];
  locales: Local[];
  movimientos: Movimiento[];
  pedidosMesas: { [mesaId: number]: { items: { productoId: string; cantidad: number; nombre: string }[]; total: number; activa: boolean } };
  ultimoRespaldo: string;
}

const datosIniciales: AppData = {
  usuarios: [
    { id: 'gerente-001', nombre: 'Gerente', rol: 'superadmin', contraseña: 'admin123' }
  ],
  almacenCentral: [],
  locales: [],
  movimientos: [],
  pedidosMesas: {},
  ultimoRespaldo: new Date().toISOString()
};

const STORAGE_KEY = 'crm-locales-data';
const BACKUP_FILENAME_PREFIX = 'respaldo-crm-';
const USUARIO_ACTUAL_KEY = 'usuario-actual';

export const cargarDatos = async (): Promise<AppData> => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    if (json) return JSON.parse(json) as AppData;
  } catch (error) {
    console.error('Error al cargar datos (AsyncStorage):', error);
  }
  await guardarDatos(datosIniciales);
  return datosIniciales;
};

export const guardarDatos = async (datos: AppData): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(datos));
  } catch (error) {
    console.error('Error al guardar datos (AsyncStorage):', error);
  }
};

export const crearRespaldo = async (): Promise<string> => {
  const datos = await cargarDatos();
  datos.ultimoRespaldo = new Date().toISOString();
  const respaldo = JSON.stringify(datos);
  await AsyncStorage.setItem(`${STORAGE_KEY}-respaldo`, respaldo);
  return respaldo;
};

export const descargarRespaldo = async (): Promise<boolean> => {
  try {
    const respaldo = await crearRespaldo();
    const filename = `${BACKUP_FILENAME_PREFIX}${new Date().toISOString().split('T')[0]}.json`;
    const filepath = `${FileSystem.documentDirectory}${filename}`;
    await FileSystem.writeAsStringAsync(filepath, respaldo, { encoding: FileSystem.EncodingType.UTF8 });
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(filepath);
    }
    return true;
  } catch (error) {
    console.error('Error al descargar respaldo:', error);
    return false;
  }
};

export const cargarRespaldo = async (): Promise<boolean> => {
  try {
    const res = await DocumentPicker.getDocumentAsync({ type: 'application/json' });
    if (res.type === 'success' && res.uri) {
      const contenido = await FileSystem.readAsStringAsync(res.uri, { encoding: FileSystem.EncodingType.UTF8 });
      const datos = JSON.parse(contenido);
      await guardarDatos(datos as AppData);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error al cargar respaldo desde archivo:', error);
    return false;
  }
};

export const autenticarUsuario = async (nombre: string, contraseña: string): Promise<Usuario | null> => {
  const datos = await cargarDatos();
  const usuario = datos.usuarios.find(u => u.nombre === nombre && u.contraseña === contraseña);
  return usuario || null;
};

export const obtenerUsuarioActual = async (): Promise<Usuario | null> => {
  try {
    const json = await AsyncStorage.getItem(USUARIO_ACTUAL_KEY);
    if (json) return JSON.parse(json) as Usuario;
  } catch (error) {
    console.error('Error al obtener usuario actual:', error);
  }
  return null;
};

export const guardarUsuarioActual = async (usuario: Usuario): Promise<void> => {
  try {
    await AsyncStorage.setItem(USUARIO_ACTUAL_KEY, JSON.stringify(usuario));
  } catch (error) {
    console.error('Error al guardar usuario actual:', error);
  }
};

export const cerrarSesion = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(USUARIO_ACTUAL_KEY);
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};