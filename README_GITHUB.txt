LAS 7 MENTALIDADES — WEB/PWA V1

Esta carpeta contiene la versión web basada en la versión Android que ya fue probada
con la impresora MHT-P11.

IMPORTANTE:
- No modificar app.js para eliminar AndroidPrinter. La app Android usa ese puente
  para imprimir directamente en la MHT-P11.
- En navegador de escritorio, la impresión se simula, como en la versión de desarrollo.
- En Android, cuando la futura APK cargue esta web, window.AndroidPrinter imprimirá
  físicamente.

PARA GITHUB PAGES:
1. Sube TODO el contenido de esta carpeta a la raíz del repositorio.
2. En GitHub: Settings > Pages.
3. En "Build and deployment", selecciona "Deploy from a branch".
4. Branch: main. Folder: / (root).
5. Guarda y espera a que GitHub publique el sitio.

La URL normalmente tendrá esta forma:
https://kvnespinal.github.io/LAS_7_MENTALIDADES/

NO CAMBIES TODAVÍA LA APK.
Primero comprobamos que la web publicada abre correctamente.
