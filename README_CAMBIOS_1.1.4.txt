LAS 7 MENTALIDADES — actualización WEB/PWA 1.1.4

Cambios realizados sobre la versión entregada por el usuario:

1. Reemplazo del texto superior “CRECE” por assets/01_CRECE.svg.
2. Reemplazo del título textual “LAS 7 MENTALIDADES / DEL LÍDER RETAIL” de la pantalla inicial por assets/05_GRAFISMO.svg.
3. Reemplazo de los placeholders inferiores por:
   - assets/02_MULTIPLAZA.svg
   - assets/03_METROMALL.svg
   - assets/04_GRUPO_ROBLE.svg
4. Los cuatro elementos de branding se cargan desde assets/ y se aplican desde app.js/style.css.
5. Los logos inferiores se mantienen como bloque común en las pantallas que ya utilizaban sponsors; se añadieron también a procesamiento y éxito para conservar una identidad consistente.
6. Se mejoró wrapText()/centerText() del ticket para que textos largos se dividan en líneas en lugar de truncarse.
7. Se añadieron los SVG al precache del Service Worker.
8. version.json pasa a 1.1.4 para activar el sistema de actualización controlada ya implementado.

IMPORTANTE — ticket físico:
El app.js actual entrega el ticket al Android mediante AndroidPrinter.printTicket() como texto ESC/POS. Los SVG no pueden ser impresos físicamente por la MHT-P11 solamente desde esta WEB. Para imprimir los tres logos reales en el ticket hay que modificar el puente nativo Android/ESC-POS para convertir/enviar bitmaps. Esa parte no se modifica en este paquete para no alterar el funcionamiento estable de la impresora.
