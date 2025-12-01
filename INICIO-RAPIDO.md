# 🚀 GUÍA RÁPIDA - INICIO EN 3 PASOS

## Paso 1: Abrir en Cursor
1. Descarga esta carpeta completa: `innovative-demo-project`
2. Abre Cursor (https://cursor.sh)
3. En Cursor: File → Open Folder → Selecciona `innovative-demo-project`

## Paso 2: Instalar
Abre la terminal en Cursor y ejecuta:
```bash
npm install
```

## Paso 3: Correr
```bash
npm run dev
```

¡Listo! Se abrirá en http://localhost:3000

---

## 💡 USAR EL AI DE CURSOR

### Para modificar el demo:
1. Presiona `Cmd + K` (Mac) o `Ctrl + K` (Windows)
2. Escribe lo que quieres cambiar, por ejemplo:
   - "Agrega un gráfico de pastel con la distribución de clientes"
   - "Cambia el color verde a azul"
   - "Agrega una vista de inventario"
   - "Haz el sidebar más ancho"

### Para hacer preguntas:
1. Presiona `Cmd + L` (Mac) o `Ctrl + L` (Windows)
2. Pregunta cualquier cosa sobre el código:
   - "¿Cómo funciona el pipeline?"
   - "¿Dónde están los datos del equipo?"
   - "¿Cómo agrego un nuevo colaborador?"

---

## 📝 MODIFICAR DATOS

Abre `src/App.jsx` y busca estas variables al inicio:

### Datos del equipo comercial:
```javascript
const salesTeamData = [
  { 
    name: 'Carlos Mendoza',
    leads: 12,
    // ... más datos
  }
]
```

### Datos de clientes:
```javascript
const clientesConReportes = [
  { 
    name: 'Walmart México',
    // ... más datos
  }
]
```

---

## 🎨 CAMBIAR COLORES

En `src/App.jsx`, busca:
```javascript
const COLORS_INNOVATIVE = {
  primary: '#2D6A4F',    // Cambia este color
  secondary: '#52B788',  // Y este
  // ...
};
```

---

## 🆘 ¿PROBLEMAS?

### Error al instalar:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Puerto ocupado:
El servidor intentará el puerto 3000. Si está ocupado, usa otro:
```bash
npm run dev -- --port 3001
```

### Cursor no responde:
1. Reinicia Cursor
2. Asegúrate de tener conexión a internet (el AI necesita internet)

---

## 📦 PARA PRODUCCIÓN

Cuando quieras crear la versión final:
```bash
npm run build
```

Los archivos listos estarán en la carpeta `dist/`

Puedes subirlos a:
- Vercel (gratis): https://vercel.com
- Netlify (gratis): https://netlify.com
- Cualquier hosting

---

**¡Éxito! 🎉**
