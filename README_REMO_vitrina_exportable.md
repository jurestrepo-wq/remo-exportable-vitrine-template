# README · Vitrina REMO de Oferta Exportable Colombiana

## 1. Descripción del módulo

Esta carpeta contiene un prototipo frontend standalone para la **Vitrina REMO de Oferta Exportable Colombiana**. La experiencia presenta productos colombianos exportables ante compradores internacionales con una lógica de marketplace B2B curado, no de tienda abierta.

Frase central del módulo:

> Colombia Exportable by REMO: curated Colombian suppliers for international buyers.

Versión en español:

> Colombia Exportable por REMO: oferta colombiana validada para compradores internacionales.

## 2. Objetivo estratégico

La plantilla convierte oferta colombiana dispersa en fichas exportables presentables, verificables y comprables. REMO no solo lista productos: organiza información, valida readiness, estructura condiciones técnicas y comerciales, protege documentos sensibles y facilita la validación COMEX antes de una operación internacional.

## 3. Stack detectado

No se encontró un portal REMO único y activo para modificar sin riesgo. Por eso se creó un prototipo standalone en:

`remo-exportable-vitrine-template/`

El prototipo usa:

- HTML estático.
- CSS responsive.
- JavaScript ES modules.
- Datos mock en JSON.
- Schema TypeScript para futura integración.

No requiere backend ni instalación de dependencias.

## 4. Rutas creadas

Rutas hash funcionales:

- `#/vitrina-exportable`
- `#/vitrina-exportable/pulpa-mango-congelada-natural`
- `#/vitrina-exportable/serum-facial-profesional-colombiano`
- `#/vitrina-exportable/componente-metalico-manufacturado-industria`

Rutas estáticas de redirección:

- `/vitrina-exportable/`
- `/vitrina-exportable/pulpa-mango-congelada-natural/`
- `/vitrina-exportable/serum-facial-profesional-colombiano/`
- `/vitrina-exportable/componente-metalico-manufacturado-industria/`

## 5. Componentes creados

El prototipo implementa estos componentes en `src/app.js`:

- `ExportableMarketplacePage`
- `ProductSearchBar`
- `CategoryFilterPanel`
- `ProductCard`
- `ProductBadge`
- `ReadinessBadge`
- `ProductGallery`
- `ProductDetailHero`
- `SupplierTrustCard`
- `QuickFactsPanel`
- `ProductOverviewSection`
- `TechnicalSpecsSection`
- `PackagingSection`
- `CapacitySection`
- `CommercialTermsSection`
- `LogisticsProfileSection`
- `TradeComplianceSection`
- `SuggestedMarketsSection`
- `ReadinessScorePanel`
- `RiskAndGapsPanel`
- `DocumentAccessPanel`
- `BuyerActionsPanel`
- `RequestQuoteModal`
- `RequestSampleModal`
- `RequestFullSheetModal`
- `ScheduleMeetingModal`
- `ShortlistButton`
- `CompareProductsBar`
- `LanguageToggle`

## 6. Estructura de datos

El modelo base está en:

- `schemas/exportableProduct.schema.ts`

Los datos mock están en:

- `data/mockExportableProducts.json`

Productos ficticios incluidos:

1. Pulpa de mango congelada natural.
2. Serum facial profesional de origen colombiano.
3. Componente metálico manufacturado para industria.

Todos los datos son sample/placeholder para visualización. No representan proveedores reales.

## 7. Cómo ejecutar el prototipo

Desde la carpeta del proyecto:

```bash
cd remo-exportable-vitrine-template
python3 -m http.server 4177
```

Luego abrir:

```text
http://127.0.0.1:4177/index.html#/vitrina-exportable
```

Recomendación: servirlo por HTTP local. Abrir `index.html` directamente puede bloquear la carga del JSON por restricciones del navegador.

## 7.1. Cómo regenerar capturas y PDF

Con el servidor local activo en `http://127.0.0.1:4177`, ejecutar:

```bash
node scripts/capture-renders.mjs
```

El script genera:

- `screenshots/listing-desktop.png`
- `screenshots/detail-desktop.png`
- `screenshots/listing-mobile.png`
- `screenshots/detail-mobile.png`
- `REMO_exportable_product_sheet_template.pdf`

Nota: el script usa Playwright apuntando al Chrome local del equipo. Si se ejecuta en otro entorno, puede ser necesario ajustar `executablePath` en `scripts/capture-renders.mjs`.

## 8. Cómo cambiar datos mock

Editar `data/mockExportableProducts.json` conservando la estructura de `ExportableProduct`.

No publicar en datos mock:

- NIT.
- RUT.
- datos legales sensibles.
- contactos directos no autorizados.
- precios definitivos.
- documentos privados.
- proveedores reales sin autorización.

## 9. Niveles de acceso

Nivel 1 - Public teaser:
Fotos, descripción corta, origen, categoría, propuesta de valor y tags.

Nivel 2 - Commercial sheet:
Presentaciones, capacidad, MOQ, canales y condiciones generales.

Nivel 3 - Technical sheet:
Especificaciones, certificaciones, documentos y condiciones logísticas.

Nivel 4 - Operational data room:
Documentos sensibles, cotización formal, contratos, términos de pago y trazabilidad.

## 10. Reglas de seguridad

1. No mostrar NIT, RUT, datos sensibles o documentos legales en vista pública.
2. Proteger documentos sensibles por niveles de acceso.
3. Requerir validación de comprador antes de entregar ficha técnica completa.
4. Marcar precios como orientativos hasta cotización formal.
5. Requerir autorización de publicación del proveedor.
6. No mostrar proveedores en estado rojo como oferta activa.
7. Registrar toda solicitud comercial en CRM futuro.
8. Usar disclaimers sobre HS code, regulación, precios y viabilidad COMEX.

## 11. Reglas de gobierno de la Vitrina

1. Ninguna empresa debe aparecer como validada sin diagnóstico REMO.
2. Ningún precio debe mostrarse como definitivo sin volumen, destino e Incoterm.
3. Ninguna partida arancelaria debe presentarse como definitiva sin validación.
4. Ninguna empresa en rojo debe mostrarse públicamente como export-ready.
5. La información sensible debe compartirse solo por niveles de acceso.
6. Toda ficha debe tener fecha de actualización.
7. Toda ficha debe tener responsable REMO.
8. Toda ficha debe tener autorización de publicación.
9. Toda oportunidad internacional debe quedar registrada en CRM.
10. Toda operación debe retroalimentar la ficha y el readiness.

## 12. Consideraciones de integración futura

- CRM para leads, solicitudes, estado de comprador y trazabilidad comercial.
- Data room con permisos por comprador y producto.
- Portal de compradores con login y shortlist persistente.
- Portal de proveedores para actualizar fichas, documentos y capacidad.
- Dashboard REMO de readiness, oportunidades, documentos y operaciones.
- Notificaciones para solicitudes de cotización, muestra y reunión.
- Gestión documental con vencimientos, versiones y autorización de publicación.
- Motor de comparación de productos y proveedores.
- Registro de Q&A técnico entre comprador, REMO y proveedor.
- Integración con herramientas COMEX para HS code, Incoterm, costos y operación.

## 13. Placeholders pendientes

- Imágenes de producto: se usan visuales CSS, no fotografías externas.
- Logos de proveedores: omitidos por privacidad y porque los proveedores son ficticios.
- Backend de solicitudes: los formularios muestran confirmación mock y no envían datos.
- Login y permisos reales: representados solo como estados visuales.
- PDF final de ficha: puede generarse desde navegador con print-to-PDF.

## 14. Recomendaciones UX futuras

- Crear vista interna REMO para readiness completo, riesgos completos y documentos pendientes.
- Agregar comparación persistente de productos.
- Permitir vista bilingüe real ES/EN con archivos de traducción.
- Agregar estados de validación por documento.
- Añadir analítica de interés comprador por producto, categoría, mercado y CTA.
- Conectar cada solicitud a CRM y pipeline ACT.
