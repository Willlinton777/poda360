import os
import json

icons_dir = os.path.join('Magda - Olimpiadas', 'assets', 'icons', 'colombia')
icons_map = {}

for fname in os.listdir(icons_dir):
    if fname.endswith('.svg'):
        key = fname[:-4]
        with open(os.path.join(icons_dir, fname), 'r', encoding='utf-8') as f:
            icons_map[key] = f.read().strip()

js_code = f"""/**
 * COLOMBIA ICONS (Libreria Line-Icon inspirada en Colombia)
 * 24x24 px, stroke: 1.5px, stroke: currentColor, fill: none
 * Fuente oficial: https://colombia-icons.com/ por Miguel Teheran
 */

const COLOMBIA_ICONS = {json.dumps(icons_map, ensure_ascii=False, indent=2)};

const ColombiaIcons = {{
  get(name, options) {{
    options = options || {{}};
    const raw = COLOMBIA_ICONS[name];
    if (!raw) {{
      console.warn('[ColombiaIcons] Icono no encontrado:', name);
      return '<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><circle cx=\"12\" cy=\"12\" r=\"9\"/></svg>';
    }}
    const size = options.size || 24;
    const color = options.color || 'currentColor';
    const cls = options.className ? ' ' + options.className : '';
    
    let svg = raw
      .replace(/width="[^"]*"/, 'width="' + size + '"')
      .replace(/height="[^"]*"/, 'height="' + size + '"');
      
    if (!svg.includes('class=')) {{
      svg = svg.replace('<svg ', '<svg class=\"co-icon' + cls + '\" ');
    }} else if (options.className) {{
      svg = svg.replace(/class="([^"]*)"/, 'class=\"$1' + cls + '\"');
    }}
    
    if (color !== 'currentColor') {{
      svg = svg.replace(/stroke="currentColor"/g, 'stroke=\"' + color + '\"');
    }}
    return svg;
  }},

  renderAll() {{
    document.querySelectorAll('[data-colombia-icon]').forEach(el => {{
      const name = el.getAttribute('data-colombia-icon');
      const size = parseInt(el.getAttribute('data-size') || '20', 10);
      const color = el.getAttribute('data-color') || 'currentColor';
      const className = el.getAttribute('data-class') || '';
      el.innerHTML = this.get(name, {{ size, color, className }});
    }});
  }}
}};

if (typeof window !== 'undefined') {{
  window.ColombiaIcons = ColombiaIcons;
  window.COLOMBIA_ICONS = COLOMBIA_ICONS;
}}
"""

out_file = os.path.join('Magda - Olimpiadas', 'js', 'colombiaIcons.js')
with open(out_file, 'w', encoding='utf-8') as f:
    f.write(js_code)

print(f"Generated {out_file} with {len(icons_map)} icons!")

