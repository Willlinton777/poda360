/**
 * YumaRaíz La Dorada - Módulo de Mapa Interactivo
 * Marcadores en Gota de Agua Invertida (Teardrop Pins) con Colombia Icons
 * Delimitación geográfica estricta a La Dorada, Caldas (sin API Key)
 */

const MapModule = {
  map: null,
  markersLayer: null,
  activeFilter: 'todos',
  selectedPoint: null,
  baseLayers: null,

  // Límites geográficos estrictos de La Dorada, Caldas
  boundsLaDorada: [
    [5.405, -74.720], // Suroccidente
    [5.495, -74.625]  // Nororiente
  ],
  centerLaDorada: [5.4542, -74.6648],

  init() {
    const mapContainer = document.getElementById('mapView');
    if (!mapContainer || this.map) return;

    // Inicializar mapa centrado y DELIMITADO estrictamente a La Dorada
    this.map = L.map('mapView', {
      zoomControl: false,
      attributionControl: false,
      center: this.centerLaDorada,
      zoom: 15,
      minZoom: 13,
      maxZoom: 18,
      maxBounds: this.boundsLaDorada,
      maxBoundsViscosity: 1.0 // Impide arrastrar fuera de La Dorada
    });

    // Controles de zoom ergonómicos en la esquina superior derecha
    L.control.zoom({ position: 'topright' }).addTo(this.map);

    // Capas base cartográficas 100% libres de API Key
    this.baseLayers = {
      topo: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 18,
        attribution: 'Esri, HERE, USGS'
      }),
      street: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
        attribution: 'Esri, HERE'
      }),
      satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 18,
        attribution: 'Esri, Maxar'
      })
    };

    // Capa base topográfica activa por defecto
    this.baseLayers.topo.addTo(this.map);

    // Control de cambio de capas en la esquina inferior izquierda
    L.control.layers(
      {
        "Mapa Topográfico": this.baseLayers.topo,
        "Calles Urbanas": this.baseLayers.street,
        "Vista Satelital": this.baseLayers.satellite
      },
      null,
      { position: 'bottomleft', collapsed: true }
    ).addTo(this.map);

    this.markersLayer = L.layerGroup().addTo(this.map);

    // Cargar marcadores iniciales
    this.renderMarkers();

    // Eventos de filtros
    this.setupFilters();

    // Redimensionar automáticamente ante cambios de pantalla
    window.addEventListener('resize', () => {
      if (this.map) this.map.invalidateSize();
    });

    // Asegurar renderizado inmediato de baldosas
    setTimeout(() => {
      if (this.map) this.map.invalidateSize();
    }, 200);
  },

  getPinColor(categoria) {
    switch (categoria) {
      case 'bioalcorque':
        return { bg: '#16a34a', border: '#15803d', shadow: 'rgba(22, 163, 74, 0.45)' };
      case 'calor':
        return { bg: '#dc2626', border: '#b91c1c', shadow: 'rgba(220, 38, 38, 0.45)' };
      case 'poda':
        return { bg: '#d97706', border: '#b45309', shadow: 'rgba(217, 119, 6, 0.45)' };
      case 'circular':
        return { bg: '#0284c7', border: '#0369a1', shadow: 'rgba(2, 132, 199, 0.45)' };
      default:
        return { bg: '#0f766e', border: '#115e59', shadow: 'rgba(15, 118, 110, 0.45)' };
    }
  },

  /**
   * Genera el HTML del marcador en forma de gota de agua invertida
   */
  buildTeardropPinHtml(punto) {
    const colors = this.getPinColor(punto.categoria);
    const iconSvg = ColombiaIcons.get(punto.colombiaIcon, { size: 18, color: '#ffffff' });

    return `
      <div class="teardrop-pin-root">
        <div class="teardrop-body" style="background: ${colors.bg}; border-color: ${colors.border}; box-shadow: 0 4px 14px ${colors.shadow};">
          <div class="teardrop-icon-slot">
            ${iconSvg}
          </div>
        </div>
        <div class="teardrop-shadow"></div>
      </div>
    `;
  },

  renderMarkers() {
    if (!this.markersLayer) return;
    this.markersLayer.clearLayers();

    const puntos = PODA_DATA.puntos.filter(p => {
      if (this.activeFilter === 'todos') return true;
      return p.categoria === this.activeFilter;
    });

    puntos.forEach(punto => {
      const pinHtml = this.buildTeardropPinHtml(punto);

      const customIcon = L.divIcon({
        className: 'custom-teardrop-container',
        html: pinHtml,
        iconSize: [40, 52],
        iconAnchor: [20, 52],
        popupAnchor: [0, -48]
      });

      const marker = L.marker(punto.coords, { icon: customIcon });

      marker.on('click', () => {
        this.selectPoint(punto);
      });

      this.markersLayer.addLayer(marker);
    });
  },

  setFilter(filterId, btnEl) {
    this.activeFilter = filterId || 'todos';
    document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
    if (btnEl) {
      btnEl.classList.add('active');
    } else {
      const target = document.querySelector(`.filter-pill[data-filter="${filterId}"]`);
      if (target) target.classList.add('active');
    }
    this.renderMarkers();
  },

  setupFilters() {
    const filterPills = document.querySelectorAll('.filter-pill');
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const filter = pill.getAttribute('data-filter') || 'todos';
        this.setFilter(filter, pill);
      });
    });
  },

  selectPoint(punto) {
    this.selectedPoint = punto;
    
    // Centrar suavemente en el marcador
    if (this.map) {
      this.map.panTo(punto.coords, { animate: true, duration: 0.6 });
    }

    const drawer = document.getElementById('detailDrawer');
    if (!drawer) return;

    const colors = this.getPinColor(punto.categoria);
    const iconSvg = ColombiaIcons.get(punto.colombiaIcon, { size: 24, color: '#ffffff' });

    let metricsHtml = '';

    if (punto.tipo === 'bioalcorque') {
      metricsHtml = `
        <div class="drawer-metrics-grid">
          <div class="metric-card bg-emerald-soft">
            <div class="metric-header">
              <span class="co-icon" data-co-icon="termometro" data-size="16"></span>
              <span class="metric-label">Temp. Suelo</span>
            </div>
            <div class="metric-val text-emerald">${punto.sensores.tempSueloTratado} °C</div>
            <div class="metric-sub">Testigo: ${punto.sensores.tempSueloTestigo} °C (<strong class="text-emerald">${punto.sensores.deltaTemp} °C</strong>)</div>
          </div>
          <div class="metric-card bg-blue-soft">
            <div class="metric-header">
              <span class="co-icon" data-co-icon="gota" data-size="16"></span>
              <span class="metric-label">Humedad Suelo</span>
            </div>
            <div class="metric-val text-blue">${punto.sensores.humedadSueloTratado}%</div>
            <div class="metric-sub">Testigo: ${punto.sensores.humedadSueloTestigo}% (<strong class="text-blue">+${punto.sensores.deltaHumedad}%</strong>)</div>
          </div>
        </div>
        <div class="drawer-info-row">
          <span class="drawer-info-label">Especie protegida:</span>
          <span class="drawer-info-value">${punto.especie}</span>
        </div>
        <div class="drawer-info-row">
          <span class="drawer-info-label">Origen de la poda:</span>
          <span class="drawer-info-value">${punto.origenPoda}</span>
        </div>
        <div class="drawer-info-row">
          <span class="drawer-info-label">Autonomía hídrica:</span>
          <span class="drawer-info-value">${punto.sensores.retencionRiego}</span>
        </div>
      `;
    } else if (punto.tipo === 'calor') {
      metricsHtml = `
        <div class="drawer-metrics-grid">
          <div class="metric-card bg-red-soft">
            <div class="metric-header">
              <span class="co-icon" data-co-icon="fuego-llama" data-size="16"></span>
              <span class="metric-label">Temp. Superficie</span>
            </div>
            <div class="metric-val text-red">${punto.sensores ? punto.sensores.tempSuperficieSuelo : 42.8} °C</div>
            <div class="metric-sub">${punto.estado}</div>
          </div>
        </div>
        <div class="drawer-info-box">
          <p class="drawer-info-desc">${punto.diagnostico}</p>
          <div class="drawer-action-tip">
            <strong>Acción requerida:</strong> ${punto.accionSugerida}
          </div>
        </div>
      `;
    } else if (punto.tipo === 'poda') {
      metricsHtml = `
        <div class="drawer-metrics-grid">
          <div class="metric-card bg-amber-soft">
            <div class="metric-header">
              <span class="co-icon" data-co-icon="tijeras" data-size="16"></span>
              <span class="metric-label">Volumen Acopiado</span>
            </div>
            <div class="metric-val text-amber">${punto.volumenKg} kg</div>
            <div class="metric-sub">Humedad vegetal: ${punto.humedadBiomasa}%</div>
          </div>
        </div>
        <div class="drawer-info-row">
          <span class="drawer-info-label">Destino sugerido:</span>
          <span class="drawer-info-value">${punto.decisionRutaClimatica.destinoRecomendado}</span>
        </div>
        <div class="drawer-info-row">
          <span class="drawer-info-label">Ahorro en vertedero:</span>
          <span class="drawer-info-value text-emerald">${punto.decisionRutaClimatica.ahorroTonelaje}</span>
        </div>
      `;
    } else {
      metricsHtml = `
        <div class="drawer-info-box">
          <div class="drawer-info-row">
            <span class="drawer-info-label">Capacidad operativa:</span>
            <span class="drawer-info-value">${punto.capacidadMensual}</span>
          </div>
          <p class="drawer-info-desc" style="margin-top: 8px;">${punto.procesos}</p>
          <div class="drawer-action-tip">
            <strong>Impacto económico:</strong> ${punto.ahorroAcumulado}
          </div>
        </div>
      `;
    }

    drawer.innerHTML = `
      <div class="drawer-card">
        <div class="drawer-header">
          <div class="drawer-avatar" style="background: ${colors.bg};">
            ${iconSvg}
          </div>
          <div class="drawer-title-group">
            <div class="drawer-category-badge" style="color: ${colors.bg}; border-color: ${colors.border};">
              ${punto.categoria.toUpperCase()}
            </div>
            <h3 class="drawer-title">${punto.nombre}</h3>
            <p class="drawer-subtitle">${punto.ubicacion}</p>
          </div>
          <button class="drawer-close-btn" onclick="MapModule.closeDrawer()" aria-label="Cerrar detalle">
            <span class="co-icon" data-co-icon="cerrar" data-size="18"></span>
          </button>
        </div>

        <div class="drawer-content">
          ${metricsHtml}
        </div>

        <div class="drawer-footer">
          <button class="btn btn-primary btn-block" onclick="App.openQrModal('${punto.codigoQR}')">
            <span class="co-icon" data-co-icon="qr" data-size="18"></span>
            <span>Ver Ficha Trazabilidad QR</span>
          </button>
          ${punto.tipo === 'bioalcorque' ? `
            <button class="btn btn-secondary btn-block mt-2" onclick="App.navigateTo('screenBioalcorque')">
              <span class="co-icon" data-co-icon="arbol-tropical" data-size="18"></span>
              <span>Abrir Laboratorio Experimental</span>
            </button>
          ` : ''}
          ${punto.tipo === 'poda' ? `
            <button class="btn btn-secondary btn-block mt-2" onclick="App.navigateTo('screenDecision')">
              <span class="co-icon" data-co-icon="papelera-reciclaje" data-size="18"></span>
              <span>Procesar en Ruta Climática</span>
            </button>
          ` : ''}
        </div>
      </div>
    `;

    drawer.classList.add('open');
    ColombiaIcons.renderAll();
  },

  closeDrawer() {
    const drawer = document.getElementById('detailDrawer');
    if (drawer) drawer.classList.remove('open');
    this.selectedPoint = null;
  }
};

if (typeof window !== 'undefined') {
  window.MapModule = MapModule;
}
