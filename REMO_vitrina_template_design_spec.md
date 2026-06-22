# Design Spec · Vitrina REMO de Oferta Exportable Colombiana

## 1. Principios de diseño

La Vitrina REMO debe sentirse como un marketplace B2B internacional, pero más curado, institucional y operado. No compite por cantidad de proveedores; compite por confianza, estructura, trazabilidad y viabilidad COMEX.

Principios:

- Claridad en menos de 30 segundos.
- Información comercial primero, técnica después.
- Datos sensibles protegidos por niveles de acceso.
- CTAs visibles para comprador internacional.
- REMO como validador y facilitador, no como simple vitrina.
- Diseño sobrio, limpio y funcional.

## 2. Inspiración B2B marketplace

Se toma inspiración conceptual de patrones comunes de sourcing B2B:

- tarjeta de producto,
- MOQ,
- capacidad mensual,
- badges de proveedor validado,
- solicitud de cotización,
- solicitud de muestra,
- ficha técnica,
- galería,
- comparación,
- data room por niveles.

No se copiaron logos, layout propietario, textos, iconos ni componentes visuales de Alibaba, Global Sources u otras plataformas.

## 3. Diferenciación REMO frente a marketplace masivo

| Patrón marketplace masivo | Adaptación REMO |
| --- | --- |
| Muchos proveedores | Proveedores curados y revisados por REMO |
| Contact supplier | Contact through REMO / buyer validation |
| MOQ y precio visible | MOQ, precio referencial y disclaimer COMEX |
| RFQ | Request quote + validate international operation |
| Catálogo abierto | Ficha exportable + dossier técnico + data room |
| Marketplace transaccional | Plataforma de internacionalización curada |

## 4. Wireframes

### Listing page

```text
┌──────────────────────────────────────────────────────────────┐
│ REMO logo · Categories · Validation · Suppliers · Contact     │
├──────────────────────────────────────────────────────────────┤
│ Hero: Colombia Exportable by REMO                            │
│ Search + CTA sourcing support                                │
├───────────────┬──────────────────────────────────────────────┤
│ Filters       │ Search bar                                   │
│ Category      │ Category pills                               │
│ Readiness     │ Product grid                                 │
│ Logistics     │ ProductCard · ProductCard · ProductCard       │
└───────────────┴──────────────────────────────────────────────┘
```

### Product card

```text
┌────────────────────────────┐
│ Product visual             │
│ Badge readiness            │
│ Product name EN / ES       │
│ Origin · Supplier type     │
│ MOQ · Capacity · Logistics │
│ Documents · Tags           │
│ View sheet · Request quote │
└────────────────────────────┘
```

### Product detail

```text
┌──────────────────────────────────────────────────────────────┐
│ Header                                                       │
├──────────────────────────────────────────────────────────────┤
│ Breadcrumb                                                   │
│ Gallery                         Product summary + quick facts │
│                                 CTA buttons                   │
├──────────────────────────────────────────────────────────────┤
│ Sticky tabs                                                   │
├──────────────────────────────────────────┬───────────────────┤
│ Sections: overview, specs, packaging,    │ Sticky sidebar:    │
│ capacity, terms, logistics, compliance,  │ supplier, CTAs,    │
│ markets, readiness, risks, documents     │ documents          │
└──────────────────────────────────────────┴───────────────────┘
```

### Buyer request modal

```text
┌──────────────────────────────┐
│ Request quotation             │
│ Buyer name · Company          │
│ Country · Email               │
│ Volume · Destination          │
│ Channel · Message             │
│ Consent checkbox              │
│ Send mock request             │
└──────────────────────────────┘
```

### Access-level locked sections

```text
Public teaser → Commercial sheet → Technical sheet 🔒 → Data room 🔒
```

### Mobile layout

```text
Header
Hero stacked
Search
Filters
Product cards one column
Detail gallery
Summary
Sticky CTA
Accordion-like sections
Sidebar content moves below
```

## 5. Tokens visuales

Los tokens se basan en el manual/engine de marca REMO encontrado en el proyecto.

| Token | Valor | Uso |
| --- | --- | --- |
| Naranja REMO | `#C06025` | CTA, acento, estado activo |
| Aqua REMO | `#5EA0AB` | apoyo, conexiones, highlights |
| Azul profundo | `#083B4A` | header, títulos, confianza institucional |
| Grafito | `#1F2933` | texto principal |
| Gris niebla | `#F3F6F8` | fondo general |
| Arena logística | `#F6EFE7` | fondos suaves y contraste cálido |
| Blanco | `#FFFFFF` | tarjetas y legibilidad |

Tipografía:

- Títulos: Baloo Da 2 / fallback Aptos Display / Arial.
- Cuerpo: Poppins / Aptos / Arial.

Espaciado:

- Contenedor máximo: 1180px.
- Radius principal: 8px.
- Cards: 18-24px de padding.
- Header sticky: 76px mínimo.

Sombras:

- Suaves, institucionales, sin profundidad excesiva.

## 6. Estados

### Readiness

- Validated by REMO: verde.
- Under preparation: amarillo.
- Under technical review: azul/aqua.
- Not ready: rojo suave, solo recomendado para vistas internas.

### Documentos

- Available.
- Pending.
- Under review.
- Available under NDA.
- Available in data room.

### Acceso

- Public teaser.
- Commercial sheet.
- Technical sheet.
- Operational data room.

### UI lock states

Los bloques restringidos usan lock icon, texto claro y CTA implícita:

> Available after REMO buyer validation.

## 7. Microcopy clave

Header:

> Colombia Exportable by REMO

Subheader:

> Curated Colombian suppliers for international buyers.

Trust copy:

> REMO helps international buyers evaluate Colombian suppliers with technical sheets, logistics profiles, readiness review and trade operation support.

Disclaimer comercial:

> Reference prices are indicative and subject to volume, destination, Incoterm, exchange rate and final COMEX validation.

Confirmación formulario:

> Your request has been received. REMO will validate the buyer profile and contact you with the next steps.

## 8. Accesibilidad

- Contraste alto en header y CTA.
- Tamaño base de 16px.
- Botones con alturas mínimas cómodas.
- Inputs con labels visibles.
- Iconos acompañados por texto.
- Responsive sin tablas extensas en mobile.
- Estados restringidos explicados con texto, no solo color.

## 9. Responsive behavior

Desktop:

- Hero en dos columnas.
- Filtros laterales.
- Product grid 2-3 columnas.
- Detail page con galería y resumen en dos columnas.
- Sidebar sticky en detalle.

Tablet:

- Grid reduce columnas.
- Header permite wrap de acciones.
- Sidebar pasa debajo si falta ancho.

Mobile:

- Header compacto.
- Hero apilado.
- Filtros y cards en una columna.
- CTAs apilados.
- Tabs con scroll horizontal.
- Tablas transformadas en cards/listas.

## 10. Gobierno de diseño

Todo elemento visual debe cumplir una función:

- jerarquizar,
- clasificar,
- evidenciar,
- conectar,
- solicitar acción,
- proteger información.

No se agregaron líneas decorativas, puntos sueltos, imágenes externas ni íconos sin etiqueta. El diseño prioriza claridad, estructura y confianza comercial.

