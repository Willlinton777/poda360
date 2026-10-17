/**
 * YumaRaíz La Dorada - Motor de Decisión Ruta Climática
 * Algoritmo de valorización en cascada y balance económico frente al relleno La Doradita
 * Sin emojis - Uso estricto de Colombia Icons
 */

const DecisionModule = {
  state: {
    kilosPoda: 1500,
    tipoMaterial: 'mezcla', // 'leñoso', 'verde', 'troncos', 'mezcla'
    humedad: 'semiseca',    // 'verde', 'semiseca', 'seca'
    distanciaKm: 3.2
  },

  costos: {
    tarifaRellenoPorTonelada: 115000, // COP/t (Empresa de Servicios Públicos La Dorada)
    costoTrituradoPorTonelada: 34000, // COP/t (Operación con trituradora de martillos)
    costoTransportePorKmTon: 4500,    // COP/t*km
    kilosPorBioalcorque: 120          // kg de mulch necesarios por alcorque promedio
  },

  init() {
    this.bindEvents();
    this.calculate();
  },

  bindEvents() {
    const bindSelect = (id, prop) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('change', (e) => {
          this.state[prop] = e.target.value;
          this.calculate();
        });
      }
    };

    const sliderKilos = document.getElementById('decKilos');
    if (sliderKilos) {
      sliderKilos.addEventListener('input', (e) => {
        this.state.kilosPoda = parseFloat(e.target.value);
        const display = document.getElementById('decKilosVal');
        if (display) display.textContent = `${this.state.kilosPoda} kg`;
        this.calculate();
      });
    }

    const sliderDist = document.getElementById('decDistancia');
    if (sliderDist) {
      sliderDist.addEventListener('input', (e) => {
        this.state.distanciaKm = parseFloat(e.target.value);
        const display = document.getElementById('decDistanciaVal');
        if (display) display.textContent = `${this.state.distanciaKm} km`;
        this.calculate();
      });
    }

    bindSelect('decTipoMaterial', 'tipoMaterial');
    bindSelect('decHumedad', 'humedad');
  },

  calculate() {
    const { kilosPoda, tipoMaterial, distanciaKm } = this.state;
    const toneladas = kilosPoda / 1000;

    // Distribución en cascada según tipo de biomasa
    let pctBioalcorque = 0;
    let pctCompost = 0;
    let pctBiomasaSeca = 0;

    switch (tipoMaterial) {
      case 'leñoso':
        pctBioalcorque = 80;
        pctCompost = 15;
        pctBiomasaSeca = 5;
        break;
      case 'verde':
        pctBioalcorque = 20;
        pctCompost = 75;
        pctBiomasaSeca = 5;
        break;
      case 'troncos':
        pctBioalcorque = 30;
        pctCompost = 10;
        pctBiomasaSeca = 60;
        break;
      case 'mezcla':
      default:
        pctBioalcorque = 60;
        pctCompost = 30;
        pctBiomasaSeca = 10;
        break;
    }

    // Cálculos económicos
    // Si fuera al Relleno Sanitario La Doradita:
    const costoRellenoEvitado = toneladas * this.costos.tarifaRellenoPorTonelada;
    
    // Costo de procesamiento local (triturado + flete corto):
    const costoTriturado = toneladas * this.costos.costoTrituradoPorTonelada;
    const costoFleteLocal = toneladas * (distanciaKm * this.costos.costoTransportePorKmTon);
    const costoTotalYumaRaiz = costoTriturado + costoFleteLocal;

    // Ahorro neto para el municipio
    const ahorroNeto = Math.max(0, costoRellenoEvitado - costoTotalYumaRaiz);

    // Impacto ambiental y urbano
    const kilosParaBioalcorque = kilosPoda * (pctBioalcorque / 100);
    const arbolesProtegidos = Math.floor(kilosParaBioalcorque / this.costos.kilosPorBioalcorque);
    const co2EvitadoKg = +(toneladas * 280).toFixed(0); // Evita metano anaeróbico en relleno

    // Actualización visual en la interfaz
    const elRelleno = document.getElementById('decCostoRelleno');
    const elAhorro = document.getElementById('decAhorroNeto');
    const elArboles = document.getElementById('decArboles');
    const elCo2 = document.getElementById('decCo2');

    const fmtCOP = (val) => '$' + Math.round(val).toLocaleString('es-CO') + ' COP';

    if (elRelleno) elRelleno.textContent = fmtCOP(costoRellenoEvitado);
    if (elAhorro) elAhorro.textContent = fmtCOP(ahorroNeto);
    if (elArboles) elArboles.textContent = `${arbolesProtegidos} árboles`;
    if (elCo2) elCo2.textContent = `${co2EvitadoKg} kg`;

    // Barras de distribución en cascada
    const barBio = document.getElementById('decBarBioalcorque');
    const barComp = document.getElementById('decBarCompost');
    const barSeca = document.getElementById('decBarSeca');

    const txtBio = document.getElementById('decTxtBioalcorque');
    const txtComp = document.getElementById('decTxtCompost');
    const txtSeca = document.getElementById('decTxtSeca');

    if (barBio) barBio.style.width = `${pctBioalcorque}%`;
    if (barComp) barComp.style.width = `${pctCompost}%`;
    if (barSeca) barSeca.style.width = `${pctBiomasaSeca}%`;

    if (txtBio) txtBio.textContent = `${pctBioalcorque}% (${Math.round(kilosPoda * pctBioalcorque / 100)} kg)`;
    if (txtComp) txtComp.textContent = `${pctCompost}% (${Math.round(kilosPoda * pctCompost / 100)} kg)`;
    if (txtSeca) txtSeca.textContent = `${pctBiomasaSeca}% (${Math.round(kilosPoda * pctBiomasaSeca / 100)} kg)`;

    // Recomendación textual de destino
    const recBox = document.getElementById('decRecomendacionBox');
    if (recBox) {
      recBox.innerHTML = `
        <div class="decision-recommendation-card">
          <div class="decision-card-icon">
            <span class="co-icon" data-co-icon="circle-check" data-size="22"></span>
          </div>
          <div class="decision-card-content">
            <h4 class="decision-card-title">Hoja de Ruta Óptima Calculada</h4>
            <p class="decision-card-desc">
              Para este lote de <strong>${kilosPoda} kg</strong> ubicado a <strong>${distanciaKm} km</strong>, 
              la Ruta Climática determina que el <strong>${pctBioalcorque}%</strong> debe destinarse inmediatamente a 
              <strong>Bioalcorque</strong> en las islas de calor de la zona urbana, protegiendo <strong>${arbolesProtegidos} árboles</strong>. 
              El restante se envía a compostaje aeróbico en Vereda Concordia, generando un ahorro directo de <strong>${fmtCOP(ahorroNeto)}</strong> al municipio de La Dorada frente al relleno sanitario.
            </p>
          </div>
        </div>
      `;
      ColombiaIcons.renderAll();
    }
  }
};

if (typeof window !== 'undefined') {
  window.DecisionModule = DecisionModule;
}
