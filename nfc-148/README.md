# Plantilla de tarjeta digital

## Archivos
- `index.html` — estructura, no la tocas por cliente
- `style.css` — estilos, no la tocas por cliente
- `script.js` — lógica de render, no la tocas por cliente
- `data.js` — **el único archivo que editas por cada cliente**

## Para una tarjeta nueva
1. Copia toda esta carpeta dentro de tu repo, con el nombre del cliente:
   `/juan`, `/maria-ferreteria`, etc.
2. Abre `data.js` de esa copia y cambia: nombre, rol, avatar, links,
   métodos de pago, y contraseña si aplica.
3. Sube los cambios (agrupa varias tarjetas por commit si vas a usar
   Cloudflare Pages, para no gastar builds del plan gratis).
4. La tarjeta queda en `tudominio.com/juan`.

## Contraseña
- `data.js` tiene `password: null` por defecto (sin contraseña).
- Si pones un texto ahí, se activa una pantalla de acceso antes de
  mostrar la tarjeta.
- Importante: es una protección de cliente (JavaScript), no seguridad
  real — cualquiera con conocimientos técnicos puede saltarla viendo
  el código fuente. Sirve como "acceso privado" para el cliente final,
  no para proteger información sensible.

## Personalización visual
- Colores y tipografías están como variables CSS al inicio de
  `style.css` (bloque `:root`). Cambiar el acento bronce (`--brass`)
  por otro color no rompe nada.
- Los íconos son SVG en línea dentro de `script.js` (objeto `ICONS`),
  fáciles de reemplazar si quieres otro estilo.

## Métodos de pago
El bloque `payment` en `data.js` acepta cualquier cantidad de métodos
(Nequi, Daviplata, Bancolombia, etc.) y cada uno tiene botón de copiar
al portapapeles.
