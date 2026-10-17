import re

new_retos = '''retos: [
    {
      id: "reto-poda-1",
      titulo: "Separación Limpia de Biomasa",
      subtitulo: "Clasifica ramas y hojas sin escombros para trituración",
      categoria: "Economía Circular",
      icono: "✂️",
      color: "#356B3E",
      progreso: 70,
      metaTexto: "14 de 20 kg separados",
      semillas: 35,
      completado: false,
      descripcionDetallada: "Para que una rama pueda convertirse en astillas de Bioalcorque 360°, debe estar limpia, sin alambres, bolsas plásticas ni restos de escombros de construcción. Las impurezas dañan las cuchillas de la trituradora móvil municipal.",
      pasos: [
        "Separar las ramas leñosas de las hojas tiernas y restos de cocina.",
        "Retirar cualquier cuerda, plástico, clavo o alambre del material podado.",
        "Apilar el material en gavillas atadas con fique en un lugar sombreado para evitar ignición."
      ],
      preguntaValidacion: "¿Por qué es indispensable que las ramas de poda urbana estén libres de alambres y escombros antes de entrar al triturador?",
      opciones: [
        "Porque los metales y piedras fracturan las cuchillas de trituración y contaminan el acolchado.",
        "Porque el metal hace que el suelo se enfríe demasiado rápido.",
        "Para que las astillas tengan un color más claro en el parque."
      ],
      respuestaCorrecta: 0,
      explicacionRespuesta: "¡Correcto! Los metales y piedras averían la trituradora móvil y dejan fragmentos peligrosos en las zonas peatonales de los parques."
    },
    {
      id: "reto-poda-2",
      titulo: "Apadrina un Bioalcorque 360°",
      subtitulo: "Supervisa la cobertura de 5 cm y riega al atardecer",
      categoria: "Adaptación Climática",
      icono: "🌿",
      color: "#6F9E45",
      progreso: 50,
      metaTexto: "1 de 2 árboles apadrinados",
      semillas: 50,
      completado: false,
      descripcionDetallada: "Los Bioalcorques protegen las raíces de los árboles frente al sol abrasador de La Dorada. Los padrinos vecinales vigilan que el acolchado mantenga los 15 cm libres del tronco y riegan en horas frescas.",
      pasos: [
        "Escanear la placa QR del Bioalcorque más cercano a tu vivienda o colegio.",
        "Verificar que las astillas no toquen el tronco (debe haber 15 cm libres en círculo).",
        "Regar con 5 a 10 litros de agua después de las 6:00 PM o antes de las 7:30 AM."
      ],
      preguntaValidacion: "¿Cuál es la razón técnica para mantener 15 cm de separación sin astillas alrededor del tronco del árbol?",
      opciones: [
        "Prevenir la acumulación excesiva de humedad en la corteza que propicia hongos y asfixia radicular.",
        "Permitir que las hormigas suban más rápido por el tronco.",
        "Ahorrar astillas de madera para el siguiente árbol."
      ],
      respuestaCorrecta: 0,
      explicacionRespuesta: "¡Excelente! Apilar acolchado contra el tronco (efecto 'volcán') pudre la corteza y favorece infecciones fitosanitarias según guías de Penn State."
    },
    {
      id: "reto-poda-3",
      titulo: "Vigía de Biomasa Seca Combustible",
      subtitulo: "Reporta montículos secos en solares para evitar conflagraciones",
      categoria: "Prevención de Incendios",
      icono: "🔥",
      color: "#E63946",
      progreso: 80,
      metaTexto: "4 de 5 sectores inspeccionados",
      semillas: 40,
      completado: false,
      descripcionDetallada: "En verano y bajo el fenómeno de El Niño, la poda abandonada en andenes y lotes baldíos se deshidrata en menos de 48 horas, transformándose en material altamente combustible en sectores como Concordia y Japón.",
      pasos: [
        "Inspeccionar andenes o solares baldíos de tu cuadra.",
        "Reportar montículos secos con el botón 'Reportar Poda' del mapa territorial.",
        "Concientizar a vecinos: cero quemas de rastrojo o basura a cielo abierto."
      ],
      preguntaValidacion: "¿Qué factor intensifica el riesgo de que la poda seca cause un incendio en La Dorada a mediodía?",
      opciones: [
        "Temperaturas superiores a 40°C combinadas con baja humedad relativa y vidrios que actúan como lupa.",
        "El aumento del nivel del caudal del Río Magdalena.",
        "La siembra de árboles nativos en el malecón."
      ],
      respuestaCorrecta: 0,
      explicacionRespuesta: "¡Totalmente acertado! El calor extremo de La Dorada y la radiación solar incidente convierten la hojarasca seca en combustible listo para arder."
    },
    {
      id: "reto-poda-4",
      titulo: "Riego Eficiente en Horas Frescas",
      subtitulo: "Maximiza la infiltración del agua sin evaporación solar",
      categoria: "Seguridad Hídrica",
      icono: "💧",
      color: "#477FA8",
      progreso: 60,
      metaTexto: "3 de 5 riegos programados",
      semillas: 25,
      completado: false,
      descripcionDetallada: "Regar bajo el sol de mediodía (11:00 AM - 3:00 PM) provoca que más del 60% del agua se evapore antes de alcanzar las raíces profundas. Con el Bioalcorque, el riego al atardecer penetra y se conserva por días.",
      pasos: [
        "Programar el riego comunitario únicamente antes de las 8:00 AM o después de las 6:00 PM.",
        "Aplicar el agua suavemente sobre la capa de astillas sin lavar el sustrato.",
        "Reutilizar agua limpia del último enjuague de ropa o lavado de vegetales."
      ],
      preguntaValidacion: "¿Por qué el acolchado de astillas permite espaciar los riegos durante la sequía?",
      opciones: [
        "Porque actúa como una barrera aislante que reduce la evaporación superficial del suelo hasta en un 70%.",
        "Porque las astillas producen agua químicamente al calentarse.",
        "Porque atrae la lluvia hacia la cuadra."
      ],
      respuestaCorrecta: 0,
      explicacionRespuesta: "¡Correcto! La capa física de astillas bloquea los rayos solares directos, manteniendo el agua en la zona radicular por mucho más tiempo."
    }
  ],'''

with open('Magda - Olimpiadas/js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

start_marker = "retos: ["
end_marker = "mapaPuntos: ["

start_idx = content.find(start_marker)
end_idx = content.find(end_marker, start_idx)

if start_idx != -1 and end_idx != -1:
    new_content = content[:start_idx] + new_retos + "\n\n  " + content[end_idx:]
    with open('Magda - Olimpiadas/js/data.js', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("SUCCESS: Updated retos in Magda - Olimpiadas/js/data.js!")
else:
    print(f"FAILED to locate retos: start={start_idx}, end={end_idx}")

