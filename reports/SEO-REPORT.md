# Auditoría e implementación SEO de Servistream

Fecha: 30 de septiembre de 2026. Dominio oficial: https://servistream.net/.

## Alcance y resultado comprobado

Se auditó y modificó el proyecto Astro local. La compilación genera 27 páginas: 26 indexables y una página 404 con `noindex`. La validación automatizada terminó con **cero errores** y el sitemap contiene las 26 URLs indexables. Los resultados corresponden al código compilado; **no se ha publicado esta implementación ni verificado su activación en el servidor**.

Se conservaron las rutas actuales, los servicios, los precios, los formularios y la identidad visual. No se crearon páginas geográficas artificiales, testimonios, calificaciones, certificaciones ni cifras comerciales. Las modificaciones visuales previas del proyecto se preservaron. Se inspeccionaron en navegador Inicio y Contacto; no se afirma haber revisado visualmente cada estado interactivo de las 26 páginas.

## A. Problemas SEO encontrados

- Ausencia de canonical, metadatos sociales y datos estructurados en el HTML original.
- Metadatos genéricos en Inicio y metadatos de WordPress reutilizados en AzuraCast.
- Páginas sin H1, jerarquías con etiquetas H5 utilizadas como texto decorativo y marca escrita de forma inconsistente.
- Enlaces internos a rutas inexistentes y anclas sin destino.
- Correo y teléfono de ejemplo en enlaces del footer; enlaces sociales dirigidos a las portadas genéricas de las plataformas.
- Imágenes sin dimensiones intrínsecas y archivos PNG pesados.
- Ausencia de sitemap y robots en los archivos del proyecto; favicon ligeramente rectangular.
- Diferencias entre las rutas del sitio público antiguo y las del proyecto Astro.
- Al consultar el sitio público, el dominio sin www redirigía a www. Esto debe alinearse con el dominio oficial antes de publicar los nuevos canonical.

El acceso realizado a robots y sitemap del sitio público no permitió confirmar su contenido. Esto no prueba que estén ausentes en producción. Las cifras, garantías y testimonios comerciales ya existentes necesitan confirmación del propietario; no se han convertido en datos estructurados de reseñas.

## B. Cambios realizados

Metadatos centralizados por URL, canonical absoluto, Open Graph, Twitter Cards, JSON-LD, H1 únicos, enlaces internos útiles, imágenes con dimensiones y formatos modernos, favicon cuadrado, sitemap, robots y una página 404. Se normalizó la marca textual a Servistream. Se conservaron los archivos originales de imágenes y las referencias a los logotipos existentes.

## C. Archivos modificados

Archivos principales de la implementación:

- `astro.config.mjs`: dominio oficial y política de URLs sin barra final.
- `src/layouts/Layout.astro`: integración SEO, iconos, conexiones a fuentes y aparición inicial del contenido visible.
- `src/components/SeoHead.astro`: metadatos, canonical y grafo estructurado.
- `src/data/seo.json`: estrategia de título, descripción, keyword y servicio por URL.
- `src/components/RelatedServices.astro`: servicios relacionados y navegación breadcrumb visible.
- `src/data/schema.ts`: FAQ reutilizando las preguntas y respuestas mostradas.
- `src/data/images.ts` y `src/data/image-dimensions.json`: dimensiones de imágenes.
- `src/pages/sitemap.xml.ts`, `src/pages/404.astro`.
- `public/robots.txt`, `public/.htaccess`, `public/_redirects`, `public/site.webmanifest`, favicon y apple-touch-icon.
- `public/img/social/`, logo de Organization, versiones WebP y variantes AVIF del hero.
- `scripts/audit-seo.py`, `scripts/validate-seo.py` y los informes JSON de `reports/`.

También se modificaron las páginas de `src/pages/`, el menú, el footer, componentes de encabezados, FAQ, blog e imágenes de servicios y `src/styles/global.css`. El árbol de trabajo ya contenía cambios anteriores: un listado de Git por sí solo no distingue esos cambios de esta implementación.

## D. Páginas modificadas

Las 20 páginas estáticas y los seis artículos del blog reciben metadatos propios a través del layout compartido. La tabla al final detalla las 26 URLs, sus encabezados y sus schemas reales.

## E. Páginas nuevas creadas

Únicamente `/404`: página útil de error con enlaces a Inicio y Contacto, marcada `noindex, follow` y excluida del sitemap. `/sitemap.xml` es un recurso XML, no una nueva página comercial. No se crearon páginas de ciudades.

## F. URLs modificadas

Ninguna de las 26 rutas actuales cambió. Se conserva `/radio-cetovacast` pese a su diferencia ortográfica respecto de CentovaCast para evitar un cambio de URL innecesario. Los canonical usan HTTPS, dominio sin www y ninguna barra final salvo la raíz.

## G. Redirects 301 creados

Se prepararon reglas para Apache (`public/.htaccess`) y para plataformas compatibles con `_redirects`:

| Ruta antigua | Destino oficial |
| --- | --- |
| `/hosting-linux/` | `https://servistream.net/web-hosting` |
| `/sonicpanel/` | `https://servistream.net/radio-streaming` |
| `/centovacast/` | `https://servistream.net/radio-cetovacast` |
| `/server-azuracast/` | `https://servistream.net/azuracast` |

Incluyen variantes sin barra final y www hacia el dominio oficial. Estas cuatro rutas antiguas se observaron en el sitio público. No se inventaron aliases adicionales. **Las reglas están preparadas, no activas ni probadas en producción**: el servidor debe admitir el archivo correspondiente. En Apache se añadió resolución interna de directorios Astro a `index.html` y ErrorDocument 404.

Antes de publicar: revisar las reglas existentes de hosting/CDN que fuerzan www, retirar la regla inversa para evitar bucles, confirmar HTTPS y comprobar con HTTP que cada alias devuelve 301 y el destino 200. Comprobar también que una URL inexistente devuelve HTTP 404. Google recomienda coherencia entre redirects, canonical y sitemap: [documentación sobre canonical](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

## H. Titles implementados

Cada URL indexable tiene un título propio, alineado con su servicio y con Servistream. Los valores exactos figuran en la tabla. No se repiten títulos.

## I. Meta descriptions implementadas

Descripciones únicas, informativas y vinculadas con el contenido de cada página. Ecuador se incorpora donde corresponde; no se atribuyen oficinas en ciudades ni se repiten keywords artificialmente. Los valores exactos figuran en la tabla.

## J. H1 implementados

La validación comprobó un H1 por página. Se transformaron títulos visibles existentes sin reemplazar la propuesta visual; en Inicio el título SVG visible queda contenido en un H1 con nombre accesible. Los textos decorativos dejaron de utilizar H5. Los encabezados de las páginas de servicios conservan su mensaje comercial.

## K. Schema implementado

- Organization y WebSite con IDs estables, marca, dominio, logo, idioma, correo y teléfono ya presentes en el sitio.
- WebPage y tipos específicos ContactPage, AboutPage y CollectionPage según la página.
- Service para las páginas de servicios, proveedor Servistream y cobertura Ecuador.
- BreadcrumbList consistente con la navegación visible.
- BlogPosting para los artículos existentes, sin inventar fechas.
- FAQPage en las páginas que muestran las preguntas correspondientes: hosting web, radio streaming, reseller radio, CentovaCast, SRT y VDO Panel.

No se incluyeron LocalBusiness con direcciones no confirmadas, perfiles sociales genéricos, AggregateRating, reseñas inventadas ni Product ficticio. La validación local comprueba JSON y presencia estructural; la elegibilidad final debe revisarse con Rich Results Test y Search Console tras publicar. FAQPage no implica que una empresa comercial reciba resultados enriquecidos: Google restringe esa visualización principalmente a sitios gubernamentales y sanitarios reconocidos. [FAQ de Google](https://developers.google.com/search/blog/2023/08/howto-faq-changes), [Organization](https://developers.google.com/search/docs/appearance/structured-data/organization), [Breadcrumb](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb).

## L. Mejoras de imágenes

Se añadieron width, height, alt y decodificación asíncrona a las imágenes renderizadas. Los elementos decorativos llevan alt vacío. El primer hero mantiene carga prioritaria; los siguientes y las imágenes secundarias usan carga diferida. Los tres heroes cuentan con variantes AVIF de 640 y 1280 píxeles y srcset/sizes. Los originales se conservan como respaldo.

| Imagen | Original | WebP | Reducción del archivo |
| --- | ---: | ---: | ---: |
| Equipo VPS | 2.251.299 bytes | 156.364 bytes | 93,1 % |
| Beneficios migración | 1.749.023 bytes | 61.796 bytes | 96,5 % |
| Asesor reseller hosting | 1.613.975 bytes | 79.570 bytes | 95,1 % |
| Panel TV streaming | 619.439 bytes | 101.332 bytes | 83,6 % |

Se prepararon cinco imágenes sociales de 1200 × 630, logo cuadrado de Organization, favicon de 192 × 192 y apple-touch-icon de 180 × 180. La reducción anterior corresponde al peso de esos archivos, no a una medición de velocidad del sitio. [Requisitos de favicon de Google](https://developers.google.com/search/docs/appearance/favicon-in-search).

## M. Mejoras de rendimiento

Menor transferencia de imágenes, variantes responsive, dimensiones intrínsecas para reducir desplazamientos, lazy loading secundario, preconnect a proveedores de fuentes y eliminación de fuentes importadas sin uso. El contenido inicialmente visible se muestra inmediatamente en lugar de esperar el fallback de las animaciones de aparición. El iframe de demostración de TV tiene título accesible y carga diferida.

**No se ejecutó Lighthouse ni se obtuvieron métricas de campo de LCP, INP o CLS.** No hay resultados numéricos de Core Web Vitals ni promesas de puntuación. El build correcto no equivale a superar esos indicadores. Medir la versión publicada en móvil y escritorio con PageSpeed Insights y contrastar Search Console/CrUX cuando exista tráfico suficiente. [Medición de Core Web Vitals](https://web.dev/articles/vitals-measurement-getting-started).

## N. Mejoras de enlazado interno

Se corrigieron las rutas inexistentes del menú y enlaces de navegación, se añadieron enlaces entre servicios relacionados y breadcrumbs visibles, se enlazaron artículos con servicios relevantes y se resolvieron anclas de categorías del blog y características del hosting. El footer enlaza teléfono y correo reales del contenido existente. Se retiraron enlaces sociales genéricos hasta disponer de perfiles oficiales.

El verificador no encontró rutas internas ni fragmentos con destino inexistente en las páginas generadas. No comprueba disponibilidad HTTP de todos los enlaces externos, ni valida compras o envíos de formularios. Los controles con href="#" no se consideran destinos de contenido en ese verificador; su comportamiento requiere revisión funcional específica.

## O. Cambios realizados en sitemap.xml

Sitemap generado a partir de los metadatos de las páginas y los artículos existentes. Incluye 26 URLs únicas, absolutas y coincidentes con los canonical. Excluye 404. No incluye lastmod inventados, URLs de ciudades ni parámetros. La salida se publica como `/sitemap.xml`.

## P. Cambios realizados en robots.txt

Permite rastrear el contenido público y declara `Sitemap: https://servistream.net/sitemap.xml`. No bloquea CSS, JavaScript ni imágenes. Robots no es un control de privacidad ni sustituye noindex: la página 404 utiliza su meta correspondiente.

## Q. Información y accesos pendientes

1. Acceso a Search Console: propiedad, indexación actual, consultas, cobertura, canonical elegido por Google y envío del sitemap.
2. Hosting/CDN efectivo y configuración de redirecciones: activar únicamente las reglas compatibles y alinear www con el dominio oficial.
3. Perfiles sociales oficiales, dirección comercial y datos legales confirmados si se desea ampliar Organization; no se añadieron datos supuestos.
4. Verificación comercial de testimonios, cifras, garantías y certificaciones existentes. No se borró información comercial sin autorización ni se validó como verdadera por inferencia.
5. Fechas y autoría editorial verificables para enriquecer los artículos.
6. Oferta detallada de servidores dedicados y administración/mantenimiento de servidores: características, condiciones y contenido propio antes de crear nuevas páginas específicas.
7. Métricas reales de rendimiento y acceso a analítica. No se encontró integración de Analytics/GTM/verificación de Search Console en los archivos revisados; no se añadieron identificadores ficticios.

## R. Recomendaciones futuras

Publicar después de revisar la configuración del dominio, comprobar respuestas HTTP, ejecutar Rich Results Test y PageSpeed Insights, enviar sitemap e inspeccionar páginas representativas en Search Console. Revisar indexación y conversiones con datos reales. Desarrollar guías útiles por tema y ampliar cada servicio con dudas y casos verificables; crear páginas adicionales solo cuando haya una oferta real y contenido suficiente. Mantener la marca coherente y evitar páginas artificiales por ciudad. Ningún cambio garantiza una posición concreta en Google.

## Tabla completa por URL

Estado “Validado localmente” significa que cumple las comprobaciones automáticas del proyecto; la publicación e indexación siguen pendientes. Keywords describen el foco editorial, no datos de volumen de búsqueda.

| URL | Keyword principal | Title | Meta Description | H1 | Schema | Canonical | Estado SEO |
| --- | --- | --- | --- | --- | --- | --- | --- |
| / | Hosting y streaming Ecuador | Hosting, VPS y Streaming en Ecuador \| Servistream | Servistream ofrece hosting web, VPS, dominios, radio y TV streaming y desarrollo web para empresas, instituciones y medios de comunicación en Ecuador. | Hosting Premium | Organization, WebSite, WebPage | https://servistream.net/ | Validado localmente; publicación pendiente |
| /azuracast | AzuraCast Ecuador | Servidores AzuraCast para Radio Online \| Servistream | Servidores para radio online con AzuraCast, AutoDJ y gestión de emisoras. Compara recursos y planes de instalación con el soporte de Servistream. | AzuraCast Server Cloud para Stream Radio | Organization, WebSite, WebPage, BreadcrumbList, Service | https://servistream.net/azuracast | Validado localmente; publicación pendiente |
| /blog | guías hosting streaming | Guías de Hosting, Servidores y Streaming \| Servistream | Guías de Servistream sobre hosting, radio online, video streaming y seguridad web. Aprende a elegir herramientas y a preparar tu próximo proyecto. | Ideas claras para construir en internet. | Organization, WebSite, CollectionPage, BreadcrumbList | https://servistream.net/blog | Validado localmente; publicación pendiente |
| /blog/canal-tv-streaming-profesional | Transmite tu canal de TV con una señal lista para crecer | Transmite tu canal de TV con una señal lista para crecer \| Blog Servistream | Conoce las piezas de una emisión profesional: calidad, distribución y control de contenido. | Transmite tu canal de TV con una señal lista para crecer | Organization, WebSite, WebPage, BreadcrumbList, BlogPosting | https://servistream.net/blog/canal-tv-streaming-profesional | Validado localmente; publicación pendiente |
| /blog/como-crear-radio-online | Todo lo que necesitas para poner tu radio en internet | Todo lo que necesitas para poner tu radio en internet \| Blog Servistream | Una guía clara para emitir en vivo, automatizar tu programación y llegar a tu audiencia. | Todo lo que necesitas para poner tu radio en internet | Organization, WebSite, WebPage, BreadcrumbList, BlogPosting | https://servistream.net/blog/como-crear-radio-online | Validado localmente; publicación pendiente |
| /blog/cuando-migrar-sitio-servidor | Cuándo es el momento de migrar tu sitio a un nuevo servidor | Cuándo es el momento de migrar tu sitio a un nuevo servidor \| Blog Servistream | Señales concretas para decidir una migración ordenada, segura y sin interrupciones innecesarias. | Cuándo es el momento de migrar tu sitio a un nuevo servidor | Organization, WebSite, WebPage, BreadcrumbList, BlogPosting | https://servistream.net/blog/cuando-migrar-sitio-servidor | Validado localmente; publicación pendiente |
| /blog/elegir-hosting-para-crecer | Cómo elegir un hosting que acompañe el crecimiento de tu sitio | Cómo elegir un hosting que acompañe el crecimiento de tu sitio \| Blog Servistream | Capacidad, velocidad, soporte y seguridad: los puntos que conviene revisar antes de contratar. | Cómo elegir un hosting que acompañe el crecimiento de tu sitio | Organization, WebSite, WebPage, BreadcrumbList, BlogPosting | https://servistream.net/blog/elegir-hosting-para-crecer | Validado localmente; publicación pendiente |
| /blog/nvme-velocidad-sitio-web | Por qué los discos NVMe hacen la diferencia en la velocidad | Por qué los discos NVMe hacen la diferencia en la velocidad \| Blog Servistream | Entiende cómo el almacenamiento influye en la respuesta de tu sitio y la experiencia de tus visitantes. | Por qué los discos NVMe hacen la diferencia en la velocidad | Organization, WebSite, WebPage, BreadcrumbList, BlogPosting | https://servistream.net/blog/nvme-velocidad-sitio-web | Validado localmente; publicación pendiente |
| /blog/seguridad-base-sitio-confiable | SSL, copias de seguridad y actualizaciones: la base de un sitio confiable | SSL, copias de seguridad y actualizaciones: la base de un sitio confiable \| Blog Servistream | Pequeñas decisiones técnicas que ayudan a proteger la información y la continuidad de tu proyecto. | SSL, copias de seguridad y actualizaciones: la base de un sitio confiable | Organization, WebSite, WebPage, BreadcrumbList, BlogPosting | https://servistream.net/blog/seguridad-base-sitio-confiable | Validado localmente; publicación pendiente |
| /contacto | contacto Servistream | Contacto y Soporte en Ecuador \| Servistream | Contacta con Servistream para hosting, VPS, dominios, radio y TV streaming o desarrollo web. Cuéntanos tu proyecto o solicita ayuda con tu servicio. | Estamos listos para ayudarte | Organization, WebSite, ContactPage, BreadcrumbList | https://servistream.net/contacto | Validado localmente; publicación pendiente |
| /disponibilidad | comprobar disponibilidad web | Comprobador de Disponibilidad de Sitios Web \| Servistream | Comprueba si un sitio web está accesible y consulta su respuesta HTTP con la herramienta de disponibilidad de Servistream. | Consultar disponibilidad del sitio web | Organization, WebSite, WebPage, BreadcrumbList | https://servistream.net/disponibilidad | Validado localmente; publicación pendiente |
| /dominios | registro de dominios Ecuador | Registro de Dominios en Ecuador \| Servistream | Busca y registra dominios .ec y otras extensiones con Servistream. Consulta la disponibilidad o transfiere el dominio de tu empresa o proyecto en Ecuador. | Busca tu nombre de dominio | Organization, WebSite, WebPage, BreadcrumbList, Service | https://servistream.net/dominios | Validado localmente; publicación pendiente |
| /migracion | migración hosting | Migración de Sitios Web a Servistream \| Servistream | Traslada tu sitio web a Servistream con acompañamiento técnico. Consulta el proceso de migración, requisitos y compatibilidad para tu hosting. | La última migración de sitio web que necesitarás | Organization, WebSite, WebPage, BreadcrumbList, Service | https://servistream.net/migracion | Validado localmente; publicación pendiente |
| /nosotros | Servistream Ecuador | Nosotros: Hosting y Streaming desde Ecuador \| Servistream | Conoce Servistream y sus soluciones de hosting, servidores y streaming desde Ecuador. Descubre nuestro enfoque y contacta con el equipo. | Tecnología que hace que tus ideas sigan en línea. | Organization, WebSite, AboutPage, BreadcrumbList | https://servistream.net/nosotros | Validado localmente; publicación pendiente |
| /paginas-web | diseño web Ecuador | linux_ubuntu [#148] | Diseño y desarrollo de páginas web para empresas y organizaciones en Ecuador. Servistream crea sitios adaptables y soluciones para tu proyecto digital. | Diseño y desarrollo de páginas web para empresas y organizaciones en Ecuador. | Organization, WebSite, WebPage, BreadcrumbList, Service | https://servistream.net/paginas-web | Validado localmente; publicación pendiente |
| /radio-cetovacast | CentovaCast Ecuador | Radio Streaming con CentovaCast en Ecuador \| Servistream | Administra tu emisora con CentovaCast, AutoDJ y estadísticas. Conoce los planes de radio streaming de Servistream para Shoutcast e Icecast. | Tu radio en internet,siempre al aire | Organization, WebSite, WebPage, BreadcrumbList, Service, FAQPage | https://servistream.net/radio-cetovacast | Validado localmente; publicación pendiente |
| /radio-streaming | radio streaming Ecuador | Radio Streaming con SonicPanel en Ecuador \| Servistream | Transmite tu radio por internet con SonicPanel, AutoDJ y conexión SSL. Compara planes de Servistream para emisoras y proyectos de radio online en Ecuador. | Elige cómo quieres hacer sonar tu radio | Organization, WebSite, WebPage, BreadcrumbList, Service, FAQPage | https://servistream.net/radio-streaming | Validado localmente; publicación pendiente |
| /reseller-hosting | reseller hosting Ecuador | Reseller Hosting para Agencias en Ecuador \| Servistream | Ofrece alojamiento web bajo tu marca con planes reseller de Servistream. Consulta recursos, SSL y soporte para gestionar los sitios de tus clientes. | Crea tu propio negocio de hosting web | Organization, WebSite, WebPage, BreadcrumbList, Service | https://servistream.net/reseller-hosting | Validado localmente; publicación pendiente |
| /reseller-radio | reseller radio streaming | Reseller Radio Streaming con SonicPanel \| Servistream | Crea y gestiona radios para tus clientes con SonicPanel, AutoDJ y marca propia. Compara los planes reseller de radio streaming de Servistream. | Convierte tu experiencia en un negocio de radio online | Organization, WebSite, WebPage, BreadcrumbList, Service, FAQPage | https://servistream.net/reseller-radio | Validado localmente; publicación pendiente |
| /srt-server | servidor streaming SRT | Servidores VPS para Streaming SRT \| Servistream | Servidores VPS para ingesta y transmisión de video con SRT. Compara recursos dedicados y herramientas de control para tu producción con Servistream. | Conecta tu producción,sin perder la señal. | Organization, WebSite, WebPage, BreadcrumbList, Service, FAQPage | https://servistream.net/srt-server | Validado localmente; publicación pendiente |
| /status | estado servicios Servistream | Estado de Servicios y Monitor de Disponibilidad \| Servistream | Consulta el monitor público de Servistream para revisar disponibilidad, tiempos de respuesta e historial de incidencias de nuestra infraestructura. | Estado de nuestros servicios | Organization, WebSite, WebPage, BreadcrumbList | https://servistream.net/status | Validado localmente; publicación pendiente |
| /tv-streaming | TV streaming Ecuador | TV Streaming con StreamCP Pro en Ecuador \| Servistream | Emite tu canal con StreamCP Pro: programación, RTMP, VOD y simulcast. Conoce los planes de TV y video streaming de Servistream para Ecuador. | Tu señal de TV,en todas partes. | Organization, WebSite, WebPage, BreadcrumbList, Service | https://servistream.net/tv-streaming | Validado localmente; publicación pendiente |
| /vdopanel | VDO Panel VPS | Servidores VPS con VDO Panel \| Servistream | Administra canales de video, programación y distribución con VDO Panel. Conoce los recursos y planes VPS para streaming de Servistream. | Opera tu canal,desde un solo panel. | Organization, WebSite, WebPage, BreadcrumbList, Service, FAQPage | https://servistream.net/vdopanel | Validado localmente; publicación pendiente |
| /vps-hosting | VPS Ecuador | VPS Administrados con CyberPanel en Ecuador \| Servistream | Servidores VPS administrados con CyberPanel, LiteSpeed y almacenamiento NVMe. Elige recursos para tu proyecto y recibe soporte de Servistream. | Potencia dedicada, sin la complejidad. | Organization, WebSite, WebPage, BreadcrumbList, Service | https://servistream.net/vps-hosting | Validado localmente; publicación pendiente |
| /web-hosting | hosting web Ecuador | Hosting Web Premium en Ecuador \| Servistream | Hosting web para empresas y proyectos en Ecuador con almacenamiento NVMe, seguridad y soporte. Compara los planes de alojamiento de Servistream. | Hosting que responde,tecnología que protege. | Organization, WebSite, WebPage, BreadcrumbList, Service, FAQPage | https://servistream.net/web-hosting | Validado localmente; publicación pendiente |
| /wordpress | hosting WordPress Ecuador | Hosting WordPress Administrado en Ecuador \| Servistream | Alojamiento WordPress con gestión, almacenamiento NVMe y soporte de Servistream. Conoce los planes y herramientas para tu sitio o negocio en Ecuador. | Hosting WordPress con rendimientogarantizado. | Organization, WebSite, WebPage, BreadcrumbList, Service | https://servistream.net/wordpress | Validado localmente; publicación pendiente |

## Evidencia y reproducción

- `reports/seo-audit-before.json`: captura del HTML compilado anterior.
- `reports/seo-audit.json`: metadatos, headings, imágenes, enlaces y schemas del HTML final.
- `reports/seo-validation.json`: 27 páginas, 26 indexables, 26 URLs de sitemap, `errors: []`.
- Build Astro final correcto y `git diff --check` sin errores.

Ejecutar desde la raíz del proyecto:

```sh
npm run build
python3 scripts/audit-seo.py
python3 scripts/validate-seo.py
```

La validación requiere Python 3 y analiza `dist` después de compilar. No sustituye una auditoría del servidor público ni la validación semántica completa de Google.

## Ajuste visual del 1 de octubre de 2026

Se retiró de Inicio el bloque adicional de introducción y servicios relacionados al resultar redundante con su contenido y navegación existentes. Se mantienen los enlaces del menú y footer, los metadatos y los datos estructurados. El componente de servicios relacionados permanece en las páginas interiores.
