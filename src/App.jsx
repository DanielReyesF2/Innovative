import React, { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ResponsiveSankey } from '@nivo/sankey';
import html2canvas from 'html2canvas';
import { Home, TrendingUp, Package, Users, FileText, Settings, ChevronRight, Download, Search, Filter, Bell, LogOut, Menu, X, DollarSign, Target, PhoneCall, Award, Calendar, MapPin, Truck, Leaf, Briefcase, ClipboardList, CheckSquare, AlertCircle, Send, Eye, Recycle, Trash2, BarChart3, TrendingDown, ChevronDown, ChevronUp, Save, FileImage, RotateCcw, Building2 } from 'lucide-react';

// TOP PROSPECTOS - EMPRESAS REALES MEXICANAS
const topProspectos = [
  {
    id: 1,
    nombre: 'Grupo Bimbo',
    industria: 'Manufactura Alimentaria',
    ubicacion: 'Ciudad de México',
    potencial: 'Alto',
    volumenEstimado: '120 ton/mes',
    valorEstimado: 3600000,
    probabilidad: 75,
    etapa: 'Negociación',
    contacto: 'María González - Gerente de Sustentabilidad',
    ultimaActividad: 'Reunión técnica programada',
    prioridad: 'Alta',
    razon: 'Compromiso público con economía circular 2025',
    levantamientoId: 1,
    propuestaId: 1,
    tieneLevantamiento: true,
    tienePropuesta: true,
    proximoPaso: 'Revisión de términos contractuales',
    tiempoEstimadoCierre: '2-3 semanas',
    riesgo: 'Bajo',
    oportunidad: 'Alta - Compromiso público facilita aprobación',
    asesorComercial: 'Carlos Mendoza'
  },
  {
    id: 2,
    nombre: 'Grupo Modelo (AB InBev)',
    industria: 'Bebidas',
    ubicacion: 'Ciudad de México',
    potencial: 'Muy Alto',
    volumenEstimado: '85 ton/mes',
    valorEstimado: 2550000,
    probabilidad: 68,
    etapa: 'Propuesta',
    contacto: 'Carlos Ramírez - Director de Operaciones',
    ultimaActividad: 'Propuesta enviada - esperando respuesta',
    prioridad: 'Alta',
    razon: 'Iniciativa de cero residuos a relleno sanitario',
    levantamientoId: 2,
    propuestaId: 2,
    tieneLevantamiento: true,
    tienePropuesta: true,
    proximoPaso: 'Seguimiento de propuesta - respuesta esperada',
    tiempoEstimadoCierre: '3-4 semanas',
    riesgo: 'Medio',
    oportunidad: 'Muy Alta - Presupuesto aprobado para 2025',
    asesorComercial: 'Ana Martínez',
    fechaPropuesta: '2025-11-20'
  },
  {
    id: 3,
    nombre: 'Grupo Salinas (Elektra)',
    industria: 'Retail',
    ubicacion: 'Ciudad de México',
    potencial: 'Alto',
    volumenEstimado: '95 ton/mes',
    valorEstimado: 2850000,
    probabilidad: 60,
    etapa: 'Levantamiento',
    contacto: 'Patricia López - Coordinadora Ambiental',
    ultimaActividad: 'Levantamiento completado - análisis en curso',
    prioridad: 'Media',
    razon: 'Expansión de programa de reciclaje',
    levantamientoId: 3,
    propuestaId: null,
    tieneLevantamiento: true,
    tienePropuesta: false,
    proximoPaso: 'Generar propuesta basada en levantamiento',
    tiempoEstimadoCierre: '4-6 semanas',
    riesgo: 'Medio',
    oportunidad: 'Alta - Necesidad identificada en levantamiento',
    asesorComercial: 'Roberto Sánchez'
  },
  {
    id: 4,
    nombre: 'Grupo Femsa (Oxxo)',
    industria: 'Retail Conveniencia',
    ubicacion: 'Monterrey, NL',
    potencial: 'Muy Alto',
    volumenEstimado: '200 ton/mes',
    valorEstimado: 6000000,
    probabilidad: 45,
    etapa: 'Levantamiento',
    contacto: 'Roberto Martínez - Gerente de Sostenibilidad',
    ultimaActividad: 'Primera reunión exploratoria',
    prioridad: 'Muy Alta',
    razon: 'Red de 20,000+ tiendas - alto impacto',
    levantamientoId: 4,
    propuestaId: null,
    tieneLevantamiento: true,
    tienePropuesta: false,
    proximoPaso: 'Completar levantamiento en 5 sucursales piloto',
    tiempoEstimadoCierre: '6-8 semanas',
    riesgo: 'Alto - Proceso de aprobación complejo',
    oportunidad: 'Muy Alta - Mayor volumen potencial del pipeline',
    asesorComercial: 'Laura Fernández'
  },
  {
    id: 5,
    nombre: 'Grupo Posadas',
    industria: 'Hotelería',
    ubicacion: 'Ciudad de México',
    potencial: 'Alto',
    volumenEstimado: '45 ton/mes',
    valorEstimado: 1350000,
    probabilidad: 70,
    etapa: 'Negociación',
    contacto: 'Ana Fernández - Directora de Operaciones',
    ultimaActividad: 'Revisión de propuesta técnica',
    prioridad: 'Alta',
    razon: 'Certificación LEED y estándares internacionales',
    levantamientoId: 5,
    propuestaId: 3,
    tieneLevantamiento: true,
    tienePropuesta: true,
    proximoPaso: 'Ajustes finales en términos de servicio',
    tiempoEstimadoCierre: '1-2 semanas',
    riesgo: 'Bajo',
    oportunidad: 'Alta - Certificación LEED requiere trazabilidad',
    asesorComercial: 'Carlos Mendoza'
  },
  {
    id: 6,
    nombre: 'Grupo Lala',
    industria: 'Lácteos',
    ubicacion: 'Torreón, Coahuila',
    potencial: 'Alto',
    volumenEstimado: '65 ton/mes',
    valorEstimado: 1950000,
    probabilidad: 55,
    etapa: 'Propuesta',
    contacto: 'Luis Hernández - Gerente de Calidad',
    ultimaActividad: 'Propuesta en evaluación interna',
    prioridad: 'Media',
    razon: 'Programa de economía circular',
    levantamientoId: 6,
    propuestaId: 4,
    tieneLevantamiento: true,
    tienePropuesta: true,
    proximoPaso: 'Seguimiento de evaluación interna',
    tiempoEstimadoCierre: '4-5 semanas',
    riesgo: 'Medio',
    oportunidad: 'Media - Proceso de aprobación interno lento',
    asesorComercial: 'Ana Martínez',
    fechaPropuesta: '2025-11-26'
  },
  {
    id: 7,
    nombre: 'Hospital Ángeles',
    industria: 'Salud',
    ubicacion: 'Ciudad de México',
    potencial: 'Medio',
    volumenEstimado: '28 ton/mes',
    valorEstimado: 840000,
    probabilidad: 80,
    etapa: 'Negociación',
    contacto: 'Dr. Jorge Silva - Director Administrativo',
    ultimaActividad: 'Negociación de términos finales',
    prioridad: 'Alta',
    razon: 'Cumplimiento normativo RME hospitalario',
    levantamientoId: 7,
    propuestaId: 5,
    tieneLevantamiento: true,
    tienePropuesta: true,
    proximoPaso: 'Firma de contrato',
    tiempoEstimadoCierre: '1 semana',
    riesgo: 'Muy Bajo',
    oportunidad: 'Alta - Urgencia por cumplimiento normativo',
    asesorComercial: 'Roberto Sánchez'
  },
  {
    id: 8,
    nombre: 'Grupo Alsea (Starbucks, Domino\'s)',
    industria: 'Restaurantes',
    ubicacion: 'Ciudad de México',
    potencial: 'Muy Alto',
    volumenEstimado: '150 ton/mes',
    valorEstimado: 4500000,
    probabilidad: 40,
    etapa: 'Levantamiento',
    contacto: 'Sofía Mendoza - Coordinadora de Sustentabilidad',
    ultimaActividad: 'Levantamiento inicial programado',
    prioridad: 'Muy Alta',
    razon: 'Compromiso global de cero residuos',
    levantamientoId: 8,
    propuestaId: null,
    tieneLevantamiento: true,
    tienePropuesta: false,
    proximoPaso: 'Iniciar levantamiento en sucursales piloto',
    tiempoEstimadoCierre: '8-10 semanas',
    riesgo: 'Alto - Múltiples stakeholders',
    oportunidad: 'Muy Alta - Mayor oportunidad del pipeline',
    asesorComercial: 'Laura Fernández'
  },
  {
    id: 9,
    nombre: 'PepsiCo México',
    industria: 'Bebidas',
    ubicacion: 'Ciudad de México',
    potencial: 'Muy Alto',
    volumenEstimado: '180 ton/mes',
    valorEstimado: 5400000,
    probabilidad: 0,
    etapa: 'Rechazada',
    contacto: 'Diana Morales - Gerente de Compras',
    ultimaActividad: 'Propuesta rechazada',
    prioridad: 'Baja',
    razon: 'Licitación para gestión integral de residuos',
    levantamientoId: null,
    propuestaId: null,
    tieneLevantamiento: true,
    tienePropuesta: true,
    proximoPaso: 'Seguimiento en 6 meses',
    tiempoEstimadoCierre: 'N/A',
    riesgo: 'Alto',
    oportunidad: 'Perdida - Licitación adjudicada a competencia',
    asesorComercial: 'Carlos Mendoza',
    motivoRechazo: 6,
    motivoRechazoDetalle: 'No presentamos permisos ambientales a tiempo',
    fechaRechazo: '2025-10-15'
  },
  {
    id: 10,
    nombre: 'Grupo Gigante',
    industria: 'Retail',
    ubicacion: 'Ciudad de México',
    potencial: 'Alto',
    volumenEstimado: '75 ton/mes',
    valorEstimado: 2250000,
    probabilidad: 0,
    etapa: 'Rechazada',
    contacto: 'Roberto Torres - Director de Operaciones',
    ultimaActividad: 'Cliente decidió continuar con proveedor actual',
    prioridad: 'Baja',
    razon: 'Renovación de contrato de residuos',
    levantamientoId: null,
    propuestaId: null,
    tieneLevantamiento: true,
    tienePropuesta: true,
    proximoPaso: 'N/A',
    tiempoEstimadoCierre: 'N/A',
    riesgo: 'Alto',
    oportunidad: 'Perdida',
    asesorComercial: 'Ana Martínez',
    motivoRechazo: 1,
    motivoRechazoDetalle: 'Nuestra propuesta fue 15% más cara que el proveedor actual',
    fechaRechazo: '2025-09-28'
  },
  {
    id: 11,
    nombre: 'Hotel Fiesta Americana',
    industria: 'Hotelería',
    ubicacion: 'Cancún, Quintana Roo',
    potencial: 'Medio',
    volumenEstimado: '25 ton/mes',
    valorEstimado: 750000,
    probabilidad: 0,
    etapa: 'Rechazada',
    contacto: 'Sandra Pérez - Gerente General',
    ultimaActividad: 'No cumplen requisito de recolección diaria',
    prioridad: 'Baja',
    razon: 'Programa de sustentabilidad hotelera',
    levantamientoId: null,
    propuestaId: null,
    tieneLevantamiento: true,
    tienePropuesta: true,
    proximoPaso: 'N/A',
    tiempoEstimadoCierre: 'N/A',
    riesgo: 'Medio',
    oportunidad: 'Perdida',
    asesorComercial: 'Roberto Sánchez',
    motivoRechazo: 4,
    motivoRechazoDetalle: 'No tenemos capacidad de recolección diaria en Cancún',
    fechaRechazo: '2025-10-05'
  },
  {
    id: 12,
    nombre: 'Restaurante Local Chapultepec',
    industria: 'Restaurantes',
    ubicacion: 'Ciudad de México',
    potencial: 'Bajo',
    volumenEstimado: '8 ton/mes',
    valorEstimado: 240000,
    probabilidad: 0,
    etapa: 'Rechazada',
    contacto: 'Mario Hernández - Propietario',
    ultimaActividad: 'Volumen insuficiente para servicio',
    prioridad: 'Baja',
    razon: 'Gestión de residuos orgánicos',
    levantamientoId: null,
    propuestaId: null,
    tieneLevantamiento: true,
    tienePropuesta: false,
    proximoPaso: 'N/A',
    tiempoEstimadoCierre: 'N/A',
    riesgo: 'Bajo',
    oportunidad: 'Perdida - No viable',
    asesorComercial: 'Patricia Morales',
    motivoRechazo: 7,
    motivoRechazoDetalle: 'Solo genera 8 ton/mes, por debajo del mínimo de viabilidad',
    fechaRechazo: '2025-10-20'
  }
];

// DATOS DEL PIPELINE COMERCIAL
// DATOS DE LEADS
const leadsData = [
  { id: 1, empresa: 'Coca-Cola FEMSA', contacto: 'Juan Pérez - Gerente de Sustentabilidad', fecha: '15 Nov 2025', origen: 'Referido', valor: 320000, industria: 'Bebidas', ubicacion: 'Ciudad de México', asignadoA: null },
  { id: 2, empresa: 'Grupo Herdez', contacto: 'María García - Directora de Operaciones', fecha: '14 Nov 2025', origen: 'Web', valor: 280000, industria: 'Alimentos', ubicacion: 'Ciudad de México', asignadoA: null },
  { id: 3, empresa: 'Grupo Carso', contacto: 'Carlos López - Coordinador Ambiental', fecha: '13 Nov 2025', origen: 'LinkedIn', valor: 450000, industria: 'Conglomerado', ubicacion: 'Ciudad de México', asignadoA: null },
  { id: 4, empresa: 'Grupo México', contacto: 'Ana Martínez - Gerente de Sostenibilidad', fecha: '12 Nov 2025', origen: 'Referido', valor: 380000, industria: 'Minería', ubicacion: 'Hermosillo, Sonora', asignadoA: null },
  { id: 5, empresa: 'Grupo Televisa', contacto: 'Roberto Sánchez - Director de Operaciones', fecha: '11 Nov 2025', origen: 'Web', valor: 290000, industria: 'Medios', ubicacion: 'Ciudad de México', asignadoA: null },
  { id: 6, empresa: 'Grupo Gigante', contacto: 'Patricia Fernández - Coordinadora Ambiental', fecha: '10 Nov 2025', origen: 'Evento', valor: 310000, industria: 'Retail', ubicacion: 'Ciudad de México', asignadoA: null },
  { id: 7, empresa: 'Grupo Coppel', contacto: 'Luis Hernández - Gerente de Sostenibilidad', fecha: '9 Nov 2025', origen: 'Referido', valor: 340000, industria: 'Retail', ubicacion: 'Culiacán, Sinaloa', asignadoA: null },
  { id: 8, empresa: 'Grupo Chedraui', contacto: 'Sofía Mendoza - Directora de Operaciones', fecha: '8 Nov 2025', origen: 'Web', valor: 360000, industria: 'Retail', ubicacion: 'Xalapa, Veracruz', asignadoA: null },
  { id: 9, empresa: 'Grupo Palacio de Hierro', contacto: 'Jorge Silva - Coordinador Ambiental', fecha: '7 Nov 2025', origen: 'LinkedIn', valor: 270000, industria: 'Retail', ubicacion: 'Ciudad de México', asignadoA: null },
  { id: 10, empresa: 'Grupo Liverpool', contacto: 'Carmen Ruiz - Gerente de Sostenibilidad', fecha: '6 Nov 2025', origen: 'Referido', valor: 330000, industria: 'Retail', ubicacion: 'Ciudad de México', asignadoA: null },
  { id: 11, empresa: 'Grupo Soriana', contacto: 'Fernando Torres - Director de Operaciones', fecha: '5 Nov 2025', origen: 'Web', valor: 350000, industria: 'Retail', ubicacion: 'Torreón, Coahuila', asignadoA: null },
  { id: 12, empresa: 'Grupo Comercial Chedraui', contacto: 'Laura González - Coordinadora Ambiental', fecha: '4 Nov 2025', origen: 'Evento', valor: 300000, industria: 'Retail', ubicacion: 'Ciudad de México', asignadoA: null },
  { id: 13, empresa: 'Grupo Bafar', contacto: 'Miguel Ángel Ramírez - Gerente de Sostenibilidad', fecha: '3 Nov 2025', origen: 'Referido', valor: 280000, industria: 'Alimentos', ubicacion: 'Chihuahua, Chihuahua', asignadoA: null },
  { id: 14, empresa: 'Grupo La Moderna', contacto: 'Isabel Castro - Directora de Operaciones', fecha: '2 Nov 2025', origen: 'Web', valor: 290000, industria: 'Alimentos', ubicacion: 'Ciudad de México', asignadoA: null },
  { id: 15, empresa: 'Grupo Maseca', contacto: 'Ricardo Morales - Coordinador Ambiental', fecha: '1 Nov 2025', origen: 'LinkedIn', valor: 320000, industria: 'Alimentos', ubicacion: 'Monterrey, NL', asignadoA: null },
  { id: 16, empresa: 'Grupo Bimbo', contacto: 'Elena Vargas - Gerente de Sostenibilidad', fecha: '31 Oct 2025', origen: 'Referido', valor: 400000, industria: 'Alimentos', ubicacion: 'Ciudad de México', asignadoA: null },
  { id: 17, empresa: 'Grupo Lala', contacto: 'Diego Moreno - Director de Operaciones', fecha: '30 Oct 2025', origen: 'Web', valor: 310000, industria: 'Lácteos', ubicacion: 'Torreón, Coahuila', asignadoA: null },
  { id: 18, empresa: 'Grupo Jumex', contacto: 'Gabriela Jiménez - Coordinadora Ambiental', fecha: '29 Oct 2025', origen: 'Evento', valor: 270000, industria: 'Bebidas', ubicacion: 'Ciudad de México', asignadoA: null },
  { id: 19, empresa: 'Grupo Bachoco', contacto: 'Andrés Ríos - Gerente de Sostenibilidad', fecha: '28 Oct 2025', origen: 'Referido', valor: 340000, industria: 'Alimentos', ubicacion: 'Celaya, Guanajuato', asignadoA: null },
  { id: 20, empresa: 'Grupo La Costeña', contacto: 'Claudia Núñez - Directora de Operaciones', fecha: '27 Oct 2025', origen: 'Web', valor: 280000, industria: 'Alimentos', ubicacion: 'Ciudad de México', asignadoA: null },
  { id: 21, empresa: 'Grupo Nutrisa', contacto: 'Oscar Delgado - Coordinador Ambiental', fecha: '26 Oct 2025', origen: 'LinkedIn', valor: 260000, industria: 'Alimentos', ubicacion: 'Ciudad de México', asignadoA: null },
  { id: 22, empresa: 'Grupo Sigma Alimentos', contacto: 'Verónica Pacheco - Gerente de Sostenibilidad', fecha: '25 Oct 2025', origen: 'Referido', valor: 350000, industria: 'Alimentos', ubicacion: 'Monterrey, NL', asignadoA: null },
  { id: 23, empresa: 'Grupo Alpura', contacto: 'Raúl Mendoza - Director de Operaciones', fecha: '24 Oct 2025', origen: 'Web', valor: 300000, industria: 'Lácteos', ubicacion: 'Ciudad de México', asignadoA: null },
  { id: 24, empresa: 'Grupo Danone', contacto: 'Adriana Solís - Coordinadora Ambiental', fecha: '23 Oct 2025', origen: 'Evento', valor: 320000, industria: 'Lácteos', ubicacion: 'Ciudad de México', asignadoA: null },
  { id: 25, empresa: 'Grupo Nestlé', contacto: 'Héctor Vega - Gerente de Sostenibilidad', fecha: '22 Oct 2025', origen: 'Referido', valor: 380000, industria: 'Alimentos', ubicacion: 'Ciudad de México', asignadoA: null },
  { id: 26, empresa: 'Grupo Unilever', contacto: 'Mónica Rojas - Directora de Operaciones', fecha: '21 Oct 2025', origen: 'Web', valor: 330000, industria: 'Consumo', ubicacion: 'Ciudad de México', asignadoA: null },
  { id: 27, empresa: 'Grupo Procter & Gamble', contacto: 'Javier Campos - Coordinador Ambiental', fecha: '20 Oct 2025', origen: 'LinkedIn', valor: 360000, industria: 'Consumo', ubicacion: 'Ciudad de México', asignadoA: null },
  { id: 28, empresa: 'Grupo Kimberly-Clark', contacto: 'Daniela Fuentes - Gerente de Sostenibilidad', fecha: '19 Oct 2025', origen: 'Referido', valor: 340000, industria: 'Consumo', ubicacion: 'Ciudad de México', asignadoA: null },
  { id: 29, empresa: 'Grupo 3M', contacto: 'Alberto Sánchez - Director de Operaciones', fecha: '18 Oct 2025', origen: 'Web', valor: 310000, industria: 'Manufactura', ubicacion: 'Ciudad de México', asignadoA: null },
  { id: 30, empresa: 'Grupo Johnson & Johnson', contacto: 'Lucía Ramírez - Coordinadora Ambiental', fecha: '17 Oct 2025', origen: 'Evento', valor: 370000, industria: 'Salud', ubicacion: 'Ciudad de México', asignadoA: null },
  { id: 31, empresa: 'Grupo Pfizer', contacto: 'Rodrigo Martínez - Gerente de Sostenibilidad', fecha: '16 Oct 2025', origen: 'Referido', valor: 320000, industria: 'Salud', ubicacion: 'Ciudad de México', asignadoA: null },
  { id: 32, empresa: 'Grupo Bayer', contacto: 'Natalia Cruz - Directora de Operaciones', fecha: '15 Oct 2025', origen: 'Web', valor: 330000, industria: 'Salud', ubicacion: 'Ciudad de México', asignadoA: null },
  { id: 33, empresa: 'Grupo Novartis', contacto: 'Eduardo Morales - Coordinador Ambiental', fecha: '14 Oct 2025', origen: 'LinkedIn', valor: 300000, industria: 'Salud', ubicacion: 'Ciudad de México', asignadoA: null },
  { id: 34, empresa: 'Grupo Sanofi', contacto: 'Alejandra Torres - Gerente de Sostenibilidad', fecha: '13 Oct 2025', origen: 'Referido', valor: 310000, industria: 'Salud', ubicacion: 'Ciudad de México', asignadoA: null },
  { id: 35, empresa: 'Grupo GlaxoSmithKline', contacto: 'Francisco López - Director de Operaciones', fecha: '12 Oct 2025', origen: 'Web', valor: 320000, industria: 'Salud', ubicacion: 'Ciudad de México', asignadoA: null },
  { id: 36, empresa: 'Grupo Merck', contacto: 'Patricia Hernández - Coordinadora Ambiental', fecha: '11 Oct 2025', origen: 'Evento', valor: 290000, industria: 'Salud', ubicacion: 'Ciudad de México', asignadoA: null },
  { id: 37, empresa: 'Grupo Abbott', contacto: 'Roberto Díaz - Gerente de Sostenibilidad', fecha: '10 Oct 2025', origen: 'Referido', valor: 340000, industria: 'Salud', ubicacion: 'Ciudad de México', asignadoA: null },
  { id: 38, empresa: 'Grupo Medtronic', contacto: 'Sandra Gutiérrez - Directora de Operaciones', fecha: '9 Oct 2025', origen: 'Web', valor: 310000, industria: 'Salud', ubicacion: 'Ciudad de México', asignadoA: null },
  { id: 39, empresa: 'Grupo Boston Scientific', contacto: 'Manuel Ortega - Coordinador Ambiental', fecha: '8 Oct 2025', origen: 'LinkedIn', valor: 300000, industria: 'Salud', ubicacion: 'Ciudad de México', asignadoA: null },
  { id: 40, empresa: 'Grupo Stryker', contacto: 'Mariana Flores - Gerente de Sostenibilidad', fecha: '7 Oct 2025', origen: 'Referido', valor: 320000, industria: 'Salud', ubicacion: 'Ciudad de México', asignadoA: null },
  { id: 41, empresa: 'Grupo Zimmer Biomet', contacto: 'José Luis Pérez - Director de Operaciones', fecha: '6 Oct 2025', origen: 'Web', valor: 310000, industria: 'Salud', ubicacion: 'Ciudad de México', asignadoA: null },
  { id: 42, empresa: 'Grupo Edwards Lifesciences', contacto: 'Carmen López - Coordinadora Ambiental', fecha: '5 Oct 2025', origen: 'Evento', valor: 290000, industria: 'Salud', ubicacion: 'Ciudad de México', asignadoA: null },
  { id: 43, empresa: 'Grupo Intuitive Surgical', contacto: 'Alfonso Ruiz - Gerente de Sostenibilidad', fecha: '4 Oct 2025', origen: 'Referido', valor: 350000, industria: 'Salud', ubicacion: 'Ciudad de México', asignadoA: null },
  { id: 44, empresa: 'Grupo ResMed', contacto: 'Gloria Martínez - Directora de Operaciones', fecha: '3 Oct 2025', origen: 'Web', valor: 300000, industria: 'Salud', ubicacion: 'Ciudad de México', asignadoA: null },
  { id: 45, empresa: 'Grupo Dexcom', contacto: 'Pedro Sánchez - Coordinador Ambiental', fecha: '2 Oct 2025', origen: 'LinkedIn', valor: 310000, industria: 'Salud', ubicacion: 'Ciudad de México', asignadoA: null }
];

const pipelineData = [
  { etapa: 'Leads', cantidad: 45, valor: 13500000, objetivo: 55 },
  { etapa: 'Levantamientos', cantidad: 32, valor: 9600000, objetivo: 40 },
  { etapa: 'Propuestas', cantidad: 24, valor: 7200000, objetivo: 30 },
  { etapa: 'Negociación', cantidad: 15, valor: 4500000, objetivo: 20 },
  { etapa: 'Cierre', cantidad: 8, valor: 2400000, objetivo: 12 }
];

// DATOS DEL EQUIPO REAL - INNOVATIVE GROUP
const salesTeamData = [
  {
    id: 1,
    name: 'Carmen Rodríguez',
    role: 'Ejecutiva Senior',
    ubicacion: 'CDMX',
    // Pipeline
    leads: 44,
    levantamientos: 3,
    propuestasEnviadas: 12,
    reuniones: 22,
    cierres: 12,
    tasaConversion: 27,
    // Presupuesto
    presupuestoMensual: 900000,
    ventasReales: 1050000,
    cumplimientoPresupuesto: 117,
    // KPIs
    tiempoRespuesta: '1.5 hrs',
    satisfaccionCliente: 4.9,
    activitiesSemanal: 35,
    eficienciaGlobal: 85,
    avatar: '👩‍💼',
    ultimaActividad: 'Cierre confirmado - Cliente corporativo',
    notas: 'La más fuerte del equipo - modelo a clonar'
  },
  {
    id: 2,
    name: 'Armando Martínez',
    role: 'Ejecutivo Senior',
    ubicacion: 'Monterrey',
    leads: 57,
    levantamientos: 22,
    propuestasEnviadas: 2,
    reuniones: 37,
    cierres: 2,
    tasaConversion: 3.5,
    presupuestoMensual: 850000,
    ventasReales: 420000,
    cumplimientoPresupuesto: 49,
    tiempoRespuesta: '4.2 hrs',
    satisfaccionCliente: 4.2,
    activitiesSemanal: 45,
    eficienciaGlobal: 45,
    avatar: '👨‍💼',
    ultimaActividad: 'Visita en frío - Zona industrial',
    notas: 'Alto volumen, bajo cierre - único que hace knock knock'
  },
  {
    id: 3,
    name: 'Cristina Silva',
    role: 'Ejecutiva',
    ubicacion: 'Guadalajara',
    leads: 0,
    levantamientos: 1,
    propuestasEnviadas: 1,
    reuniones: 3,
    cierres: 1,
    tasaConversion: 100,
    presupuestoMensual: 600000,
    ventasReales: 750000,
    cumplimientoPresupuesto: 125,
    tiempoRespuesta: '2.0 hrs',
    satisfaccionCliente: 4.7,
    activitiesSemanal: 15,
    eficienciaGlobal: 70,
    avatar: '👩‍💼',
    ultimaActividad: 'Seguimiento Paxa',
    notas: 'Nueva pero trajo cuenta grande por contactos personales'
  },
  {
    id: 4,
    name: 'Laura Mesa',
    role: 'Ejecutiva',
    ubicacion: 'CDMX',
    leads: 19,
    levantamientos: 0,
    propuestasEnviadas: 0,
    reuniones: 4,
    cierres: 0,
    tasaConversion: 0,
    presupuestoMensual: 550000,
    ventasReales: 0,
    cumplimientoPresupuesto: 0,
    tiempoRespuesta: '5.5 hrs',
    satisfaccionCliente: 4.0,
    activitiesSemanal: 12,
    eficienciaGlobal: 25,
    avatar: '👩‍💼',
    ultimaActividad: 'Prospección LinkedIn',
    notas: 'Contactos personales, necesita coaching en cierre'
  },
  {
    id: 5,
    name: 'Laura Sobrino',
    role: 'Ejecutiva',
    ubicacion: 'CDMX',
    leads: 5,
    levantamientos: 0,
    propuestasEnviadas: 0,
    reuniones: 2,
    cierres: 0,
    tasaConversion: 0,
    presupuestoMensual: 500000,
    ventasReales: 0,
    cumplimientoPresupuesto: 0,
    tiempoRespuesta: '6.0 hrs',
    satisfaccionCliente: 3.8,
    activitiesSemanal: 8,
    eficienciaGlobal: 20,
    avatar: '👩‍💼',
    ultimaActividad: 'Capacitación interna',
    notas: 'Contactos personales, en desarrollo'
  }
];

// DATOS DETALLADOS DE LEVANTAMIENTOS
const levantamientosDetallados = [
  {
    id: 1,
    cliente: 'Walmart Satélite',
    fecha: '2025-11-08',
    fechaCompletado: '2025-11-08',
    ejecutivo: 'Ana Ruiz',
    tipo: 'Levantamiento',
    status: 'Completado',
    tieneReporte: false,
    siguientePaso: 'Generar propuesta',
    volumenEstimado: '35 ton/mes',
    valorEstimado: 1050000,
    // Información detallada del levantamiento
    informacionGeneral: {
      razonSocial: 'Walmart de México y Centroamérica S.A. de C.V.',
      rfc: 'WME850101ABC',
      direccion: 'Av. Gustavo Baz Prada 95, Satélite, Naucalpan, Estado de México',
      contacto: 'María González - Gerente de Operaciones',
      telefono: '55-1234-5678',
      email: 'maria.gonzalez@walmart.com.mx',
      superficie: '8,500 m²',
      numeroEmpleados: 120,
      horarioOperacion: 'Lun-Dom: 7:00 AM - 11:00 PM',
      requisitosReporte: ['GRI', 'SASB', 'ESR', 'ISO 14001']
    },
    tiposResiduos: [
      { tipo: 'Orgánicos', cantidad: '18 ton/mes', porcentaje: 51, destino: 'Relleno sanitario', costo: 45000 },
      { tipo: 'Cartón', cantidad: '8 ton/mes', porcentaje: 23, destino: 'Reciclaje externo', costo: 12000 },
      { tipo: 'Plástico', cantidad: '5 ton/mes', porcentaje: 14, destino: 'Reciclaje externo', costo: 8000 },
      { tipo: 'Vidrio', cantidad: '2 ton/mes', porcentaje: 6, destino: 'Relleno sanitario', costo: 3000 },
      { tipo: 'Otros', cantidad: '2 ton/mes', porcentaje: 6, destino: 'Relleno sanitario', costo: 3000 }
    ],
    generacion: {
      frecuencia: 'Diaria',
      diasSemana: 7,
      horariosRecoleccion: ['6:00 AM', '2:00 PM', '10:00 PM'],
      volumenDiario: '1.2 ton/día',
      volumenSemanal: '8.4 ton/semana',
      volumenMensual: '35 ton/mes',
      variacionesEstacionales: 'Aumento 15% en Diciembre y Enero'
    },
    serviciosActuales: {
      proveedor: 'Servicios Ambientales del Valle S.A.',
      contratoVigente: true,
      fechaInicio: '2023-01-15',
      fechaVencimiento: '2025-12-31',
      costoMensual: 52000,
      frecuenciaRecoleccion: '3 veces por día',
      tipoServicio: 'Recolección y transporte',
      incluyeSeparacion: false,
      incluyeValorizacion: false,
      incluyeReporteo: false,
      nivelSatisfaccion: 6,
      razonCambio: 'Necesidad de trazabilidad y valorización de residuos'
    },
    infraestructura: {
      tieneAreaAlmacenamiento: true,
      areaAlmacenamiento: '120 m²',
      tipoAlmacenamiento: 'Contenedores de 1.1 m³',
      numeroContenedores: 45,
      tieneCompactadora: false,
      tieneBodega: true,
      accesoVehiculos: 'Fácil - Patio trasero',
      restriccionesHorario: 'Recolección solo entre 6:00 AM - 8:00 PM',
      espacioDisponible: 'Suficiente para segregación'
    },
    necesidades: {
      separacionResiduos: true,
      valorizacionResiduos: true,
      trazabilidad: true,
      reporteoMensual: true,
      certificaciones: ['ISO 14001', 'RME'],
      objetivosAmbientales: 'Reducir envío a relleno sanitario en 60%',
      presupuestoDisponible: 65000,
      urgencia: 'Media',
      decisionMaker: 'María González - Gerente de Operaciones'
    },
    observaciones: 'Cliente interesado en programa de economía circular. Tienen programa interno de reciclaje básico pero buscan profesionalización. Área de almacenamiento bien organizada. Buena disposición del personal.'
  },
  {
    id: 2,
    cliente: 'Soriana Naucalpan',
    fecha: '2025-11-10',
    fechaCompletado: null,
    ejecutivo: 'Carlos Mendoza',
    tipo: 'Levantamiento',
    status: 'En proceso',
    siguientePaso: 'Completar análisis de residuos',
    volumenEstimado: '28 ton/mes',
    valorEstimado: 840000,
    informacionGeneral: {
      razonSocial: 'Organización Soriana S.A. de C.V.',
      rfc: 'OSO850101DEF',
      direccion: 'Av. Gustavo Baz Prada 200, Naucalpan, Estado de México',
      contacto: 'Roberto Martínez - Director de Sostenibilidad',
      telefono: '55-2345-6789',
      email: 'roberto.martinez@soriana.com.mx',
      superficie: '7,200 m²',
      numeroEmpleados: 95,
      horarioOperacion: 'Lun-Dom: 8:00 AM - 10:00 PM',
      requisitosReporte: ['NIS', 'GRI', 'ESR']
    },
    tiposResiduos: [
      { tipo: 'Orgánicos', cantidad: '14 ton/mes', porcentaje: 50, destino: 'Relleno sanitario', costo: 35000 },
      { tipo: 'Cartón', cantidad: '7 ton/mes', porcentaje: 25, destino: 'Reciclaje externo', costo: 10500 },
      { tipo: 'Plástico', cantidad: '4 ton/mes', porcentaje: 14, destino: 'Reciclaje externo', costo: 6000 },
      { tipo: 'Vidrio', cantidad: '2 ton/mes', porcentaje: 7, destino: 'Relleno sanitario', costo: 3000 },
      { tipo: 'Otros', cantidad: '1 ton/mes', porcentaje: 4, destino: 'Relleno sanitario', costo: 1500 }
    ],
    generacion: {
      frecuencia: 'Diaria',
      diasSemana: 7,
      horariosRecoleccion: ['7:00 AM', '3:00 PM'],
      volumenDiario: '0.9 ton/día',
      volumenSemanal: '6.3 ton/semana',
      volumenMensual: '28 ton/mes',
      variacionesEstacionales: 'Aumento 10% en temporada navideña'
    },
    serviciosActuales: {
      proveedor: 'EcoServicios México',
      contratoVigente: true,
      fechaInicio: '2024-03-01',
      fechaVencimiento: '2026-02-28',
      costoMensual: 45000,
      frecuenciaRecoleccion: '2 veces por día',
      tipoServicio: 'Solo recolección',
      incluyeSeparacion: false,
      incluyeValorizacion: false,
      incluyeReporteo: false,
      nivelSatisfaccion: 5,
      razonCambio: 'Cumplimiento normativo RME y mejora de imagen corporativa'
    },
    infraestructura: {
      tieneAreaAlmacenamiento: true,
      areaAlmacenamiento: '95 m²',
      tipoAlmacenamiento: 'Contenedores de 1.1 m³',
      numeroContenedores: 35,
      tieneCompactadora: false,
      tieneBodega: true,
      accesoVehiculos: 'Moderado - Calle lateral',
      restriccionesHorario: 'Recolección preferentemente en horario matutino',
      espacioDisponible: 'Limitado, requiere optimización'
    },
    necesidades: {
      separacionResiduos: true,
      valorizacionResiduos: true,
      trazabilidad: true,
      reporteoMensual: true,
      certificaciones: ['RME'],
      objetivosAmbientales: 'Cumplir normativa RME y obtener certificaciones',
      presupuestoDisponible: 55000,
      urgencia: 'Alta',
      decisionMaker: 'Roberto Martínez - Director de Sostenibilidad'
    },
    observaciones: 'Cliente con presión normativa. Necesitan solución rápida. Área de almacenamiento limitada, requiere propuesta de optimización de espacio.'
  }
];

// LEVANTAMIENTOS Y PROPUESTAS ACTIVAS
const levantamientosActivos = [
  { 
    id: 1, 
    cliente: 'Walmart Satélite', 
    fecha: '2025-11-08', 
    fechaCompletado: '2025-11-08',
    ejecutivo: 'Ana Ruiz',
    tipo: 'Levantamiento',
    status: 'Completado',
    tieneReporte: false,
    siguientePaso: 'Generar propuesta',
    volumenEstimado: '35 ton/mes',
    valorEstimado: 1050000
  },
  { 
    id: 2, 
    cliente: 'Soriana Naucalpan', 
    fecha: '2025-11-10', 
    fechaCompletado: null,
    ejecutivo: 'Carlos Mendoza',
    tipo: 'Propuesta',
    status: 'Enviada',
    tieneReporte: false,
    siguientePaso: 'Seguimiento telefónico',
    volumenEstimado: '28 ton/mes',
    valorEstimado: 840000
  },
  { 
    id: 3, 
    cliente: 'Chedraui Lindavista', 
    fecha: '2025-11-09', 
    fechaCompletado: null,
    ejecutivo: 'Roberto García',
    tipo: 'Levantamiento',
    status: 'Agendado',
    tieneReporte: false,
    siguientePaso: 'Visita programada 14/Nov',
    volumenEstimado: '22 ton/mes',
    valorEstimado: 660000
  },
  { 
    id: 4, 
    cliente: 'La Comer Mixcoac', 
    fecha: '2025-11-07', 
    fechaCompletado: null,
    ejecutivo: 'Patricia Morales',
    tipo: 'Propuesta',
    status: 'En revisión',
    tieneReporte: false,
    siguientePaso: 'Respuesta esperada 15/Nov',
    volumenEstimado: '18 ton/mes',
    valorEstimado: 540000
  },
  { 
    id: 5, 
    cliente: 'Liverpool Insurgentes', 
    fecha: '2025-11-11', 
    fechaCompletado: null,
    ejecutivo: 'Ana Ruiz',
    tipo: 'Levantamiento',
    status: 'En proceso',
    tieneReporte: false,
    siguientePaso: 'Análisis de datos',
    volumenEstimado: '30 ton/mes',
    valorEstimado: 900000
  },
  { 
    id: 6, 
    cliente: 'Costco Santa Fe', 
    fecha: '2025-11-05', 
    fechaCompletado: '2025-11-05',
    ejecutivo: 'Carlos Mendoza',
    tipo: 'Levantamiento',
    status: 'Completado',
    tieneReporte: false,
    siguientePaso: 'Generar reporte',
    volumenEstimado: '42 ton/mes',
    valorEstimado: 1260000
  },
  { 
    id: 7, 
    cliente: 'Sam\'s Club Polanco', 
    fecha: '2025-11-04', 
    fechaCompletado: '2025-11-04',
    ejecutivo: 'Ana Ruiz',
    tipo: 'Levantamiento',
    status: 'Completado',
    tieneReporte: true,
    siguientePaso: 'Enviar propuesta',
    volumenEstimado: '38 ton/mes',
    valorEstimado: 1140000
  },
  { 
    id: 8, 
    cliente: 'Bodega Aurrerá Insurgentes', 
    fecha: '2025-11-12', 
    fechaCompletado: null,
    ejecutivo: 'Roberto García',
    tipo: 'Levantamiento',
    status: 'Agendado',
    tieneReporte: false,
    siguientePaso: 'Visita programada 15/Nov',
    volumenEstimado: '25 ton/mes',
    valorEstimado: 750000
  },
  { 
    id: 9, 
    cliente: 'Superama Lomas', 
    fecha: '2025-10-28', 
    fechaCompletado: '2025-10-28',
    ejecutivo: 'Patricia Morales',
    tipo: 'Levantamiento',
    status: 'Completado',
    tieneReporte: false,
    siguientePaso: 'Generar reporte',
    volumenEstimado: '20 ton/mes',
    valorEstimado: 600000
  },
  { 
    id: 10, 
    cliente: 'Chedraui Coyoacán', 
    fecha: '2025-10-25', 
    fechaCompletado: '2025-10-25',
    ejecutivo: 'Carlos Mendoza',
    tipo: 'Levantamiento',
    status: 'Completado',
    tieneReporte: true,
    siguientePaso: 'Seguimiento',
    volumenEstimado: '33 ton/mes',
    valorEstimado: 990000
  }
];

// DATOS DE TRAZABILIDAD
const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

// Función para generar datos de trazabilidad por cliente
const generarDatosTrazabilidadCliente = (clienteId, variacion = 0) => {
  const factor = 1 + (variacion * 0.1);
  return {
    reciclaje: [
      { material: 'Papel Mixto', Ene: Math.round(100 * factor), Feb: 0, Mar: 0, Abr: 0, May: 0, Jun: 0, Jul: Math.round(41 * factor), Ago: Math.round(112 * factor), Sep: 0, Oct: 0, Nov: 0, Dic: 0 },
      { material: 'Papel de oficina', Ene: 0, Feb: 0, Mar: 0, Abr: Math.round(36.8 * factor), May: Math.round(116 * factor), Jun: 0, Jul: Math.round(5.6 * factor), Ago: Math.round(2.5 * factor), Sep: Math.round(80 * factor), Oct: 0, Nov: 0, Dic: 0 },
      { material: 'Revistas', Ene: 0, Feb: 0, Mar: 0, Abr: 0, May: Math.round(437 * factor), Jun: 0, Jul: 0, Ago: 0, Sep: Math.round(35 * factor), Oct: 0, Nov: 0, Dic: 0 }
    ],
    composta: [
      { material: 'Residuos Orgánicos', Ene: Math.round(250 * factor), Feb: Math.round(180 * factor), Mar: Math.round(200 * factor), Abr: Math.round(260 * factor), May: Math.round(220 * factor), Jun: Math.round(190 * factor), Jul: Math.round(240 * factor), Ago: Math.round(230 * factor), Sep: Math.round(210 * factor), Oct: 0, Nov: 0, Dic: 0 }
    ],
    reuso: [
      { material: 'Material Reutilizable', Ene: Math.round(5 * factor), Feb: Math.round(3 * factor), Mar: Math.round(2 * factor), Abr: Math.round(4 * factor), May: Math.round(6 * factor), Jun: Math.round(3 * factor), Jul: Math.round(4 * factor), Ago: Math.round(5 * factor), Sep: 0, Oct: 0, Nov: 0, Dic: 0 }
    ],
    rellenoSanitario: [
      { material: 'Residuos No Reciclables', Ene: Math.round(15 * factor), Feb: Math.round(20 * factor), Mar: Math.round(18 * factor), Abr: Math.round(12 * factor), May: Math.round(16 * factor), Jun: Math.round(22 * factor), Jul: Math.round(14 * factor), Ago: Math.round(18 * factor), Sep: 0, Oct: 0, Nov: 0, Dic: 0 }
    ]
  };
};

// Datos de trazabilidad por cliente
const trazabilidadPorCliente = {
  1: generarDatosTrazabilidadCliente(1, 0.2), // Walmart - más volumen
  2: generarDatosTrazabilidadCliente(2, -0.1), // Soriana - menos volumen
  3: generarDatosTrazabilidadCliente(3, 0.05) // Chedraui - similar
};

// Datos base para gráficas generales
const datosTrazabilidad = generarDatosTrazabilidadCliente(0, 0);

// Función para calcular distribución por destino desde datos de trazabilidad
const calcularDistribucionPorDestino = (datos) => {
  const mesesGrafica = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'];
  return mesesGrafica.map(mes => {
    const reciclaje = datos.reciclaje.reduce((sum, item) => sum + (item[mes] || 0), 0);
    const composta = datos.composta.reduce((sum, item) => sum + (item[mes] || 0), 0);
    const reuso = datos.reuso.reduce((sum, item) => sum + (item[mes] || 0), 0);
    const relleno = datos.rellenoSanitario.reduce((sum, item) => sum + (item[mes] || 0), 0);
    return {
      mes,
      Reciclaje: Math.round(reciclaje * 10) / 10,
      Composta: Math.round(composta * 10) / 10,
      Reuso: Math.round(reuso * 10) / 10,
      'Relleno sanitario': Math.round(relleno * 10) / 10
    };
  });
};

// Función para calcular evolución de desviación
const calcularEvolucionDesviacion = (datos) => {
  const mesesGrafica = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'];
  return mesesGrafica.map(mes => {
    const reciclaje = datos.reciclaje.reduce((sum, item) => sum + (item[mes] || 0), 0);
    const composta = datos.composta.reduce((sum, item) => sum + (item[mes] || 0), 0);
    const reuso = datos.reuso.reduce((sum, item) => sum + (item[mes] || 0), 0);
    const relleno = datos.rellenoSanitario.reduce((sum, item) => sum + (item[mes] || 0), 0);
    const total = reciclaje + composta + reuso + relleno;
    const circulares = reciclaje + composta + reuso;
    const desviacion = total > 0 ? ((circulares / total) * 100) : 0;
    return {
      mes,
      desviacion: Math.round(desviacion * 10) / 10
    };
  });
};

// Datos base
const distribucionPorDestinoBase = calcularDistribucionPorDestino(datosTrazabilidad);
const evolucionDesviacionBase = calcularEvolucionDesviacion(datosTrazabilidad);

// Función para generar datos Sankey por cliente
const generarDatosSankeyCliente = (cliente, datosTrazabilidadCliente) => {
  if (!cliente || !datosTrazabilidadCliente) return null;

  // Calcular totales por categoría
  const totalReciclaje = datosTrazabilidadCliente.reciclaje.reduce((sum, item) => {
    return sum + meses.reduce((s, mes) => s + (item[mes] || 0), 0);
  }, 0);
  
  const totalComposta = datosTrazabilidadCliente.composta.reduce((sum, item) => {
    return sum + meses.reduce((s, mes) => s + (item[mes] || 0), 0);
  }, 0);
  
  const totalReuso = datosTrazabilidadCliente.reuso.reduce((sum, item) => {
    return sum + meses.reduce((s, mes) => s + (item[mes] || 0), 0);
  }, 0);
  
  const totalRelleno = datosTrazabilidadCliente.rellenoSanitario.reduce((sum, item) => {
    return sum + meses.reduce((s, mes) => s + (item[mes] || 0), 0);
  }, 0);

  const totalGenerado = totalReciclaje + totalComposta + totalReuso + totalRelleno;

  // Si no hay datos, retornar null
  if (totalGenerado === 0) {
    return null;
  }

  // Generar puntos de origen basados en sucursales
  const puntosOrigen = [];
  const linksOrigen = [];
  
  // Crear puntos de origen (máximo 5 para mantener el diagrama legible)
  const sucursalesPrincipales = Math.min(cliente.sucursales, 5);
  
  // Si hay más de 5 sucursales, agrupar las restantes
  if (cliente.sucursales > 5) {
    const nombreAdicionales = `${cliente.sucursales - 5} Sucursales Adicionales`;
    puntosOrigen.push({ id: nombreAdicionales, nodeColor: '#6b7280' });
    const volumenAdicional = (totalGenerado / cliente.sucursales) * (cliente.sucursales - 5);
    if (totalComposta > 0) linksOrigen.push({ source: nombreAdicionales, target: 'Orgánicos', value: (totalComposta / totalGenerado) * volumenAdicional });
    if (totalReciclaje > 0) linksOrigen.push({ source: nombreAdicionales, target: 'Reciclables', value: (totalReciclaje / totalGenerado) * volumenAdicional });
    if (totalReuso > 0) linksOrigen.push({ source: nombreAdicionales, target: 'Reuso', value: (totalReuso / totalGenerado) * volumenAdicional });
    if (totalRelleno > 0) linksOrigen.push({ source: nombreAdicionales, target: 'Inorgánicos', value: (totalRelleno / totalGenerado) * volumenAdicional });
  }
  
  for (let i = 1; i <= sucursalesPrincipales; i++) {
    const nombreSucursal = `${cliente.name} - Sucursal ${i}`;
    puntosOrigen.push({ id: nombreSucursal, nodeColor: '#3b82f6' });
    
    // Distribuir proporcionalmente entre categorías
    const volumenSucursal = totalGenerado / sucursalesPrincipales;
    if (totalComposta > 0) linksOrigen.push({ source: nombreSucursal, target: 'Orgánicos', value: (totalComposta / totalGenerado) * volumenSucursal });
    if (totalReciclaje > 0) linksOrigen.push({ source: nombreSucursal, target: 'Reciclables', value: (totalReciclaje / totalGenerado) * volumenSucursal });
    if (totalReuso > 0) linksOrigen.push({ source: nombreSucursal, target: 'Reuso', value: (totalReuso / totalGenerado) * volumenSucursal });
    if (totalRelleno > 0) linksOrigen.push({ source: nombreSucursal, target: 'Inorgánicos', value: (totalRelleno / totalGenerado) * volumenSucursal });
  }

  // Nodos y links finales - incluir número de registro ambiental directamente en el ID
  const destinoCompostaId = `${cliente.destinosFinales.composta} (${cliente.registrosAmbientales?.composta || ''})`;
  const destinoReciclajeId = `${cliente.destinosFinales.reciclaje} (${cliente.registrosAmbientales?.reciclaje || ''})`;
  const destinoReusoId = `${cliente.destinosFinales.reuso} (${cliente.registrosAmbientales?.reuso || ''})`;
  const destinoRellenoId = `${cliente.destinosFinales.rellenoSanitario} (${cliente.registrosAmbientales?.rellenoSanitario || ''})`;

  const nodes = [
    ...puntosOrigen,
    { id: 'Orgánicos', nodeColor: '#22c55e' },
    { id: 'Reciclables', nodeColor: '#3b82f6' },
    { id: 'Reuso', nodeColor: '#1B4965' },
    { id: 'Inorgánicos', nodeColor: '#6b7280' },
    { 
      id: destinoCompostaId,
      nodeColor: '#16a34a',
      registroAmbiental: cliente.registrosAmbientales?.composta || ''
    },
    { 
      id: destinoReciclajeId,
      nodeColor: '#2563eb',
      registroAmbiental: cliente.registrosAmbientales?.reciclaje || ''
    },
    { 
      id: destinoReusoId,
      nodeColor: '#0ea5e9',
      registroAmbiental: cliente.registrosAmbientales?.reuso || ''
    },
    { 
      id: destinoRellenoId,
      nodeColor: '#64748b',
      registroAmbiental: cliente.registrosAmbientales?.rellenoSanitario || ''
    }
  ];

  const links = [
    ...linksOrigen,
    ...(totalComposta > 0 ? [{ source: 'Orgánicos', target: destinoCompostaId, value: totalComposta }] : []),
    ...(totalReciclaje > 0 ? [{ source: 'Reciclables', target: destinoReciclajeId, value: totalReciclaje }] : []),
    ...(totalReuso > 0 ? [{ source: 'Reuso', target: destinoReusoId, value: totalReuso }] : []),
    ...(totalRelleno > 0 ? [{ source: 'Inorgánicos', target: destinoRellenoId, value: totalRelleno }] : [])
  ];
  
  // Filtrar nodos que no tienen links
  const nodeIdsWithLinks = new Set();
  links.forEach(link => {
    nodeIdsWithLinks.add(link.source);
    nodeIdsWithLinks.add(link.target);
  });
  
  const nodesFiltered = nodes.filter(node => nodeIdsWithLinks.has(node.id));

  return { nodes: nodesFiltered, links, totalGenerado, totalComposta, totalReciclaje, totalReuso, totalRelleno };
};

// CLIENTES CON REPORTES DE TRAZABILIDAD ENTREGADOS
const clientesConReportes = [
  { 
    id: 1, 
    name: 'Walmart México', 
    logo: '🛒',
    sucursales: 12,
    ultimoReporte: '2025-11-01',
    proximoReporte: '2025-12-01',
    statusReporte: 'Enviado',
    // Datos para conciliación
    serviciosContratados: ['Recolección', 'Transporte', 'Valorización', 'Reporteo'],
    rmeGestionado: 45.8,
    valoracionLograda: 96,
    ingresosMes: 1374000,
    // Impacto
    impactoMensual: {
      arboles: 892,
      co2: 23.4,
      agua: 125000
    },
    contacto: 'Laura Sánchez',
    email: 'laura.sanchez@walmart.com.mx',
    // Información operativa
    fechaInicioOperacion: '2023-03-15',
    promedioMensual: 42.5,
    tiposResiduos: ['Papel y Cartón', 'Plástico', 'Orgánicos', 'Vidrio', 'Metal'],
    destinosFinales: {
      reciclaje: 'Planta de Reciclaje CDMX',
      composta: 'Centro de Compostaje Estado de México',
      reuso: 'Centros de Reutilización',
      rellenoSanitario: 'Relleno Sanitario Bordo Poniente'
    },
    registrosAmbientales: {
      reciclaje: 'RA-REC-2023-0456',
      composta: 'RA-COM-2023-0234',
      reuso: 'RA-REU-2023-0123',
      rellenoSanitario: 'RA-RS-2023-0789'
    },
    frecuenciaRecoleccion: 'Diaria',
    volumenPromedioMensual: 42.5,
    tasaValorizacion: 96,
    requisitosReporte: ['GRI', 'SASB', 'ESR', 'ISO 14001']
  },
  { 
    id: 2, 
    name: 'Soriana', 
    logo: '🏬',
    sucursales: 9,
    ultimoReporte: '2025-11-01',
    proximoReporte: '2025-12-01',
    statusReporte: 'Enviado',
    serviciosContratados: ['Recolección', 'Transporte', 'Valorización'],
    rmeGestionado: 38.2,
    valoracionLograda: 94,
    ingresosMes: 1146000,
    impactoMensual: {
      arboles: 743,
      co2: 19.5,
      agua: 104000
    },
    contacto: 'Jorge Ramírez',
    email: 'jorge.ramirez@soriana.com',
    // Información operativa
    fechaInicioOperacion: '2023-06-20',
    promedioMensual: 35.8,
    tiposResiduos: ['Papel y Cartón', 'Plástico', 'Orgánicos', 'Vidrio'],
    destinosFinales: {
      reciclaje: 'Planta de Reciclaje Guadalajara',
      composta: 'Centro de Compostaje Jalisco',
      reuso: 'Centros de Reutilización',
      rellenoSanitario: 'Relleno Sanitario Los Laureles'
    },
    registrosAmbientales: {
      reciclaje: 'RA-REC-2023-0521',
      composta: 'RA-COM-2023-0312',
      reuso: 'RA-REU-2023-0189',
      rellenoSanitario: 'RA-RS-2023-0845'
    },
    frecuenciaRecoleccion: '3 veces por semana',
    volumenPromedioMensual: 35.8,
    tasaValorizacion: 94,
    requisitosReporte: ['NIS', 'GRI', 'ESR']
  },
  { 
    id: 3, 
    name: 'Chedraui', 
    logo: '🏪',
    sucursales: 8,
    ultimoReporte: '2025-11-01',
    proximoReporte: '2025-12-01',
    statusReporte: 'Pendiente',
    serviciosContratados: ['Recolección', 'Valorización', 'Reporteo'],
    rmeGestionado: 32.6,
    valoracionLograda: 91,
    ingresosMes: 978000,
    impactoMensual: {
      arboles: 634,
      co2: 16.6,
      agua: 88700
    },
    contacto: 'María López',
    email: 'maria.lopez@chedraui.com.mx',
    // Información operativa
    fechaInicioOperacion: '2023-09-10',
    promedioMensual: 30.2,
    tiposResiduos: ['Papel y Cartón', 'Plástico', 'Orgánicos'],
    destinosFinales: {
      reciclaje: 'Planta de Reciclaje Puebla',
      composta: 'Centro de Compostaje Puebla',
      reuso: 'Centros de Reutilización',
      rellenoSanitario: 'Relleno Sanitario Chiltepeque'
    },
    registrosAmbientales: {
      reciclaje: 'RA-REC-2023-0612',
      composta: 'RA-COM-2023-0398',
      reuso: 'RA-REU-2023-0256',
      rellenoSanitario: 'RA-RS-2023-0912'
    },
    frecuenciaRecoleccion: '2 veces por semana',
    volumenPromedioMensual: 30.2,
    tasaValorizacion: 91
  }
];

// EVOLUCIÓN PRESUPUESTO VS REAL
const presupuestoEvolution = [
  { mes: 'May', presupuesto: 2800000, real: 2650000 },
  { mes: 'Jun', presupuesto: 2900000, real: 3100000 },
  { mes: 'Jul', presupuesto: 3000000, real: 3250000 },
  { mes: 'Ago', presupuesto: 3100000, real: 2950000 },
  { mes: 'Sep', presupuesto: 3200000, real: 3450000 },
  { mes: 'Oct', presupuesto: 3300000, real: 3540000 }
];

const COLORS_INNOVATIVE = {
  primary: '#1B5E20',      // Verde vibrante principal
  secondary: '#2E7D32',    // Verde vibrante secundario
  accent: '#388E3C',      // Verde claro para acentos
  blue: '#1B4965',         // Azul corporativo
  lightBlue: '#5FA8D3',
  gray: '#F8F9FA',         // Gris muy claro para fondos
  darkGray: '#343A40',      // Gris oscuro para texto
  borderGray: '#E9ECEF',    // Gris para bordes sutiles
  textGray: '#6C757D'       // Gris para texto secundario
};

const COLORS_CHART = ['#1B5E20', '#2E7D32', '#388E3C', '#1B4965', '#5FA8D3'];

// TIPOS Y CATEGORÍAS DE DOCUMENTOS
const TIPOS_DOCUMENTO = [
  'Permiso Ambiental',
  'Licencia de Funcionamiento',
  'Autorización de Transporte',
  'Certificado ISO',
  'Póliza de Seguro',
  'Registro Ambiental',
  'Manifiesto de Residuos',
  'Otro'
];

const CATEGORIAS_DOCUMENTO = [
  'Licencias',
  'Permisos',
  'Certificaciones',
  'Seguros',
  'Contratos',
  'Otros'
];

// DATOS DE DOCUMENTOS
const documentosIniciales = [
  {
    id: 1,
    nombre: 'Licencia Ambiental CDMX',
    tipo: 'Permiso Ambiental',
    categoria: 'Licencias',
    fechaEmision: '2024-01-15',
    fechaVencimiento: '2025-01-15',
    archivo: 'licencia_cdmx.pdf',
    status: 'Por Vencer',
    notas: 'Aplica para operaciones en CDMX - Renovar antes del 15/Ene'
  },
  {
    id: 2,
    nombre: 'Autorización Transporte Residuos Peligrosos',
    tipo: 'Autorización de Transporte',
    categoria: 'Permisos',
    fechaEmision: '2023-06-20',
    fechaVencimiento: '2026-06-20',
    archivo: 'autorizacion_transporte.pdf',
    status: 'Vigente',
    notas: 'Válido para toda la República Mexicana'
  },
  {
    id: 3,
    nombre: 'Certificado ISO 14001:2015',
    tipo: 'Certificado ISO',
    categoria: 'Certificaciones',
    fechaEmision: '2023-09-10',
    fechaVencimiento: '2026-09-10',
    archivo: 'iso_14001.pdf',
    status: 'Vigente',
    notas: 'Gestión Ambiental - Auditoría anual requerida'
  },
  {
    id: 4,
    nombre: 'Registro Ambiental Estatal EdoMex',
    tipo: 'Registro Ambiental',
    categoria: 'Permisos',
    fechaEmision: '2024-03-01',
    fechaVencimiento: '2025-03-01',
    archivo: 'registro_edomex.pdf',
    status: 'Vigente',
    notas: 'Aplica para operaciones en Estado de México'
  },
  {
    id: 5,
    nombre: 'Póliza Responsabilidad Civil',
    tipo: 'Póliza de Seguro',
    categoria: 'Seguros',
    fechaEmision: '2024-07-01',
    fechaVencimiento: '2025-07-01',
    archivo: 'poliza_rc.pdf',
    status: 'Vigente',
    notas: 'Cobertura: $10M MXN - Renovación automática'
  },
  {
    id: 6,
    nombre: 'Licencia Funcionamiento Planta Guadalajara',
    tipo: 'Licencia de Funcionamiento',
    categoria: 'Licencias',
    fechaEmision: '2023-11-15',
    fechaVencimiento: '2025-11-15',
    archivo: 'licencia_gdl.pdf',
    status: 'Vigente',
    notas: 'Planta de reciclaje Guadalajara'
  },
  {
    id: 7,
    nombre: 'Permiso Ambiental Monterrey',
    tipo: 'Permiso Ambiental',
    categoria: 'Permisos',
    fechaEmision: '2024-02-20',
    fechaVencimiento: '2024-12-20',
    archivo: 'permiso_mty.pdf',
    status: 'Vencido',
    notas: '¡URGENTE! Vencido - Iniciar renovación inmediatamente'
  },
  {
    id: 8,
    nombre: 'Certificado ISO 9001:2015',
    tipo: 'Certificado ISO',
    categoria: 'Certificaciones',
    fechaEmision: '2023-08-05',
    fechaVencimiento: '2026-08-05',
    archivo: 'iso_9001.pdf',
    status: 'Vigente',
    notas: 'Gestión de Calidad - Próxima auditoría: Ago 2025'
  },
  {
    id: 9,
    nombre: 'Manifiesto Generación Residuos 2024',
    tipo: 'Manifiesto de Residuos',
    categoria: 'Permisos',
    fechaEmision: '2024-01-01',
    fechaVencimiento: '2024-12-31',
    archivo: 'manifiesto_2024.pdf',
    status: 'Por Vencer',
    notas: 'Generar manifiesto 2025 en Diciembre'
  },
  {
    id: 10,
    nombre: 'Registro SEMARNAT Nacional',
    tipo: 'Registro Ambiental',
    categoria: 'Permisos',
    fechaEmision: '2022-05-10',
    fechaVencimiento: '2027-05-10',
    archivo: 'registro_semarnat.pdf',
    status: 'Vigente',
    notas: 'Registro federal - Renovación cada 5 años'
  }
];

// Función para calcular el status de un documento
const calcularStatusDocumento = (fechaVencimiento) => {
  if (!fechaVencimiento) return 'Sin Fecha';
  const hoy = new Date();
  const vencimiento = new Date(fechaVencimiento);
  const diasRestantes = Math.floor((vencimiento - hoy) / (1000 * 60 * 60 * 24));

  if (diasRestantes < 0) return 'Vencido';
  if (diasRestantes <= 30) return 'Por Vencer';
  if (diasRestantes <= 60) return 'Por Vencer';
  return 'Vigente';
};

// CATÁLOGO DE MOTIVOS DE RECHAZO
const MOTIVOS_RECHAZO = [
  { id: 1, motivo: 'Precios no competitivos', categoria: 'Comercial' },
  { id: 2, motivo: 'Tardanza en entregar propuesta', categoria: 'Proceso' },
  { id: 3, motivo: 'No tienen destinos finales suficientes', categoria: 'Operativo' },
  { id: 4, motivo: 'No pueden hacer recolecciones diarias', categoria: 'Operativo' },
  { id: 5, motivo: 'Cliente se queda con proveedor actual', categoria: 'Competencia' },
  { id: 6, motivo: 'Falta de permisos/documentos', categoria: 'Legal' },
  { id: 7, motivo: 'Muy poco material (< 10 ton)', categoria: 'Viabilidad' },
  { id: 8, motivo: 'Otro (especificar)', categoria: 'Otro' }
];

// FUNCIONES DE CÁLCULO DE DÍAS
const calcularDiasSinRespuesta = (fechaEnvio) => {
  if (!fechaEnvio) return 0;
  const hoy = new Date();
  const envio = new Date(fechaEnvio);
  const diferencia = Math.floor((hoy - envio) / (1000 * 60 * 60 * 24));
  return diferencia;
};

const calcularDiasHabiles = (fechaInicio) => {
  if (!fechaInicio) return 0;
  let dias = 0;
  let fecha = new Date(fechaInicio);
  const hoy = new Date();
  while (fecha < hoy) {
    const diaSemana = fecha.getDay();
    if (diaSemana !== 0 && diaSemana !== 6) dias++;
    fecha.setDate(fecha.getDate() + 1);
  }
  return dias;
};

const InnovativeDemo = () => {
  const [currentView, setCurrentView] = useState('welcome');
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedLevantamiento, setSelectedLevantamiento] = useState(null);
  const [selectedProspecto, setSelectedProspecto] = useState(null);
  const [mostrarLevantamiento, setMostrarLevantamiento] = useState(false);
  const [mostrarPropuesta, setMostrarPropuesta] = useState(false);
  const [mostrarDetallesProspecto, setMostrarDetallesProspecto] = useState(false);
  const [mostrarLeads, setMostrarLeads] = useState(false);
  const [mostrarLevantamientos, setMostrarLevantamientos] = useState(false);
  const [selectedLevantamientoDetalle, setSelectedLevantamientoDetalle] = useState(null);
  const [mostrarNuevoLevantamiento, setMostrarNuevoLevantamiento] = useState(false);
  const [vistaCliente, setVistaCliente] = useState(false);
  const [clienteSeleccionadoVista, setClienteSeleccionadoVista] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications] = useState(7);
  const [leadsConAsignacion, setLeadsConAsignacion] = useState(leadsData.map(lead => ({ ...lead, asignadoA: lead.asignadoA || null })));
  const [mostrarTodosLeads, setMostrarTodosLeads] = useState(false);
  const [alertas, setAlertas] = useState([]);
  const [mostrarNotificaciones, setMostrarNotificaciones] = useState(false);
  const [mostrarModalRechazo, setMostrarModalRechazo] = useState(false);
  const [prospectoParaRechazar, setProspectoParaRechazar] = useState(null);
  const [motivoRechazoSeleccionado, setMotivoRechazoSeleccionado] = useState('');
  const [detalleRechazo, setDetalleRechazo] = useState('');
  const [documentos, setDocumentos] = useState(documentosIniciales);
  const [mostrarNuevoDocumento, setMostrarNuevoDocumento] = useState(false);
  const [filtroDocumentos, setFiltroDocumentos] = useState({ tipo: '', categoria: '', status: '' });

  // Calcular alertas automáticamente
  useEffect(() => {
    const nuevasAlertas = [];

    // Propuestas sin seguimiento (> 5 días hábiles)
    topProspectos.filter(p =>
      p.etapa === 'Propuesta' &&
      p.fechaPropuesta &&
      calcularDiasHabiles(p.fechaPropuesta) >= 5
    ).forEach(p => {
      nuevasAlertas.push({
        tipo: 'seguimiento_propuesta',
        mensaje: `Propuesta a ${p.nombre} sin respuesta hace ${calcularDiasHabiles(p.fechaPropuesta)} días hábiles`,
        prioridad: 'alta',
        prospecto: p,
        accion: 'Dar seguimiento'
      });
    });

    // Levantamientos completados sin reporte
    levantamientosActivos.filter(l =>
      l.status === 'Completado' && !l.tieneReporte
    ).forEach(l => {
      nuevasAlertas.push({
        tipo: 'levantamiento_sin_reporte',
        mensaje: `Levantamiento de ${l.cliente} completado sin reporte`,
        prioridad: 'media',
        levantamiento: l,
        accion: 'Generar reporte'
      });
    });

    // Leads inactivos (> 14 días sin actividad)
    leadsConAsignacion.filter(lead => {
      const diasSinActividad = calcularDiasSinRespuesta(lead.fecha);
      return diasSinActividad > 14;
    }).forEach(lead => {
      nuevasAlertas.push({
        tipo: 'lead_inactivo',
        mensaje: `Lead "${lead.empresa}" sin actividad hace ${calcularDiasSinRespuesta(lead.fecha)} días`,
        prioridad: 'media',
        lead: lead,
        accion: 'Reactivar contacto'
      });
    });

    // Documentos vencidos o por vencer (< 30 días)
    documentos.filter(doc => {
      const hoy = new Date();
      const vencimiento = new Date(doc.fechaVencimiento);
      const diasRestantes = Math.floor((vencimiento - hoy) / (1000 * 60 * 60 * 24));
      return diasRestantes <= 30;
    }).forEach(doc => {
      const hoy = new Date();
      const vencimiento = new Date(doc.fechaVencimiento);
      const diasRestantes = Math.floor((vencimiento - hoy) / (1000 * 60 * 60 * 24));
      const prioridad = diasRestantes < 0 ? 'alta' : 'media';
      const estado = diasRestantes < 0 ? 'vencido' : `vence en ${diasRestantes} días`;

      nuevasAlertas.push({
        tipo: 'documento_vencimiento',
        mensaje: `Documento "${doc.nombre}" ${estado}`,
        prioridad: prioridad,
        documento: doc,
        accion: diasRestantes < 0 ? 'Renovar urgente' : 'Programar renovación'
      });
    });

    setAlertas(nuevasAlertas);
  }, [leadsConAsignacion, documentos]);

  // Componente Panel de Notificaciones
  const NotificationsPanel = ({ alertas, onClose, onAction }) => (
    <div className="absolute right-0 top-12 w-96 bg-white rounded-lg shadow-lg border border-[#E9ECEF] z-50">
      <div className="p-4 border-b border-[#E9ECEF] flex justify-between items-center">
        <h3 className="font-semibold text-[#343A40]">Alertas ({alertas.length})</h3>
        <button onClick={onClose}><X size={18} /></button>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {alertas.length === 0 ? (
          <div className="p-8 text-center text-[#6C757D]">
            <CheckSquare size={48} className="mx-auto mb-3 opacity-50" />
            <p className="text-sm">No hay alertas pendientes</p>
          </div>
        ) : (
          alertas.map((alerta, idx) => (
            <div key={idx} className={`p-4 border-b border-[#E9ECEF] ${
              alerta.prioridad === 'alta' ? 'bg-red-50' : 'bg-yellow-50'
            }`}>
              <div className="flex items-start gap-2">
                <AlertCircle size={16} className={`mt-0.5 flex-shrink-0 ${
                  alerta.prioridad === 'alta' ? 'text-red-600' : 'text-yellow-600'
                }`} />
                <div className="flex-1">
                  <div className="text-sm font-medium text-[#343A40]">{alerta.mensaje}</div>
                  <button
                    onClick={() => onAction(alerta)}
                    className="mt-2 text-xs text-[#1B5E20] font-medium hover:text-[#2E7D32]"
                  >
                    {alerta.accion} →
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  // Modal de Motivo de Rechazo
  const ModalMotivoRechazo = ({ prospecto, onClose, onSave }) => {
    const [motivoSeleccionado, setMotivoSeleccionado] = useState('');
    const [detalle, setDetalle] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!motivoSeleccionado) {
        alert('Debe seleccionar un motivo de rechazo');
        return;
      }
      onSave({
        motivoRechazo: parseInt(motivoSeleccionado),
        motivoRechazoDetalle: detalle,
        fechaRechazo: new Date().toISOString().split('T')[0]
      });
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
          <div className="p-6 border-b border-[#E9ECEF]">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-[#343A40]">Motivo de Rechazo</h3>
                <p className="text-sm text-[#6C757D] mt-1">
                  {prospecto?.nombre}
                </p>
              </div>
              <button onClick={onClose} className="text-[#6C757D] hover:text-[#343A40]">
                <X size={24} />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-[#343A40] mb-2">
                Motivo de Rechazo *
              </label>
              <select
                value={motivoSeleccionado}
                onChange={(e) => setMotivoSeleccionado(e.target.value)}
                className="w-full px-4 py-3 border border-[#E9ECEF] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
                required
              >
                <option value="">Seleccione un motivo...</option>
                {MOTIVOS_RECHAZO.map(motivo => (
                  <option key={motivo.id} value={motivo.id}>
                    {motivo.motivo} ({motivo.categoria})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#343A40] mb-2">
                Detalles adicionales
              </label>
              <textarea
                value={detalle}
                onChange={(e) => setDetalle(e.target.value)}
                className="w-full px-4 py-3 border border-[#E9ECEF] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
                rows={4}
                placeholder="Proporcione información adicional sobre el rechazo..."
              />
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-orange-600 flex-shrink-0 mt-0.5" size={20} />
                <div className="text-sm text-orange-800">
                  <p className="font-semibold mb-1">Información importante</p>
                  <p>
                    El registro del motivo de rechazo es obligatorio y ayudará a mejorar nuestros procesos comerciales.
                    Valor estimado de esta propuesta: ${(prospecto?.valorEstimado || 0).toLocaleString('es-MX')}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#E9ECEF]">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 border border-[#E9ECEF] text-[#6C757D] rounded-lg hover:bg-[#F8F9FA] font-medium text-sm"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#1B5E20] text-white rounded-lg hover:bg-[#2E7D32] font-medium text-sm"
              >
                Guardar Motivo
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Welcome Screen
  const WelcomeScreen = () => (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center max-w-4xl px-8">
        <div className="mb-16">
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="text-5xl">♻️</div>
            <div>
              <h1 className="text-6xl font-bold text-[#1B5E20] mb-3 tracking-tight">
                INNOVATIVE GROUP
              </h1>
              <div className="text-xl text-[#6C757D] font-medium tracking-wide">
                × ECONOVA TECH SOLUTIONS
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-16 mb-12 border border-[#E9ECEF] shadow-sm">
          <h2 className="text-3xl font-semibold text-[#343A40] mb-6 leading-tight">
            Sistema Integral de Gestión Comercial
          </h2>
          <p className="text-lg text-[#6C757D] mb-12 leading-relaxed max-w-2xl mx-auto">
            Control total de levantamientos, propuestas, pipeline, presupuesto, KPIs 
            y reportes de trazabilidad entregados para clientes.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-[#F8F9FA] rounded-lg p-8 border border-[#E9ECEF]">
              <div className="text-4xl mb-4">📋</div>
              <div className="text-sm font-semibold text-[#343A40]">Levantamientos</div>
              <div className="text-xs text-[#6C757D] mt-1">& Propuestas</div>
            </div>
            <div className="bg-[#F8F9FA] rounded-lg p-8 border border-[#E9ECEF]">
              <div className="text-4xl mb-4">📊</div>
              <div className="text-sm font-semibold text-[#343A40]">Pipeline</div>
              <div className="text-xs text-[#6C757D] mt-1">Embudo comercial</div>
            </div>
            <div className="bg-[#F8F9FA] rounded-lg p-8 border border-[#E9ECEF]">
              <div className="text-4xl mb-4">💰</div>
              <div className="text-sm font-semibold text-[#343A40]">Presupuesto</div>
              <div className="text-xs text-[#6C757D] mt-1">vs Real</div>
            </div>
            <div className="bg-[#F8F9FA] rounded-lg p-8 border border-[#E9ECEF]">
              <div className="text-4xl mb-4">📧</div>
              <div className="text-sm font-semibold text-[#343A40]">Reportes Auto</div>
              <div className="text-xs text-[#6C757D] mt-1">Mensuales</div>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => setCurrentView('dashboard')}
          className="bg-[#1B5E20] hover:bg-[#2E7D32] text-white px-12 py-4 rounded-md text-lg font-semibold transition-all shadow-sm"
        >
          Acceder al Sistema
        </button>
      </div>
    </div>
  );

  // Sidebar
  const Sidebar = () => (
    <div className={`bg-white h-screen transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} flex flex-col border-r border-[#E9ECEF] shadow-sm relative overflow-hidden`}>
      <div className="p-6 border-b border-[#E9ECEF] flex items-center justify-between relative z-10">
        {sidebarOpen && (
          <div>
            <h2 className="text-[#1B5E20] text-xl font-bold tracking-tight">INNOVATIVE</h2>
            <p className="text-xs text-[#6C757D] mt-1 font-medium">Gestión Comercial</p>
          </div>
        )}
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-[#6C757D] hover:text-[#1B5E20] transition-colors p-1 rounded-md hover:bg-[#F8F9FA]">
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      
      <nav className="flex-1 p-4 relative z-10">
        {[
          { id: 'dashboard', icon: Home, label: 'Dashboard' },
          { id: 'pipeline', icon: TrendingUp, label: 'Pipeline Comercial' },
          { id: 'levantamientos', icon: ClipboardList, label: 'Levantamientos' },
          { id: 'documentos', icon: FileText, label: 'Documentos' },
          { id: 'team', icon: Users, label: 'Centro de Control de KPIs' },
          { id: 'trazabilidad', icon: Recycle, label: 'Trazabilidad' }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => {
              setCurrentView(item.id);
              setSelectedClient(null);
              setSelectedTeamMember(null);
            }}
            className={`w-full flex items-center ${sidebarOpen ? 'justify-start gap-3' : 'justify-center'} p-3 rounded-lg mb-2 transition-all font-medium text-sm ${
              currentView === item.id 
                ? 'bg-[#1B5E20] text-white' 
                : 'text-[#6C757D] hover:bg-[#F8F9FA] hover:text-[#1B5E20]'
            }`}
          >
            <item.icon size={20} className="flex-shrink-0" />
            {sidebarOpen && <span className="flex-1 text-left">{item.label}</span>}
          </button>
        ))}
      </nav>
      
      <div className="p-4 border-t border-[#E9ECEF] relative z-10">
        <button className={`w-full flex items-center ${sidebarOpen ? 'justify-start gap-3' : 'justify-center'} p-3 text-[#6C757D] hover:bg-[#F8F9FA] hover:text-[#1B5E20] rounded-lg text-sm font-medium transition-all`}>
          <LogOut size={20} className="flex-shrink-0" />
          {sidebarOpen && <span className="flex-1 text-left">Salir</span>}
        </button>
      </div>
    </div>
  );

  // Header
  const Header = ({ title, subtitle }) => (
    <div className="bg-white border-b border-[#E9ECEF] px-8 py-6 flex justify-between items-center relative">
      <div className="relative z-10">
        <h1 className="text-2xl font-bold text-[#343A40] tracking-tight">{title}</h1>
        {subtitle && <p className="text-[#6C757D] mt-1 text-sm font-medium">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setMostrarNotificaciones(!mostrarNotificaciones)}
            className="relative text-[#6C757D] hover:text-[#1B5E20]"
          >
            <Bell size={20} />
            {alertas.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#1B5E20] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                {alertas.length}
              </span>
            )}
          </button>
          {mostrarNotificaciones && (
            <NotificationsPanel
              alertas={alertas}
              onClose={() => setMostrarNotificaciones(false)}
              onAction={(alerta) => {
                // Manejar acción según tipo de alerta
                if (alerta.tipo === 'seguimiento_propuesta') {
                  setSelectedProspecto(alerta.prospecto);
                  setMostrarDetallesProspecto(true);
                } else if (alerta.tipo === 'levantamiento_sin_reporte') {
                  setSelectedLevantamientoDetalle(levantamientosDetallados.find(l => l.cliente === alerta.levantamiento.cliente));
                  setCurrentView('levantamientos');
                }
                setMostrarNotificaciones(false);
              }}
            />
          )}
        </div>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg border border-[#E9ECEF] shadow-sm relative z-10">
          <div className="w-10 h-10 rounded-full bg-[#1B5E20] flex items-center justify-center text-sm font-semibold text-white">
            V
          </div>
          <div className="text-sm">
            <div className="font-semibold text-[#343A40]">Vero</div>
            <div className="text-xs text-[#6C757D]">Directora Comercial</div>
          </div>
        </div>
      </div>
    </div>
  );

  // DASHBOARD PRINCIPAL
  const DashboardView = () => (
    <div className="p-8 bg-[#F8F9FA] min-h-screen">
      <Header title="Dashboard Ejecutivo" subtitle="Control integral - Actualizado: 11 Nov 2025, 17:45 hrs" />
      
      {/* MÉTRICAS PRINCIPALES - DISEÑO CREATIVO */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <div className="bg-[#1B5E20] rounded-lg p-6 text-white shadow-sm">
          <div className="flex justify-between items-start mb-4">
              <div className="text-sm font-medium opacity-90">Presupuesto Mensual</div>
              <DollarSign className="opacity-80" size={24} />
          </div>
          <div className="text-4xl font-bold mb-2">$3.3M</div>
          <div className="text-sm font-medium opacity-90">Cumplimiento: 107%</div>
        </div>
        
        <div className="bg-[#0D47A1] rounded-lg p-6 text-white shadow-sm">
          <div className="flex justify-between items-start mb-4">
              <div className="text-sm font-medium opacity-90">Levantamientos Activos</div>
              <ClipboardList className="opacity-80" size={24} />
          </div>
          <div className="text-4xl font-bold mb-2">32</div>
          <div className="text-sm font-medium opacity-90">↑ 18% vs mes anterior</div>
        </div>
        
        <div className="bg-[#2E7D32] rounded-lg p-6 text-white shadow-sm">
          <div className="flex justify-between items-start mb-4">
              <div className="text-sm font-medium opacity-90">Propuestas Enviadas</div>
              <FileText className="opacity-80" size={24} />
          </div>
          <div className="text-4xl font-bold mb-2">24</div>
          <div className="text-sm font-medium opacity-90">Tasa conversión: 33%</div>
        </div>
        
        <div className="bg-[#388E3C] rounded-lg p-6 text-white shadow-sm">
          <div className="flex justify-between items-start mb-4">
              <div className="text-sm font-medium opacity-90">Reportes de Trazabilidad</div>
              <Send className="opacity-80" size={24} />
          </div>
          <div className="text-4xl font-bold mb-2">28</div>
          <div className="text-sm font-medium opacity-90">Próximos: 1 Dic</div>
        </div>
      </div>

      {/* SECCIÓN: TOP PROSPECTOS */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Target className="text-[#1B5E20]" size={24} />
            <h2 className="text-xl font-semibold text-[#343A40]">Top Prospectos</h2>
            <span className="text-xs bg-[#F8F9FA] text-[#6C757D] px-3 py-1 rounded-md border border-[#E9ECEF] font-medium">
              {topProspectos.length} empresas prioritarias
            </span>
          </div>
        </div>
        
        {/* RESUMEN VISUAL DE PROSPECTOS */}
        <div className="bg-white rounded-lg border border-[#E9ECEF] shadow-sm p-6 mb-6">
          <h3 className="text-base font-semibold text-[#343A40] mb-4">Resumen de Prospectos</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-[#1B5E20] rounded-lg text-white">
              <div className="text-2xl font-bold mb-1">
                ${(topProspectos.reduce((sum, p) => sum + p.valorEstimado, 0) / 1000000).toFixed(1)}M
              </div>
              <div className="text-xs opacity-90">Valor Total Potencial</div>
            </div>
            <div className="text-center p-4 bg-[#F8F9FA] rounded-lg border border-[#E9ECEF]">
              <div className="text-2xl font-bold text-[#343A40] mb-1">
                {topProspectos.filter(p => p.etapa === 'Negociación').length}
              </div>
              <div className="text-xs text-[#6C757D]">En Negociación</div>
            </div>
            <div className="text-center p-4 bg-[#F8F9FA] rounded-lg border border-[#E9ECEF]">
              <div className="text-2xl font-bold text-[#343A40] mb-1">
                {Math.round(topProspectos.reduce((sum, p) => sum + p.probabilidad, 0) / topProspectos.length)}%
              </div>
              <div className="text-xs text-[#6C757D]">Probabilidad Promedio</div>
            </div>
            <div className="text-center p-4 bg-[#F8F9FA] rounded-lg border border-[#E9ECEF]">
              <div className="text-2xl font-bold text-[#343A40] mb-1">
                {topProspectos.filter(p => p.prioridad === 'Muy Alta' || p.prioridad === 'Alta').length}
              </div>
              <div className="text-xs text-[#6C757D]">Alta Prioridad</div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {topProspectos.slice(0, 4).map(prospecto => {
            const getColorRiesgo = (riesgo) => {
              if (riesgo === 'Bajo' || riesgo === 'Muy Bajo') return 'text-[#1B5E20]';
              if (riesgo === 'Medio') return 'text-orange-600';
              return 'text-red-600';
            };
            
            return (
              <div 
                key={prospecto.id}
                className="bg-white rounded-lg border border-[#E9ECEF] shadow-sm hover:shadow-md transition-all"
              >
                {/* HEADER */}
                <div className="p-5 border-b border-[#E9ECEF]">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[#343A40] mb-1">{prospecto.nombre}</h3>
                      <p className="text-sm text-[#6C757D]">{prospecto.industria}</p>
                  </div>
                </div>
                  <div className="flex items-center gap-2 text-sm text-[#6C757D]">
                    <Users size={14} />
                    <span className="font-medium">Asesor:</span>
                    <span>{prospecto.asesorComercial}</span>
                </div>
              </div>
              
                {/* CONTENIDO PRINCIPAL */}
                <div className="p-5 space-y-4">
                  {/* PRÓXIMO PASO */}
                  <div>
                    <div className="text-xs text-[#6C757D] font-medium mb-1">Próximo Paso</div>
                    <div className="text-sm font-semibold text-[#343A40]">{prospecto.proximoPaso}</div>
                  </div>
                  
                  {/* MÉTRICAS RÁPIDAS */}
                  <div className="grid grid-cols-2 gap-3">
                  <div>
                      <div className="text-xs text-[#6C757D] font-medium mb-1">Tiempo Estimado</div>
                      <div className="text-sm font-semibold text-[#343A40]">{prospecto.tiempoEstimadoCierre}</div>
                  </div>
                  <div>
                      <div className="text-xs text-[#6C757D] font-medium mb-1">Riesgo</div>
                      <div className={`text-sm font-semibold ${getColorRiesgo(prospecto.riesgo)}`}>
                        {prospecto.riesgo}
                  </div>
                    </div>
                  </div>
                  
                  {/* OPORTUNIDAD */}
                  <div>
                    <div className="text-xs text-[#6C757D] font-medium mb-1">Oportunidad</div>
                    <div className="text-sm text-[#343A40]">{prospecto.oportunidad}</div>
                  </div>
                  
                  {/* MÉTRICAS FINANCIERAS */}
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#E9ECEF]">
                    <div className="bg-[#F8F9FA] rounded-lg p-3 border border-[#E9ECEF]">
                      <div className="text-xs text-[#6C757D] mb-1">Volumen</div>
                      <div className="text-sm font-semibold text-[#343A40]">{prospecto.volumenEstimado}</div>
                </div>
                    <div className="bg-[#F8F9FA] rounded-lg p-3 border border-[#E9ECEF]">
                      <div className="text-xs text-[#6C757D] mb-1">Valor</div>
                      <div className="text-sm font-semibold text-[#0D47A1]">
                        ${(prospecto.valorEstimado / 1000000).toFixed(1)}M
                      </div>
                </div>
              </div>
              
                  {/* BOTONES DE ACCIÓN */}
                  <div className="flex gap-2 pt-3 border-t border-[#E9ECEF]">
                    {prospecto.tieneLevantamiento && (
                      <button
                        onClick={() => {
                          const levantamiento = levantamientosActivos.find(l => l.id === prospecto.levantamientoId);
                          if (levantamiento) {
                            setSelectedLevantamiento(levantamiento);
                            setMostrarLevantamiento(true);
                          }
                        }}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#F8F9FA] hover:bg-[#E9ECEF] text-[#343A40] rounded-md text-xs font-medium transition-all border border-[#E9ECEF]"
                      >
                        <Eye size={14} />
                        Levantamiento
                      </button>
                    )}
                    {prospecto.tienePropuesta && (
                      <button
                        onClick={() => {
                          setSelectedProspecto(prospecto);
                          setMostrarPropuesta(true);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#0D47A1] hover:bg-[#0052A3] text-white rounded-md text-xs font-medium transition-all"
                      >
                        <FileText size={14} />
                        Propuesta
                      </button>
                    )}
                </div>
                  
                  {/* INFO ADICIONAL */}
                  <div className="pt-3 border-t border-[#E9ECEF] space-y-2">
                    <div className="flex items-center gap-2 text-xs text-[#6C757D]">
                      <MapPin size={12} />
                      <span>{prospecto.ubicacion}</span>
                    </div>
                    <div className="text-xs text-[#6C757D]">
                      <span className="font-medium">Contacto:</span> {prospecto.contacto}
                  </div>
                    </div>
                  </div>
                  </div>
            );
          })}
                </div>
              </div>

      {/* SECCIÓN: ANÁLISIS DE RECHAZOS */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <TrendingDown className="text-[#1B5E20]" size={24} />
            <h2 className="text-xl font-semibold text-[#343A40]">Análisis de Rechazos</h2>
            <span className="text-xs bg-red-50 text-red-600 px-3 py-1 rounded-md border border-red-200 font-medium">
              {topProspectos.filter(p => p.etapa === 'Rechazada').length} propuestas rechazadas
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* KPIs de Rechazos */}
          <div className="bg-white rounded-lg border border-[#E9ECEF] shadow-sm p-6">
            <h3 className="text-base font-semibold text-[#343A40] mb-4">Impacto Financiero</h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-[#6C757D] mb-1">Valor Total Perdido</div>
                <div className="text-3xl font-bold text-red-600">
                  ${(topProspectos.filter(p => p.etapa === 'Rechazada').reduce((sum, p) => sum + p.valorEstimado, 0) / 1000000).toFixed(1)}M
                </div>
              </div>
              <div>
                <div className="text-sm text-[#6C757D] mb-1">Propuestas Rechazadas</div>
                <div className="text-2xl font-bold text-[#343A40]">
                  {topProspectos.filter(p => p.etapa === 'Rechazada').length}
                </div>
              </div>
              <div>
                <div className="text-sm text-[#6C757D] mb-1">Con Motivo Documentado</div>
                <div className="text-2xl font-bold text-[#1B5E20]">
                  {topProspectos.filter(p => p.etapa === 'Rechazada' && p.motivoRechazo).length}/{topProspectos.filter(p => p.etapa === 'Rechazada').length}
                </div>
              </div>
            </div>
          </div>

          {/* Top Motivos de Rechazo */}
          <div className="bg-white rounded-lg border border-[#E9ECEF] shadow-sm p-6">
            <h3 className="text-base font-semibold text-[#343A40] mb-4">Top 3 Motivos de Rechazo</h3>
            <div className="space-y-3">
              {(() => {
                const rechazados = topProspectos.filter(p => p.etapa === 'Rechazada' && p.motivoRechazo);
                const conteoMotivos = {};
                rechazados.forEach(p => {
                  const motivoId = p.motivoRechazo;
                  if (!conteoMotivos[motivoId]) {
                    conteoMotivos[motivoId] = { count: 0, valor: 0 };
                  }
                  conteoMotivos[motivoId].count++;
                  conteoMotivos[motivoId].valor += p.valorEstimado;
                });

                const topMotivos = Object.entries(conteoMotivos)
                  .map(([id, data]) => ({
                    motivo: MOTIVOS_RECHAZO.find(m => m.id === parseInt(id))?.motivo || 'Desconocido',
                    count: data.count,
                    valor: data.valor
                  }))
                  .sort((a, b) => b.count - a.count)
                  .slice(0, 3);

                return topMotivos.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-[#F8F9FA] rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        idx === 0 ? 'bg-red-100 text-red-600' :
                        idx === 1 ? 'bg-orange-100 text-orange-600' :
                        'bg-yellow-100 text-yellow-600'
                      }`}>
                        {idx + 1}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[#343A40]">{item.motivo}</div>
                        <div className="text-xs text-[#6C757D]">
                          ${(item.valor / 1000000).toFixed(1)}M perdidos
                        </div>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-[#343A40]">{item.count}</div>
                  </div>
                ));
              })()}
            </div>
          </div>

          {/* Distribución por Categoría */}
          <div className="bg-white rounded-lg border border-[#E9ECEF] shadow-sm p-6">
            <h3 className="text-base font-semibold text-[#343A40] mb-4">Distribución por Categoría</h3>
            <div className="space-y-3">
              {(() => {
                const rechazados = topProspectos.filter(p => p.etapa === 'Rechazada' && p.motivoRechazo);
                const conteoCategorias = {};
                rechazados.forEach(p => {
                  const motivo = MOTIVOS_RECHAZO.find(m => m.id === p.motivoRechazo);
                  const categoria = motivo?.categoria || 'Otro';
                  conteoCategorias[categoria] = (conteoCategorias[categoria] || 0) + 1;
                });

                const total = Object.values(conteoCategorias).reduce((sum, val) => sum + val, 0);

                return Object.entries(conteoCategorias)
                  .sort((a, b) => b[1] - a[1])
                  .map(([categoria, count]) => {
                    const porcentaje = total > 0 ? (count / total * 100) : 0;
                    return (
                      <div key={categoria}>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="font-medium text-[#343A40]">{categoria}</span>
                          <span className="text-[#6C757D]">{count} ({porcentaje.toFixed(0)}%)</span>
                        </div>
                        <div className="w-full bg-[#F8F9FA] rounded-full h-2">
                          <div
                            className="bg-[#1B5E20] h-2 rounded-full"
                            style={{ width: `${porcentaje}%` }}
                          />
                        </div>
                      </div>
                    );
                  });
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN: GESTIÓN DE LEADS */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Users className="text-[#1B5E20]" size={24} />
            <h2 className="text-xl font-semibold text-[#343A40]">Gestión de Leads</h2>
            <span className="text-xs bg-[#F8F9FA] text-[#6C757D] px-3 py-1 rounded-md border border-[#E9ECEF] font-medium">
              {leadsConAsignacion.length} leads activos
            </span>
                </div>
                </div>

        <div className="bg-white rounded-lg border border-[#E9ECEF] shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[#E9ECEF]">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-[#343A40]">Tabla de Leads</h3>
              <div className="flex items-center gap-4 text-sm">
                <div className="text-[#6C757D]">
                  <span className="font-semibold text-[#343A40]">{leadsConAsignacion.filter(l => l.asignadoA).length}</span> asignados
                </div>
                <div className="text-[#6C757D]">
                  <span className="font-semibold text-[#343A40]">{leadsConAsignacion.filter(l => !l.asignadoA).length}</span> sin asignar
              </div>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F8F9FA] border-b border-[#E9ECEF]">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#6C757D]">#</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#6C757D]">Empresa</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#6C757D]">Contacto</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#6C757D]">Industria</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#6C757D]">Origen</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#6C757D]">Fecha</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-[#6C757D]">Valor</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#6C757D]">Asignado a</th>
                </tr>
              </thead>
              <tbody>
                {(mostrarTodosLeads ? leadsConAsignacion : leadsConAsignacion.slice(0, 10)).map((lead, index) => {
                  const ejecutivoAsignado = lead.asignadoA ? salesTeamData.find(e => e.id === lead.asignadoA) : null;
                  
                  return (
                    <tr key={lead.id} className="border-b border-[#E9ECEF] hover:bg-[#F8F9FA] transition-colors">
                      <td className="px-4 py-3 text-sm text-[#6C757D]">{index + 1}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-[#343A40]">{lead.empresa}</td>
                      <td className="px-4 py-3 text-sm text-[#6C757D]">{lead.contacto}</td>
                      <td className="px-4 py-3 text-sm text-[#6C757D]">{lead.industria}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded ${
                          lead.origen === 'Referido' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                          lead.origen === 'Web' ? 'bg-green-50 text-green-700 border border-green-200' :
                          lead.origen === 'LinkedIn' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                          'bg-orange-50 text-orange-700 border border-orange-200'
                        }`}>
                          {lead.origen}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-[#6C757D]">{lead.fecha}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-[#0D47A1] text-right">
                        ${(lead.valor / 1000).toFixed(0)}K
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={lead.asignadoA || ''}
                          onChange={(e) => {
                            const nuevoAsignado = e.target.value ? parseInt(e.target.value) : null;
                            setLeadsConAsignacion(prev => 
                              prev.map(l => l.id === lead.id ? { ...l, asignadoA: nuevoAsignado } : l)
                            );
                          }}
                          className="text-xs px-2 py-1.5 border border-[#E9ECEF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent bg-white"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <option value="">Sin asignar</option>
                          {salesTeamData.map(ejecutivo => (
                            <option key={ejecutivo.id} value={ejecutivo.id}>
                              {ejecutivo.name}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {/* BOTÓN VER MÁS / VER MENOS */}
          {leadsConAsignacion.length > 10 && (
            <div className="p-4 border-t border-[#E9ECEF] bg-[#F8F9FA] flex justify-center">
              <button
                onClick={() => setMostrarTodosLeads(!mostrarTodosLeads)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#1B5E20] hover:text-[#2E7D32] transition-colors"
              >
                {mostrarTodosLeads ? (
                  <>
                    <ChevronUp size={16} />
                    Ver menos ({leadsConAsignacion.length - 10} ocultos)
                  </>
                ) : (
                  <>
                    <ChevronDown size={16} />
                    Ver más ({leadsConAsignacion.length - 10} adicionales)
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* SECCIÓN: EQUIPO CON PIPELINE, PRESUPUESTO Y KPIS */}
      <div className="mt-8">
        <div className="flex items-center gap-3 mb-6">
          <Users className="text-[#1B5E20]" size={24} />
          <h2 className="text-xl font-semibold text-[#343A40]">Control del Equipo</h2>
          <span className="text-xs bg-[#F8F9FA] text-[#6C757D] px-3 py-1 rounded-md border border-[#E9ECEF] font-medium">Pipeline • Presupuesto • KPIs</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {salesTeamData.map(member => {
            const getEficienciaColor = (eficiencia) => {
              if (eficiencia >= 75) return 'bg-[#1B5E20]';
              if (eficiencia >= 65) return 'bg-[#2E7D32]';
              return 'bg-[#388E3C]';
            };
            
            return (
            <div 
              key={member.id} 
                className="bg-white rounded-xl border border-[#E9ECEF] shadow-sm hover:shadow-lg transition-all cursor-pointer overflow-hidden group"
              onClick={() => setSelectedTeamMember(member)}
            >
                {/* HEADER CON GRADIENTE SUTIL */}
                <div className={`${getEficienciaColor(member.eficienciaGlobal)} p-5 text-white`}>
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                        <p className="text-xs text-white/90">{member.role}</p>
                </div>
                <div className="text-right">
                        <div className="text-3xl font-bold">{member.eficienciaGlobal}%</div>
                        <div className="text-xs text-white/80">Eficiencia</div>
              </div>
              </div>
              
                    {/* BARRA DE EFICIENCIA VISUAL */}
                    <div className="w-full bg-white/20 rounded-full h-2 mt-3">
                      <div 
                        className="bg-white h-2 rounded-full transition-all"
                        style={{ width: `${member.eficienciaGlobal}%` }}
                      />
          </div>
        </div>
      </div>
                
                <div className="p-5">
                  {/* PIPELINE VISUAL - EMBUDO MINI */}
                  <div className="mb-5">
                    <div className="text-xs text-[#6C757D] font-medium mb-3 flex items-center gap-2">
                  <TrendingUp size={14} />
                      Pipeline
                </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#6C757D]">Leads</span>
                        <span className="font-semibold text-[#343A40]">{member.leads}</span>
                  </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#6C757D]">Levant.</span>
                        <span className="font-semibold text-[#343A40]">{member.levantamientos}</span>
                  </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#6C757D]">Propuestas</span>
                        <span className="font-semibold text-[#343A40]">{member.propuestasEnviadas}</span>
                  </div>
                      <div className="flex items-center justify-between pt-2 border-t border-[#E9ECEF] text-sm">
                        <span className="font-medium text-[#343A40]">Cierres</span>
                        <span className="font-bold text-[#0D47A1] text-base">{member.cierres}</span>
                  </div>
                </div>
                    <div className="mt-3 pt-3 border-t border-[#E9ECEF] text-center">
                      <span className="text-xs text-[#6C757D]">Conversión </span>
                      <span className="text-xs font-bold text-[#0D47A1]">{member.tasaConversion}%</span>
        </div>
      </div>

                  {/* PRESUPUESTO VISUAL */}
                  <div className="mb-4">
                    <div className="text-xs text-[#6C757D] font-medium mb-2 flex items-center gap-2">
                      <DollarSign size={12} />
                      Presupuesto
                </div>
                    <div className="flex items-end justify-between mb-2">
                  <div>
                        <div className="text-xs text-[#6C757D]">Real</div>
                        <div className="text-lg font-bold text-[#343A40]">${(member.ventasReales / 1000).toFixed(0)}k</div>
                    </div>
                      <div className="text-right">
                        <div className="text-xs text-[#6C757D]">Meta</div>
                        <div className="text-base font-semibold text-[#6C757D]">${(member.presupuestoMensual / 1000).toFixed(0)}k</div>
                  </div>
                    </div>
                    <div className="relative w-full bg-[#E9ECEF] rounded-full h-3 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${
                          member.cumplimientoPresupuesto >= 100 
                            ? 'bg-[#0D47A1]' 
                            : 'bg-orange-600'
                        }`}
                        style={{ width: `${Math.min(member.cumplimientoPresupuesto, 100)}%` }}
                      >
                        <div className="h-full flex items-center justify-end pr-2">
                          <span className="text-xs font-bold text-white">{member.cumplimientoPresupuesto}%</span>
                  </div>
                  </div>
                </div>
        </div>
        
                  {/* INDICADOR DE ESTADO */}
                  <div className="pt-4 border-t border-[#E9ECEF]">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#6C757D]">Estado</span>
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${
                        member.cumplimientoPresupuesto >= 100 
                          ? 'bg-green-50 text-green-700 border border-green-200' 
                          : member.cumplimientoPresupuesto >= 90
                          ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                          : 'bg-orange-50 text-orange-700 border border-orange-200'
                      }`}>
                        {member.cumplimientoPresupuesto >= 100 ? '✓ En Meta' : 
                         member.cumplimientoPresupuesto >= 90 ? '⚠ Cerca' : '⚠ Por debajo'}
                      </span>
                </div>
              </div>
          </div>
              </div>
            );
          })}
        </div>
      </div>


      {/* PRESUPUESTO VS REAL - EVOLUCIÓN */}
      <div className="mt-8">
        <div className="flex items-center gap-3 mb-6">
          <DollarSign className="text-[#1B5E20]" size={24} />
          <h2 className="text-xl font-semibold text-[#343A40]">Presupuesto vs Real</h2>
        </div>
        
        <div className="bg-white rounded-lg p-8 border border-[#E9ECEF] shadow-sm">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={presupuestoEvolution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E9ECEF" />
              <XAxis dataKey="mes" stroke="#6C757D" />
              <YAxis stroke="#6C757D" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="presupuesto" stroke="#6C757D" strokeWidth={2} name="Presupuesto" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="real" stroke="#1B5E20" strokeWidth={3} name="Ventas Reales" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  // VISTA: PIPELINE COMERCIAL
  const PipelineComercialView = () => (
    <div className="p-8 bg-[#F8F9FA] min-h-screen">
      <Header title="Pipeline Comercial" subtitle="Embudo de ventas y seguimiento de oportunidades" />
      
      {/* COMPARACIÓN OBJETIVO VS REAL */}
      <div className="mt-8 bg-white rounded-lg p-6 border border-[#E9ECEF] shadow-sm">
        <h3 className="text-base font-semibold text-[#343A40] mb-4">Progreso Mensual: Objetivo vs Real</h3>
        
        <div className="space-y-4">
          {pipelineData.map((item, index) => {
            const porcentajeCumplimiento = ((item.cantidad / item.objetivo) * 100).toFixed(0);
            const estaEnObjetivo = item.cantidad >= item.objetivo;
            
            return (
              <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-[#343A40] min-w-[140px]">{item.etapa}</span>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="text-[#6C757D]">
                        Real: <button
                          type="button"
                          className={`font-semibold border-0 bg-transparent p-0 ${
                            item.etapa === 'Leads' ? 'text-[#0D47A1] cursor-pointer hover:underline' : 
                            item.etapa === 'Levantamientos' ? 'text-[#0D47A1] cursor-pointer hover:underline' : 
                            'text-[#343A40] cursor-default'
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (item.etapa === 'Leads') {
                              setMostrarLeads(true);
                            } else if (item.etapa === 'Levantamientos') {
                              setMostrarLevantamientos(true);
                            }
                          }}
                        >
                          {item.cantidad}
                        </button>
                      </span>
                      <span className="text-[#6C757D]">/</span>
                      <span className="text-[#6C757D]">
                        Objetivo: <span className="font-semibold text-[#343A40]">{item.objetivo}</span>
                      </span>
                    </div>
                  </div>
                  <div className={`text-sm font-semibold ${estaEnObjetivo ? 'text-[#0D47A1]' : 'text-[#0D47A1]/70'}`}>
                    {porcentajeCumplimiento}%
                  </div>
                </div>
                
                <div className="relative w-full bg-[#E9ECEF] rounded-full h-6 overflow-hidden">
                  {/* Calcular escala: usar el máximo entre objetivo y cantidad para la escala */}
                  {(() => {
                    const maxValue = Math.max(item.objetivo, item.cantidad);
                    const porcentajeReal = (item.cantidad / maxValue) * 100;
                    const porcentajeObjetivo = (item.objetivo / maxValue) * 100;
                    
                    return (
                      <>
                        {/* Barra de progreso real */}
                        <div 
                          className={`h-full rounded-full transition-all flex items-center ${
                            estaEnObjetivo 
                              ? 'bg-[#0D47A1]' 
                              : 'bg-[#1565C0]'
                          }`}
                          style={{ width: `${porcentajeReal}%` }}
                        >
                          <div className="flex-1 flex items-center justify-end pr-3">
                            <button
                              type="button"
                              className={`text-xs font-semibold text-white border-0 bg-transparent p-0 ${
                                item.etapa === 'Leads' || item.etapa === 'Levantamientos' ? 'cursor-pointer hover:underline' : 'cursor-default'
                              }`}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (item.etapa === 'Leads') {
                                  setMostrarLeads(true);
                                } else if (item.etapa === 'Levantamientos') {
                                  setMostrarLevantamientos(true);
                                }
                              }}
                            >
                              {item.cantidad}
                            </button>
                          </div>
                        </div>
                        
                        {/* Línea de objetivo (marcador) */}
                        <div 
                          className="absolute top-0 h-full flex items-center pointer-events-none"
                          style={{ left: `${porcentajeObjetivo}%` }}
                        >
                          <div className="w-0.5 h-full bg-[#6C757D] opacity-70"></div>
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                            <div className="text-xs text-[#6C757D] font-medium bg-white px-2 py-0.5 rounded border border-[#E9ECEF] shadow-sm">
                              Objetivo: {item.objetivo}
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* RESUMEN GENERAL */}
        <div className="mt-8 pt-6 border-t border-[#E9ECEF] grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-[#F8F9FA] rounded-lg border border-[#E9ECEF]">
            <div className="text-xs text-[#6C757D] mb-1">Total Objetivo</div>
            <div className="text-2xl font-bold text-[#343A40]">
              {pipelineData.reduce((sum, item) => sum + item.objetivo, 0)}
            </div>
          </div>
          <div className="text-center p-4 bg-[#F8F9FA] rounded-lg border border-[#E9ECEF]">
            <div className="text-xs text-[#6C757D] mb-1">Total Real</div>
            <div className="text-2xl font-bold text-[#0D47A1]">
              {pipelineData.reduce((sum, item) => sum + item.cantidad, 0)}
            </div>
          </div>
          <div className="text-center p-4 bg-[#0D47A1] rounded-lg text-white">
            <div className="text-xs opacity-90 mb-1">Cumplimiento General</div>
            <div className="text-2xl font-bold">
              {((pipelineData.reduce((sum, item) => sum + item.cantidad, 0) / pipelineData.reduce((sum, item) => sum + item.objetivo, 0)) * 100).toFixed(0)}%
            </div>
          </div>
        </div>
      </div>
      
      {/* EMBUDO VISUAL CREATIVO */}
      <div className="mt-8 bg-white rounded-lg p-6 border border-[#E9ECEF] shadow-sm">
        <h3 className="text-base font-semibold text-[#343A40] mb-4">Embudo Comercial</h3>
        
        {/* EMBUDO VISUAL */}
        <div className="flex flex-col items-center gap-1.5 mb-4">
          {pipelineData.map((item, index) => {
            const width = 100 - (index * 15);
            const tasaConversion = index > 0 
              ? ((item.cantidad / pipelineData[index - 1].cantidad) * 100).toFixed(0)
              : 100;
            
            return (
              <div key={index} className="relative w-full flex items-center justify-center">
                <div 
                  className="relative bg-[#1B5E20] rounded-md p-3 text-white transition-all"
                  style={{ width: `${width}%` }}
                >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="text-xs font-medium opacity-90 mb-1">{item.etapa}</div>
                        <button
                          type="button"
                          className={`text-xl font-bold border-0 bg-transparent p-0 text-white ${
                            item.etapa === 'Leads' || item.etapa === 'Levantamientos' ? 'cursor-pointer hover:underline' : 'cursor-default'
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (item.etapa === 'Leads') {
                              setMostrarLeads(true);
                            } else if (item.etapa === 'Levantamientos') {
                              setMostrarLevantamientos(true);
                            }
                          }}
                        >
                          {item.cantidad}
                        </button>
                        <div className="text-xs opacity-80 mt-0.5">
                          ${(item.valor / 1000000).toFixed(1)}M
                        </div>
                      </div>
                      {index > 0 && (
                        <div className="text-right ml-3">
                          <div className="text-xs opacity-80">Conversión</div>
                          <div className="text-sm font-semibold">{tasaConversion}%</div>
                        </div>
                      )}
                    </div>
                </div>
                {index < pipelineData.length - 1 && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                    <ChevronDown size={16} className="text-[#E9ECEF]" />
                  </div>
                )}
              </div>
            );
          })}
      </div>

        {/* MÉTRICAS RESUMEN */}
        <div className="grid grid-cols-5 gap-3 pt-4 border-t border-[#E9ECEF]">
          {pipelineData.map((item, index) => {
            const prevItem = index > 0 ? pipelineData[index - 1] : null;
            const tasaConversion = prevItem ? ((item.cantidad / prevItem.cantidad) * 100).toFixed(1) : '100.0';
            
            return (
              <div key={index} className="text-center">
                <div className="text-xs text-[#6C757D] font-medium mb-2">{item.etapa}</div>
                <button
                  type="button"
                  className={`text-2xl font-bold mb-1 border-0 bg-transparent p-0 ${
                    item.etapa === 'Leads' || item.etapa === 'Levantamientos' ? 'cursor-pointer hover:underline text-[#0D47A1]' : 'text-[#343A40] cursor-default'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (item.etapa === 'Leads') {
                      setMostrarLeads(true);
                    } else if (item.etapa === 'Levantamientos') {
                      setMostrarLevantamientos(true);
                    }
                  }}
                >
                  {item.cantidad}
                </button>
                <div className="text-xs text-[#1B5E20] font-medium mb-2">
                  ${(item.valor / 1000000).toFixed(1)}M
                </div>
                {index > 0 && (
                  <div className="text-xs text-[#6C757D] pt-2 border-t border-[#E9ECEF]">
                    {tasaConversion}% conv.
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
        
      {/* TABLA DETALLADA */}
      <div className="mt-8 bg-white rounded-lg border border-[#E9ECEF] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#E9ECEF]">
          <h3 className="text-lg font-semibold text-[#343A40]">Desglose por Etapa</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8F9FA] border-b border-[#E9ECEF]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#343A40]">Etapa</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-[#343A40]">Cantidad</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-[#343A40]">Valor Total</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-[#343A40]">Valor Promedio</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-[#343A40]">Tasa Conversión</th>
              </tr>
            </thead>
            <tbody>
              {pipelineData.map((item, index) => {
                const prevItem = index > 0 ? pipelineData[index - 1] : null;
                const tasaConversion = prevItem ? ((item.cantidad / prevItem.cantidad) * 100).toFixed(1) : '100.0';
                return (
                  <tr key={index} className="border-b border-[#E9ECEF] hover:bg-[#F8F9FA]">
                    <td className="px-6 py-4 text-sm font-semibold text-[#343A40]">{item.etapa}</td>
                    <td className="px-6 py-4 text-sm text-center font-medium text-[#343A40]">{item.cantidad}</td>
                    <td className="px-6 py-4 text-sm text-center font-semibold text-[#1B5E20]">
                  ${(item.valor / 1000000).toFixed(1)}M
                    </td>
                    <td className="px-6 py-4 text-sm text-center text-[#6C757D]">
                      ${(item.valor / item.cantidad / 1000).toFixed(0)}k
                    </td>
                    <td className="px-6 py-4 text-sm text-center">
                      <span className="px-3 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                        {tasaConversion}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
                </div>
              </div>
          </div>
  );

  // VISTA: CENTRO DE CONTROL DE KPIS
  const TeamControlView = () => (
    <div className="p-8 bg-[#F8F9FA] min-h-screen">
      <Header title="Centro de Control de KPIs" subtitle="Métricas de desempeño por colaborador" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {salesTeamData.map(member => {
          const getEficienciaColor = (eficiencia) => {
            if (eficiencia >= 75) return 'bg-[#1B5E20]';
            if (eficiencia >= 65) return 'bg-[#2E7D32]';
            return 'bg-[#388E3C]';
          };
          
          return (
            <div 
              key={member.id} 
              className="bg-white rounded-xl border border-[#E9ECEF] shadow-sm hover:shadow-lg transition-all cursor-pointer overflow-hidden group"
              onClick={() => setSelectedTeamMember(member)}
            >
              {/* HEADER CON GRADIENTE SUTIL */}
              <div className={`${getEficienciaColor(member.eficienciaGlobal)} p-5 text-white`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                      <p className="text-xs text-white/90">{member.role}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold">{member.eficienciaGlobal}%</div>
                      <div className="text-xs text-white/80">Eficiencia</div>
                    </div>
                  </div>
                  
                  {/* BARRA DE EFICIENCIA VISUAL */}
                  <div className="w-full bg-white/20 rounded-full h-2 mt-3">
                    <div 
                      className="bg-white h-2 rounded-full transition-all"
                      style={{ width: `${member.eficienciaGlobal}%` }}
                    />
                  </div>
              </div>
              
              <div className="p-5">
                {/* PIPELINE VISUAL - EMBUDO MINI */}
                <div className="mb-5">
                  <div className="text-xs text-[#6C757D] font-medium mb-3 flex items-center gap-2">
                    <TrendingUp size={14} />
                    Pipeline
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#6C757D]">Leads</span>
                      <span className="font-semibold text-[#343A40]">{member.leads}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#6C757D]">Levant.</span>
                      <span className="font-semibold text-[#343A40]">{member.levantamientos}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#6C757D]">Propuestas</span>
                      <span className="font-semibold text-[#343A40]">{member.propuestasEnviadas}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-[#E9ECEF] text-sm">
                      <span className="font-medium text-[#343A40]">Cierres</span>
                      <span className="font-bold text-[#0D47A1] text-base">{member.cierres}</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-[#E9ECEF] text-center">
                    <span className="text-xs text-[#6C757D]">Conversión </span>
                    <span className="text-xs font-bold text-[#0D47A1]">{member.tasaConversion}%</span>
                  </div>
                </div>
                
                {/* PRESUPUESTO VISUAL */}
                <div className="mb-4">
                  <div className="text-xs text-[#6C757D] font-medium mb-2 flex items-center gap-2">
                    <DollarSign size={12} />
                    Presupuesto
                  </div>
                  <div className="flex items-end justify-between mb-2">
                    <div>
                      <div className="text-xs text-[#6C757D]">Real</div>
                      <div className="text-lg font-bold text-[#343A40]">${(member.ventasReales / 1000).toFixed(0)}k</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-[#6C757D]">Meta</div>
                      <div className="text-base font-semibold text-[#6C757D]">${(member.presupuestoMensual / 1000).toFixed(0)}k</div>
                    </div>
                  </div>
                  <div className="relative w-full bg-[#E9ECEF] rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        member.cumplimientoPresupuesto >= 100 
                          ? 'bg-[#0D47A1]' 
                          : 'bg-orange-600'
                      }`}
                      style={{ width: `${Math.min(member.cumplimientoPresupuesto, 100)}%` }}
                    >
                      <div className="h-full flex items-center justify-end pr-2">
                        <span className="text-xs font-bold text-white">{member.cumplimientoPresupuesto}%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* INDICADOR DE ESTADO */}
                <div className="pt-4 border-t border-[#E9ECEF]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#6C757D]">Estado</span>
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${
                      member.cumplimientoPresupuesto >= 100 
                        ? 'bg-green-50 text-green-700 border border-green-200' 
                        : member.cumplimientoPresupuesto >= 90
                        ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                        : 'bg-orange-50 text-orange-700 border border-orange-200'
                    }`}>
                      {member.cumplimientoPresupuesto >= 100 ? '✓ En Meta' : 
                       member.cumplimientoPresupuesto >= 90 ? '⚠ Cerca' : '⚠ Por debajo'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // VISTA: LEVANTAMIENTOS Y PROPUESTAS
  const LevantamientosView = () => {
    // Estados para filtros
    const [mostrarFiltros, setMostrarFiltros] = useState(false);
    const [filtroTipo, setFiltroTipo] = useState('Todos');
    const [filtroStatus, setFiltroStatus] = useState('Todos');
    const [filtroEjecutivo, setFiltroEjecutivo] = useState('Todos');
    const [filtroCliente, setFiltroCliente] = useState('');
    const [filtroReporte, setFiltroReporte] = useState('Todos');

    // Funciones de filtrado
    const getFechaSemana = () => {
      const hoy = new Date('2025-11-11');
      const inicioSemana = new Date(hoy);
      inicioSemana.setDate(hoy.getDate() - hoy.getDay());
      return inicioSemana.toISOString().split('T')[0];
    };

    const getFechaMes = () => {
      const hoy = new Date('2025-11-11');
      return `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}-01`;
    };

    const esEstaSemana = (fecha) => {
      const fechaItem = new Date(fecha);
      const inicioSemana = new Date(getFechaSemana());
      const hoy = new Date('2025-11-11');
      return fechaItem >= inicioSemana && fechaItem <= hoy;
    };

    const esEsteMes = (fecha) => {
      const fechaItem = new Date(fecha);
      const inicioMes = new Date(getFechaMes());
      const hoy = new Date('2025-11-11');
      return fechaItem >= inicioMes && fechaItem <= hoy;
    };

    // Función para aplicar filtros
    const aplicarFiltros = (items) => {
      return items.filter(item => {
        // Filtro por tipo
        if (filtroTipo !== 'Todos' && item.tipo !== filtroTipo) return false;
        
        // Filtro por status
        if (filtroStatus !== 'Todos' && item.status !== filtroStatus) return false;
        
        // Filtro por ejecutivo
        if (filtroEjecutivo !== 'Todos' && item.ejecutivo !== filtroEjecutivo) return false;
        
        // Filtro por cliente (búsqueda)
        if (filtroCliente && !item.cliente.toLowerCase().includes(filtroCliente.toLowerCase())) return false;
        
        // Filtro por reporte
        if (filtroReporte === 'Con Reporte' && !item.tieneReporte) return false;
        if (filtroReporte === 'Sin Reporte' && item.tieneReporte) return false;
        
        return true;
      });
    };

    // Obtener ejecutivos únicos
    const ejecutivosUnicos = [...new Set(levantamientosActivos.map(l => l.ejecutivo))].sort();
    
    // Obtener estados únicos
    const estadosUnicos = [...new Set(levantamientosActivos.map(l => l.status))].sort();

    const levantamientosEstaSemana = aplicarFiltros(levantamientosActivos.filter(l => 
      esEstaSemana(l.fecha) && l.tipo === 'Levantamiento'
    ));
    
    const levantamientosEsteMes = aplicarFiltros(levantamientosActivos.filter(l => 
      esEsteMes(l.fecha) && l.tipo === 'Levantamiento'
    ));

    const completadosSinReporte = aplicarFiltros(levantamientosActivos.filter(l => 
      l.status === 'Completado' && !l.tieneReporte && l.tipo === 'Levantamiento'
    ));

    const levantamientosFiltrados = aplicarFiltros(levantamientosActivos);

    const totalLevantamientos = aplicarFiltros(levantamientosActivos.filter(l => l.tipo === 'Levantamiento')).length;
    const totalPropuestas = aplicarFiltros(levantamientosActivos.filter(l => l.tipo === 'Propuesta')).length;
    const totalValor = aplicarFiltros(levantamientosActivos).reduce((sum, l) => sum + l.valorEstimado, 0);

    // Función para limpiar filtros
    const limpiarFiltros = () => {
      setFiltroTipo('Todos');
      setFiltroStatus('Todos');
      setFiltroEjecutivo('Todos');
      setFiltroCliente('');
      setFiltroReporte('Todos');
    };

    // Contar filtros activos
    const filtrosActivos = [
      filtroTipo !== 'Todos',
      filtroStatus !== 'Todos',
      filtroEjecutivo !== 'Todos',
      filtroCliente !== '',
      filtroReporte !== 'Todos'
    ].filter(Boolean).length;

    const renderTable = (items, showReporte = false) => (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-[#E9ECEF]">
        <table className="w-full">
          <thead className="bg-[#F8F9FA] border-b border-[#E9ECEF]">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#343A40]">Cliente</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#343A40]">Ejecutivo</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#343A40]">Fecha</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#343A40]">Status</th>
              {showReporte && (
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#343A40]">Reporte</th>
              )}
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#343A40]">Volumen Est.</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#343A40]">Valor Est.</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#343A40]">Acción</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={showReporte ? 8 : 7} className="px-6 py-8 text-center text-[#6C757D]">
                  No hay registros en esta categoría
                </td>
              </tr>
            ) : (
              items.map(item => (
                <tr key={item.id} className="border-b border-[#E9ECEF] hover:bg-[#F8F9FA]">
                  <td className="px-6 py-4 text-sm font-semibold text-[#343A40]">{item.cliente}</td>
                  <td className="px-6 py-4 text-sm text-[#6C757D]">{item.ejecutivo}</td>
                  <td className="px-6 py-4 text-sm font-medium text-[#343A40]">{item.fecha}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-md text-xs font-medium ${
                      item.status === 'Completado' ? 'bg-green-50 text-green-700 border border-green-200' :
                      item.status === 'Enviada' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                      item.status === 'En revisión' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' :
                      item.status === 'Agendado' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                      'bg-gray-50 text-gray-700 border border-gray-200'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  {showReporte && (
                    <td className="px-6 py-4 text-sm">
                      {item.tieneReporte ? (
                        <span className="px-3 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                          ✓ Generado
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-md text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200">
                          Pendiente
                        </span>
                      )}
                    </td>
                  )}
                  <td className="px-6 py-4 text-sm font-semibold text-[#1B5E20]">{item.volumenEstimado}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-[#343A40]">
                    ${(item.valorEstimado / 1000).toFixed(0)}k
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button 
                      onClick={() => setSelectedLevantamiento(item)}
                      className="text-[#1B5E20] hover:text-[#2E7D32] font-medium flex items-center gap-1 text-sm"
                    >
                      Ver <ChevronRight size={14} />
            </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );

    return (
      <div className="p-8 bg-[#F8F9FA] min-h-screen">
        <Header title="Levantamientos y Propuestas" subtitle="Generación y seguimiento de oportunidades comerciales" />
        
        {/* MÉTRICAS RESUMEN */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-white rounded-lg p-6 border border-[#E9ECEF] shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="text-sm text-[#6C757D] font-medium">Total Levantamientos</div>
              <ClipboardList className="text-[#1B5E20]" size={20} />
            </div>
            <div className="text-3xl font-semibold text-[#343A40] mb-2">{totalLevantamientos}</div>
            <div className="text-sm text-[#6C757D] font-medium">Activos</div>
          </div>
          
          <div className="bg-white rounded-lg p-6 border border-[#E9ECEF] shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="text-sm text-[#6C757D] font-medium">Total Propuestas</div>
              <FileText className="text-[#1B5E20]" size={20} />
            </div>
            <div className="text-3xl font-semibold text-[#343A40] mb-2">{totalPropuestas}</div>
            <div className="text-sm text-[#6C757D] font-medium">En seguimiento</div>
          </div>
          
          <div className="bg-white rounded-lg p-6 border border-[#E9ECEF] shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="text-sm text-[#6C757D] font-medium">Valor Total Estimado</div>
              <DollarSign className="text-[#1B5E20]" size={20} />
            </div>
            <div className="text-3xl font-semibold text-[#343A40] mb-2">
              ${(totalValor / 1000000).toFixed(1)}M
            </div>
            <div className="text-sm text-[#6C757D] font-medium">Oportunidades</div>
          </div>
          
          <div className="bg-white rounded-lg p-6 border border-[#E9ECEF] shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="text-sm text-[#6C757D] font-medium">Sin Reporte</div>
              <AlertCircle className="text-orange-500" size={20} />
            </div>
            <div className="text-3xl font-semibold text-[#343A40] mb-2">{completadosSinReporte.length}</div>
            <div className="text-sm text-orange-600 font-medium">Requieren atención</div>
          </div>
        </div>

        {/* ACCIONES */}
        <div className="flex justify-between items-center mt-8 mb-6">
          <div className="flex gap-3">
            <button 
              onClick={() => setMostrarFiltros(!mostrarFiltros)}
              className={`flex items-center gap-2 px-4 py-2 border border-[#E9ECEF] rounded-md hover:bg-white font-medium text-sm transition-all ${
                mostrarFiltros || filtrosActivos > 0
                  ? 'bg-[#1B5E20] text-white border-[#1B5E20] hover:bg-[#2E7D32]'
                  : 'text-[#6C757D] hover:text-[#1B5E20]'
              }`}
            >
              <Filter size={16} />
              Filtrar
              {filtrosActivos > 0 && (
                <span className="bg-white text-[#1B5E20] text-xs font-bold px-2 py-0.5 rounded-full">
                  {filtrosActivos}
                </span>
              )}
            </button>
          </div>
          <button 
            onClick={() => setMostrarNuevoLevantamiento(true)}
            className="bg-[#1B5E20] hover:bg-[#1e4a37] text-white px-6 py-2 rounded-md font-medium text-sm shadow-sm hover:shadow-md flex items-center gap-2 transition-all"
          >
            <ClipboardList size={18} />
            Nuevo Levantamiento
          </button>
        </div>
        
        {/* PANEL DE FILTROS */}
        {mostrarFiltros && (
          <div className="mb-6 bg-white rounded-lg border border-[#E9ECEF] shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Filter className="text-[#1B5E20]" size={20} />
                <h3 className="text-lg font-semibold text-[#343A40]">Filtros de Búsqueda</h3>
                {filtrosActivos > 0 && (
                  <span className="text-xs bg-[#1B5E20] text-white px-2 py-1 rounded-md font-medium">
                    {filtrosActivos} activo{filtrosActivos !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
              <button
                onClick={limpiarFiltros}
                className="text-sm text-[#6C757D] hover:text-[#1B5E20] font-medium flex items-center gap-1"
              >
                <RotateCcw size={14} />
                Limpiar filtros
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Filtro por Tipo */}
              <div>
                <label className="block text-xs font-medium text-[#6C757D] mb-2">Tipo</label>
                <select
                  value={filtroTipo}
                  onChange={(e) => setFiltroTipo(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E9ECEF] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent bg-white"
                >
                  <option value="Todos">Todos</option>
                  <option value="Levantamiento">Levantamiento</option>
                  <option value="Propuesta">Propuesta</option>
                </select>
              </div>

              {/* Filtro por Status */}
              <div>
                <label className="block text-xs font-medium text-[#6C757D] mb-2">Estado</label>
                <select
                  value={filtroStatus}
                  onChange={(e) => setFiltroStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E9ECEF] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent bg-white"
                >
                  <option value="Todos">Todos</option>
                  {estadosUnicos.map(estado => (
                    <option key={estado} value={estado}>{estado}</option>
                  ))}
                </select>
              </div>

              {/* Filtro por Ejecutivo */}
              <div>
                <label className="block text-xs font-medium text-[#6C757D] mb-2">Ejecutivo</label>
                <select
                  value={filtroEjecutivo}
                  onChange={(e) => setFiltroEjecutivo(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E9ECEF] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent bg-white"
                >
                  <option value="Todos">Todos</option>
                  {ejecutivosUnicos.map(ejecutivo => (
                    <option key={ejecutivo} value={ejecutivo}>{ejecutivo}</option>
                  ))}
                </select>
              </div>

              {/* Filtro por Cliente (búsqueda) */}
              <div>
                <label className="block text-xs font-medium text-[#6C757D] mb-2">Cliente</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6C757D]" size={16} />
                  <input
                    type="text"
                    value={filtroCliente}
                    onChange={(e) => setFiltroCliente(e.target.value)}
                    placeholder="Buscar cliente..."
                    className="w-full pl-10 pr-3 py-2 border border-[#E9ECEF] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent bg-white"
                  />
                </div>
              </div>

              {/* Filtro por Reporte */}
              <div>
                <label className="block text-xs font-medium text-[#6C757D] mb-2">Reporte</label>
                <select
                  value={filtroReporte}
                  onChange={(e) => setFiltroReporte(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E9ECEF] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent bg-white"
                >
                  <option value="Todos">Todos</option>
                  <option value="Con Reporte">Con Reporte</option>
                  <option value="Sin Reporte">Sin Reporte</option>
                </select>
              </div>
            </div>
          </div>
        )}
        
        {/* LEVANTAMIENTOS ESTA SEMANA */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Calendar className="text-[#1B5E20]" size={24} />
              <h2 className="text-xl font-semibold text-[#343A40]">Levantamientos Esta Semana</h2>
              <span className="px-3 py-1 bg-[#1B5E20] text-white text-xs font-medium rounded-md">
                {levantamientosEstaSemana.length}
              </span>
            </div>
          </div>
          {renderTable(levantamientosEstaSemana)}
        </div>

        {/* LEVANTAMIENTOS ESTE MES */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Calendar className="text-[#1B5E20]" size={24} />
              <h2 className="text-xl font-semibold text-[#343A40]">Levantamientos Este Mes</h2>
              <span className="px-3 py-1 bg-[#2E7D32] text-white text-xs font-medium rounded-md">
                {levantamientosEsteMes.length}
              </span>
            </div>
          </div>
          {renderTable(levantamientosEsteMes)}
        </div>

        {/* COMPLETADOS SIN REPORTE */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="text-orange-500" size={24} />
              <h2 className="text-xl font-semibold text-[#343A40]">Completados Sin Reporte</h2>
              <span className="px-3 py-1 bg-orange-500 text-white text-xs font-medium rounded-md">
                {completadosSinReporte.length}
              </span>
            </div>
          </div>
          {renderTable(completadosSinReporte, true)}
        </div>

        {/* TODOS LOS LEVANTAMIENTOS Y PROPUESTAS */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Eye className="text-[#1B5E20]" size={24} />
              <h2 className="text-xl font-semibold text-[#343A40]">Vista Total - Todos los Registros</h2>
              <span className="px-3 py-1 bg-[#F8F9FA] text-[#6C757D] text-xs font-medium rounded-md border border-[#E9ECEF]">
                {levantamientosFiltrados.length} registro{levantamientosFiltrados.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-[#E9ECEF]">
          <table className="w-full">
              <thead className="bg-[#F8F9FA] border-b border-[#E9ECEF]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#343A40]">Cliente</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#343A40]">Tipo</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#343A40]">Ejecutivo</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#343A40]">Fecha</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#343A40]">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#343A40]">Volumen Est.</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#343A40]">Valor Est.</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#343A40]">Acción</th>
              </tr>
            </thead>
            <tbody>
              {levantamientosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-[#6C757D]">
                    No se encontraron registros con los filtros aplicados
                  </td>
                </tr>
              ) : (
                levantamientosFiltrados.map(item => (
                  <tr key={item.id} className="border-b border-[#E9ECEF] hover:bg-[#F8F9FA]">
                    <td className="px-6 py-4 text-sm font-semibold text-[#343A40]">{item.cliente}</td>
                  <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-md text-xs font-medium ${
                      item.tipo === 'Levantamiento' 
                          ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                          : 'bg-purple-50 text-purple-700 border border-purple-200'
                    }`}>
                      {item.tipo}
                    </span>
                  </td>
                    <td className="px-6 py-4 text-sm text-[#6C757D]">{item.ejecutivo}</td>
                    <td className="px-6 py-4 text-sm font-medium text-[#343A40]">{item.fecha}</td>
                  <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-md text-xs font-medium ${
                        item.status === 'Completado' ? 'bg-green-50 text-green-700 border border-green-200' :
                        item.status === 'Enviada' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                        item.status === 'En revisión' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' :
                        item.status === 'Agendado' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                        'bg-gray-50 text-gray-700 border border-gray-200'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                    <td className="px-6 py-4 text-sm font-semibold text-[#1B5E20]">{item.volumenEstimado}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-[#343A40]">
                    ${(item.valorEstimado / 1000).toFixed(0)}k
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button 
                      onClick={() => setSelectedLevantamiento(item)}
                        className="text-[#1B5E20] hover:text-[#2E7D32] font-medium flex items-center gap-1 text-sm"
                    >
                        Ver <ChevronRight size={14} />
                    </button>
                  </td>
                </tr>
                ))
              )}
            </tbody>
          </table>
          </div>
        </div>
        
        {/* SIGUIENTE PASO REQUERIDO */}
        <div className="bg-white border border-[#E9ECEF] rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle size={20} className="text-[#1B5E20]" />
            <h3 className="text-lg font-semibold text-[#343A40]">Siguiente Paso Requerido</h3>
          </div>
          <div className="space-y-2">
            {levantamientosFiltrados.filter(l => l.siguientePaso).map(item => (
              <div key={item.id} className="flex items-center justify-between bg-[#F8F9FA] p-4 rounded-md border border-[#E9ECEF]">
                <div>
                  <span className="font-semibold text-[#343A40]">{item.cliente}</span>
                  <span className="text-[#6C757D] mx-2">→</span>
                  <span className="text-sm text-[#6C757D]">{item.siguientePaso}</span>
                </div>
                <span className="text-xs font-medium text-[#6C757D]">{item.ejecutivo}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
  };

  // VISTA: REPOSITORIO DE DOCUMENTOS
  const DocumentosView = () => {
    const getColorStatus = (status) => {
      if (status === 'Vigente') return 'bg-green-100 text-green-700 border-green-200';
      if (status === 'Por Vencer') return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      return 'bg-red-100 text-red-700 border-red-200';
    };

    const getIconStatus = (status) => {
      if (status === 'Vigente') return <CheckSquare size={16} className="text-green-600" />;
      if (status === 'Por Vencer') return <AlertCircle size={16} className="text-yellow-600" />;
      return <AlertCircle size={16} className="text-red-600" />;
    };

    const documentosFiltrados = documentos.filter(doc => {
      if (filtroDocumentos.tipo && doc.tipo !== filtroDocumentos.tipo) return false;
      if (filtroDocumentos.categoria && doc.categoria !== filtroDocumentos.categoria) return false;
      if (filtroDocumentos.status && doc.status !== filtroDocumentos.status) return false;
      return true;
    });

    return (
      <div className="p-8 bg-[#F8F9FA] min-h-screen">
        <Header title="Repositorio de Documentos" subtitle="Gestión centralizada de permisos, licencias y certificaciones" />

        {/* KPIs DE DOCUMENTOS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-white rounded-lg p-6 border border-[#E9ECEF] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-semibold text-[#6C757D]">Total Documentos</div>
              <FileText className="text-[#1B5E20]" size={24} />
            </div>
            <div className="text-3xl font-bold text-[#343A40]">{documentos.length}</div>
          </div>

          <div className="bg-green-50 rounded-lg p-6 border border-green-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-semibold text-green-700">Vigentes</div>
              <CheckSquare className="text-green-600" size={24} />
            </div>
            <div className="text-3xl font-bold text-green-700">
              {documentos.filter(d => d.status === 'Vigente').length}
            </div>
          </div>

          <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-semibold text-yellow-700">Por Vencer</div>
              <AlertCircle className="text-yellow-600" size={24} />
            </div>
            <div className="text-3xl font-bold text-yellow-700">
              {documentos.filter(d => d.status === 'Por Vencer').length}
            </div>
          </div>

          <div className="bg-red-50 rounded-lg p-6 border border-red-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-semibold text-red-700">Vencidos</div>
              <AlertCircle className="text-red-600" size={24} />
            </div>
            <div className="text-3xl font-bold text-red-700">
              {documentos.filter(d => d.status === 'Vencido').length}
            </div>
          </div>
        </div>

        {/* FILTROS Y ACCIONES */}
        <div className="mt-8 bg-white rounded-lg border border-[#E9ECEF] shadow-sm p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4 flex-wrap">
              <select
                value={filtroDocumentos.tipo}
                onChange={(e) => setFiltroDocumentos({ ...filtroDocumentos, tipo: e.target.value })}
                className="px-4 py-2 border border-[#E9ECEF] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
              >
                <option value="">Todos los tipos</option>
                {TIPOS_DOCUMENTO.map(tipo => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>

              <select
                value={filtroDocumentos.categoria}
                onChange={(e) => setFiltroDocumentos({ ...filtroDocumentos, categoria: e.target.value })}
                className="px-4 py-2 border border-[#E9ECEF] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
              >
                <option value="">Todas las categorías</option>
                {CATEGORIAS_DOCUMENTO.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <select
                value={filtroDocumentos.status}
                onChange={(e) => setFiltroDocumentos({ ...filtroDocumentos, status: e.target.value })}
                className="px-4 py-2 border border-[#E9ECEF] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
              >
                <option value="">Todos los estados</option>
                <option value="Vigente">Vigente</option>
                <option value="Por Vencer">Por Vencer</option>
                <option value="Vencido">Vencido</option>
              </select>

              {(filtroDocumentos.tipo || filtroDocumentos.categoria || filtroDocumentos.status) && (
                <button
                  onClick={() => setFiltroDocumentos({ tipo: '', categoria: '', status: '' })}
                  className="text-sm text-[#6C757D] hover:text-[#1B5E20] flex items-center gap-1"
                >
                  <RotateCcw size={14} />
                  Limpiar filtros
                </button>
              )}
            </div>

            <button
              onClick={() => setMostrarNuevoDocumento(true)}
              className="bg-[#1B5E20] hover:bg-[#2E7D32] text-white px-6 py-2 rounded-lg font-medium text-sm flex items-center gap-2"
            >
              <FileText size={18} />
              Nuevo Documento
            </button>
          </div>
        </div>

        {/* GRID DE DOCUMENTOS */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documentosFiltrados.map(doc => {
            const hoy = new Date();
            const vencimiento = new Date(doc.fechaVencimiento);
            const diasRestantes = Math.floor((vencimiento - hoy) / (1000 * 60 * 60 * 24));

            return (
              <div key={doc.id} className="bg-white rounded-lg border border-[#E9ECEF] shadow-sm hover:shadow-md transition-all">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-[#343A40] mb-2">{doc.nombre}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs bg-[#F8F9FA] text-[#6C757D] px-2 py-1 rounded border border-[#E9ECEF]">
                          {doc.tipo}
                        </span>
                        <span className="text-xs bg-[#F8F9FA] text-[#6C757D] px-2 py-1 rounded border border-[#E9ECEF]">
                          {doc.categoria}
                        </span>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full border text-xs font-semibold ${getColorStatus(doc.status)}`}>
                      {doc.status}
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-[#6C757D]">Emisión:</span>
                      <span className="font-medium text-[#343A40]">
                        {new Date(doc.fechaEmision).toLocaleDateString('es-MX')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#6C757D]">Vencimiento:</span>
                      <span className="font-medium text-[#343A40]">
                        {new Date(doc.fechaVencimiento).toLocaleDateString('es-MX')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#6C757D]">Días restantes:</span>
                      <span className={`font-bold ${
                        diasRestantes < 0 ? 'text-red-600' :
                        diasRestantes <= 30 ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>
                        {diasRestantes < 0 ? `Vencido hace ${Math.abs(diasRestantes)} días` : `${diasRestantes} días`}
                      </span>
                    </div>
                  </div>

                  {doc.notas && (
                    <div className="mt-4 p-3 bg-[#F8F9FA] rounded-lg border border-[#E9ECEF]">
                      <div className="text-xs text-[#6C757D] font-medium mb-1">Notas:</div>
                      <div className="text-xs text-[#343A40]">{doc.notas}</div>
                    </div>
                  )}

                  <div className="mt-4 flex items-center gap-2">
                    <button className="flex-1 bg-[#F8F9FA] hover:bg-[#E9ECEF] text-[#343A40] px-4 py-2 rounded-lg font-medium text-sm flex items-center justify-center gap-2">
                      <Eye size={16} />
                      Ver
                    </button>
                    <button className="flex-1 bg-[#1B5E20] hover:bg-[#2E7D32] text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center justify-center gap-2">
                      <Download size={16} />
                      Descargar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {documentosFiltrados.length === 0 && (
          <div className="mt-8 bg-white rounded-lg border border-[#E9ECEF] shadow-sm p-12 text-center">
            <FileText size={48} className="mx-auto mb-4 text-[#6C757D] opacity-50" />
            <p className="text-[#6C757D]">No se encontraron documentos con los filtros seleccionados</p>
          </div>
        )}
      </div>
    );
  };

  // VISTA: REPORTES AUTOMÁTICOS A CLIENTES
  const ReportesAutomaticosView = () => (
    <div className="p-8 bg-[#F8F9FA] min-h-screen">
      <Header title="Reportes de Trazabilidad entregados" subtitle="Envío automático y conciliación de RME y servicios" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white rounded-lg p-6 border border-[#E9ECEF] shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <CheckSquare className="text-[#1B5E20]" size={24} />
            <div>
              <div className="text-2xl font-semibold text-[#343A40]">28</div>
              <div className="text-sm font-medium text-[#6C757D]">Reportes Enviados</div>
            </div>
          </div>
          <div className="text-xs text-[#6C757D] font-medium">Noviembre 2025</div>
        </div>
        
        <div className="bg-white rounded-lg p-6 border border-[#E9ECEF] shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="text-[#1B5E20]" size={24} />
            <div>
              <div className="text-2xl font-semibold text-[#343A40]">3</div>
              <div className="text-sm font-medium text-[#6C757D]">Pendientes</div>
            </div>
          </div>
          <div className="text-xs text-[#6C757D] font-medium">Programados: 1 Dic</div>
        </div>
        
        <div className="bg-white rounded-lg p-6 border border-[#E9ECEF] shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Eye className="text-[#1B5E20]" size={24} />
            <div>
              <div className="text-2xl font-semibold text-[#343A40]">87%</div>
              <div className="text-sm font-medium text-[#6C757D]">Tasa Apertura</div>
            </div>
          </div>
          <div className="text-xs text-[#6C757D] font-medium">Promedio mensual</div>
        </div>
      </div>
      
      <div className="mt-8">
        <div className="flex items-center gap-3 mb-6">
          <Send className="text-[#1B5E20]" size={24} />
          <h2 className="text-xl font-semibold text-[#343A40]">Clientes con Reportes de Trazabilidad entregados</h2>
        </div>
        
        <div className="space-y-4">
          {clientesConReportes.map(client => (
            <div 
              key={client.id}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all border border-[#E9ECEF] cursor-pointer"
              onClick={() => setSelectedClient(client)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl">{client.logo}</div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#343A40]">{client.name}</h3>
                      <p className="text-sm text-[#6C757D] font-medium">{client.sucursales} sucursales • {client.contacto}</p>
                    </div>
                    <div className="ml-auto">
                      <span className={`px-3 py-1 rounded-md text-xs font-medium ${
                        client.statusReporte === 'Enviado' 
                          ? 'bg-green-50 text-green-700 border border-green-200' 
                          : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                      }`}>
                        {client.statusReporte}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="bg-[#F8F9FA] rounded-lg p-4 border border-[#E9ECEF]">
                      <div className="text-xs text-[#6C757D] font-medium mb-1">RME Gestionado</div>
                      <div className="text-xl font-semibold text-[#343A40]">{client.rmeGestionado} t</div>
                    </div>
                    <div className="bg-[#F8F9FA] rounded-lg p-4 border border-[#E9ECEF]">
                      <div className="text-xs text-[#6C757D] font-medium mb-1">Valorización</div>
                      <div className="text-xl font-semibold text-[#343A40]">{client.valoracionLograda}%</div>
                    </div>
                    <div className="bg-[#F8F9FA] rounded-lg p-4 border border-[#E9ECEF]">
                      <div className="text-xs text-[#6C757D] font-medium mb-1">Ingresos Mes</div>
                      <div className="text-xl font-semibold text-[#343A40]">
                        ${(client.ingresosMes / 1000).toFixed(0)}k
                      </div>
                    </div>
                    <div className="bg-[#F8F9FA] rounded-lg p-4 border border-[#E9ECEF]">
                      <div className="text-xs text-[#6C757D] font-medium mb-1">Próximo Reporte</div>
                      <div className="text-base font-semibold text-[#343A40]">{client.proximoReporte}</div>
                    </div>
                  </div>
                  
                  <div className="bg-[#F8F9FA] rounded-lg p-4 border border-[#E9ECEF]">
                    <div className="text-xs text-[#6C757D] font-medium mb-2">Servicios Contratados:</div>
                    <div className="flex flex-wrap gap-2">
                      {client.serviciosContratados.map((servicio, idx) => (
                        <span key={idx} className="px-3 py-1 bg-white border border-[#E9ECEF] rounded-md text-xs font-medium text-[#343A40]">
                          {servicio}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mt-4">
                    <button className="flex-1 bg-[#1B5E20] hover:bg-[#1e4a37] text-white py-2 rounded-md font-medium text-sm shadow-sm hover:shadow-md flex items-center justify-center gap-2">
                      <Eye size={16} />
                      Ver Reporte
                    </button>
                    <button className="flex-1 bg-[#2E7D32] hover:bg-[#40916C] text-white py-2 rounded-md font-medium text-sm shadow-sm hover:shadow-md flex items-center justify-center gap-2">
                      <Send size={16} />
                      Enviar Ahora
                    </button>
                    <button className="flex-1 border border-[#1B5E20] text-[#1B5E20] py-2 rounded-md font-medium text-sm hover:bg-[#F8F9FA] flex items-center justify-center gap-2">
                      <Download size={16} />
                      Descargar PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8 bg-white border border-[#E9ECEF] rounded-lg p-8 shadow-sm">
        <h3 className="text-xl font-semibold text-[#343A40] mb-6 flex items-center gap-3">
          <CheckSquare size={24} />
          Conciliación Automática de Servicios y RME
        </h3>
        <p className="text-[#6C757D] mb-6 text-sm leading-relaxed">
          Cada reporte mensual incluye automáticamente la conciliación de Residuos de Manejo Especial (RME) gestionados 
          vs servicios contratados, facilitando la validación y facturación mensual.
        </p>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[#F8F9FA] rounded-lg p-6 text-center border border-[#E9ECEF]">
            <div className="text-3xl mb-2">📋</div>
            <div className="text-xl font-semibold text-[#343A40]">100%</div>
            <div className="text-xs text-[#6C757D] font-medium mt-1">Automatizado</div>
          </div>
          <div className="bg-[#F8F9FA] rounded-lg p-6 text-center border border-[#E9ECEF]">
            <div className="text-3xl mb-2">⏱️</div>
            <div className="text-xl font-semibold text-[#343A40]">15 min</div>
            <div className="text-xs text-[#6C757D] font-medium mt-1">Tiempo ahorrado</div>
          </div>
          <div className="bg-[#F8F9FA] rounded-lg p-6 text-center border border-[#E9ECEF]">
            <div className="text-3xl mb-2">✅</div>
            <div className="text-xl font-semibold text-[#343A40]">0</div>
            <div className="text-xs text-[#6C757D] font-medium mt-1">Errores manuales</div>
          </div>
        </div>
      </div>
    </div>
  );

  // VISTA: TRAZABILIDAD
  const TrazabilidadView = () => {
    const [clienteSeleccionado, setClienteSeleccionado] = useState(clientesConReportes[0]?.id || null);
    const [datosEditables, setDatosEditables] = useState(
      clienteSeleccionado ? trazabilidadPorCliente[clienteSeleccionado] : datosTrazabilidad
    );
    const [categoriasAbiertas, setCategoriasAbiertas] = useState({
      reciclaje: true,
      composta: false,
      reuso: false,
      rellenoSanitario: false
    });
    const [mostrarDropdownReportes, setMostrarDropdownReportes] = useState(false);
    const [mostrarModalInfo, setMostrarModalInfo] = useState(false);
    const [selectedNodeSankey, setSelectedNodeSankey] = useState(null);
    const sankeyRef = useRef(null);

    // Obtener cliente actual
    const clienteActual = clientesConReportes.find(c => c.id === clienteSeleccionado);

    // Actualizar datos cuando cambia el cliente
    // Cerrar dropdown cuando cambia el cliente
    useEffect(() => {
      setMostrarDropdownReportes(false);
    }, [clienteSeleccionado]);

    // Cerrar dropdown al hacer clic fuera
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (mostrarDropdownReportes && !event.target.closest('.dropdown-reportes')) {
          setMostrarDropdownReportes(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [mostrarDropdownReportes]);

    useEffect(() => {
      if (clienteSeleccionado && trazabilidadPorCliente[clienteSeleccionado]) {
        setDatosEditables(JSON.parse(JSON.stringify(trazabilidadPorCliente[clienteSeleccionado])));
      } else {
        setDatosEditables(JSON.parse(JSON.stringify(datosTrazabilidad)));
      }
    }, [clienteSeleccionado]);

    // Generar datos Sankey para el cliente actual
    const datosSankey = clienteActual && datosEditables 
      ? generarDatosSankeyCliente(clienteActual, datosEditables)
      : null;

    // Calcular KPIs
    const calcularTotal = (categoria) => {
      return datosEditables[categoria].reduce((total, item) => {
        const suma = meses.reduce((sum, mes) => sum + (item[mes] || 0), 0);
        return total + suma;
      }, 0);
    };

    const toneladasCirculares = calcularTotal('reciclaje') + calcularTotal('composta') + calcularTotal('reuso');
    const rellenoSanitario = calcularTotal('rellenoSanitario');
    const totalGenerado = toneladasCirculares + rellenoSanitario;
    const porcentajeDesviacion = totalGenerado > 0 ? ((toneladasCirculares / totalGenerado) * 100).toFixed(1) : 0;

    const toggleCategoria = (categoria) => {
      setCategoriasAbiertas(prev => ({
        ...prev,
        [categoria]: !prev[categoria]
      }));
    };

    const actualizarValor = (categoria, indexMaterial, mes, valor) => {
      const nuevoValor = parseFloat(valor) || 0;
      setDatosEditables(prev => {
        const nuevaCategoria = [...prev[categoria]];
        nuevaCategoria[indexMaterial] = {
          ...nuevaCategoria[indexMaterial],
          [mes]: nuevoValor
        };
        return {
          ...prev,
          [categoria]: nuevaCategoria
        };
      });
    };

    const calcularTotalMaterial = (material) => {
      return meses.reduce((sum, mes) => sum + (material[mes] || 0), 0);
    };

    const guardarCambios = () => {
      // Aquí se guardarían los cambios en el backend
      if (clienteSeleccionado) {
        trazabilidadPorCliente[clienteSeleccionado] = datosEditables;
      }
      alert('Cambios guardados exitosamente');
    };

    const descargarReporte = (certificacion, formato) => {
      const cliente = clientesConReportes.find(c => c.id === clienteSeleccionado);
      const nombreCliente = cliente ? cliente.name : 'General';
      alert(`Descargando reporte ${certificacion} de ${nombreCliente} en formato ${formato.toUpperCase()}`);
      setMostrarDropdownReportes(false);
      // Aquí se implementaría la descarga real del reporte específico de la certificación
    };

    const categoriasConfig = [
      { key: 'reciclaje', label: 'RECICLAJE', color: 'bg-green-50 border-green-200' },
      { key: 'composta', label: 'COMPOSTA', color: 'bg-orange-50 border-orange-200' },
      { key: 'reuso', label: 'REUSO', color: 'bg-blue-50 border-blue-200' },
      { key: 'rellenoSanitario', label: 'RELLENO SANITARIO', color: 'bg-red-50 border-red-200' }
    ];

    return (
      <div className="p-8 bg-[#F8F9FA] min-h-screen">
        <Header title="Trazabilidad de Residuos" subtitle="Seguimiento y gestión de residuos por destino final" />
        
        {/* BARRA SUPERIOR: CLIENTE Y ACCIONES */}
        <div className="mt-8 bg-white rounded-lg p-5 border border-[#E9ECEF] shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4 flex-1 min-w-[300px]">
              <label className="text-sm font-medium text-[#343A40] whitespace-nowrap">Cliente:</label>
              <select
                value={clienteSeleccionado || ''}
                onChange={(e) => setClienteSeleccionado(parseInt(e.target.value))}
                className="px-4 py-2 border border-[#E9ECEF] rounded-md text-sm font-medium text-[#343A40] focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent flex-1 max-w-[300px]"
              >
                <option value="">Vista General</option>
                {clientesConReportes.map(cliente => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.logo} {cliente.name}
                  </option>
                ))}
              </select>
              {clienteActual && (
                <div className="flex items-center gap-2 text-sm text-[#6C757D]">
                  <span className="text-xl">{clienteActual.logo}</span>
                  <span>{clienteActual.contacto}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setClienteSeleccionadoVista(clienteSeleccionado);
                  setVistaCliente(true);
                }}
                className="bg-[#0D47A1] hover:bg-[#0052A3] text-white px-4 py-2 rounded-md font-medium text-sm shadow-sm hover:shadow-md flex items-center gap-2 transition-all"
                title="Ver como Cliente"
              >
                <Eye size={16} />
                Vista Cliente
              </button>
              
              {/* BOTÓN REPORTES CON DROPDOWN */}
              <div className="relative dropdown-reportes">
                <button
                  onClick={() => setMostrarDropdownReportes(!mostrarDropdownReportes)}
                  className="bg-[#1B5E20] hover:bg-[#2E7D32] text-white px-4 py-2 rounded-md font-medium text-sm shadow-sm hover:shadow-md flex items-center gap-2 transition-all"
                  title="Descargar Reportes por Certificación"
                >
                  <FileText size={16} />
                  REPORTES
                  <ChevronDown size={14} className={mostrarDropdownReportes ? 'transform rotate-180' : ''} />
                </button>
                
                {/* DROPDOWN MENU */}
                {mostrarDropdownReportes && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-[#E9ECEF] z-50 overflow-hidden">
                    <div className="p-3 border-b border-[#E9ECEF] bg-[#F8F9FA]">
                      <h3 className="text-sm font-semibold text-[#343A40]">Reportes por Certificación</h3>
                      <p className="text-xs text-[#6C757D] mt-1">Seleccione una certificación y formato</p>
                    </div>
                    {clienteActual && clienteActual.requisitosReporte && clienteActual.requisitosReporte.length > 0 ? (
                      <div className="max-h-96 overflow-y-auto">
                        {clienteActual.requisitosReporte.map((certificacion, idx) => (
                          <div key={idx} className="border-b border-[#E9ECEF] last:border-b-0">
                            <div className="px-4 py-3 bg-[#F8F9FA]">
                              <div className="flex items-center gap-2">
                                <FileText size={16} className="text-[#1B5E20]" />
                                <span className="text-sm font-semibold text-[#343A40]">{certificacion}</span>
                              </div>
                            </div>
                            <div className="px-4 py-2 space-y-1">
                              <button
                                onClick={() => descargarReporte(certificacion, 'pdf')}
                                className="w-full text-left px-3 py-2 text-xs hover:bg-[#F8F9FA] rounded-md flex items-center gap-2 text-[#6C757D] hover:text-[#343A40] transition-colors"
                              >
                                <FileText size={14} className="text-red-600" />
                                <span>PDF</span>
                              </button>
                              <button
                                onClick={() => descargarReporte(certificacion, 'excel')}
                                className="w-full text-left px-3 py-2 text-xs hover:bg-[#F8F9FA] rounded-md flex items-center gap-2 text-[#6C757D] hover:text-[#343A40] transition-colors"
                              >
                                <Download size={14} className="text-green-600" />
                                <span>Excel</span>
                              </button>
                              <button
                                onClick={() => descargarReporte(certificacion, 'csv')}
                                className="w-full text-left px-3 py-2 text-xs hover:bg-[#F8F9FA] rounded-md flex items-center gap-2 text-[#6C757D] hover:text-[#343A40] transition-colors"
                              >
                                <Download size={14} className="text-blue-600" />
                                <span>CSV</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center text-sm text-[#6C757D]">
                        No hay certificaciones configuradas para este cliente
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* RESUMEN OPERATIVO DEL CLIENTE - VISTA SIMPLIFICADA */}
        {clienteActual && (
          <div className="mt-6 bg-white rounded-lg border border-[#E9ECEF] shadow-sm">
            <div className="p-4 flex items-center justify-between border-b border-[#E9ECEF]">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{clienteActual.logo}</div>
                <div>
                  <h3 className="text-base font-semibold text-[#343A40]">{clienteActual.name}</h3>
                  <p className="text-xs text-[#6C757D]">{clienteActual.sucursales} sucursales • {clienteActual.contacto}</p>
                </div>
              </div>
              <button
                onClick={() => setMostrarModalInfo(true)}
                className="text-xs text-[#1B5E20] hover:text-[#2E7D32] font-medium flex items-center gap-1.5 px-3 py-1.5 hover:bg-[#F8F9FA] rounded-md"
              >
                <Eye size={14} />
                Ver Detalles
              </button>
            </div>
            
            <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-[#F8F9FA] rounded-lg border border-[#E9ECEF]">
                <div className="text-xs text-[#6C757D] mb-1">Promedio Mensual</div>
                <div className="text-lg font-semibold text-[#343A40]">{clienteActual.promedioMensual}</div>
                <div className="text-xs text-[#6C757D]">ton/mes</div>
              </div>
              
              <div className="text-center p-3 bg-[#F8F9FA] rounded-lg border border-[#E9ECEF]">
                <div className="text-xs text-[#6C757D] mb-1">Tasa Valorización</div>
                <div className="text-lg font-semibold text-[#1B5E20]">{clienteActual.tasaValorizacion}%</div>
                <div className="text-xs text-[#6C757D]">desviación</div>
              </div>
              
              <div className="text-center p-3 bg-[#F8F9FA] rounded-lg border border-[#E9ECEF]">
                <div className="text-xs text-[#6C757D] mb-1">Recolección</div>
                <div className="text-sm font-semibold text-[#343A40]">{clienteActual.frecuenciaRecoleccion}</div>
              </div>
              
              <div className="text-center p-3 bg-[#F8F9FA] rounded-lg border border-[#E9ECEF]">
                <div className="text-xs text-[#6C757D] mb-1">Operando desde</div>
                <div className="text-sm font-semibold text-[#343A40]">
                  {Math.floor((new Date() - new Date(clienteActual.fechaInicioOperacion)) / (1000 * 60 * 60 * 24 * 30))} meses
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* KPIs - Más compactos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white rounded-lg p-5 border border-[#E9ECEF] shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Recycle className="text-[#1B5E20]" size={18} />
              <span className="text-xs text-[#6C757D]">Circulares</span>
            </div>
            <div className="text-2xl font-semibold text-[#343A40]">{toneladasCirculares.toFixed(1)}</div>
            <div className="text-xs text-[#6C757D] mt-1">ton</div>
          </div>
          
          <div className="bg-white rounded-lg p-5 border border-[#E9ECEF] shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Trash2 className="text-red-500" size={18} />
              <span className="text-xs text-[#6C757D]">Relleno</span>
            </div>
            <div className="text-2xl font-semibold text-[#343A40]">{rellenoSanitario.toFixed(1)}</div>
            <div className="text-xs text-[#6C757D] mt-1">ton</div>
          </div>
          
          <div className="bg-white rounded-lg p-5 border border-[#E9ECEF] shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="text-blue-500" size={18} />
              <span className="text-xs text-[#6C757D]">Total</span>
            </div>
            <div className="text-2xl font-semibold text-[#343A40]">{totalGenerado.toFixed(1)}</div>
            <div className="text-xs text-[#6C757D] mt-1">ton</div>
          </div>
          
          <div className="bg-white rounded-lg p-5 border border-[#E9ECEF] shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="text-[#1B5E20]" size={18} />
              <span className="text-xs text-[#6C757D]">Desviación</span>
            </div>
            <div className="text-2xl font-semibold text-[#343A40]">{porcentajeDesviacion}%</div>
            <div className="text-xs text-[#6C757D] mt-1">del relleno</div>
          </div>
        </div>

        {/* DIAGRAMA SANKEY - FLUJO DE MATERIALES */}
        {clienteActual && !datosSankey && (
          <div className="mt-6 bg-white rounded-lg border border-[#E9ECEF] shadow-sm p-8 text-center">
            <Recycle className="mx-auto text-[#6C757D] mb-4" size={48} />
            <h3 className="text-lg font-semibold text-[#343A40] mb-2">No hay datos de trazabilidad</h3>
            <p className="text-sm text-[#6C757D]">Agrega datos en la tabla de trazabilidad para visualizar el flujo de materiales.</p>
          </div>
        )}
        {clienteActual && datosSankey && (
          <div className="mt-6 bg-white rounded-lg border border-[#E9ECEF] shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-semibold text-[#343A40] mb-1">Flujo de Materiales</h3>
                <p className="text-xs text-[#6C757D]">Trazabilidad completa de {clienteActual.name}</p>
              </div>
              <div className="flex items-center gap-2">
                <select 
                  value={selectedNodeSankey || ''} 
                  onChange={(e) => setSelectedNodeSankey(e.target.value || null)}
                  className="px-3 py-1.5 border border-[#E9ECEF] rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent"
                >
                  <option value="">Todos los nodos</option>
                  {datosSankey.nodes.map(node => (
                    <option key={node.id} value={node.id}>{node.id}</option>
                  ))}
                </select>
                {selectedNodeSankey && (
                  <button
                    onClick={() => setSelectedNodeSankey(null)}
                    className="p-1.5 hover:bg-[#F8F9FA] rounded-md"
                    title="Limpiar filtro"
                  >
                    <RotateCcw size={14} className="text-[#6C757D]" />
                  </button>
                )}
                <button
                  onClick={async () => {
                    if (!sankeyRef.current) return;
                    try {
                      const canvas = await html2canvas(sankeyRef.current, { scale: 2, backgroundColor: '#ffffff' });
                      const link = document.createElement('a');
                      link.download = `flujo-materiales-${clienteActual.name.toLowerCase().replace(/\s+/g, '-')}.png`;
                      link.href = canvas.toDataURL();
                      link.click();
                    } catch (error) {
                      console.error('Error exporting PNG:', error);
                    }
                  }}
                  className="px-3 py-1.5 bg-[#1B5E20] hover:bg-[#1e4a37] text-white rounded-md text-xs font-medium flex items-center gap-1.5"
                >
                  <FileImage size={14} />
                  PNG
                </button>
              </div>
            </div>

            <div ref={sankeyRef} className="h-[500px] bg-white rounded-lg border border-[#E9ECEF]">
              {(() => {
                // Filtrar datos si hay un nodo seleccionado
                let filteredNodes = datosSankey.nodes;
                let filteredLinks = datosSankey.links;
                
                if (selectedNodeSankey) {
                  const relevantNodeIds = new Set([selectedNodeSankey]);
                  const relevantLinks = datosSankey.links.filter(l => 
                    l.source === selectedNodeSankey || l.target === selectedNodeSankey
                  );
                  
                  relevantLinks.forEach(link => {
                    relevantNodeIds.add(link.source);
                    relevantNodeIds.add(link.target);
                  });
                  
                  filteredNodes = datosSankey.nodes.filter(n => relevantNodeIds.has(n.id));
                  filteredLinks = relevantLinks;
                }
                
                return (
                  <ResponsiveSankey
                    data={{
                      nodes: filteredNodes,
                      links: filteredLinks
                    }}
                    margin={{ top: 20, right: 200, bottom: 20, left: 200 }}
                    align="justify"
                    colors={(node) => {
                      const nodeData = filteredNodes.find(n => n.id === node.id);
                      return nodeData?.nodeColor || '#64748b';
                    }}
                    nodeOpacity={1}
                    nodeHoverOpacity={0.8}
                    nodeThickness={18}
                    nodeSpacing={10}
                    nodeBorderWidth={0}
                    linkOpacity={0.5}
                    linkHoverOpacity={0.8}
                    linkContract={0}
                    enableLinkGradient={true}
                    labelPosition="outside"
                    labelOrientation="horizontal"
                    labelPadding={20}
                    labelTextColor="#374151"
                    labelWrap={true}
                    animate={true}
                    motionConfig="gentle"
                    nodeTooltip={({ node }) => {
                      const nodeData = filteredNodes.find(n => n.id === node.id);
                      const nodeIdParts = node.id.split(' (');
                      const nombreDestino = nodeIdParts[0];
                      const registroAmbiental = nodeData?.registroAmbiental || (nodeIdParts[1] ? nodeIdParts[1].replace(')', '') : '');
                      return (
                        <div className="bg-[#343A40] text-white p-2 rounded-md text-xs shadow-lg border border-[#1B5E20]">
                          <div className="font-semibold">{nombreDestino}</div>
                          {registroAmbiental && (
                            <div className="text-[#1B5E20] font-medium mt-1">Registro: {registroAmbiental}</div>
                          )}
                          {node.value && (
                            <div className="text-xs mt-1">
                              <div>Volumen total: {node.value.toFixed(1)} ton</div>
                            </div>
                          )}
                        </div>
                      );
                    }}
                    linkTooltip={({ link }) => {
                      const percentage = datosSankey.totalGenerado > 0 
                        ? ((link.value / datosSankey.totalGenerado) * 100).toFixed(1) 
                        : '0';
                      return (
                        <div className="bg-[#343A40] text-white p-2 rounded-md text-xs shadow-lg border border-[#1B5E20]">
                          <div className="font-semibold">{link.source.id} → {link.target.id}</div>
                          <div className="mt-1">Volumen: {link.value.toFixed(1)} ton/mes</div>
                          <div>Porcentaje: {percentage}%</div>
                        </div>
                      );
                    }}
                    onClick={(data) => {
                      if (data.id) {
                        setSelectedNodeSankey(selectedNodeSankey === data.id ? null : data.id);
                      }
                    }}
                  />
                );
              })()}
            </div>
            
            {selectedNodeSankey && (
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center gap-2 text-xs">
                  <Filter size={14} className="text-blue-600" />
                  <span className="font-medium text-blue-800">
                    Filtrando por: {selectedNodeSankey}
                  </span>
                  <button
                    onClick={() => setSelectedNodeSankey(null)}
                    className="ml-auto text-blue-600 hover:text-blue-800 text-xs font-medium"
                  >
                    Limpiar filtro
                  </button>
                </div>
              </div>
            )}

            {/* Métricas del Flujo */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-[#F8F9FA] rounded-lg p-4 border border-[#E9ECEF] text-center">
                <div className="text-xs text-[#6C757D] mb-1">Total Generado</div>
                <div className="text-lg font-semibold text-[#343A40]">{datosSankey.totalGenerado.toFixed(1)}</div>
                <div className="text-xs text-[#6C757D]">ton/mes</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200 text-center">
                <div className="text-xs text-[#6C757D] mb-1">Composta</div>
                <div className="text-lg font-semibold text-[#1B5E20]">{datosSankey.totalComposta.toFixed(1)}</div>
                <div className="text-xs text-[#6C757D]">ton/mes</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 text-center">
                <div className="text-xs text-[#6C757D] mb-1">Reciclaje</div>
                <div className="text-lg font-semibold text-[#1B4965]">{datosSankey.totalReciclaje.toFixed(1)}</div>
                <div className="text-xs text-[#6C757D]">ton/mes</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 text-center">
                <div className="text-xs text-[#6C757D] mb-1">Reuso</div>
                <div className="text-lg font-semibold text-[#1B4965]">{datosSankey.totalReuso.toFixed(1)}</div>
                <div className="text-xs text-[#6C757D]">ton/mes</div>
              </div>
              <div className="bg-red-50 rounded-lg p-4 border border-red-200 text-center">
                <div className="text-xs text-[#6C757D] mb-1">Relleno</div>
                <div className="text-lg font-semibold text-[#DC2626]">{datosSankey.totalRelleno.toFixed(1)}</div>
                <div className="text-xs text-[#6C757D]">ton/mes</div>
              </div>
            </div>
          </div>
        )}

        {/* GRÁFICAS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">
          <div className="bg-white rounded-lg p-5 border border-[#E9ECEF] shadow-sm">
            <h3 className="text-base font-semibold text-[#343A40] mb-4">
              Distribución por Destino
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={calcularDistribucionPorDestino(datosEditables)} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E9ECEF" />
                <XAxis type="number" stroke="#6C757D" fontSize={12} />
                <YAxis dataKey="mes" type="category" width={50} stroke="#6C757D" fontSize={12} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="Reciclaje" fill="#1B5E20" radius={[0, 4, 4, 0]} />
                <Bar dataKey="Composta" fill="#FF8C00" radius={[0, 4, 4, 0]} />
                <Bar dataKey="Reuso" fill="#1B4965" radius={[0, 4, 4, 0]} />
                <Bar dataKey="Relleno sanitario" fill="#DC2626" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg p-5 border border-[#E9ECEF] shadow-sm">
            <h3 className="text-base font-semibold text-[#343A40] mb-4">
              Evolución % Desviación
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={calcularEvolucionDesviacion(datosEditables)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E9ECEF" />
                <XAxis dataKey="mes" stroke="#6C757D" fontSize={12} />
                <YAxis domain={[0, 100]} stroke="#6C757D" fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="desviacion" stroke="#1B5E20" strokeWidth={2} dot={{ fill: '#1B5E20', r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TABLA INTERACTIVA DE TRAZABILIDAD */}
        <div className="mt-6 bg-white rounded-lg border border-[#E9ECEF] shadow-sm">
          <div className="p-4 border-b border-[#E9ECEF] flex justify-between items-center">
            <h3 className="text-base font-semibold text-[#343A40]">
              Datos de Trazabilidad
            </h3>
            <button
              onClick={guardarCambios}
              className="bg-[#1B5E20] hover:bg-[#1e4a37] text-white px-3 py-1.5 rounded-md font-medium text-xs shadow-sm hover:shadow-md flex items-center gap-1.5"
            >
              <Save size={14} />
              Guardar
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#F8F9FA] border-b border-[#E9ECEF]">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#343A40]">Material</th>
                  {meses.map(mes => (
                    <th key={mes} className="px-2 py-3 text-center text-xs font-semibold text-[#343A40] min-w-[60px]">
                      {mes}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-center text-xs font-semibold text-[#343A40]">Total</th>
                </tr>
              </thead>
              <tbody>
                {categoriasConfig.map(categoriaConfig => {
                  const categoria = datosEditables[categoriaConfig.key];
                  const estaAbierta = categoriasAbiertas[categoriaConfig.key];
                  
                  return (
                    <React.Fragment key={categoriaConfig.key}>
                      {/* Fila de categoría */}
                      <tr className={`${categoriaConfig.color} border-b border-[#E9ECEF] cursor-pointer`}>
                        <td 
                          colSpan={13}
                          onClick={() => toggleCategoria(categoriaConfig.key)}
                          className="px-4 py-3"
                        >
                          <div className="flex items-center gap-2">
                            {estaAbierta ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            <span className="font-semibold text-sm text-[#343A40]">{categoriaConfig.label}</span>
                          </div>
                        </td>
                      </tr>
                      
                      {/* Filas de materiales (si está abierta) */}
                      {estaAbierta && categoria.map((material, index) => {
                        const total = calcularTotalMaterial(material);
                        return (
                          <tr key={index} className="border-b border-[#E9ECEF] hover:bg-[#F8F9FA]">
                            <td className="px-4 py-2 text-xs font-medium text-[#343A40]">
                              {material.material}
                            </td>
                            {meses.map(mes => (
                              <td key={mes} className="px-1 py-2 text-center">
                                <input
                                  type="number"
                                  value={material[mes] || ''}
                                  onChange={(e) => actualizarValor(categoriaConfig.key, index, mes, e.target.value)}
                                  className="w-full px-1.5 py-1 text-xs text-center border border-[#E9ECEF] rounded focus:outline-none focus:ring-1 focus:ring-[#1B5E20] focus:border-transparent"
                                  min="0"
                                  step="0.1"
                                />
                              </td>
                            ))}
                            <td className="px-4 py-2 text-center text-xs font-semibold text-[#343A40]">
                              {total.toFixed(1)} t
                            </td>
                          </tr>
                        );
                      })}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* MODAL DE INFORMACIÓN DETALLADA DEL CLIENTE */}
        {mostrarModalInfo && clienteActual && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setMostrarModalInfo(false)}>
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-lg border border-[#E9ECEF]" onClick={e => e.stopPropagation()}>
              <div className="p-6 border-b border-[#E9ECEF] flex items-center justify-between bg-[#1B5E20] text-white rounded-t-lg">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{clienteActual.logo}</div>
                  <div>
                    <h2 className="text-xl font-semibold">{clienteActual.name}</h2>
                    <p className="text-sm text-[#388E3C]">{clienteActual.contacto} • {clienteActual.email}</p>
                  </div>
                </div>
                <button onClick={() => setMostrarModalInfo(false)} className="text-white hover:text-[#388E3C]">
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6">
                {/* INFORMACIÓN OPERATIVA */}
                <div className="mb-6">
                  <h3 className="text-base font-semibold text-[#343A40] mb-4 flex items-center gap-2">
                    <Calendar size={18} />
                    Información Operativa
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-[#F8F9FA] rounded-lg p-4 border border-[#E9ECEF]">
                      <div className="text-xs text-[#6C757D] font-medium mb-1">Fecha de Inicio</div>
                      <div className="text-sm font-semibold text-[#343A40]">{clienteActual.fechaInicioOperacion}</div>
                      <div className="text-xs text-[#6C757D] mt-1">
                        {Math.floor((new Date() - new Date(clienteActual.fechaInicioOperacion)) / (1000 * 60 * 60 * 24 * 30))} meses operando
                      </div>
                    </div>
                    
                    <div className="bg-[#F8F9FA] rounded-lg p-4 border border-[#E9ECEF]">
                      <div className="text-xs text-[#6C757D] font-medium mb-1">Promedio Mensual</div>
                      <div className="text-sm font-semibold text-[#343A40]">{clienteActual.promedioMensual} ton/mes</div>
                      <div className="text-xs text-[#6C757D] mt-1">Volumen histórico</div>
                    </div>
                    
                    <div className="bg-[#F8F9FA] rounded-lg p-4 border border-[#E9ECEF]">
                      <div className="text-xs text-[#6C757D] font-medium mb-1">Frecuencia</div>
                      <div className="text-sm font-semibold text-[#343A40]">{clienteActual.frecuenciaRecoleccion}</div>
                    </div>
                    
                    <div className="bg-[#F8F9FA] rounded-lg p-4 border border-[#E9ECEF]">
                      <div className="text-xs text-[#6C757D] font-medium mb-1">Tasa Valorización</div>
                      <div className="text-sm font-semibold text-[#1B5E20]">{clienteActual.tasaValorizacion}%</div>
                    </div>
                    
                    <div className="bg-[#F8F9FA] rounded-lg p-4 border border-[#E9ECEF]">
                      <div className="text-xs text-[#6C757D] font-medium mb-1">Sucursales</div>
                      <div className="text-sm font-semibold text-[#343A40]">{clienteActual.sucursales}</div>
                    </div>
                    
                    <div className="bg-[#F8F9FA] rounded-lg p-4 border border-[#E9ECEF]">
                      <div className="text-xs text-[#6C757D] font-medium mb-1">RME Gestionado</div>
                      <div className="text-sm font-semibold text-[#343A40]">{clienteActual.rmeGestionado} ton/mes</div>
                    </div>
                  </div>
                </div>

                {/* TIPOS DE RESIDUOS */}
                <div className="mb-6">
                  <h3 className="text-base font-semibold text-[#343A40] mb-3 flex items-center gap-2">
                    <Package size={18} />
                    Tipos de Residuos Gestionados
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {clienteActual.tiposResiduos.map((tipo, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-[#F8F9FA] border border-[#E9ECEF] rounded-md text-xs font-medium text-[#343A40]">
                        {tipo}
                      </span>
                    ))}
                  </div>
                </div>

                {/* DESTINOS FINALES */}
                <div>
                  <h3 className="text-base font-semibold text-[#343A40] mb-3 flex items-center gap-2">
                    <MapPin size={18} />
                    Destinos Finales
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="w-3 h-3 rounded-full bg-[#1B5E20] mt-0.5"></div>
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-[#343A40] mb-0.5">Reciclaje</div>
                        <div className="text-xs text-[#6C757D]">{clienteActual.destinosFinales.reciclaje}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="w-3 h-3 rounded-full bg-[#FF8C00] mt-0.5"></div>
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-[#343A40] mb-0.5">Composta</div>
                        <div className="text-xs text-[#6C757D]">{clienteActual.destinosFinales.composta}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="w-3 h-3 rounded-full bg-[#1B4965] mt-0.5"></div>
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-[#343A40] mb-0.5">Reuso</div>
                        <div className="text-xs text-[#6C757D]">{clienteActual.destinosFinales.reuso}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="w-3 h-3 rounded-full bg-[#DC2626] mt-0.5"></div>
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-[#343A40] mb-0.5">Relleno Sanitario</div>
                        <div className="text-xs text-[#6C757D]">{clienteActual.destinosFinales.rellenoSanitario}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SERVICIOS CONTRATADOS */}
                <div className="mt-6 pt-6 border-t border-[#E9ECEF]">
                  <h3 className="text-base font-semibold text-[#343A40] mb-3 flex items-center gap-2">
                    <CheckSquare size={18} />
                    Servicios Contratados
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {clienteActual.serviciosContratados.map((servicio, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-[#1B5E20] text-white rounded-md text-xs font-medium">
                        {servicio}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Modal Detalle Colaborador
  const TeamMemberModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedTeamMember(null)}>
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-lg border border-[#E9ECEF]" onClick={e => e.stopPropagation()}>
        <div className="bg-[#1B5E20] p-6 text-white rounded-t-lg">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#1B5E20] flex items-center justify-center text-white text-2xl font-semibold">
                {selectedTeamMember.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
              </div>
              <div>
                <h2 className="text-2xl font-semibold">{selectedTeamMember.name}</h2>
                <p className="text-[#388E3C] font-medium text-sm mt-1">{selectedTeamMember.role}</p>
              </div>
            </div>
            <button onClick={() => setSelectedTeamMember(null)} className="text-white hover:text-[#388E3C]">
              <X size={24} />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-[#F8F9FA] rounded-lg p-5 border border-[#E9ECEF] text-center">
              <div className="text-sm text-[#6C757D] font-medium mb-2">Eficiencia Global</div>
              <div className="text-3xl font-semibold text-[#343A40]">{selectedTeamMember.eficienciaGlobal}%</div>
            </div>
            <div className="bg-[#F8F9FA] rounded-lg p-5 border border-[#E9ECEF] text-center">
              <div className="text-sm text-[#6C757D] font-medium mb-2">Tasa Conversión</div>
              <div className="text-3xl font-semibold text-[#343A40]">{selectedTeamMember.tasaConversion}%</div>
            </div>
            <div className="bg-[#F8F9FA] rounded-lg p-5 border border-[#E9ECEF] text-center">
              <div className="text-sm text-[#6C757D] font-medium mb-2">Cumplimiento Ppto.</div>
              <div className="text-2xl font-semibold text-[#343A40]">{selectedTeamMember.cumplimientoPresupuesto}%</div>
            </div>
          </div>
          
          <div className="bg-[#F8F9FA] border border-[#E9ECEF] rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-[#343A40] mb-4 flex items-center gap-2">
              <TrendingUp size={20} />
              Pipeline Detallado
            </h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 text-center border border-[#E9ECEF]">
                <div className="text-2xl font-semibold text-[#343A40]">{selectedTeamMember.leads}</div>
                <div className="text-xs text-[#6C757D] font-medium mt-1">Leads Activos</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center border border-[#E9ECEF]">
                <div className="text-2xl font-semibold text-[#343A40]">{selectedTeamMember.levantamientos}</div>
                <div className="text-xs text-[#6C757D] font-medium mt-1">Levantamientos</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center border border-[#E9ECEF]">
                <div className="text-2xl font-semibold text-[#343A40]">{selectedTeamMember.propuestasEnviadas}</div>
                <div className="text-xs text-[#6C757D] font-medium mt-1">Propuestas</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center border border-[#E9ECEF]">
                <div className="text-2xl font-semibold text-[#1B5E20]">{selectedTeamMember.cierres}</div>
                <div className="text-xs text-[#6C757D] font-medium mt-1">Cierres</div>
              </div>
            </div>
          </div>
          
          <div className="bg-[#F8F9FA] border border-[#E9ECEF] rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-[#343A40] mb-4 flex items-center gap-2">
              <DollarSign size={20} />
              Análisis Presupuestal
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-[#6C757D] font-medium mb-2">Presupuesto Mensual</div>
                <div className="text-2xl font-semibold text-[#343A40]">
                  ${(selectedTeamMember.presupuestoMensual / 1000).toFixed(0)}k
                </div>
              </div>
              <div>
                <div className="text-sm text-[#6C757D] font-medium mb-2">Ventas Reales</div>
                <div className="text-2xl font-semibold text-[#343A40]">
                  ${(selectedTeamMember.ventasReales / 1000).toFixed(0)}k
                </div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-white rounded-lg border border-[#E9ECEF]">
              <div className="flex justify-between items-center">
                <span className="font-medium text-[#343A40]">Cumplimiento:</span>
                <span className={`text-xl font-semibold ${selectedTeamMember.cumplimientoPresupuesto >= 100 ? 'text-[#1B5E20]' : 'text-orange-600'}`}>
                  {selectedTeamMember.cumplimientoPresupuesto}%
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-[#F8F9FA] rounded-lg p-6 border border-[#E9ECEF]">
            <h3 className="text-lg font-semibold text-[#343A40] mb-4 flex items-center gap-2">
              <Target size={20} />
              KPIs de Desempeño
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 text-center border border-[#E9ECEF]">
                <div className="text-xs text-[#6C757D] font-medium mb-2">Tiempo Respuesta</div>
                <div className="text-xl font-semibold text-[#343A40]">{selectedTeamMember.tiempoRespuesta}</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center border border-[#E9ECEF]">
                <div className="text-xs text-[#6C757D] font-medium mb-2">Satisfacción Cliente</div>
                <div className="text-xl font-semibold text-[#343A40]">{selectedTeamMember.satisfaccionCliente}/5.0</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center border border-[#E9ECEF]">
                <div className="text-xs text-[#6C757D] font-medium mb-2">Actividades/Semana</div>
                <div className="text-xl font-semibold text-[#343A40]">{selectedTeamMember.activitiesSemanal}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <style>{`* { font-family: 'Inter', sans-serif; }`}</style>
      
      {currentView === 'welcome' ? (
        <WelcomeScreen />
      ) : (
        <div className="flex h-screen overflow-hidden bg-[#f5f5f5]">
          <Sidebar />
          <div className="flex-1 overflow-y-auto">
            {currentView === 'dashboard' && <DashboardView />}
            {currentView === 'pipeline' && <PipelineComercialView />}
            {currentView === 'levantamientos' && <LevantamientosView />}
            {currentView === 'documentos' && <DocumentosView />}
            {currentView === 'team' && <TeamControlView />}
            {currentView === 'reportes' && <ReportesAutomaticosView />}
            {currentView === 'trazabilidad' && <TrazabilidadView />}
          </div>
        </div>
      )}
      
      {selectedTeamMember && <TeamMemberModal />}
      
      {/* MODAL DE LEVANTAMIENTO */}
      {mostrarLevantamiento && selectedLevantamiento && (() => {
        const levantamientoDetalle = levantamientosDetallados.find(d => d.id === selectedLevantamiento.id) || selectedLevantamiento;
        const info = levantamientoDetalle.informacionGeneral || {};
        const tiposResiduos = levantamientoDetalle.tiposResiduos || [];
        const generacion = levantamientoDetalle.generacion || {};
        const serviciosActuales = levantamientoDetalle.serviciosActuales || {};
        const infraestructura = levantamientoDetalle.infraestructura || {};
        const necesidades = levantamientoDetalle.necesidades || {};
        const observaciones = levantamientoDetalle.observaciones || '';

        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setMostrarLevantamiento(false)}>
            <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-lg border border-[#E9ECEF]" onClick={e => e.stopPropagation()}>
              <div className="p-6 border-b border-[#E9ECEF] flex items-center justify-between bg-[#1B5E20] text-white rounded-t-lg">
                <div>
                  <h2 className="text-xl font-semibold">Resultados del Levantamiento</h2>
                  <p className="text-sm text-white/90 mt-1">{selectedLevantamiento.cliente}</p>
                </div>
                <button onClick={() => setMostrarLevantamiento(false)} className="text-white hover:text-white/80">
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                {/* INFORMACIÓN GENERAL */}
                <div className="bg-[#F8F9FA] rounded-lg p-5 border border-[#E9ECEF]">
                  <h3 className="text-lg font-semibold text-[#343A40] mb-4 flex items-center gap-2">
                    <Building2 size={20} />
                    Información General
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[#6C757D] font-medium mb-1">Cliente</label>
                      <div className="text-sm font-semibold text-[#343A40]">{selectedLevantamiento.cliente}</div>
                    </div>
                    <div>
                      <label className="block text-xs text-[#6C757D] font-medium mb-1">Razón Social</label>
                      <div className="text-sm text-[#343A40]">{info.razonSocial || 'N/A'}</div>
                    </div>
                    <div>
                      <label className="block text-xs text-[#6C757D] font-medium mb-1">RFC</label>
                      <div className="text-sm text-[#343A40]">{info.rfc || 'N/A'}</div>
                    </div>
                    <div>
                      <label className="block text-xs text-[#6C757D] font-medium mb-1">Contacto Principal</label>
                      <div className="text-sm text-[#343A40]">{info.contacto || selectedLevantamiento.ejecutivo}</div>
                    </div>
                    <div>
                      <label className="block text-xs text-[#6C757D] font-medium mb-1">Teléfono</label>
                      <div className="text-sm text-[#343A40]">{info.telefono || 'N/A'}</div>
                    </div>
                    <div>
                      <label className="block text-xs text-[#6C757D] font-medium mb-1">Email</label>
                      <div className="text-sm text-[#343A40]">{info.email || 'N/A'}</div>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs text-[#6C757D] font-medium mb-1">Dirección</label>
                      <div className="text-sm text-[#343A40]">{info.direccion || 'N/A'}</div>
                    </div>
                    <div>
                      <label className="block text-xs text-[#6C757D] font-medium mb-1">Superficie</label>
                      <div className="text-sm text-[#343A40]">{info.superficie || 'N/A'}</div>
                    </div>
                    <div>
                      <label className="block text-xs text-[#6C757D] font-medium mb-1">Número de Empleados</label>
                      <div className="text-sm text-[#343A40]">{info.numeroEmpleados || 'N/A'}</div>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs text-[#6C757D] font-medium mb-1">Horario de Operación</label>
                      <div className="text-sm text-[#343A40]">{info.horarioOperacion || 'N/A'}</div>
                    </div>
                    {info.requisitosReporte && info.requisitosReporte.length > 0 && (
                      <div className="col-span-2">
                        <label className="block text-xs text-[#6C757D] font-medium mb-2">Requisitos de Reporte / Estándares</label>
                        <div className="flex flex-wrap gap-2">
                          {info.requisitosReporte.map((requisito, idx) => (
                            <span key={idx} className="px-3 py-1.5 bg-[#0D47A1] text-white text-xs font-medium rounded-md border border-[#0D47A1]">
                              {requisito}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs text-[#6C757D] mt-2 italic">
                          Estos estándares serán considerados en la generación de reportes personalizados para el cliente
                        </p>
                      </div>
                    )}
                    <div>
                      <label className="block text-xs text-[#6C757D] font-medium mb-1">Ejecutivo</label>
                      <div className="text-sm font-semibold text-[#343A40]">{selectedLevantamiento.ejecutivo}</div>
                    </div>
                    <div>
                      <label className="block text-xs text-[#6C757D] font-medium mb-1">Fecha</label>
                      <div className="text-sm font-semibold text-[#343A40]">{selectedLevantamiento.fecha}</div>
                    </div>
                    <div>
                      <label className="block text-xs text-[#6C757D] font-medium mb-1">Volumen Estimado</label>
                      <div className="text-sm font-semibold text-[#0D47A1]">{selectedLevantamiento.volumenEstimado}</div>
                    </div>
                    <div>
                      <label className="block text-xs text-[#6C757D] font-medium mb-1">Valor Estimado</label>
                      <div className="text-sm font-semibold text-[#343A40]">
                        ${(selectedLevantamiento.valorEstimado / 1000).toFixed(0)}k
                      </div>
                    </div>
                  </div>
                </div>

                {/* TIPOS DE RESIDUOS */}
                {tiposResiduos.length > 0 && (
                  <div className="bg-white rounded-lg p-5 border border-[#E9ECEF]">
                    <h3 className="text-lg font-semibold text-[#343A40] mb-4 flex items-center gap-2">
                      <Recycle size={20} />
                      Tipos de Residuos
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-[#F8F9FA] border-b border-[#E9ECEF]">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-semibold text-[#6C757D]">Tipo</th>
                            <th className="px-4 py-2 text-left text-xs font-semibold text-[#6C757D]">Cantidad</th>
                            <th className="px-4 py-2 text-left text-xs font-semibold text-[#6C757D]">Porcentaje</th>
                            <th className="px-4 py-2 text-left text-xs font-semibold text-[#6C757D]">Destino Actual</th>
                            <th className="px-4 py-2 text-right text-xs font-semibold text-[#6C757D]">Costo</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tiposResiduos.map((residuo, idx) => (
                            <tr key={idx} className="border-b border-[#E9ECEF]">
                              <td className="px-4 py-3 text-sm font-semibold text-[#343A40]">{residuo.tipo}</td>
                              <td className="px-4 py-3 text-sm text-[#343A40]">{residuo.cantidad}</td>
                              <td className="px-4 py-3 text-sm text-[#6C757D]">{residuo.porcentaje}%</td>
                              <td className="px-4 py-3 text-sm text-[#6C757D]">{residuo.destino}</td>
                              <td className="px-4 py-3 text-sm text-right font-semibold text-[#343A40]">${residuo.costo?.toLocaleString() || '0'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* PATRONES DE GENERACIÓN */}
                {(generacion.frecuencia || generacion.volumenMensual) && (
                  <div className="bg-white rounded-lg p-5 border border-[#E9ECEF]">
                    <h3 className="text-lg font-semibold text-[#343A40] mb-4 flex items-center gap-2">
                      <TrendingUp size={20} />
                      Patrones de Generación
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-[#6C757D] font-medium mb-1">Frecuencia de Generación</label>
                        <div className="text-sm text-[#343A40]">{generacion.frecuencia || 'N/A'}</div>
                      </div>
                      <div>
                        <label className="block text-xs text-[#6C757D] font-medium mb-1">Días por Semana</label>
                        <div className="text-sm text-[#343A40]">{generacion.diasSemana || 'N/A'}</div>
                      </div>
                      <div>
                        <label className="block text-xs text-[#6C757D] font-medium mb-1">Volumen Diario</label>
                        <div className="text-sm text-[#343A40]">{generacion.volumenDiario || 'N/A'}</div>
                      </div>
                      <div>
                        <label className="block text-xs text-[#6C757D] font-medium mb-1">Volumen Semanal</label>
                        <div className="text-sm text-[#343A40]">{generacion.volumenSemanal || 'N/A'}</div>
                      </div>
                      <div>
                        <label className="block text-xs text-[#6C757D] font-medium mb-1">Volumen Mensual</label>
                        <div className="text-sm font-semibold text-[#0D47A1]">{generacion.volumenMensual || 'N/A'}</div>
                      </div>
                      <div>
                        <label className="block text-xs text-[#6C757D] font-medium mb-1">Horarios de Recolección</label>
                        <div className="text-sm text-[#343A40]">
                          {generacion.horariosRecoleccion ? generacion.horariosRecoleccion.join(', ') : 'N/A'}
                        </div>
                      </div>
                      {generacion.variacionesEstacionales && (
                        <div className="col-span-2">
                          <label className="block text-xs text-[#6C757D] font-medium mb-1">Variaciones Estacionales</label>
                          <div className="text-sm text-[#343A40]">{generacion.variacionesEstacionales}</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* SERVICIOS ACTUALES */}
                {(serviciosActuales.proveedor || serviciosActuales.costoMensual) && (
                  <div className="bg-white rounded-lg p-5 border border-[#E9ECEF]">
                    <h3 className="text-lg font-semibold text-[#343A40] mb-4 flex items-center gap-2">
                      <FileText size={20} />
                      Servicios Actuales
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-[#6C757D] font-medium mb-1">Proveedor Actual</label>
                        <div className="text-sm text-[#343A40]">{serviciosActuales.proveedor || 'N/A'}</div>
                      </div>
                      <div>
                        <label className="block text-xs text-[#6C757D] font-medium mb-1">Costo Mensual Actual</label>
                        <div className="text-sm font-semibold text-[#343A40]">
                          ${serviciosActuales.costoMensual ? serviciosActuales.costoMensual.toLocaleString() : 'N/A'}
                        </div>
                      </div>
                      {serviciosActuales.fechaVencimiento && (
                        <div>
                          <label className="block text-xs text-[#6C757D] font-medium mb-1">Fecha Vencimiento Contrato</label>
                          <div className="text-sm text-[#343A40]">{serviciosActuales.fechaVencimiento}</div>
                        </div>
                      )}
                      {serviciosActuales.satisfaccion !== undefined && (
                        <div>
                          <label className="block text-xs text-[#6C757D] font-medium mb-1">Nivel de Satisfacción</label>
                          <div className="text-sm text-[#343A40]">{serviciosActuales.satisfaccion}/10</div>
                        </div>
                      )}
                      {serviciosActuales.razonCambio && (
                        <div className="col-span-2">
                          <label className="block text-xs text-[#6C757D] font-medium mb-1">Razón de Cambio</label>
                          <div className="text-sm text-[#343A40]">{serviciosActuales.razonCambio}</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* INFRAESTRUCTURA */}
                {(infraestructura.areaAlmacenamiento || infraestructura.numeroContenedores) && (
                  <div className="bg-white rounded-lg p-5 border border-[#E9ECEF]">
                    <h3 className="text-lg font-semibold text-[#343A40] mb-4 flex items-center gap-2">
                      <Building2 size={20} />
                      Infraestructura
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-[#6C757D] font-medium mb-1">Área de Almacenamiento</label>
                        <div className="text-sm text-[#343A40]">{infraestructura.areaAlmacenamiento || 'N/A'}</div>
                      </div>
                      <div>
                        <label className="block text-xs text-[#6C757D] font-medium mb-1">Número de Contenedores</label>
                        <div className="text-sm text-[#343A40]">{infraestructura.numeroContenedores || 'N/A'}</div>
                      </div>
                      <div>
                        <label className="block text-xs text-[#6C757D] font-medium mb-1">Tipo de Almacenamiento</label>
                        <div className="text-sm text-[#343A40]">{infraestructura.tipoAlmacenamiento || 'N/A'}</div>
                      </div>
                      <div>
                        <label className="block text-xs text-[#6C757D] font-medium mb-1">Acceso para Vehículos</label>
                        <div className="text-sm text-[#343A40]">{infraestructura.accesoVehiculos || 'N/A'}</div>
                      </div>
                      {infraestructura.restriccionesHorario && (
                        <div className="col-span-2">
                          <label className="block text-xs text-[#6C757D] font-medium mb-1">Restricciones de Horario</label>
                          <div className="text-sm text-[#343A40]">{infraestructura.restriccionesHorario}</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* NECESIDADES Y OBJETIVOS */}
                {(necesidades.serviciosRequeridos || necesidades.presupuestoDisponible) && (
                  <div className="bg-white rounded-lg p-5 border border-[#E9ECEF]">
                    <h3 className="text-lg font-semibold text-[#343A40] mb-4 flex items-center gap-2">
                      <Target size={20} />
                      Necesidades y Objetivos
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {necesidades.serviciosRequeridos && (
                        <div className="col-span-2">
                          <label className="block text-xs text-[#6C757D] font-medium mb-2">Servicios Requeridos</label>
                          <div className="flex flex-wrap gap-2">
                            {necesidades.serviciosRequeridos.map((servicio, idx) => (
                              <span key={idx} className="px-3 py-1 bg-[#1B5E20] text-white text-xs rounded-md">
                                {servicio}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {necesidades.presupuestoDisponible && (
                        <div>
                          <label className="block text-xs text-[#6C757D] font-medium mb-1">Presupuesto Disponible (mensual)</label>
                          <div className="text-sm font-semibold text-[#343A40]">
                            ${necesidades.presupuestoDisponible.toLocaleString()}
                          </div>
                        </div>
                      )}
                      {necesidades.urgencia && (
                        <div>
                          <label className="block text-xs text-[#6C757D] font-medium mb-1">Urgencia</label>
                          <div className="text-sm text-[#343A40]">{necesidades.urgencia}</div>
                        </div>
                      )}
                      {necesidades.objetivosAmbientales && (
                        <div className="col-span-2">
                          <label className="block text-xs text-[#6C757D] font-medium mb-1">Objetivos Ambientales</label>
                          <div className="text-sm text-[#343A40]">{necesidades.objetivosAmbientales}</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* OBSERVACIONES */}
                {observaciones && (
                  <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
                    <h3 className="text-lg font-semibold text-[#343A40] mb-2 flex items-center gap-2">
                      <FileText size={20} />
                      Observaciones
                    </h3>
                    <div className="text-sm text-[#343A40] whitespace-pre-line">{observaciones}</div>
                  </div>
                )}

                {/* SIGUIENTE PASO */}
                {selectedLevantamiento.siguientePaso && (
                  <div className="bg-[#F8F9FA] rounded-lg p-4 border border-[#E9ECEF]">
                    <div className="text-xs text-[#6C757D] font-medium mb-2">Siguiente Paso</div>
                    <div className="text-sm font-semibold text-[#343A40]">{selectedLevantamiento.siguientePaso}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}
      
      {/* MODAL DE DETALLES DEL PROSPECTO */}
      {mostrarDetallesProspecto && selectedProspecto && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setMostrarDetallesProspecto(false)}>
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-lg border border-[#E9ECEF]" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-[#E9ECEF] flex items-center justify-between bg-[#1B5E20] text-white rounded-t-lg">
              <div>
                <h2 className="text-xl font-semibold">{selectedProspecto.nombre}</h2>
                <p className="text-sm text-white/90 mt-1">{selectedProspecto.industria}</p>
              </div>
              <button onClick={() => setMostrarDetallesProspecto(false)} className="text-white hover:text-white/80">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              {/* INFORMACIÓN BÁSICA */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#F8F9FA] rounded-lg p-4 border border-[#E9ECEF]">
                  <div className="text-xs text-[#6C757D] font-medium mb-1">Asesor Comercial</div>
                  <div className="text-lg font-bold text-[#343A40]">{selectedProspecto.asesorComercial}</div>
                </div>
                <div className="bg-[#F8F9FA] rounded-lg p-4 border border-[#E9ECEF]">
                  <div className="text-xs text-[#6C757D] font-medium mb-1">Etapa Actual</div>
                  <div className="text-lg font-bold text-[#343A40]">{selectedProspecto.etapa}</div>
                </div>
                <div className="bg-[#F8F9FA] rounded-lg p-4 border border-[#E9ECEF]">
                  <div className="text-xs text-[#6C757D] font-medium mb-1">Volumen Estimado</div>
                  <div className="text-lg font-bold text-[#343A40]">{selectedProspecto.volumenEstimado}</div>
                </div>
                <div className="bg-[#F8F9FA] rounded-lg p-4 border border-[#E9ECEF]">
                  <div className="text-xs text-[#6C757D] font-medium mb-1">Valor Estimado</div>
                  <div className="text-lg font-bold text-[#0D47A1]">
                    ${(selectedProspecto.valorEstimado / 1000000).toFixed(1)}M
                  </div>
                </div>
              </div>

              {/* INFORMACIÓN ESTRATÉGICA */}
              <div className="space-y-4 mb-6">
                <div>
                  <div className="text-xs text-[#6C757D] font-medium mb-1">Próximo Paso</div>
                  <div className="text-sm font-semibold text-[#343A40] bg-blue-50 border border-blue-200 rounded-lg p-3">
                    {selectedProspecto.proximoPaso}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs text-[#6C757D] font-medium mb-1">Tiempo Estimado de Cierre</div>
                    <div className="text-sm font-semibold text-[#343A40]">{selectedProspecto.tiempoEstimadoCierre}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#6C757D] font-medium mb-1">Riesgo</div>
                    <div className={`text-sm font-semibold ${
                      selectedProspecto.riesgo === 'Bajo' || selectedProspecto.riesgo === 'Muy Bajo' ? 'text-[#1B5E20]' : 
                      selectedProspecto.riesgo === 'Medio' ? 'text-orange-600' : 'text-red-600'
                    }`}>
                      {selectedProspecto.riesgo}
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="text-xs text-[#6C757D] font-medium mb-1">Oportunidad</div>
                  <div className="text-sm text-[#343A40]">{selectedProspecto.oportunidad}</div>
                </div>
              </div>

              {/* INFORMACIÓN DE CONTACTO */}
              <div className="border-t border-[#E9ECEF] pt-4 mb-6">
                <h3 className="text-sm font-semibold text-[#343A40] mb-3">Información de Contacto</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-[#6C757D]">
                    <MapPin size={14} />
                    <span>{selectedProspecto.ubicacion}</span>
                  </div>
                  <div className="text-sm text-[#6C757D]">
                    <span className="font-medium">Contacto:</span> {selectedProspecto.contacto}
                  </div>
                </div>
              </div>
              
              {/* BOTONES DE ACCIÓN */}
              <div className="flex gap-3 pt-4 border-t border-[#E9ECEF]">
                {selectedProspecto.tieneLevantamiento && (
                  <button
                    onClick={() => {
                      const levantamiento = levantamientosActivos.find(l => l.id === selectedProspecto.levantamientoId);
                      if (levantamiento) {
                        setSelectedLevantamiento(levantamiento);
                        setMostrarLevantamiento(true);
                        setMostrarDetallesProspecto(false);
                      }
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#F8F9FA] hover:bg-[#E9ECEF] text-[#343A40] rounded-md text-sm font-medium transition-all border border-[#E9ECEF]"
                  >
                    <Eye size={16} />
                    Ver Levantamiento
                  </button>
                )}
                {selectedProspecto.tienePropuesta && (
                  <button
                    onClick={() => {
                      setMostrarPropuesta(true);
                      setMostrarDetallesProspecto(false);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#0D47A1] hover:bg-[#0052A3] text-white rounded-md text-sm font-medium transition-all"
                  >
                    <FileText size={16} />
                    Ver Propuesta
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE LEADS */}
      {mostrarLeads && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setMostrarLeads(false)}>
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-lg border border-[#E9ECEF]" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-[#E9ECEF] flex items-center justify-between bg-[#0D47A1] text-white rounded-t-lg">
              <div>
                <h2 className="text-xl font-semibold">Leads Activos</h2>
                <p className="text-sm text-white/90 mt-1">Total: {leadsData.length} leads</p>
              </div>
              <button onClick={() => setMostrarLeads(false)} className="text-white hover:text-white/80">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              {/* RESUMEN */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-[#F8F9FA] rounded-lg p-4 border border-[#E9ECEF]">
                  <div className="text-xs text-[#6C757D] mb-1">Total Leads</div>
                  <div className="text-2xl font-bold text-[#343A40]">{leadsData.length}</div>
                </div>
                <div className="bg-[#F8F9FA] rounded-lg p-4 border border-[#E9ECEF]">
                  <div className="text-xs text-[#6C757D] mb-1">Valor Total</div>
                  <div className="text-2xl font-bold text-[#0D47A1]">
                    ${(leadsData.reduce((sum, l) => sum + l.valor, 0) / 1000000).toFixed(1)}M
                  </div>
                </div>
                <div className="bg-[#F8F9FA] rounded-lg p-4 border border-[#E9ECEF]">
                  <div className="text-xs text-[#6C757D] mb-1">Valor Promedio</div>
                  <div className="text-2xl font-bold text-[#343A40]">
                    ${(leadsData.reduce((sum, l) => sum + l.valor, 0) / leadsData.length / 1000).toFixed(0)}K
                  </div>
                </div>
                <div className="bg-[#F8F9FA] rounded-lg p-4 border border-[#E9ECEF]">
                  <div className="text-xs text-[#6C757D] mb-1">Origen Principal</div>
                  <div className="text-2xl font-bold text-[#343A40]">
                    {(() => {
                      const origenes = leadsData.reduce((acc, l) => {
                        acc[l.origen] = (acc[l.origen] || 0) + 1;
                        return acc;
                      }, {});
                      return Object.keys(origenes).reduce((a, b) => origenes[a] > origenes[b] ? a : b);
                    })()}
                  </div>
                </div>
              </div>

              {/* TABLA DE LEADS */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#E9ECEF] bg-[#F8F9FA]">
                      <th className="text-left p-3 text-xs font-semibold text-[#6C757D]">#</th>
                      <th className="text-left p-3 text-xs font-semibold text-[#6C757D]">Empresa</th>
                      <th className="text-left p-3 text-xs font-semibold text-[#6C757D]">Contacto</th>
                      <th className="text-left p-3 text-xs font-semibold text-[#6C757D]">Industria</th>
                      <th className="text-left p-3 text-xs font-semibold text-[#6C757D]">Ubicación</th>
                      <th className="text-left p-3 text-xs font-semibold text-[#6C757D]">Origen</th>
                      <th className="text-left p-3 text-xs font-semibold text-[#6C757D]">Fecha</th>
                      <th className="text-right p-3 text-xs font-semibold text-[#6C757D]">Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leadsData.map((lead, index) => (
                      <tr key={lead.id} className="border-b border-[#E9ECEF] hover:bg-[#F8F9FA] transition-colors">
                        <td className="p-3 text-sm text-[#6C757D]">{index + 1}</td>
                        <td className="p-3 text-sm font-semibold text-[#343A40]">{lead.empresa}</td>
                        <td className="p-3 text-sm text-[#6C757D]">{lead.contacto}</td>
                        <td className="p-3 text-sm text-[#6C757D]">{lead.industria}</td>
                        <td className="p-3 text-sm text-[#6C757D]">{lead.ubicacion}</td>
                        <td className="p-3">
                          <span className={`text-xs px-2 py-1 rounded ${
                            lead.origen === 'Referido' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                            lead.origen === 'Web' ? 'bg-green-50 text-green-700 border border-green-200' :
                            lead.origen === 'LinkedIn' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                            'bg-orange-50 text-orange-700 border border-orange-200'
                          }`}>
                            {lead.origen}
                          </span>
                        </td>
                        <td className="p-3 text-sm text-[#6C757D]">{lead.fecha}</td>
                        <td className="p-3 text-sm font-semibold text-[#0D47A1] text-right">
                          ${(lead.valor / 1000).toFixed(0)}K
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* BOTÓN DE EXPORTAR */}
              <div className="mt-6 flex justify-end">
                <button className="flex items-center gap-2 px-4 py-2 bg-[#0D47A1] hover:bg-[#0052A3] text-white rounded-md text-sm font-medium transition-all">
                  <Download size={16} />
                  Exportar CSV
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE LEVANTAMIENTOS */}
      {mostrarLevantamientos && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setMostrarLevantamientos(false)}>
          <div className="bg-white rounded-lg max-w-7xl w-full max-h-[90vh] overflow-y-auto shadow-lg border border-[#E9ECEF]" onClick={e => e.stopPropagation()}>
            {!selectedLevantamientoDetalle ? (
              <>
                <div className="p-6 border-b border-[#E9ECEF] flex items-center justify-between bg-[#1B5E20] text-white rounded-t-lg">
                  <div>
                    <h2 className="text-xl font-semibold">Levantamientos Activos</h2>
                    <p className="text-sm text-white/90 mt-1">Total: {levantamientosActivos.filter(l => l.tipo === 'Levantamiento').length} levantamientos</p>
                  </div>
                  <button onClick={() => setMostrarLevantamientos(false)} className="text-white hover:text-white/80">
                    <X size={24} />
                  </button>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {levantamientosActivos.filter(l => l.tipo === 'Levantamiento').map(levantamiento => {
                      const detalle = levantamientosDetallados.find(d => d.id === levantamiento.id);
                      return (
                        <div
                          key={levantamiento.id}
                          onClick={() => setSelectedLevantamientoDetalle(detalle || levantamiento)}
                          className="bg-white border border-[#E9ECEF] rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="font-semibold text-[#343A40] mb-1">{levantamiento.cliente}</h3>
                              <p className="text-xs text-[#6C757D]">{levantamiento.ejecutivo}</p>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded ${
                              levantamiento.status === 'Completado' ? 'bg-green-50 text-green-700 border border-green-200' :
                              levantamiento.status === 'En proceso' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                              'bg-yellow-50 text-yellow-700 border border-yellow-200'
                            }`}>
                              {levantamiento.status}
                            </span>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-[#6C757D]">Volumen:</span>
                              <span className="font-semibold text-[#343A40]">{levantamiento.volumenEstimado}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#6C757D]">Valor:</span>
                              <span className="font-semibold text-[#0D47A1]">
                                ${(levantamiento.valorEstimado / 1000000).toFixed(1)}M
                              </span>
                            </div>
                            <div className="pt-2 border-t border-[#E9ECEF]">
                              <span className="text-xs text-[#6C757D]">{levantamiento.siguientePaso}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="p-6 border-b border-[#E9ECEF] flex items-center justify-between bg-[#1B5E20] text-white rounded-t-lg">
                  <div>
                    <h2 className="text-xl font-semibold">Formulario de Levantamiento</h2>
                    <p className="text-sm text-white/90 mt-1">{selectedLevantamientoDetalle.cliente}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setSelectedLevantamientoDetalle(null)} className="text-white hover:text-white/80 px-3 py-1 text-sm">
                      ← Volver
                    </button>
                    <button onClick={() => setMostrarLevantamientos(false)} className="text-white hover:text-white/80">
                      <X size={24} />
                    </button>
                  </div>
                </div>
                
                <div className="p-6 space-y-6">
                  {/* INFORMACIÓN GENERAL */}
                  {selectedLevantamientoDetalle.informacionGeneral && (
                    <div className="bg-[#F8F9FA] rounded-lg p-5 border border-[#E9ECEF]">
                      <h3 className="text-lg font-semibold text-[#343A40] mb-4 flex items-center gap-2">
                        <Building2 size={20} />
                        Información General
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-[#6C757D] mb-1">Razón Social</div>
                          <div className="text-sm font-semibold text-[#343A40]">{selectedLevantamientoDetalle.informacionGeneral.razonSocial}</div>
                        </div>
                        <div>
                          <div className="text-xs text-[#6C757D] mb-1">RFC</div>
                          <div className="text-sm font-semibold text-[#343A40]">{selectedLevantamientoDetalle.informacionGeneral.rfc}</div>
                        </div>
                        <div className="col-span-2">
                          <div className="text-xs text-[#6C757D] mb-1">Dirección</div>
                          <div className="text-sm text-[#343A40]">{selectedLevantamientoDetalle.informacionGeneral.direccion}</div>
                        </div>
                        <div>
                          <div className="text-xs text-[#6C757D] mb-1">Contacto</div>
                          <div className="text-sm font-semibold text-[#343A40]">{selectedLevantamientoDetalle.informacionGeneral.contacto}</div>
                        </div>
                        <div>
                          <div className="text-xs text-[#6C757D] mb-1">Teléfono</div>
                          <div className="text-sm text-[#343A40]">{selectedLevantamientoDetalle.informacionGeneral.telefono}</div>
                        </div>
                        <div>
                          <div className="text-xs text-[#6C757D] mb-1">Email</div>
                          <div className="text-sm text-[#343A40]">{selectedLevantamientoDetalle.informacionGeneral.email}</div>
                        </div>
                        <div>
                          <div className="text-xs text-[#6C757D] mb-1">Superficie</div>
                          <div className="text-sm font-semibold text-[#343A40]">{selectedLevantamientoDetalle.informacionGeneral.superficie}</div>
                        </div>
                        <div>
                          <div className="text-xs text-[#6C757D] mb-1">Número de Empleados</div>
                          <div className="text-sm font-semibold text-[#343A40]">{selectedLevantamientoDetalle.informacionGeneral.numeroEmpleados}</div>
                        </div>
                        <div>
                          <div className="text-xs text-[#6C757D] mb-1">Horario de Operación</div>
                          <div className="text-sm text-[#343A40]">{selectedLevantamientoDetalle.informacionGeneral.horarioOperacion}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TIPOS DE RESIDUOS */}
                  {selectedLevantamientoDetalle.tiposResiduos && (
                    <div className="bg-white rounded-lg p-5 border border-[#E9ECEF]">
                      <h3 className="text-lg font-semibold text-[#343A40] mb-4 flex items-center gap-2">
                        <Recycle size={20} />
                        Tipos de Residuos y Generación
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-[#E9ECEF] bg-[#F8F9FA]">
                              <th className="text-left p-3 text-xs font-semibold text-[#6C757D]">Tipo de Residuo</th>
                              <th className="text-right p-3 text-xs font-semibold text-[#6C757D]">Cantidad</th>
                              <th className="text-right p-3 text-xs font-semibold text-[#6C757D]">%</th>
                              <th className="text-left p-3 text-xs font-semibold text-[#6C757D]">Destino Actual</th>
                              <th className="text-right p-3 text-xs font-semibold text-[#6C757D]">Costo Mensual</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedLevantamientoDetalle.tiposResiduos.map((residuo, index) => (
                              <tr key={index} className="border-b border-[#E9ECEF]">
                                <td className="p-3 text-sm font-semibold text-[#343A40]">{residuo.tipo}</td>
                                <td className="p-3 text-sm text-[#343A40] text-right">{residuo.cantidad}</td>
                                <td className="p-3 text-sm text-[#343A40] text-right">{residuo.porcentaje}%</td>
                                <td className="p-3 text-sm text-[#6C757D]">{residuo.destino}</td>
                                <td className="p-3 text-sm font-semibold text-[#0D47A1] text-right">
                                  ${residuo.costo.toLocaleString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* GENERACIÓN */}
                  {selectedLevantamientoDetalle.generacion && (
                    <div className="bg-white rounded-lg p-5 border border-[#E9ECEF]">
                      <h3 className="text-lg font-semibold text-[#343A40] mb-4 flex items-center gap-2">
                        <TrendingUp size={20} />
                        Patrones de Generación
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                          <div className="text-xs text-[#6C757D] mb-1">Frecuencia</div>
                          <div className="text-sm font-semibold text-[#343A40]">{selectedLevantamientoDetalle.generacion.frecuencia}</div>
                        </div>
                        <div>
                          <div className="text-xs text-[#6C757D] mb-1">Días por Semana</div>
                          <div className="text-sm font-semibold text-[#343A40]">{selectedLevantamientoDetalle.generacion.diasSemana}</div>
                        </div>
                        <div>
                          <div className="text-xs text-[#6C757D] mb-1">Volumen Diario</div>
                          <div className="text-sm font-semibold text-[#343A40]">{selectedLevantamientoDetalle.generacion.volumenDiario}</div>
                        </div>
                        <div>
                          <div className="text-xs text-[#6C757D] mb-1">Volumen Semanal</div>
                          <div className="text-sm font-semibold text-[#343A40]">{selectedLevantamientoDetalle.generacion.volumenSemanal}</div>
                        </div>
                        <div>
                          <div className="text-xs text-[#6C757D] mb-1">Volumen Mensual</div>
                          <div className="text-sm font-semibold text-[#0D47A1]">{selectedLevantamientoDetalle.generacion.volumenMensual}</div>
                        </div>
                        <div>
                          <div className="text-xs text-[#6C757D] mb-1">Variaciones Estacionales</div>
                          <div className="text-sm text-[#343A40]">{selectedLevantamientoDetalle.generacion.variacionesEstacionales}</div>
                        </div>
                        <div className="col-span-2 md:col-span-3">
                          <div className="text-xs text-[#6C757D] mb-1">Horarios de Recolección Preferidos</div>
                          <div className="flex gap-2 flex-wrap">
                            {selectedLevantamientoDetalle.generacion.horariosRecoleccion.map((horario, index) => (
                              <span key={index} className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded border border-blue-200">
                                {horario}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SERVICIOS ACTUALES */}
                  {selectedLevantamientoDetalle.serviciosActuales && (
                    <div className="bg-white rounded-lg p-5 border border-[#E9ECEF]">
                      <h3 className="text-lg font-semibold text-[#343A40] mb-4 flex items-center gap-2">
                        <FileText size={20} />
                        Servicios Actuales
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-[#6C757D] mb-1">Proveedor Actual</div>
                          <div className="text-sm font-semibold text-[#343A40]">{selectedLevantamientoDetalle.serviciosActuales.proveedor}</div>
                        </div>
                        <div>
                          <div className="text-xs text-[#6C757D] mb-1">Contrato Vigente</div>
                          <div className="text-sm font-semibold text-[#343A40]">
                            {selectedLevantamientoDetalle.serviciosActuales.contratoVigente ? 'Sí' : 'No'}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-[#6C757D] mb-1">Fecha Inicio</div>
                          <div className="text-sm text-[#343A40]">{selectedLevantamientoDetalle.serviciosActuales.fechaInicio}</div>
                        </div>
                        <div>
                          <div className="text-xs text-[#6C757D] mb-1">Fecha Vencimiento</div>
                          <div className="text-sm text-[#343A40]">{selectedLevantamientoDetalle.serviciosActuales.fechaVencimiento}</div>
                        </div>
                        <div>
                          <div className="text-xs text-[#6C757D] mb-1">Costo Mensual</div>
                          <div className="text-sm font-semibold text-[#0D47A1]">
                            ${selectedLevantamientoDetalle.serviciosActuales.costoMensual.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-[#6C757D] mb-1">Frecuencia de Recolección</div>
                          <div className="text-sm text-[#343A40]">{selectedLevantamientoDetalle.serviciosActuales.frecuenciaRecoleccion}</div>
                        </div>
                        <div>
                          <div className="text-xs text-[#6C757D] mb-1">Tipo de Servicio</div>
                          <div className="text-sm text-[#343A40]">{selectedLevantamientoDetalle.serviciosActuales.tipoServicio}</div>
                        </div>
                        <div>
                          <div className="text-xs text-[#6C757D] mb-1">Nivel de Satisfacción</div>
                          <div className="text-sm font-semibold text-[#343A40]">
                            {selectedLevantamientoDetalle.serviciosActuales.nivelSatisfaccion}/10
                          </div>
                        </div>
                        <div className="col-span-2 grid grid-cols-3 gap-2 pt-2 border-t border-[#E9ECEF]">
                          <div className="text-xs text-[#6C757D]">
                            Separación: {selectedLevantamientoDetalle.serviciosActuales.incluyeSeparacion ? '✓' : '✗'}
                          </div>
                          <div className="text-xs text-[#6C757D]">
                            Valorización: {selectedLevantamientoDetalle.serviciosActuales.incluyeValorizacion ? '✓' : '✗'}
                          </div>
                          <div className="text-xs text-[#6C757D]">
                            Reporteo: {selectedLevantamientoDetalle.serviciosActuales.incluyeReporteo ? '✓' : '✗'}
                          </div>
                        </div>
                        <div className="col-span-2">
                          <div className="text-xs text-[#6C757D] mb-1">Razón de Cambio</div>
                          <div className="text-sm text-[#343A40]">{selectedLevantamientoDetalle.serviciosActuales.razonCambio}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* INFRAESTRUCTURA */}
                  {selectedLevantamientoDetalle.infraestructura && (
                    <div className="bg-white rounded-lg p-5 border border-[#E9ECEF]">
                      <h3 className="text-lg font-semibold text-[#343A40] mb-4 flex items-center gap-2">
                        <Building2 size={20} />
                        Infraestructura
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-[#6C757D] mb-1">Área de Almacenamiento</div>
                          <div className="text-sm font-semibold text-[#343A40]">
                            {selectedLevantamientoDetalle.infraestructura.tieneAreaAlmacenamiento ? 'Sí' : 'No'} - {selectedLevantamientoDetalle.infraestructura.areaAlmacenamiento}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-[#6C757D] mb-1">Tipo de Almacenamiento</div>
                          <div className="text-sm text-[#343A40]">{selectedLevantamientoDetalle.infraestructura.tipoAlmacenamiento}</div>
                        </div>
                        <div>
                          <div className="text-xs text-[#6C757D] mb-1">Número de Contenedores</div>
                          <div className="text-sm font-semibold text-[#343A40]">{selectedLevantamientoDetalle.infraestructura.numeroContenedores}</div>
                        </div>
                        <div>
                          <div className="text-xs text-[#6C757D] mb-1">Compactadora</div>
                          <div className="text-sm text-[#343A40]">
                            {selectedLevantamientoDetalle.infraestructura.tieneCompactadora ? 'Sí' : 'No'}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-[#6C757D] mb-1">Bodega</div>
                          <div className="text-sm text-[#343A40]">
                            {selectedLevantamientoDetalle.infraestructura.tieneBodega ? 'Sí' : 'No'}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-[#6C757D] mb-1">Acceso para Vehículos</div>
                          <div className="text-sm text-[#343A40]">{selectedLevantamientoDetalle.infraestructura.accesoVehiculos}</div>
                        </div>
                        <div className="col-span-2">
                          <div className="text-xs text-[#6C757D] mb-1">Restricciones de Horario</div>
                          <div className="text-sm text-[#343A40]">{selectedLevantamientoDetalle.infraestructura.restriccionesHorario}</div>
                        </div>
                        <div className="col-span-2">
                          <div className="text-xs text-[#6C757D] mb-1">Espacio Disponible</div>
                          <div className="text-sm text-[#343A40]">{selectedLevantamientoDetalle.infraestructura.espacioDisponible}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* NECESIDADES */}
                  {selectedLevantamientoDetalle.necesidades && (
                    <div className="bg-white rounded-lg p-5 border border-[#E9ECEF]">
                      <h3 className="text-lg font-semibold text-[#343A40] mb-4 flex items-center gap-2">
                        <Target size={20} />
                        Necesidades y Objetivos
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 grid grid-cols-4 gap-2">
                          <div className="text-xs text-[#6C757D]">
                            Separación: {selectedLevantamientoDetalle.necesidades.separacionResiduos ? '✓' : '✗'}
                          </div>
                          <div className="text-xs text-[#6C757D]">
                            Valorización: {selectedLevantamientoDetalle.necesidades.valorizacionResiduos ? '✓' : '✗'}
                          </div>
                          <div className="text-xs text-[#6C757D]">
                            Trazabilidad: {selectedLevantamientoDetalle.necesidades.trazabilidad ? '✓' : '✗'}
                          </div>
                          <div className="text-xs text-[#6C757D]">
                            Reporteo: {selectedLevantamientoDetalle.necesidades.reporteoMensual ? '✓' : '✗'}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-[#6C757D] mb-1">Certificaciones Requeridas</div>
                          <div className="flex gap-2 flex-wrap">
                            {selectedLevantamientoDetalle.necesidades.certificaciones.map((cert, index) => (
                              <span key={index} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded border border-green-200">
                                {cert}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-[#6C757D] mb-1">Presupuesto Disponible</div>
                          <div className="text-sm font-semibold text-[#0D47A1]">
                            ${selectedLevantamientoDetalle.necesidades.presupuestoDisponible.toLocaleString()}/mes
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-[#6C757D] mb-1">Urgencia</div>
                          <div className={`text-sm font-semibold ${
                            selectedLevantamientoDetalle.necesidades.urgencia === 'Alta' ? 'text-red-600' :
                            selectedLevantamientoDetalle.necesidades.urgencia === 'Media' ? 'text-orange-600' : 'text-green-600'
                          }`}>
                            {selectedLevantamientoDetalle.necesidades.urgencia}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-[#6C757D] mb-1">Decision Maker</div>
                          <div className="text-sm font-semibold text-[#343A40]">{selectedLevantamientoDetalle.necesidades.decisionMaker}</div>
                        </div>
                        <div className="col-span-2">
                          <div className="text-xs text-[#6C757D] mb-1">Objetivos Ambientales</div>
                          <div className="text-sm text-[#343A40]">{selectedLevantamientoDetalle.necesidades.objetivosAmbientales}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* OBSERVACIONES */}
                  {selectedLevantamientoDetalle.observaciones && (
                    <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
                      <h3 className="text-lg font-semibold text-[#343A40] mb-2 flex items-center gap-2">
                        <FileText size={20} />
                        Observaciones
                      </h3>
                      <p className="text-sm text-[#343A40] leading-relaxed">{selectedLevantamientoDetalle.observaciones}</p>
                    </div>
                  )}

                  {/* BOTONES DE ACCIÓN */}
                  <div className="flex gap-3 pt-4 border-t border-[#E9ECEF]">
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#0D47A1] hover:bg-[#0052A3] text-white rounded-md text-sm font-medium transition-all">
                      <Download size={16} />
                      Descargar PDF
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#1B5E20] hover:bg-[#2E7D32] text-white rounded-md text-sm font-medium transition-all">
                      <FileText size={16} />
                      Generar Propuesta
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* MODAL DE NUEVO LEVANTAMIENTO */}
      {mostrarNuevoLevantamiento && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setMostrarNuevoLevantamiento(false)}>
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-lg border border-[#E9ECEF]" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-[#E9ECEF] flex items-center justify-between bg-[#1B5E20] text-white rounded-t-lg">
              <div>
                <h2 className="text-xl font-semibold">Nuevo Levantamiento</h2>
                <p className="text-sm text-white/90 mt-1">Complete el formulario para crear un nuevo levantamiento</p>
              </div>
              <button onClick={() => setMostrarNuevoLevantamiento(false)} className="text-white hover:text-white/80">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Levantamiento guardado exitosamente'); setMostrarNuevoLevantamiento(false); }}>
                {/* INFORMACIÓN GENERAL */}
                <div className="bg-[#F8F9FA] rounded-lg p-5 border border-[#E9ECEF]">
                  <h3 className="text-lg font-semibold text-[#343A40] mb-4 flex items-center gap-2">
                    <Building2 size={20} />
                    Información General
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[#6C757D] font-medium mb-1">Cliente *</label>
                      <input type="text" className="w-full px-3 py-2 border border-[#E9ECEF] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20]" placeholder="Nombre del cliente" required />
                    </div>
                    <div>
                      <label className="block text-xs text-[#6C757D] font-medium mb-1">Razón Social</label>
                      <input type="text" className="w-full px-3 py-2 border border-[#E9ECEF] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20]" placeholder="Razón social" />
                    </div>
                    <div>
                      <label className="block text-xs text-[#6C757D] font-medium mb-1">RFC</label>
                      <input type="text" className="w-full px-3 py-2 border border-[#E9ECEF] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20]" placeholder="RFC" />
                    </div>
                    <div>
                      <label className="block text-xs text-[#6C757D] font-medium mb-1">Contacto Principal *</label>
                      <input type="text" className="w-full px-3 py-2 border border-[#E9ECEF] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20]" placeholder="Nombre y cargo" required />
                    </div>
                    <div>
                      <label className="block text-xs text-[#6C757D] font-medium mb-1">Teléfono</label>
                      <input type="tel" className="w-full px-3 py-2 border border-[#E9ECEF] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20]" placeholder="Teléfono" />
                    </div>
                    <div>
                      <label className="block text-xs text-[#6C757D] font-medium mb-1">Email *</label>
                      <input type="email" className="w-full px-3 py-2 border border-[#E9ECEF] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20]" placeholder="email@ejemplo.com" required />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs text-[#6C757D] font-medium mb-1">Dirección</label>
                      <input type="text" className="w-full px-3 py-2 border border-[#E9ECEF] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20]" placeholder="Dirección completa" />
                    </div>
                    <div>
                      <label className="block text-xs text-[#6C757D] font-medium mb-1">Superficie (m²)</label>
                      <input type="number" className="w-full px-3 py-2 border border-[#E9ECEF] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20]" placeholder="Superficie" />
                    </div>
                    <div>
                      <label className="block text-xs text-[#6C757D] font-medium mb-1">Número de Empleados</label>
                      <input type="number" className="w-full px-3 py-2 border border-[#E9ECEF] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20]" placeholder="Número de empleados" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs text-[#6C757D] font-medium mb-2">Requisitos de Reporte / Estándares</label>
                      <p className="text-xs text-[#6C757D] mb-2 italic">Seleccione los estándares que el cliente debe cumplir en sus reportes</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {['NIS', 'GRI', 'SASB', 'ESR', 'ISO 14001', 'CDP', 'TCFD', 'SBTi'].map(estandar => (
                          <label key={estandar} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-[#F8F9FA] p-2 rounded-md">
                            <input type="checkbox" className="rounded border-[#E9ECEF] text-[#1B5E20] focus:ring-[#1B5E20]" />
                            <span className="text-[#343A40]">{estandar}</span>
                          </label>
                        ))}
                      </div>
                      <div className="mt-2">
                        <input type="text" className="w-full px-3 py-2 border border-[#E9ECEF] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20]" placeholder="Otros estándares (separados por comas)" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* TIPOS DE RESIDUOS */}
                <div className="bg-white rounded-lg p-5 border border-[#E9ECEF]">
                  <h3 className="text-lg font-semibold text-[#343A40] mb-4 flex items-center gap-2">
                    <Recycle size={20} />
                    Tipos de Residuos
                  </h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs text-[#6C757D] font-medium mb-1">Tipo de Residuo</label>
                        <select className="w-full px-3 py-2 border border-[#E9ECEF] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20]">
                          <option>Orgánicos</option>
                          <option>Cartón</option>
                          <option>Plástico</option>
                          <option>Vidrio</option>
                          <option>Otros</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-[#6C757D] font-medium mb-1">Cantidad Estimada (ton/mes)</label>
                        <input type="number" step="0.1" className="w-full px-3 py-2 border border-[#E9ECEF] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20]" placeholder="0.0" />
                      </div>
                      <div>
                        <label className="block text-xs text-[#6C757D] font-medium mb-1">Destino Actual</label>
                        <input type="text" className="w-full px-3 py-2 border border-[#E9ECEF] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20]" placeholder="Relleno sanitario" />
                      </div>
                    </div>
                    <button type="button" className="text-sm text-[#1B5E20] hover:text-[#2E7D32] font-medium flex items-center gap-1">
                      + Agregar otro tipo de residuo
                    </button>
                  </div>
                </div>

                {/* GENERACIÓN */}
                <div className="bg-white rounded-lg p-5 border border-[#E9ECEF]">
                  <h3 className="text-lg font-semibold text-[#343A40] mb-4 flex items-center gap-2">
                    <TrendingUp size={20} />
                    Patrones de Generación
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[#6C757D] font-medium mb-1">Frecuencia de Generación</label>
                      <select className="w-full px-3 py-2 border border-[#E9ECEF] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20]">
                        <option>Diaria</option>
                        <option>Semanal</option>
                        <option>Quincenal</option>
                        <option>Mensual</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-[#6C757D] font-medium mb-1">Días por Semana</label>
                      <input type="number" min="1" max="7" className="w-full px-3 py-2 border border-[#E9ECEF] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20]" placeholder="7" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs text-[#6C757D] font-medium mb-1">
                        Volumen Mensual Estimado (ton) *
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        id="volumenEstimado"
                        className="w-full px-3 py-2 border border-[#E9ECEF] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
                        placeholder="Ingrese el volumen en toneladas"
                        required
                        onInput={(e) => {
                          const valor = parseFloat(e.target.value);
                          const advertencia = document.getElementById('advertenciaViabilidad');
                          if (valor && valor < 10) {
                            advertencia.classList.remove('hidden');
                          } else {
                            advertencia.classList.add('hidden');
                          }
                        }}
                      />
                      <div id="advertenciaViabilidad" className="mt-2 p-3 bg-orange-50 border border-orange-200 rounded-md hidden">
                        <div className="flex items-center gap-2 text-orange-700 text-xs">
                          <AlertCircle size={14} className="flex-shrink-0" />
                          <span className="font-medium">
                            Volumen por debajo del mínimo de viabilidad (10 ton/mes)
                          </span>
                        </div>
                        <p className="text-xs text-orange-600 mt-1 ml-5">
                          Según el procedimiento IME-COM-PRO-001, el criterio de viabilidad
                          es mínimo 10 toneladas de cartón o equivalente por mes. Se puede continuar
                          con el registro pero se marcará como "Baja viabilidad".
                        </p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-[#6C757D] font-medium mb-1">Horarios Preferidos de Recolección</label>
                      <input type="text" className="w-full px-3 py-2 border border-[#E9ECEF] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20]" placeholder="Ej: 6:00 AM, 2:00 PM" />
                    </div>
                  </div>
                </div>

                {/* SERVICIOS ACTUALES */}
                <div className="bg-white rounded-lg p-5 border border-[#E9ECEF]">
                  <h3 className="text-lg font-semibold text-[#343A40] mb-4 flex items-center gap-2">
                    <FileText size={20} />
                    Servicios Actuales
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[#6C757D] font-medium mb-1">Proveedor Actual</label>
                      <input type="text" className="w-full px-3 py-2 border border-[#E9ECEF] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20]" placeholder="Nombre del proveedor" />
                    </div>
                    <div>
                      <label className="block text-xs text-[#6C757D] font-medium mb-1">Costo Mensual Actual</label>
                      <input type="number" className="w-full px-3 py-2 border border-[#E9ECEF] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20]" placeholder="$0" />
                    </div>
                    <div>
                      <label className="block text-xs text-[#6C757D] font-medium mb-1">Fecha Vencimiento Contrato</label>
                      <input type="date" className="w-full px-3 py-2 border border-[#E9ECEF] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20]" />
                    </div>
                    <div>
                      <label className="block text-xs text-[#6C757D] font-medium mb-1">Nivel de Satisfacción (1-10)</label>
                      <input type="number" min="1" max="10" className="w-full px-3 py-2 border border-[#E9ECEF] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20]" placeholder="5" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs text-[#6C757D] font-medium mb-1">Razón de Cambio</label>
                      <textarea rows="2" className="w-full px-3 py-2 border border-[#E9ECEF] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20]" placeholder="¿Por qué está buscando cambiar de proveedor?"></textarea>
                    </div>
                  </div>
                </div>

                {/* INFRAESTRUCTURA */}
                <div className="bg-white rounded-lg p-5 border border-[#E9ECEF]">
                  <h3 className="text-lg font-semibold text-[#343A40] mb-4 flex items-center gap-2">
                    <Building2 size={20} />
                    Infraestructura
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[#6C757D] font-medium mb-1">Área de Almacenamiento (m²)</label>
                      <input type="number" className="w-full px-3 py-2 border border-[#E9ECEF] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20]" placeholder="0" />
                    </div>
                    <div>
                      <label className="block text-xs text-[#6C757D] font-medium mb-1">Número de Contenedores</label>
                      <input type="number" className="w-full px-3 py-2 border border-[#E9ECEF] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20]" placeholder="0" />
                    </div>
                    <div>
                      <label className="block text-xs text-[#6C757D] font-medium mb-1">Tipo de Almacenamiento</label>
                      <input type="text" className="w-full px-3 py-2 border border-[#E9ECEF] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20]" placeholder="Ej: Contenedores de 1.1 m³" />
                    </div>
                    <div>
                      <label className="block text-xs text-[#6C757D] font-medium mb-1">Acceso para Vehículos</label>
                      <select className="w-full px-3 py-2 border border-[#E9ECEF] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20]">
                        <option>Fácil</option>
                        <option>Moderado</option>
                        <option>Difícil</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs text-[#6C757D] font-medium mb-1">Restricciones de Horario</label>
                      <textarea rows="2" className="w-full px-3 py-2 border border-[#E9ECEF] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20]" placeholder="Ej: Recolección solo entre 6:00 AM - 8:00 PM"></textarea>
                    </div>
                  </div>
                </div>

                {/* NECESIDADES */}
                <div className="bg-white rounded-lg p-5 border border-[#E9ECEF]">
                  <h3 className="text-lg font-semibold text-[#343A40] mb-4 flex items-center gap-2">
                    <Target size={20} />
                    Necesidades y Objetivos
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-xs text-[#6C757D] font-medium mb-2">Servicios Requeridos</label>
                      <div className="grid grid-cols-4 gap-2">
                        <label className="flex items-center gap-2 text-sm">
                          <input type="checkbox" className="rounded border-[#E9ECEF]" />
                          <span>Separación</span>
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <input type="checkbox" className="rounded border-[#E9ECEF]" />
                          <span>Valorización</span>
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <input type="checkbox" className="rounded border-[#E9ECEF]" />
                          <span>Trazabilidad</span>
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <input type="checkbox" className="rounded border-[#E9ECEF]" />
                          <span>Reporteo</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-[#6C757D] font-medium mb-1">Presupuesto Disponible (mensual)</label>
                      <input type="number" className="w-full px-3 py-2 border border-[#E9ECEF] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20]" placeholder="$0" />
                    </div>
                    <div>
                      <label className="block text-xs text-[#6C757D] font-medium mb-1">Urgencia</label>
                      <select className="w-full px-3 py-2 border border-[#E9ECEF] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20]">
                        <option>Baja</option>
                        <option>Media</option>
                        <option>Alta</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs text-[#6C757D] font-medium mb-1">Objetivos Ambientales</label>
                      <textarea rows="2" className="w-full px-3 py-2 border border-[#E9ECEF] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20]" placeholder="Ej: Reducir envío a relleno sanitario en 60%"></textarea>
                    </div>
                  </div>
                </div>

                {/* OBSERVACIONES */}
                <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
                  <h3 className="text-lg font-semibold text-[#343A40] mb-2 flex items-center gap-2">
                    <FileText size={20} />
                    Observaciones
                  </h3>
                  <textarea rows="4" className="w-full px-3 py-2 border border-blue-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20]" placeholder="Notas adicionales sobre el levantamiento..."></textarea>
                </div>

                {/* BOTONES */}
                <div className="flex gap-3 pt-4 border-t border-[#E9ECEF]">
                  <button 
                    type="button"
                    onClick={() => setMostrarNuevoLevantamiento(false)}
                    className="flex-1 px-4 py-2 border border-[#E9ECEF] hover:bg-[#F8F9FA] text-[#343A40] rounded-md text-sm font-medium transition-all"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-4 py-2 bg-[#1B5E20] hover:bg-[#2E7D32] text-white rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2"
                  >
                    <Save size={16} />
                    Guardar Levantamiento
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE PROPUESTA */}
      {mostrarPropuesta && selectedProspecto && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setMostrarPropuesta(false)}>
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-lg border border-[#E9ECEF]" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-[#E9ECEF] flex items-center justify-between bg-[#0D47A1] text-white rounded-t-lg">
              <div>
                <h2 className="text-xl font-semibold">Propuesta Comercial</h2>
                <p className="text-sm text-white/80 mt-1">{selectedProspecto.nombre}</p>
              </div>
              <button onClick={() => setMostrarPropuesta(false)} className="text-white hover:text-white/80">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-[#F8F9FA] rounded-lg p-4 border border-[#E9ECEF]">
                  <div className="text-xs text-[#6C757D] font-medium mb-1">Valor de Propuesta</div>
                  <div className="text-lg font-bold text-[#0D47A1]">
                    ${(selectedProspecto.valorEstimado / 1000000).toFixed(1)}M
                  </div>
                </div>
                <div className="bg-[#F8F9FA] rounded-lg p-4 border border-[#E9ECEF]">
                  <div className="text-xs text-[#6C757D] font-medium mb-1">Volumen Mensual</div>
                  <div className="text-lg font-bold text-[#343A40]">{selectedProspecto.volumenEstimado}</div>
                </div>
                <div className="bg-[#F8F9FA] rounded-lg p-4 border border-[#E9ECEF]">
                  <div className="text-xs text-[#6C757D] font-medium mb-1">Etapa Actual</div>
                  <div className="text-lg font-bold text-[#343A40]">{selectedProspecto.etapa}</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-[#343A40] mb-2">Servicios Propuestos</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white border border-[#E9ECEF] rounded-lg p-3 text-sm">Recolección</div>
                    <div className="bg-white border border-[#E9ECEF] rounded-lg p-3 text-sm">Transporte</div>
                    <div className="bg-white border border-[#E9ECEF] rounded-lg p-3 text-sm">Valorización</div>
                    <div className="bg-white border border-[#E9ECEF] rounded-lg p-3 text-sm">Reporteo Mensual</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-[#343A40] mb-2">Próximo Paso</h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="text-sm font-medium text-[#343A40]">{selectedProspecto.proximoPaso}</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-[#343A40] mb-2">Información Estratégica</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-[#6C757D] mb-1">Tiempo Estimado de Cierre</div>
                      <div className="text-sm font-semibold text-[#343A40]">{selectedProspecto.tiempoEstimadoCierre}</div>
                    </div>
                    <div>
                      <div className="text-xs text-[#6C757D] mb-1">Nivel de Riesgo</div>
                      <div className={`text-sm font-semibold ${
                        selectedProspecto.riesgo === 'Bajo' || selectedProspecto.riesgo === 'Muy Bajo' ? 'text-[#1B5E20]' : 
                        selectedProspecto.riesgo === 'Medio' ? 'text-orange-600' : 'text-red-600'
                      }`}>
                        {selectedProspecto.riesgo}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex gap-3">
                <button className="flex-1 bg-[#0D47A1] hover:bg-[#0052A3] text-white py-2 rounded-md font-medium text-sm flex items-center justify-center gap-2">
                  <Download size={16} />
                  Descargar Propuesta PDF
                </button>
                <button className="flex-1 border border-[#0D47A1] text-[#0D47A1] hover:bg-[#F8F9FA] py-2 rounded-md font-medium text-sm">
                  Enviar por Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VISTA CLIENTE - MODAL */}
      {vistaCliente && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setVistaCliente(false)}>
          <div className="bg-white rounded-lg max-w-7xl w-full max-h-[95vh] overflow-y-auto shadow-2xl border border-[#E9ECEF]" onClick={e => e.stopPropagation()}>
            {/* HEADER CLIENTE */}
            <div className="sticky top-0 bg-[#0D47A1] text-white p-6 rounded-t-lg z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 rounded-lg p-3">
                    <Recycle size={32} className="text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">Dashboard de Trazabilidad</h1>
                    <p className="text-sm text-white/90 mt-1">
                      {(() => {
                        const clienteVista = clienteSeleccionadoVista ? clientesConReportes.find(c => c.id === clienteSeleccionadoVista) : null;
                        return clienteVista 
                          ? `${clienteVista.name} - Portal del Cliente`
                          : 'Vista General - Portal del Cliente';
                      })()}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setVistaCliente(false)}
                  className="text-white hover:text-white/80 bg-white/10 hover:bg-white/20 rounded-lg p-2 transition-all"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* CONTENIDO CLIENTE */}
            <div className="p-8 bg-[#F8F9FA]">
              {(() => {
                const clienteVista = clienteSeleccionadoVista ? clientesConReportes.find(c => c.id === clienteSeleccionadoVista) : null;
                const datosCliente = clienteSeleccionadoVista && trazabilidadPorCliente[clienteSeleccionadoVista] 
                  ? trazabilidadPorCliente[clienteSeleccionadoVista] 
                  : datosTrazabilidad;
                
                // Calcular KPIs
                const calcularTotal = (categoria) => {
                  return datosCliente[categoria].reduce((total, item) => {
                    const suma = meses.reduce((sum, mes) => sum + (item[mes] || 0), 0);
                    return total + suma;
                  }, 0);
                };

                const toneladasCirculares = calcularTotal('reciclaje') + calcularTotal('composta') + calcularTotal('reuso');
                const rellenoSanitario = calcularTotal('rellenoSanitario');
                const totalGenerado = toneladasCirculares + rellenoSanitario;
                const porcentajeDesviacion = totalGenerado > 0 ? ((toneladasCirculares / totalGenerado) * 100).toFixed(1) : 0;
                const datosSankeyCliente = clienteVista && datosCliente 
                  ? generarDatosSankeyCliente(clienteVista, datosCliente)
                  : null;

                return (
                  <>
                    {/* REQUISITOS DE REPORTE */}
                    {clienteVista && clienteVista.requisitosReporte && clienteVista.requisitosReporte.length > 0 && (
                      <div className="bg-white rounded-xl p-6 border border-[#E9ECEF] shadow-sm mb-6">
                        <div className="flex items-center gap-2 mb-4">
                          <FileText className="text-[#0D47A1]" size={20} />
                          <h3 className="text-lg font-semibold text-[#343A40]">Estándares de Reporte Aplicados</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {clienteVista.requisitosReporte.map((requisito, idx) => (
                            <span key={idx} className="px-3 py-1.5 bg-[#0D47A1] text-white text-xs font-medium rounded-md border border-[#0D47A1]">
                              {requisito}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs text-[#6C757D] mt-3 italic">
                          Los reportes generados cumplen con estos estándares para garantizar la transparencia y cumplimiento normativo
                        </p>
                      </div>
                    )}
                    
                    {/* KPIs PRINCIPALES */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                      <div className="bg-white rounded-xl p-6 border border-[#E9ECEF] shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <div className="bg-green-50 rounded-lg p-3">
                            <Recycle className="text-[#1B5E20]" size={24} />
                          </div>
                          <span className="text-xs text-[#6C757D] font-medium">Desviación</span>
                        </div>
                        <div className="text-3xl font-bold text-[#343A40] mb-1">{porcentajeDesviacion}%</div>
                        <div className="text-sm text-[#6C757D]">Del total generado</div>
                      </div>

                      <div className="bg-white rounded-xl p-6 border border-[#E9ECEF] shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <div className="bg-blue-50 rounded-lg p-3">
                            <Leaf className="text-[#0D47A1]" size={24} />
                          </div>
                          <span className="text-xs text-[#6C757D] font-medium">Economía Circular</span>
                        </div>
                        <div className="text-3xl font-bold text-[#343A40] mb-1">{toneladasCirculares.toLocaleString()}</div>
                        <div className="text-sm text-[#6C757D]">Toneladas valorizadas</div>
                      </div>

                      <div className="bg-white rounded-xl p-6 border border-[#E9ECEF] shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <div className="bg-orange-50 rounded-lg p-3">
                            <Trash2 className="text-orange-600" size={24} />
                          </div>
                          <span className="text-xs text-[#6C757D] font-medium">Relleno Sanitario</span>
                        </div>
                        <div className="text-3xl font-bold text-[#343A40] mb-1">{rellenoSanitario.toLocaleString()}</div>
                        <div className="text-sm text-[#6C757D]">Toneladas enviadas</div>
                      </div>

                      <div className="bg-white rounded-xl p-6 border border-[#E9ECEF] shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <div className="bg-purple-50 rounded-lg p-3">
                            <BarChart3 className="text-purple-600" size={24} />
                          </div>
                          <span className="text-xs text-[#6C757D] font-medium">Total Generado</span>
                        </div>
                        <div className="text-3xl font-bold text-[#343A40] mb-1">{totalGenerado.toLocaleString()}</div>
                        <div className="text-sm text-[#6C757D]">Toneladas totales</div>
                      </div>
                    </div>

                    {/* DIAGRAMA SANKEY */}
                    {datosSankeyCliente ? (
                      <div className="bg-white rounded-xl p-6 border border-[#E9ECEF] shadow-sm mb-8">
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <h2 className="text-xl font-semibold text-[#343A40] mb-1">Flujo de Materiales</h2>
                            <p className="text-sm text-[#6C757D]">Trazabilidad completa de residuos</p>
                          </div>
                          <button
                            onClick={async () => {
                              const ref = document.querySelector('[data-sankey-cliente]');
                              if (ref) {
                                try {
                                  const canvas = await html2canvas(ref, {
                                    scale: 2,
                                    backgroundColor: '#ffffff',
                                    useCORS: true,
                                  });
                                  const link = document.createElement('a');
                                  link.download = `flujo-materiales-${clienteVista?.name || 'general'}.png`;
                                  link.href = canvas.toDataURL();
                                  link.click();
                                } catch (error) {
                                  console.error('Error exporting PNG:', error);
                                }
                              }
                            }}
                            className="bg-[#0D47A1] hover:bg-[#0052A3] text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-all"
                          >
                            <Download size={16} />
                            Descargar
                          </button>
                        </div>
                        <div data-sankey-cliente className="h-[500px] bg-white rounded-lg border border-[#E9ECEF]">
                          <ResponsiveSankey
                            data={datosSankeyCliente}
                            margin={{ top: 20, right: 200, bottom: 20, left: 200 }}
                            align="justify"
                            colors={(node) => node.nodeColor || '#64748b'}
                            nodeOpacity={1}
                            nodeHoverOpacity={0.8}
                            nodeThickness={18}
                            nodeSpacing={10}
                            nodeBorderWidth={0}
                            linkOpacity={0.5}
                            linkHoverOpacity={0.8}
                            linkContract={0}
                            enableLinkGradient={true}
                            labelPosition="outside"
                            labelOrientation="horizontal"
                            labelPadding={20}
                            labelTextColor="#374151"
                            labelWrap={true}
                            animate={true}
                            motionConfig="gentle"
                            nodeTooltip={({ node }) => {
                              const nodeData = datosSankeyCliente.nodes.find(n => n.id === node.id);
                              const nodeIdParts = node.id.split(' (');
                              const nombreDestino = nodeIdParts[0];
                              const registroAmbiental = nodeData?.registroAmbiental || (nodeIdParts[1] ? nodeIdParts[1].replace(')', '') : '');
                              return (
                                <div className="bg-[#273949] text-white p-3 rounded-lg shadow-xl border border-[#1B5E20]">
                                  <div className="font-semibold text-sm">{nombreDestino}</div>
                                  {registroAmbiental && (
                                    <div className="text-[#1B5E20] font-medium text-xs mt-1">Registro: {registroAmbiental}</div>
                                  )}
                                  {node.value && (
                                    <div className="text-xs mt-1">
                                      <div>Volumen total: {node.value.toFixed(1)} ton</div>
                                    </div>
                                  )}
                                </div>
                              );
                            }}
                            linkTooltip={({ link }) => {
                              const percentage = ((link.value / totalGenerado) * 100).toFixed(1);
                              return (
                                <div className="bg-[#273949] text-white p-3 rounded-lg shadow-xl border border-[#1B5E20]">
                                  <div className="font-semibold text-sm">{link.source.id} → {link.target.id}</div>
                                  <div className="text-xs mt-1">
                                    <div>Volumen: {link.value} ton</div>
                                    <div>Porcentaje: {percentage}% del total</div>
                                  </div>
                                </div>
                              );
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="bg-white rounded-xl p-8 border border-[#E9ECEF] shadow-sm mb-8 text-center">
                        <Recycle className="text-[#6C757D] mx-auto mb-4" size={48} />
                        <h3 className="text-lg font-semibold text-[#343A40] mb-2">No hay datos de trazabilidad</h3>
                        <p className="text-sm text-[#6C757D]">Los datos de trazabilidad estarán disponibles próximamente.</p>
                      </div>
                    )}

                    {/* GRÁFICAS DE DISTRIBUCIÓN */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                      <div className="bg-white rounded-xl p-6 border border-[#E9ECEF] shadow-sm">
                        <h3 className="text-lg font-semibold text-[#343A40] mb-4">Distribución por Destino</h3>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={calcularDistribucionPorDestino(datosCliente)}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E9ECEF" />
                            <XAxis dataKey="mes" stroke="#6C757D" fontSize={12} />
                            <YAxis stroke="#6C757D" fontSize={12} />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: '#273949', 
                                border: '1px solid #1B5E20', 
                                borderRadius: '8px',
                                color: '#fff'
                              }} 
                            />
                            <Legend />
                            <Bar dataKey="Reciclaje" fill="#1B5E20" />
                            <Bar dataKey="Composta" fill="#FF9800" />
                            <Bar dataKey="Reuso" fill="#2196F3" />
                            <Bar dataKey="Relleno Sanitario" fill="#F44336" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="bg-white rounded-xl p-6 border border-[#E9ECEF] shadow-sm">
                        <h3 className="text-lg font-semibold text-[#343A40] mb-4">Evolución de Desviación</h3>
                        <ResponsiveContainer width="100%" height={300}>
                          <LineChart data={calcularEvolucionDesviacion(datosCliente)}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E9ECEF" />
                            <XAxis dataKey="mes" stroke="#6C757D" fontSize={12} />
                            <YAxis stroke="#6C757D" fontSize={12} />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: '#273949', 
                                border: '1px solid #1B5E20', 
                                borderRadius: '8px',
                                color: '#fff'
                              }} 
                            />
                            <Legend />
                            <Line type="monotone" dataKey="Desviación" stroke="#1B5E20" strokeWidth={3} dot={{ fill: '#1B5E20', r: 4 }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* RESUMEN MENSUAL */}
                    <div className="bg-white rounded-xl p-6 border border-[#E9ECEF] shadow-sm mb-8">
                      <h3 className="text-lg font-semibold text-[#343A40] mb-4">Resumen Mensual</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-[#E9ECEF] bg-[#F8F9FA]">
                              <th className="text-left p-3 text-xs font-semibold text-[#6C757D]">Mes</th>
                              <th className="text-right p-3 text-xs font-semibold text-[#6C757D]">Reciclaje</th>
                              <th className="text-right p-3 text-xs font-semibold text-[#6C757D]">Composta</th>
                              <th className="text-right p-3 text-xs font-semibold text-[#6C757D]">Reuso</th>
                              <th className="text-right p-3 text-xs font-semibold text-[#6C757D]">Relleno</th>
                              <th className="text-right p-3 text-xs font-semibold text-[#6C757D]">Total</th>
                              <th className="text-right p-3 text-xs font-semibold text-[#6C757D]">Desviación</th>
                            </tr>
                          </thead>
                          <tbody>
                            {['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'].map(mes => {
                              const reciclaje = datosCliente.reciclaje.reduce((sum, item) => sum + (item[mes] || 0), 0);
                              const composta = datosCliente.composta.reduce((sum, item) => sum + (item[mes] || 0), 0);
                              const reuso = datosCliente.reuso.reduce((sum, item) => sum + (item[mes] || 0), 0);
                              const relleno = datosCliente.rellenoSanitario.reduce((sum, item) => sum + (item[mes] || 0), 0);
                              const total = reciclaje + composta + reuso + relleno;
                              const desviacion = total > 0 ? (((reciclaje + composta + reuso) / total) * 100).toFixed(1) : 0;
                              
                              return (
                                <tr key={mes} className="border-b border-[#E9ECEF] hover:bg-[#F8F9FA]">
                                  <td className="p-3 text-sm font-semibold text-[#343A40]">{mes}</td>
                                  <td className="p-3 text-sm text-[#343A40] text-right">{reciclaje.toLocaleString()}</td>
                                  <td className="p-3 text-sm text-[#343A40] text-right">{composta.toLocaleString()}</td>
                                  <td className="p-3 text-sm text-[#343A40] text-right">{reuso.toLocaleString()}</td>
                                  <td className="p-3 text-sm text-[#343A40] text-right">{relleno.toLocaleString()}</td>
                                  <td className="p-3 text-sm font-semibold text-[#343A40] text-right">{total.toLocaleString()}</td>
                                  <td className="p-3 text-sm font-semibold text-[#1B5E20] text-right">{desviacion}%</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* BOTONES DE ACCIÓN CLIENTE */}
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => {
                          alert('Descargando reporte completo en PDF...');
                        }}
                        className="bg-[#0D47A1] hover:bg-[#0052A3] text-white px-6 py-3 rounded-md font-medium text-sm flex items-center gap-2 transition-all shadow-sm hover:shadow-md"
                      >
                        <Download size={18} />
                        Descargar Reporte Completo
                      </button>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE MOTIVO DE RECHAZO */}
      {mostrarModalRechazo && prospectoParaRechazar && (
        <ModalMotivoRechazo
          prospecto={prospectoParaRechazar}
          onClose={() => {
            setMostrarModalRechazo(false);
            setProspectoParaRechazar(null);
            setMotivoRechazoSeleccionado('');
            setDetalleRechazo('');
          }}
          onSave={(datosRechazo) => {
            // En una aplicación real, aquí se actualizaría el estado del prospecto
            console.log('Datos de rechazo guardados:', datosRechazo);
            alert(`Motivo de rechazo registrado exitosamente para ${prospectoParaRechazar.nombre}`);
            setMostrarModalRechazo(false);
            setProspectoParaRechazar(null);
            setMotivoRechazoSeleccionado('');
            setDetalleRechazo('');
          }}
        />
      )}
    </>
  );
};

export default InnovativeDemo;