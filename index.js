// Function to add alpha to colors.
const parse = require('parse-color');
const rgba = (color, alpha) => {
  const { rgb } = parse(color);
  if (!rgb) return color;
  return `rgba(${rgb.join(', ')}, ${alpha})`;
};

// Color palette
const colors = {
  black: '#263238',
  red: '#ff5252',
  green: '#9ccc65',
  yellow: '#fee94e',
  blue: '#2b98f0',
  magenta: '#b38bfc',
  cyan: '#68b6f3',
  white: '#eceff1',

  lightBlack: '#617d8a',
  lightRed: '#fc625d',
  lightGreen: '#9ccc65',
  lightYellow: '#fee94e',
  lightBlue: '#2b98f0',
  lightMagenta: '#b38bfc',
  lightCyan: '#68b6f3',
  lightWhite: '#ffffff',

  background: '#13181b',
};

// Vibrancy
exports.onWindow = browserWindow => browserWindow.setVibrancy('dark');

// Configuration
exports.decorateConfig = (config) => {
  const backgroundColor = rgba(
    colors.background,
    config.backgroundOpacity || 0.5
  )

  const headerOpacity = Object.assign({
    normal: 0.4,
    hover: 0.8
  }, config.headerOpacity)

  return Object.assign({}, config, {

    foregroundColor: colors.white,
    backgroundColor: backgroundColor,
    borderColor: 'transparent',
    cursorColor: colors.lightCyan,
    colors: colors,

    termCSS: `
      ${config.termCSS || ''}
      @keyframes blink-animation {
        to {
          background-color: transparent;
        }
      }
      .cursor-node[focus=true]:not([moving]) {
        animation: blink-animation .777s ease-in-out infinite;
        box-sizing: content-box !important;
        mix-blend-mode: difference;
      }
      ::-webkit-scrollbar {
        width: 7px;
      }
      ::-webkit-scrollbar-thumb {
        border-radius: 3.5px;
        background-color: rgba(236, 239, 241, 0.4);
      }
    `,

    css: `
      ${config.css || ''}
      .header_header {
        top: 0;
        left: 0;
        right: 0;
      }
      .header_header::before {
        content: '';
        position: absolute;
        display: block;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: ${backgroundColor};
        opacity: ${headerOpacity.normal};
        transition: opacity 250ms ease;
        z-index: -1;
      }
      .header_header:hover::before {
        opacity: ${headerOpacity.hover};
      }
      .hyperterm_main, .tab_tab, .tab_text {
        border: none !important;
        padding: 0 !important;
      }
      .tab {
        color: red !important;
      }
      .tab_tab::before {
        position: absolute;
        content: "";
        display: block;
        left: 0px;
        right: 0px;
        bottom: 0px;
        transition: border-color .3s ease-in-out;
        border-bottom: 3px solid transparent;
      }
      .tab_active::before {
        border-bottom: 3px solid #a04a92;
      }
      .splitpane_divider {
        margin: 0;
        background: ${rgba(colors.lightCyan, 0.2)} !important;
        transition: background 250ms ease;
      }
      .splitpane_divider:hover {
        background: ${rgba(colors.lightCyan, 0.5)} !important;
      }
    `
  })
}
