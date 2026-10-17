/**
 * YumaRaíz La Dorada - Datos Georreferenciados Oficiales y Parámetros Técnicos
 * Reto 4: Manejo ecológico de residuos de poda urbana - Rally Latinoamericano 2026
 * Ubicaciones reales verificadas de La Dorada (Caldas)
 * Sin emojis - Uso estricto de Colombia Icons
 */

const PODA_DATA = {
  municipio: {
    nombre: "La Dorada, Caldas",
    departamento: "Caldas",
    temperaturaPromedioAire: "35.4 °C",
    humedadRelativa: "62%",
    poblacionAprox: "78.000 hab.",
    vertederodestino: "Relleno Sanitario La Doradita (En crisis operativa PGIRS)",
    costoToneladaDisposicion: 115000 // COP por tonelada
  },

  boundsLaDorada: [
    [5.405, -74.720],
    [5.500, -74.625]
  ],
  centerLaDorada: [5.4542, -74.6648],

  categorias: [
    { id: "todos", label: "Todos los Puntos", icon: "mapa" },
    { id: "bioalcorque", label: "Bioalcorques Activos", icon: "ceiba" },
    { id: "poda", label: "Lotes de Poda", icon: "tijeras" },
    { id: "calor", label: "Focos de Calor", icon: "fuego-llama" },
    { id: "circular", label: "Nodos Circulares", icon: "papelera-reciclaje" }
  ],

  // 10 Puntos Reales de La Dorada, Caldas
  puntos: [
    {
      id: "bio-1",
      codigoQR: "QR-DOR-001",
      tipo: "bioalcorque",
      categoria: "bioalcorque",
      colombiaIcon: "ceiba",
      nombre: "Bioalcorque #01 · Samán Centenario",
      ubicacion: "Parque Simón Bolívar · Centro",
      barrio: "Centro",
      coords: [5.4542, -74.6648],
      estado: "Monitoreo Continuo",
      especie: "Samanea saman (Samán Centenario)",
      fechaInstalacion: "12 Octubre 2026",
      origenPoda: "Lote P-2026-08 (Avenida Santander)",
      volumenAstillas: "48 kg de astillas calibradas (Capa 5 cm, despeje 15 cm)",
      sensores: {
        tempSueloTratado: 27.2,
        tempSueloTestigo: 38.6,
        deltaTemp: -11.4,
        humedadSueloTratado: 68,
        humedadSueloTestigo: 19,
        deltaHumedad: +49,
        retencionRiego: "4.2 días adicionales de humedad sin marchitamiento"
      },
      comunidad: {
        reportesCiudadanos: 24,
        guardianesAsignados: "Cuadrilla Municipal & Comité UNAD",
        ultimaVerificacion: "Hoy, 09:15 AM"
      },
      detalles: "Cobertura orgánica de 5 cm con astillas seleccionadas de poda urbana. Alcorque de 1.2 m² con separación estricta de 15 cm al tronco para evitar hongos en el cuello radicular."
    },
    {
      id: "bio-2",
      codigoQR: "QR-DOR-002",
      tipo: "bioalcorque",
      categoria: "bioalcorque",
      colombiaIcon: "rio",
      nombre: "Bioalcorque #02 · Ceiba Bruja Ribereña",
      ubicacion: "Malecón Turístico Bucamba · Río Magdalena",
      barrio: "Bucamba",
      coords: [5.4595, -74.6580],
      estado: "Monitoreo Activo",
      especie: "Ceiba pentandra (Ceiba Bruja)",
      fechaInstalacion: "14 Octubre 2026",
      origenPoda: "Lote P-2026-07 (Ronda Férrea)",
      volumenAstillas: "62 kg con envoltura de fibra biodegradable",
      sensores: {
        tempSueloTratado: 28.1,
        tempSueloTestigo: 40.4,
        deltaTemp: -12.3,
        humedadSueloTratado: 72,
        humedadSueloTestigo: 16,
        deltaHumedad: +56,
        retencionRiego: "4.8 días de reserva hídrica"
      },
      comunidad: {
        reportesCiudadanos: 38,
        guardianesAsignados: "Pescadores de Bucamba & Jóvenes UNAD",
        ultimaVerificacion: "Ayer, 04:30 PM"
      },
      detalles: "Módulo permeable con envoltura de fibra natural. Protege las raíces frente al reflejo solar del pavimento del malecón y la brisa seca del río Magdalena."
    },
    {
      id: "bio-3",
      codigoQR: "QR-DOR-003",
      tipo: "bioalcorque",
      categoria: "bioalcorque",
      colombiaIcon: "arbol-tropical",
      nombre: "Bioalcorque #03 · Guayacán Amarillo Escolar",
      ubicacion: "Colegio Alfonso López · Patio Central",
      barrio: "Alfonso López",
      coords: [5.4490, -74.6620],
      estado: "Riego Vecinal Activo",
      especie: "Handroanthus chrysanthus (Guayacán Amarillo)",
      fechaInstalacion: "15 Octubre 2026",
      origenPoda: "Poda Escolar Interna (90 kg)",
      volumenAstillas: "35 kg de mulch cribado",
      sensores: {
        tempSueloTratado: 26.9,
        tempSueloTestigo: 39.1,
        deltaTemp: -12.2,
        humedadSueloTratado: 65,
        humedadSueloTestigo: 21,
        deltaHumedad: +44,
        retencionRiego: "3.5 días adicionales"
      },
      comunidad: {
        reportesCiudadanos: 42,
        guardianesAsignados: "Semillero Ambiental Colegio Alfonso López",
        ultimaVerificacion: "Hoy, 10:00 AM"
      },
      detalles: "Proyecto pedagógico ambiental apadrinado por estudiantes de grado 10°. Registro de mediciones diarias de humedad con sensor de clavijas."
    },
    {
      id: "calor-1",
      codigoQR: "CALOR-DOR-001",
      tipo: "calor",
      categoria: "calor",
      colombiaIcon: "fuego-llama",
      nombre: "Punto Crítico: Estrés Térmico Severo (Asfalto)",
      ubicacion: "Avenida Las Ferias / Calle 14",
      barrio: "Las Ferias",
      coords: [5.4510, -74.6710],
      estado: "Prioridad 1 para Intervención",
      especie: "Cariniana pyriformis (Abarco Urbano)",
      sensores: {
        tempSuperficieSuelo: 42.8,
        humedadSuelo: 9,
        irradiancia: "Muy Alta (Sol directo >8 horas)",
        arboladoPresente: "Abarco joven en riesgo por estrés hídrico"
      },
      diagnostico: "Suelo circundante compactado y desprovisto de cobertura vegetal. Temperatura en sustrato alcanza 42.8°C a las 1:30 PM. Requiere descompactación y Bioalcorque de 8 cm.",
      accionSugerida: "Asignar 180 kg de astillas del Lote P-2026-08 para acolchado inmediato."
    },
    {
      id: "acopio-1",
      codigoQR: "CIRC-DOR-001",
      tipo: "circular",
      categoria: "circular",
      colombiaIcon: "papelera-reciclaje",
      nombre: "Centro de Acopio y Triturado Municipal",
      ubicacion: "Sede Operativa ESP La Dorada · Sector Industrial",
      barrio: "Sector Industrial",
      coords: [5.4650, -74.6705],
      estado: "Triturado Activo",
      capacidadMensual: "20 Toneladas / mes (5.000 kg / semana)",
      procesos: "Trituradora de tolva móvil (criba 30 a 60 mm). Clasificación por calibre y despacho hacia Bioalcorques urbanos.",
      ahorroAcumulado: "$2.300.000 COP/mes frente a fletes del relleno La Doradita"
    },
    {
      id: "acopio-2",
      codigoQR: "CIRC-DOR-002",
      tipo: "circular",
      categoria: "circular",
      colombiaIcon: "planta-de-cafe",
      nombre: "Pila de Compostaje en Cascada (Vivero Municipal)",
      ubicacion: "Vivero La Dorada · Salida Vía Norcasia",
      barrio: "Zona Rural Norcasia",
      coords: [5.4680, -74.6850],
      estado: "Volteo Programado",
      capacidadMensual: "12 Toneladas en maduración (3.200 kg actuales)",
      procesos: "Compostaje termófilo con volteo periódico (58°C en fase sanitizante). Aprovechamiento de hojas verdes y follaje fino.",
      ahorroAcumulado: "$1.380.000 COP/mes"
    },
    {
      id: "poda-1",
      codigoQR: "LOTE-2026-P08",
      tipo: "poda",
      categoria: "poda",
      colombiaIcon: "tijeras",
      nombre: "Lote de Poda Vial P-2026-08 (180 kg)",
      ubicacion: "Avenida Santander / Carrera 4",
      barrio: "Obrero",
      coords: [5.4570, -74.6675],
      estado: "Ruta Asignada",
      volumenKg: 180,
      humedadBiomasa: 32,
      composicion: {
        ramasMedianasLeñosas: "80%",
        follajeVerde: "20%"
      },
      decisionRutaClimatica: {
        destinoRecomendado: "80% Bioalcorque · 20% Compostaje",
        ahorroTonelaje: "$20.700 COP frente a La Doradita",
        co2Evitado: "148 kg CO2eq"
      }
    },
    {
      id: "poda-2",
      codigoQR: "LOTE-2026-P09",
      tipo: "poda",
      categoria: "poda",
      colombiaIcon: "tijeras",
      nombre: "Poda Residencial Comunitaria P-2026-09 (120 kg)",
      ubicacion: "Barrio Las Ferias / Manzana D",
      barrio: "Las Ferias",
      coords: [5.4460, -74.6730],
      estado: "Espera de Cuadrilla",
      volumenKg: 120,
      humedadBiomasa: 45,
      composicion: {
        ramasDelgadas: "60%",
        hojasMangoGuayaba: "40%"
      },
      decisionRutaClimatica: {
        destinoRecomendado: "60% Bioalcorque barrial · 40% Compostaje",
        ahorroTonelaje: "$13.800 COP frente a vertedero",
        co2Evitado: "98 kg CO2eq"
      }
    },
    {
      id: "poda-3",
      codigoQR: "LOTE-2026-P10",
      tipo: "poda",
      categoria: "poda",
      colombiaIcon: "arbol-tropical",
      nombre: "Poda Forestal Preventiva P-2026-10 (240 kg)",
      ubicacion: "Ronda Carrilera / Barrio Renán Barco",
      barrio: "Renán Barco",
      coords: [5.4420, -74.6690],
      estado: "Clasificación en Sitio",
      volumenKg: 240,
      humedadBiomasa: 22,
      composicion: {
        troncosMedianos: "50%",
        ramasLeñosas: "40%",
        leñaComunitaria: "10%"
      },
      decisionRutaClimatica: {
        destinoRecomendado: "50% Tutores/Estacas · 40% Bioalcorque · 10% Leña",
        ahorroTonelaje: "$27.600 COP",
        co2Evitado: "196 kg CO2eq"
      }
    },
    {
      id: "calor-2",
      codigoQR: "ALERTA-FUEGO-01",
      tipo: "calor",
      categoria: "calor",
      colombiaIcon: "fuego-llama",
      nombre: "Riesgo de Incendio: Poda Seca Acumulada (340 kg)",
      ubicacion: "Vereda Concordia · Sector Norte",
      barrio: "Vereda Concordia",
      coords: [5.4740, -74.6720],
      estado: "Retiro Inmediato (< 12 horas)",
      volumenKg: 340,
      sensores: {
        tempSuperficieSuelo: 44.5,
        irradiancia: "Crítica (Efecto Lupa por Sol Directo)",
        arboladoPresente: "Pastizal seco combustible y ramas expuestas"
      },
      diagnostico: "Montículo de ramas secas y pastizal combustible expuesto a sol directo (39°C) y ráfagas de viento. Riesgo inminente de ignición accidental.",
      accionSugerida: "Cargue prioritario hacia trituradora del Sector Industrial para humectación y astillado."
    }
  ],

  retosComunidad: [
    {
      id: "reto-1",
      titulo: "Mide la Humedad en tu Barrio",
      puntos: 120,
      icono: "termometro",
      descripcion: "Verifica con tensiómetro o prueba de puño el suelo del Samán en Parque Bolívar o árbol apadrinado.",
      meta: "15 mediciones registradas en la semana"
    },
    {
      id: "reto-2",
      titulo: "Alerta de Poda sin Recoger",
      puntos: 100,
      icono: "tijeras",
      descripcion: "Fotografía y geolocaliza restos de ramas en andenes para integrarlos a la Ruta Climática.",
      meta: "Evita que las ramas terminen quemadas o en alcantarillas de La Dorada"
    },
    {
      id: "reto-3",
      titulo: "Guardián de Alcorques",
      puntos: 150,
      icono: "arbol-tropical",
      descripcion: "Monitorea que la corona de 15 cm alrededor del tronco permanezca limpia y libre de asfixia fúngica.",
      meta: "Garantiza aireación del cuello radicular"
    },
    {
      id: "reto-4",
      titulo: "Escaneo Ciudadano de QR",
      puntos: 80,
      icono: "qr",
      descripcion: "Escanea la placa física en cualquier árbol intervenido para certificar su estado y sumar puntos cívicos.",
      meta: "Trazabilidad comunitaria transparente"
    }
  ],

  simuladorParametros: {
    tempAmbienteBase: 35.4,
    irradianciaW: 900,
    coeficienteAmortiguacionMulch: 0.28,
    tasaEvaporacionDesnudo: 0.18,
    tasaEvaporacionAcolchado: 0.045
  }
};

if (typeof window !== "undefined") {
  window.PODA_DATA = PODA_DATA;
}
