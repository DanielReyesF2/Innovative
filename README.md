# 🚀 Innovative Group - Sistema de Gestión Comercial

Demo interactivo completo del sistema de gestión comercial para Innovative Group, desarrollado con React, Vite, y Tailwind CSS.

## 📋 Características

✅ **Generación de Levantamientos y Propuestas**
✅ **Pipeline Comercial Completo** (Leads → Cierres)
✅ **Control del Equipo** (Pipeline + Presupuesto + KPIs)
✅ **Reportes Automáticos Mensuales** a clientes
✅ **Conciliación de RME y Servicios**

---

## 🎯 INSTRUCCIONES PARA USAR EN CURSOR

### Opción 1: Proyecto Completo (Recomendado)

1. **Abre Cursor** (https://cursor.sh)

2. **Abre esta carpeta en Cursor:**
   - File → Open Folder
   - Selecciona la carpeta `innovative-demo-project`

3. **Instala las dependencias:**
   ```bash
   npm install
   ```

4. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

5. **¡Listo!** Se abrirá automáticamente en `http://localhost:3000`

---

### Opción 2: Modificar con AI de Cursor

Una vez que tengas el proyecto abierto en Cursor:

1. **Presiona `Cmd + K` (Mac) o `Ctrl + K` (Windows)** para abrir Cursor AI

2. **Pide modificaciones directamente**, por ejemplo:
   - "Agrega una vista de análisis financiero"
   - "Cambia los colores a un tema más oscuro"
   - "Agrega más gráficas al dashboard"
   - "Crea una vista de reportes históricos"

3. **Cursor AI modificará el código automáticamente** siguiendo tus instrucciones

---

## 📂 Estructura del Proyecto

```
innovative-demo-project/
├── index.html              # Archivo HTML principal
├── package.json            # Dependencias del proyecto
├── vite.config.js         # Configuración de Vite
├── tailwind.config.js     # Configuración de Tailwind CSS
├── postcss.config.js      # Configuración de PostCSS
└── src/
    ├── main.jsx           # Punto de entrada de React
    ├── App.jsx            # Componente principal del demo
    └── index.css          # Estilos globales con Tailwind
```

---

## 🛠️ Comandos Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye para producción
- `npm run preview` - Vista previa de la build de producción

---

## 🎨 Personalización

### Cambiar Colores de Marca

Abre `src/App.jsx` y modifica el objeto `COLORS_INNOVATIVE`:

```javascript
const COLORS_INNOVATIVE = {
  primary: '#2D6A4F',    // Verde bosque
  secondary: '#52B788',  // Verde medio
  accent: '#74C69D',     // Verde claro
  blue: '#1B4965',       // Azul corporativo
  // ... más colores
};
```

### Modificar Datos del Demo

Busca las variables de datos al inicio de `App.jsx`:
- `salesTeamData` - Datos del equipo comercial
- `pipelineData` - Datos del embudo
- `clientesConReportes` - Clientes con reportes
- `levantamientosActivos` - Levantamientos y propuestas

---

## 💡 Tips para Cursor

1. **Selecciona código** y presiona `Cmd/Ctrl + K` para modificar solo esa parte
2. **Usa el chat** de Cursor para hacer preguntas sobre el código
3. **Pide mejoras específicas** como "hazlo más responsive" o "agrega animaciones"
4. **Genera nuevas vistas** describiendo lo que quieres

---

## 🚀 Para Producción

1. Construye el proyecto:
   ```bash
   npm run build
   ```

2. La carpeta `dist/` contendrá los archivos listos para producción

3. Puedes subirlos a cualquier hosting estático:
   - Vercel (recomendado): `vercel deploy`
   - Netlify: Arrastra la carpeta `dist/`
   - GitHub Pages
   - Cualquier servidor web

---

## 📱 Funcionalidades Interactivas

- ✅ Click en colaboradores → Modal con análisis detallado
- ✅ Click en clientes → Modal con impacto ambiental
- ✅ Navegación fluida entre módulos
- ✅ Gráficas interactivas con Recharts
- ✅ Diseño responsive
- ✅ Animaciones y transiciones suaves

---

## 🎯 Vistas Disponibles

1. **Dashboard Ejecutivo** - Métricas clave y control del equipo
2. **Pipeline Comercial** - Embudo de ventas visual
3. **Levantamientos** - Gestión de oportunidades
4. **Control Equipo** - Análisis individual de colaboradores
5. **Reportes Automáticos** - Sistema de envío mensual
6. **Conciliación RME** - Validación de servicios

---

## 🆘 Soporte

Si tienes dudas o necesitas ayuda:
- Usa el AI de Cursor para resolver problemas
- Pregunta en el chat: "¿Cómo puedo...?"
- Cursor te ayudará a debuggear y mejorar el código

---

## 📄 Licencia

Este proyecto es un demo personalizado para Innovative Group × EcoNova.

---

**Desarrollado con ❤️ usando Claude AI, React, Vite y Tailwind CSS**
