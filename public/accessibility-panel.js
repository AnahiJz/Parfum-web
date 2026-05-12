class AccessibilityPanel extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        // Estado inicial
        this.state = {
            isOpen: false,
            darkMode: false,
            fontSize: 100,
            voiceEnabled: false,
            highContrast: false,
            guidedReading: false
        };

        // Elementos auxiliares fuera del Shadow DOM
        this.guideElement = null;
        this.narratorHandler = this.handleNarrator.bind(this);
        this.mouseMoveHandler = this.handleMouseMove.bind(this);
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    font-family: system-ui, -apple-system, sans-serif;
                    --bg-color: #0F1428;
                    --panel-bg: rgba(15, 20, 40, 0.95);
                    --accent-main: #FBBC04;
                    --accent-hover: #F59E0B;
                    --text-main: #f8fafc;
                    --text-muted: #94a3b8;
                    --border-color: rgba(251, 188, 4, 0.2);
                }

                /* Botón flotante */
                .fab {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    width: 56px;
                    height: 56px;
                    background: var(--accent-main);
                    border: none;
                    border-radius: 50%;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.4);
                    cursor: pointer;
                    z-index: 2147483647;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.3s ease, background 0.3s ease;
                }
                .fab:hover {
                    transform: scale(1.1);
                    background: var(--accent-hover);
                }
                .fab svg {
                    width: 28px;
                    height: 28px;
                    fill: #111;
                    transition: transform 0.3s ease;
                }
                .fab.open svg {
                    transform: rotate(90deg);
                }

                /* Panel Overlay (fondo) */
                .panel-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: rgba(0,0,0,0.5);
                    z-index: 2147483646;
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.3s ease;
                    backdrop-filter: blur(4px);
                }
                .panel-overlay.open {
                    opacity: 1;
                    pointer-events: all;
                }

                /* Panel Lateral */
                .panel {
                    position: fixed;
                    bottom: 20px;
                    right: -350px;
                    width: 320px;
                    background: var(--panel-bg);
                    border: 1px solid var(--border-color);
                    border-radius: 16px;
                    box-shadow: -5px 0 25px rgba(0,0,0,0.5);
                    z-index: 2147483647;
                    transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    padding: 24px;
                    box-sizing: border-box;
                    color: var(--text-main);
                    backdrop-filter: blur(10px);
                }
                .panel.open {
                    right: 90px;
                }

                /* Header del panel */
                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid var(--border-color);
                    padding-bottom: 12px;
                    margin-bottom: 16px;
                }
                .header h2 {
                    margin: 0;
                    font-size: 18px;
                    color: var(--accent-main);
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .close-btn {
                    background: none;
                    border: none;
                    color: var(--text-muted);
                    font-size: 24px;
                    cursor: pointer;
                    transition: color 0.2s;
                }
                .close-btn:hover {
                    color: #ef4444;
                }

                /* Controles */
                .control-group {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                .control-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .control-item label {
                    flex: 1;
                    font-size: 14px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                
                /* Checkboxes nativos pero estéticos */
                input[type="checkbox"] {
                    appearance: none;
                    width: 20px;
                    height: 20px;
                    border: 2px solid var(--text-muted);
                    border-radius: 4px;
                    background: transparent;
                    cursor: pointer;
                    position: relative;
                    transition: all 0.2s;
                }
                input[type="checkbox"]:checked {
                    background: var(--accent-main);
                    border-color: var(--accent-main);
                }
                input[type="checkbox"]:checked::after {
                    content: '✔';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    color: #111;
                    font-size: 12px;
                    font-weight: bold;
                }

                /* Slider */
                .slider-container {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .slider-header {
                    display: flex;
                    justify-content: space-between;
                    font-size: 14px;
                }
                .slider-value {
                    color: var(--accent-main);
                    font-weight: bold;
                }
                input[type="range"] {
                    -webkit-appearance: none;
                    width: 100%;
                    height: 6px;
                    background: rgba(255,255,255,0.1);
                    border-radius: 3px;
                    outline: none;
                }
                input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: var(--accent-main);
                    cursor: pointer;
                    transition: transform 0.1s;
                }
                input[type="range"]::-webkit-slider-thumb:hover {
                    transform: scale(1.2);
                }

                hr {
                    border: none;
                    border-top: 1px solid var(--border-color);
                    margin: 4px 0;
                }
            </style>

            <div class="panel-overlay" id="overlay"></div>

            <button class="fab" id="fab" aria-label="Abrir panel de accesibilidad">
                <svg viewBox="0 0 24 24">
                    <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.06-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.73,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.06,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.43-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.49-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
                </svg>
            </button>

            <div class="panel" id="panel" role="dialog" aria-modal="true" aria-label="Configuración de Accesibilidad">
                <div class="header">
                    <h2>⚙️ Configuración</h2>
                    <button class="close-btn" id="close-btn" aria-label="Cerrar panel">✕</button>
                </div>

                <div class="control-group">
                    <div class="control-item">
                        <input type="checkbox" id="toggle-theme" />
                        <label for="toggle-theme">🌙 Modo Nocturno / Claro</label>
                    </div>

                    <div class="slider-container">
                        <div class="slider-header">
                            <label for="slider-text">Tamaño de Texto</label>
                            <span class="slider-value" id="text-size-val">100%</span>
                        </div>
                        <input type="range" id="slider-text" min="100" max="200" step="10" value="100" />
                    </div>

                    <hr/>

                    <div class="control-item">
                        <input type="checkbox" id="toggle-voice" />
                        <label for="toggle-voice">🔊 Narrador de Voz</label>
                    </div>

                    <div class="control-item">
                        <input type="checkbox" id="toggle-contrast" />
                        <label for="toggle-contrast">◎ Contraste Alto</label>
                    </div>

                    <div class="control-item">
                        <input type="checkbox" id="toggle-guide" />
                        <label for="toggle-guide">👁 Lectura Guiada</label>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        const sr = this.shadowRoot;
        const fab = sr.getElementById('fab');
        const panel = sr.getElementById('panel');
        const overlay = sr.getElementById('overlay');
        const closeBtn = sr.getElementById('close-btn');

        const togglePanel = () => {
            this.state.isOpen = !this.state.isOpen;
            if (this.state.isOpen) {
                panel.classList.add('open');
                overlay.classList.add('open');
                fab.classList.add('open');
            } else {
                panel.classList.remove('open');
                overlay.classList.remove('open');
                fab.classList.remove('open');
            }
        };

        fab.addEventListener('click', togglePanel);
        closeBtn.addEventListener('click', togglePanel);
        overlay.addEventListener('click', togglePanel);

        // Controles lógicos
        sr.getElementById('toggle-theme').addEventListener('change', (e) => {
            this.state.darkMode = e.target.checked;
            document.body.classList.toggle('light-mode', this.state.darkMode);
        });

        sr.getElementById('slider-text').addEventListener('input', (e) => {
            const val = e.target.value;
            this.state.fontSize = val;
            sr.getElementById('text-size-val').textContent = val + '%';
            document.documentElement.style.fontSize = val + '%';
        });

        sr.getElementById('toggle-voice').addEventListener('change', (e) => {
            this.state.voiceEnabled = e.target.checked;
            if (this.state.voiceEnabled) {
                document.body.addEventListener('mouseover', this.narratorHandler);
            } else {
                document.body.removeEventListener('mouseover', this.narratorHandler);
                window.speechSynthesis.cancel();
            }
        });

        sr.getElementById('toggle-contrast').addEventListener('change', (e) => {
            this.state.highContrast = e.target.checked;
            if (this.state.highContrast) {
                document.body.style.filter = "contrast(1.5) saturate(1.2)";
            } else {
                document.body.style.filter = "none";
            }
        });

        sr.getElementById('toggle-guide').addEventListener('change', (e) => {
            this.state.guidedReading = e.target.checked;
            if (this.state.guidedReading) {
                this.createGuide();
                document.addEventListener('mousemove', this.mouseMoveHandler);
            } else {
                this.removeGuide();
                document.removeEventListener('mousemove', this.mouseMoveHandler);
            }
        });
    }

    // Funciones del Sistema de Accesibilidad Global
    handleNarrator(e) {
        if (!this.state.voiceEnabled) return;
        
        // Evitar leer en contenedores muy genéricos
        if (['DIV', 'SECTION', 'MAIN', 'BODY'].includes(e.target.tagName)) return;

        const text = e.target.innerText || e.target.getAttribute('aria-label') || e.target.alt;
        
        if (text && text.trim().length > 0) {
            window.speechSynthesis.cancel(); // Parar lectura anterior
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'es-ES';
            window.speechSynthesis.speak(utterance);
        }
    }

    createGuide() {
        if (!document.getElementById('a11y-global-guide')) {
            this.guideElement = document.createElement('div');
            this.guideElement.id = 'a11y-global-guide';
            Object.assign(this.guideElement.style, {
                position: 'fixed',
                left: '0',
                width: '100vw',
                height: '8px',
                backgroundColor: 'rgba(251, 188, 4, 0.4)',
                pointerEvents: 'none',
                zIndex: '2147483640',
                boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                transition: 'top 0.05s linear'
            });
            document.body.appendChild(this.guideElement);
        }
    }

    removeGuide() {
        const guide = document.getElementById('a11y-global-guide');
        if (guide) guide.remove();
        this.guideElement = null;
    }

    handleMouseMove(e) {
        if (this.guideElement) {
            this.guideElement.style.top = (e.clientY + 25) + 'px';
        }
    }
}

// Registrar el componente
customElements.define('accessibility-panel', AccessibilityPanel);
