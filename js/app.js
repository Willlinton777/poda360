/**
 * YumaRaíz La Dorada - Aplicación Principal y Controlador General
 * Reto 4 - Rally Latinoamericano de Innovación 2026
 * Sin emojis - Uso estricto de Colombia Icons
 */

const App = {
  currentScreen: 'screenInicio',
  readingRulerActive: false,

  iniciarDemoGuiada() {
    this.navigateTo('screenMapa');
    setTimeout(() => {
      if (window.MapModule) {
        if (!MapModule.map) {
          MapModule.init();
        } else {
          MapModule.map.invalidateSize();
        }
        if (window.PODA_DATA && PODA_DATA.puntos && PODA_DATA.puntos.length > 0) {
          MapModule.selectPoint(PODA_DATA.puntos[0]);
        }
      }
    }, 250);
  },

  init() {
    console.log('[YumaRaíz] Inicializando plataforma...');

    try { ColombiaIcons.renderAll(); } catch(e) { console.warn('ColombiaIcons renderAll:', e); }
    try { if (window.MapModule) MapModule.init(); } catch(e) { console.error('MapModule.init error:', e); }
    try { if (window.BioalcorqueModule) BioalcorqueModule.init(); } catch(e) { console.error('BioalcorqueModule error:', e); }
    try { if (window.DecisionModule) DecisionModule.init(); } catch(e) { console.error('DecisionModule error:', e); }
    try { this.setupNavigation(); } catch(e) { console.error('setupNavigation error:', e); }
    try { this.setupAccessibility(); } catch(e) { console.error('setupAccessibility error:', e); }
    try { this.renderRetosComunitarios(); } catch(e) { console.error('renderRetos error:', e); }

    // Escuchar atajos de teclado (ESC para cerrar modales)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllModals();
      }
    });

    try { ColombiaIcons.renderAll(); } catch(e) {}
  },

  setupNavigation() {
    const navButtons = document.querySelectorAll('[data-target-screen]');
    navButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const screenId = btn.getAttribute('data-target-screen');
        if (screenId) {
          this.navigateTo(screenId);
        }
      });
    });
  },

  navigateTo(screenId) {
    const screens = document.querySelectorAll('.screen-view, .app-screen');
    screens.forEach(s => {
      s.classList.remove('active');
      s.style.display = 'none';
    });

    const target = document.getElementById(screenId);
    if (target) {
      target.classList.add('active');
      target.style.display = 'flex';
      this.currentScreen = screenId;
    }

    // Actualizar botones de navegación activos
    document.querySelectorAll('[data-target-screen]').forEach(btn => {
      if (btn.getAttribute('data-target-screen') === screenId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Si se activa el mapa, asegurar redimensionado perfecto
    if (screenId === 'screenMapa' && window.MapModule) {
      setTimeout(() => {
        if (!MapModule.map) {
          MapModule.init();
        } else {
          MapModule.map.invalidateSize();
        }
      }, 100);
      setTimeout(() => {
        if (MapModule.map) MapModule.map.invalidateSize();
      }, 300);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    ColombiaIcons.renderAll();
  },

  // Manejo de Modales
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('open');
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      ColombiaIcons.renderAll();
    }
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('open');
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  },

  closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(m => {
      m.classList.remove('open');
      m.style.display = 'none';
    });
    document.body.style.overflow = '';
  },

  openQrModal(codigoQR) {
    const qrData = BioalcorqueModule.getQrData(codigoQR || 'QR-DOR-001');
    const container = document.getElementById('qrModalContent');
    if (container) {
      container.innerHTML = `
        <div class="qr-modal-body">
          <div class="qr-code-graphic">
            <svg class="qr-vector-box" viewBox="0 0 160 160" width="160" height="160">
              <rect width="160" height="160" fill="#ffffff" rx="12"/>
              <!-- Esquinas QR características -->
              <rect x="15" y="15" width="40" height="40" fill="#1e293b" rx="4"/>
              <rect x="23" y="23" width="24" height="24" fill="#ffffff" rx="2"/>
              <rect x="29" y="29" width="12" height="12" fill="#15803d" rx="1"/>

              <rect x="105" y="15" width="40" height="40" fill="#1e293b" rx="4"/>
              <rect x="113" y="23" width="24" height="24" fill="#ffffff" rx="2"/>
              <rect x="119" y="29" width="12" height="12" fill="#15803d" rx="1"/>

              <rect x="15" y="105" width="40" height="40" fill="#1e293b" rx="4"/>
              <rect x="23" y="113" width="24" height="24" fill="#ffffff" rx="2"/>
              <rect x="29" y="119" width="12" height="12" fill="#15803d" rx="1"/>

              <!-- Patrón de bits simulado de alta fidelidad -->
              <rect x="65" y="20" width="10" height="10" fill="#1e293b"/>
              <rect x="80" y="20" width="15" height="10" fill="#1e293b"/>
              <rect x="65" y="35" width="25" height="10" fill="#1e293b"/>
              <rect x="20" y="65" width="12" height="12" fill="#1e293b"/>
              <rect x="40" y="65" width="15" height="12" fill="#1e293b"/>
              <rect x="65" y="60" width="30" height="30" fill="#15803d" rx="4"/>
              <rect x="105" y="65" width="35" height="12" fill="#1e293b"/>
              <rect x="120" y="85" width="20" height="15" fill="#1e293b"/>
              <rect x="65" y="100" width="12" height="20" fill="#1e293b"/>
              <rect x="85" y="100" width="20" height="12" fill="#1e293b"/>
              <rect x="75" y="125" width="30" height="15" fill="#1e293b"/>
              <rect x="120" y="120" width="20" height="20" fill="#1e293b"/>
            </svg>
            <div class="qr-badge-chip">${qrData.codigo}</div>
          </div>

          <div class="qr-details-sheet">
            <h4 class="qr-sheet-title">${qrData.titulo}</h4>
            <div class="qr-sheet-location">
              <span class="co-icon" data-co-icon="mapa" data-size="16"></span>
              <span>${qrData.ubicacion}</span>
            </div>

            <div class="qr-metrics-table">
              <div class="qr-table-row">
                <span class="qr-th">Fecha Instalación:</span>
                <span class="qr-td">${qrData.fecha}</span>
              </div>
              <div class="qr-table-row">
                <span class="qr-th">Lote de Origen:</span>
                <span class="qr-td">${qrData.loteOrigen}</span>
              </div>
              <div class="qr-table-row">
                <span class="qr-th">Capa Bioalcorque:</span>
                <span class="qr-td">${qrData.espesorMulch}</span>
              </div>
              <div class="qr-table-row">
                <span class="qr-th">Despeje de Tronco:</span>
                <span class="qr-td text-emerald font-bold">${qrData.despejeTronco}</span>
              </div>
              <div class="qr-table-row">
                <span class="qr-th">Atenuación Térmica:</span>
                <span class="qr-td text-emerald font-bold">${qrData.temperaturaSuelo}</span>
              </div>
              <div class="qr-table-row">
                <span class="qr-th">Retención Hídrica:</span>
                <span class="qr-td text-blue font-bold">${qrData.humedadSuelo}</span>
              </div>
              <div class="qr-table-row">
                <span class="qr-th">Comité Guardián:</span>
                <span class="qr-td">${qrData.guardianes}</span>
              </div>
            </div>

            <div class="qr-validation-badge">
              <span class="co-icon" data-co-icon="circle-check" data-size="18"></span>
              <span>Ficha verificada en la Cadena de Custodia Municipal de La Dorada</span>
            </div>
          </div>
        </div>
      `;
    }
    this.openModal('modalQr');
  },

  renderRetosComunitarios() {
    const listContainer = document.getElementById('retosList');
    if (!listContainer) return;

    listContainer.innerHTML = PODA_DATA.retosComunidad.map(reto => `
      <div class="reto-card">
        <div class="reto-card-header">
          <div class="reto-icon-slot">
            <span class="co-icon" data-co-icon="${reto.icono}" data-size="24"></span>
          </div>
          <div class="reto-title-group">
            <h4 class="reto-card-title">${reto.titulo}</h4>
            <span class="reto-badge-pts">+${reto.puntos} Puntos Cívicos</span>
          </div>
        </div>
        <p class="reto-card-desc">${reto.descripcion}</p>
        <div class="reto-meta-row">
          <span class="reto-meta-label">Meta comunitaria:</span>
          <span class="reto-meta-value">${reto.meta}</span>
        </div>
        <button class="btn btn-outline btn-block mt-3" onclick="App.completarReto('${reto.id}')">
          <span class="co-icon" data-co-icon="square-check" data-size="16"></span>
          <span>Participar en este Reto</span>
        </button>
      </div>
    `).join('');
  },

  completarReto(retoId) {
    const reto = PODA_DATA.retosComunidad.find(r => r.id === retoId);
    alert(`¡Gracias por tu aporte cívico en La Dorada! Has sumado ${reto ? reto.puntos : 100} puntos cívicos para la adaptación climática de tu barrio.`);
  },

  setupAccessibility() {
    const ruler = document.getElementById('readingRuler');
    
    // Regla de lectura
    window.addEventListener('mousemove', (e) => {
      if (this.readingRulerActive && ruler) {
        ruler.style.top = `${e.clientY - 15}px`;
      }
    });

    const toggleRulerBtn = document.getElementById('toggleRulerBtn');
    if (toggleRulerBtn) {
      toggleRulerBtn.addEventListener('click', () => {
        this.readingRulerActive = !this.readingRulerActive;
        if (ruler) ruler.style.display = this.readingRulerActive ? 'block' : 'none';
        toggleRulerBtn.classList.toggle('active', this.readingRulerActive);
      });
    }

    // Aumento de fuente
    const fontBtns = document.querySelectorAll('[data-font-size]');
    fontBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const size = btn.getAttribute('data-font-size');
        document.documentElement.style.fontSize = size === 'large' ? '18px' : size === 'xlarge' ? '20px' : '16px';
        fontBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    // Alto contraste
    const toggleContrastBtn = document.getElementById('toggleContrastBtn');
    if (toggleContrastBtn) {
      toggleContrastBtn.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
        toggleContrastBtn.classList.toggle('active');
      });
    }
  },

  submitReporteCiudadano(e) {
    e.preventDefault();
    const tipo = document.getElementById('repTipo').value;
    const direccion = document.getElementById('repDireccion').value;
    const descripcion = document.getElementById('repDescripcion').value;

    alert(`¡Reporte recibido con éxito!\nTipo: ${tipo}\nUbicación: ${direccion}\nEl equipo de Ruta Climática La Dorada ha programado la inspección.`);
    this.closeModal('modalReporte');
    e.target.reset();
  }
};

// Autoarranque
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

if (typeof window !== 'undefined') {
  window.App = App;
}
