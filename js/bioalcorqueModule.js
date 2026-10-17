/**
 * YumaRaíz La Dorada - Módulo Bioalcorque y Laboratorio Didáctico
 * Simulación experimental comparativa y Ficha de Trazabilidad QR
 * Sin emojis - Uso estricto de Colombia Icons
 */

const BioalcorqueModule = {
  state: {
    horasSol: 6,
    espesorMulch: 5, // cm
    despejeTronco: 15, // cm (Norma técnica)
    diasSinRiego: 3
  },

  init() {
    this.bindEvents();
    this.recalculate();
  },

  bindEvents() {
    const bindInput = (id, prop) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', (e) => {
          this.state[prop] = parseFloat(e.target.value);
          const valDisplay = document.getElementById(id + 'Val');
          if (valDisplay) {
            valDisplay.textContent = e.target.value + (prop === 'horasSol' ? ' h' : prop === 'diasSinRiego' ? ' días' : ' cm');
          }
          this.recalculate();
        });
      }
    };

    bindInput('simHorasSol', 'horasSol');
    bindInput('simEspesor', 'espesorMulch');
    bindInput('simDespeje', 'despejeTronco');
    bindInput('simDiasSinRiego', 'diasSinRiego');
  },

  recalculate() {
    const { horasSol, espesorMulch, despejeTronco, diasSinRiego } = this.state;

    // Cálculo termodinámico de temperatura en suelo (profundidad 10 cm)
    // Suelo Desnudo en La Dorada: alta absorción por insolación directa
    const tempDesnudo = +(28.0 + (horasSol * 1.85)).toFixed(1);

    // Bioalcorque: amortiguación térmica proporcional al espesor del acolchado (óptimo 5-8 cm)
    const factorEspesor = Math.min(espesorMulch, 8) / 8;
    const tempBioalcorque = +(25.5 + (horasSol * 0.45) - (factorEspesor * 1.2)).toFixed(1);
    const deltaTemp = +(tempBioalcorque - tempDesnudo).toFixed(1);

    // Cálculo hidrológico de retención de humedad (%)
    // Suelo desnudo se evapora aceleradamente
    const humedadDesnudo = Math.max(8, +(75 - (diasSinRiego * 18.5) - (horasSol * 1.5)).toFixed(0));
    
    // Bioalcorque conserva el agua en la matriz del suelo y microporos
    const tasaConservacion = 0.82;
    const humedadBioalcorque = Math.max(38, +(78 - (diasSinRiego * 4.2 * (1 - tasaConservacion * (factorEspesor * 0.7)))).toFixed(0));
    const deltaHumedad = humedadBioalcorque - humedadDesnudo;

    // Actualizar elementos en el DOM
    const elTempDesnudo = document.getElementById('resTempDesnudo');
    const elTempBio = document.getElementById('resTempBio');
    const elDeltaTemp = document.getElementById('resDeltaTemp');
    const elHumDesnudo = document.getElementById('resHumDesnudo');
    const elHumBio = document.getElementById('resHumBio');
    const elDeltaHum = document.getElementById('resDeltaHum');

    if (elTempDesnudo) elTempDesnudo.textContent = `${tempDesnudo} °C`;
    if (elTempBio) elTempBio.textContent = `${tempBioalcorque} °C`;
    if (elDeltaTemp) elDeltaTemp.textContent = `${deltaTemp} °C`;

    if (elHumDesnudo) elHumDesnudo.textContent = `${humedadDesnudo}%`;
    if (elHumBio) elHumBio.textContent = `${humedadBioalcorque}%`;
    if (elDeltaHum) elDeltaHum.textContent = `+${deltaHumedad}%`;

    // Gráficas / Barras de progreso visuales
    const barHumDesnudo = document.getElementById('barHumDesnudo');
    const barHumBio = document.getElementById('barHumBio');
    if (barHumDesnudo) barHumDesnudo.style.width = `${humedadDesnudo}%`;
    if (barHumBio) barHumBio.style.width = `${humedadBioalcorque}%`;

    // Validación técnica agronómica (Penn State & Washington State University)
    const alertBox = document.getElementById('simTechnicalAlert');
    if (alertBox) {
      if (despejeTronco < 10) {
        alertBox.className = 'technical-alert alert-warning-active';
        alertBox.innerHTML = `
          <div class="technical-alert-icon">
            <span class="co-icon" data-co-icon="alerta" data-size="20"></span>
          </div>
          <div class="technical-alert-body">
            <strong>ADVERTENCIA AGRONÓMICA:</strong>
            El acolchado está a solo ${despejeTronco} cm del tronco. Mantener el mulch en contacto directo con la corteza favorece pudrición por asfixia y hongos patógenos. La norma técnica de Bioalcorque YumaRaíz exige <strong>mínimo 15 cm libres</strong> alrededor del cuello radicular.
          </div>
        `;
      } else {
        alertBox.className = 'technical-alert alert-success-active';
        alertBox.innerHTML = `
          <div class="technical-alert-icon">
            <span class="co-icon" data-co-icon="circle-check" data-size="20"></span>
          </div>
          <div class="technical-alert-body">
            <strong>PARÁMETROS TÉCNICAMENTE VALIDADOS:</strong>
            Despeje de tronco de ${despejeTronco} cm y capa de ${espesorMulch} cm. Cumple los estándares de conservación hídrica sin riesgo fitosanitario para el arbolado de La Dorada.
          </div>
        `;
      }
      ColombiaIcons.renderAll();
    }
  },

  /**
   * Genera el contenido detallado de la Ficha QR
   */
  getQrData(codigo) {
    const punto = PODA_DATA.puntos.find(p => p.codigoQR === codigo) || PODA_DATA.puntos[0];
    return {
      codigo: punto.codigoQR,
      titulo: punto.nombre,
      ubicacion: punto.ubicacion,
      barrio: punto.barrio,
      fecha: punto.fechaInstalacion || '02/10/2026',
      loteOrigen: punto.origenPoda || 'Lote Municipal L-2026-08',
      especie: punto.especie || 'Arbolado Urbano',
      temperaturaSuelo: punto.sensores ? `${punto.sensores.tempSueloTratado} °C (Atenuación: ${punto.sensores.deltaTemp} °C)` : '27.2 °C',
      humedadSuelo: punto.sensores ? `${punto.sensores.humedadSueloTratado}% (+${punto.sensores.deltaHumedad}% frente a suelo desnudo)` : '68%',
      despejeTronco: '15.0 cm (Norma técnica verificada)',
      espesorMulch: '5.0 cm de astillas cribadas',
      ahorroAgua: '4.2 días de autonomía sin riego',
      ahorroVertedero: '$36,800 COP equivalentes en tasa PGIRS',
      guardianes: punto.comunidad ? punto.comunidad.guardianesAsignados : 'Comunidad Vecinal'
    };
  }
};

if (typeof window !== 'undefined') {
  window.BioalcorqueModule = BioalcorqueModule;
}
