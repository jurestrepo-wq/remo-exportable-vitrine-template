const BRAND = {
  orange: "#C06025",
  aqua: "#5EA0AB",
  deep: "#083B4A",
  graphite: "#1F2933",
  mist: "#F3F6F8",
  sand: "#F6EFE7",
  white: "#FFFFFF"
};

const ACCESS_LEVELS = [
  { id: "public", label: "Public teaser", detail: "Fotos, origen, categoría y propuesta de valor." },
  { id: "registered_buyer", label: "Commercial sheet", detail: "Presentaciones, capacidad, MOQ y condiciones generales." },
  { id: "qualified_buyer", label: "Technical sheet", detail: "Especificaciones, documentos y condiciones logísticas." },
  { id: "nda_data_room", label: "Operational data room", detail: "Cotización formal, documentos sensibles y términos de operación." }
];

const CATEGORY_LABELS = {
  agrofoods: "Agrofoods",
  cosmetics: "Cosmetics",
  manufacturing: "Manufacturing",
  fashion: "Fashion",
  handcrafts: "Handcrafts",
  industrial_inputs: "Industrial inputs",
  specialty_products: "Specialty products"
};

const READINESS_META = {
  validated_by_remo: { label: "Validated by REMO", tone: "green" },
  under_preparation: { label: "Under preparation", tone: "amber" },
  under_technical_review: { label: "Under technical review", tone: "blue" },
  not_ready: { label: "Not ready", tone: "red" }
};

const state = {
  products: [],
  selectedSlug: null,
  search: "",
  filters: {
    category: "all",
    readiness: "all",
    logistics: "all"
  },
  shortlist: new Set(),
  compare: new Set(),
  modal: null,
  language: "EN"
};

const app = document.querySelector("#app");

function icon(name) {
  const icons = {
    search:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.5-3.5"></path></svg>',
    globe:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M3 12h18M12 3c2.2 2.4 3.3 5.4 3.3 9s-1.1 6.6-3.3 9M12 3C9.8 5.4 8.7 8.4 8.7 12s1.1 6.6 3.3 9"></path></svg>',
    shield:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 20 6v6c0 5-3.4 8-8 9-4.6-1-8-4-8-9V6l8-3Z"></path><path d="m8.8 12 2.1 2.1 4.6-5"></path></svg>',
    box:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 7 9-4 9 4-9 4-9-4Z"></path><path d="M3 7v10l9 4 9-4V7M12 11v10"></path></svg>',
    doc:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h7l5 5v13H7V3Z"></path><path d="M14 3v6h5M9 13h7M9 17h7"></path></svg>',
    truck:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z"></path><circle cx="7" cy="18" r="2"></circle><circle cx="17" cy="18" r="2"></circle></svg>',
    lock:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2"></rect><path d="M8 10V7a4 4 0 0 1 8 0v3"></path></svg>',
    chart:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V5M4 19h16"></path><rect x="7" y="12" width="3" height="4"></rect><rect x="12" y="8" width="3" height="8"></rect><rect x="17" y="10" width="3" height="6"></rect></svg>',
    calendar:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"></rect><path d="M8 3v4M16 3v4M4 10h16"></path></svg>',
    compare:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h10M10 3l4 4-4 4M20 17H10M14 13l-4 4 4 4"></path></svg>',
    star:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 21l1.1-6.5-4.7-4.6 6.5-.9L12 3Z"></path></svg>'
  };
  return icons[name] ?? icons.box;
}

async function init() {
  const response = await fetch("./data/mockExportableProducts.json");
  state.products = await response.json();
  syncRoute();
  window.addEventListener("hashchange", () => {
    syncRoute();
    render();
  });
  render();
}

function syncRoute() {
  const hash = window.location.hash.replace(/^#\/?/, "");
  const parts = hash.split("/").filter(Boolean);
  if (parts[0] === "vitrina-exportable" && parts[1]) {
    state.selectedSlug = parts[1];
  } else {
    state.selectedSlug = null;
  }
}

function navigateToListing() {
  window.location.hash = "#/vitrina-exportable";
}

function navigateToProduct(slug) {
  window.location.hash = `#/vitrina-exportable/${slug}`;
}

function render() {
  const product = state.products.find((item) => item.slug === state.selectedSlug);
  app.innerHTML = `
    ${Header()}
    ${product ? ProductDetailPage(product) : ExportableMarketplacePage()}
    ${CompareProductsBar()}
    ${state.modal ? RequestModal(state.modal.type, state.modal.product) : ""}
  `;
  bindEvents();
}

function Header() {
  return `
    <header class="site-header">
      <a class="brand-link" href="#/vitrina-exportable" aria-label="Go to Colombia Exportable listing">
        <img src="./assets/brand/remo-logo-oficial-blanco.png" alt="REMO Group" />
      </a>
      <nav class="main-nav" aria-label="Primary navigation">
        <a href="#/vitrina-exportable">Categories</a>
        <a href="#how-removalidates">How REMO validates</a>
        <a href="#suppliers">Suppliers</a>
        <a href="#contact">Contact</a>
      </nav>
      <div class="header-actions">
        ${LanguageToggle()}
        <button class="ghost-button">For international buyers</button>
        <button class="primary-button small" data-modal="sourcing">Request sourcing support</button>
      </div>
    </header>
  `;
}

function ExportableMarketplacePage() {
  const products = filteredProducts();
  return `
    <main>
      <section class="market-hero">
        <div class="hero-copy">
          <div class="eyebrow">Colombia Exportable by REMO</div>
          <h1>Curated Colombian suppliers for international buyers.</h1>
          <p>
            Discover exportable products structured, reviewed and supported by REMO for international sourcing,
            technical evaluation and COMEX feasibility.
          </p>
          <p class="es-copy">Oferta colombiana validada para compradores internacionales.</p>
          <div class="hero-actions">
            <button class="primary-button" data-scroll-products>Explore exportable products</button>
            <button class="secondary-button" data-modal="sourcing">Request sourcing support</button>
          </div>
        </div>
        <div class="hero-panel" aria-label="REMO marketplace trust panel">
          <div class="trust-card large">
            <span class="trust-icon">${icon("shield")}</span>
            <strong>Validated by REMO</strong>
            <p>Supplier information, export readiness, logistics feasibility and documentation availability.</p>
          </div>
          <div class="hero-metrics">
            <div><strong>4</strong><span>buyer access levels</span></div>
            <div><strong>3</strong><span>sample product sheets</span></div>
            <div><strong>COMEX</strong><span>operation validation</span></div>
          </div>
          <div class="flow-strip" aria-label="Vitrina REMO flow">
            <span>Supplier</span><i></i><span>Sheet</span><i></i><span>Buyer</span><i></i><span>COMEX</span>
          </div>
        </div>
      </section>
      <section class="marketplace-layout" id="products">
        ${CategoryFilterPanel()}
        <div class="product-results">
          ${ProductSearchBar()}
          <div class="category-strip">
            ${["Agrofoods", "Cosmetics", "Manufacturing", "Fashion", "Handcrafts", "Industrial inputs", "Specialty products"]
              .map((category) => `<button class="category-pill">${category}</button>`)
              .join("")}
          </div>
          <div class="result-meta">
            <span>${products.length} exportable sample products</span>
            <span>All data shown is sample data for template visualization.</span>
          </div>
          <div class="product-grid">
            ${products.map(ProductCard).join("")}
          </div>
        </div>
      </section>
      <section class="validation-section" id="how-removalidates">
        <div>
          <div class="eyebrow">How REMO adapts B2B marketplace patterns</div>
          <h2>Not a massive open marketplace. A curated international business platform.</h2>
        </div>
        <div class="pattern-grid">
          ${PatternCard("Many suppliers", "Curated suppliers validated by REMO")}
          ${PatternCard("Contact supplier", "Contact through REMO / buyer validation")}
          ${PatternCard("MOQ and price", "MOQ, reference price and COMEX disclaimer")}
          ${PatternCard("RFQ", "Request quote + validate operation")}
        </div>
      </section>
    </main>
  `;
}

function ProductSearchBar() {
  return `
    <div class="search-bar">
      <span>${icon("search")}</span>
      <input
        type="search"
        value="${escapeHtml(state.search)}"
        placeholder="Search by product, category, region or supplier capability"
        data-search
      />
    </div>
  `;
}

function CategoryFilterPanel() {
  return `
    <aside class="filter-panel" aria-label="Product filters">
      <div class="panel-heading">
        <strong>Filters</strong>
        <span>B2B sourcing</span>
      </div>
      ${FilterSelect("Category", "category", [
        ["all", "All categories"],
        ["agrofoods", "Agrofoods"],
        ["cosmetics", "Cosmetics"],
        ["manufacturing", "Manufacturing"]
      ])}
      ${FilterSelect("REMO readiness", "readiness", [
        ["all", "All statuses"],
        ["validated_by_remo", "Validated"],
        ["under_preparation", "Under preparation"],
        ["under_technical_review", "Under review"]
      ])}
      ${FilterSelect("Logistics condition", "logistics", [
        ["all", "All logistics"],
        ["ambient", "Ambient"],
        ["frozen", "Frozen chain"],
        ["general_cargo", "General cargo"]
      ])}
      <div class="filter-group">
        <label>Buyer needs</label>
        <div class="checkbox-list">
          <span>Private label</span>
          <span>Technical sheet</span>
          <span>Sample request</span>
          <span>COMEX validation</span>
        </div>
      </div>
    </aside>
  `;
}

function FilterSelect(label, key, options) {
  return `
    <label class="filter-group">
      <span>${label}</span>
      <select data-filter="${key}">
        ${options.map(([value, text]) => `<option value="${value}" ${state.filters[key] === value ? "selected" : ""}>${text}</option>`).join("")}
      </select>
    </label>
  `;
}

function ProductCard(product) {
  const readiness = READINESS_META[product.readiness.status];
  return `
    <article class="product-card">
      <div class="product-image ${product.media[0]?.url ?? "gradient-default"}">
        <span class="image-label">${CATEGORY_LABELS[product.product.category]}</span>
      </div>
      <div class="product-card-body">
        <div class="card-topline">
          ${ReadinessBadge(product.readiness.status)}
          ${ShortlistButton(product)}
        </div>
        <h3>${product.product.nameEn}</h3>
        <p class="spanish-name">${product.product.nameEs}</p>
        <div class="origin-line">${product.product.originRegion}, Colombia · ${product.product.supplierType}</div>
        <div class="quick-grid compact">
          <span><strong>MOQ</strong>${product.capacity.exportableMoq}</span>
          <span><strong>Monthly capacity</strong>${product.capacity.availableMonthlyExportCapacity}</span>
          <span><strong>Logistics</strong>${formatCargo(product.logistics.temperatureCondition)}</span>
        </div>
        <div class="document-row">
          ${DocumentChip("Technical sheet")}
          ${DocumentChip("Photos")}
          ${DocumentChip(product.tradeCompliance.availableDocuments[0] ?? "Documents")}
        </div>
        <div class="tag-row">${product.tags.slice(0, 4).map((tag) => `<span>${tag}</span>`).join("")}</div>
        <div class="card-actions">
          <button class="secondary-button" data-view="${product.slug}">View sheet</button>
          <button class="primary-button" data-modal="quote" data-product="${product.slug}">Request quote</button>
        </div>
      </div>
    </article>
  `;
}

function ProductDetailPage(product) {
  return `
    <main>
      <section class="detail-hero">
        <div class="breadcrumb">
          <button data-back-listing>Home</button><span>/</span><button data-back-listing>Colombia Exportable</button><span>/</span><span>${CATEGORY_LABELS[product.product.category]}</span>
        </div>
        <div class="detail-grid">
          ${ProductGallery(product)}
          ${ProductDetailHero(product)}
        </div>
      </section>
      <nav class="tabs" aria-label="Product sheet sections">
        ${["Overview", "Supplier", "Specifications", "Packaging", "Capacity", "Commercial", "Logistics", "Compliance", "Markets", "Readiness", "Risks", "Documents"].map((tab) => `<a href="#${tab.toLowerCase()}">${tab}</a>`).join("")}
      </nav>
      <section class="detail-body">
        <div class="detail-main">
          ${ExportableProductSheet(product)}
        </div>
        <aside class="sticky-sidebar">
          ${SupplierTrustCard(product)}
          ${BuyerActionsPanel(product)}
          ${DocumentAccessPanel(product, true)}
        </aside>
      </section>
    </main>
  `;
}

function ProductGallery(product) {
  return `
    <div class="gallery">
      <div class="gallery-main ${product.media[0]?.url ?? "gradient-default"}">
        <span>${product.product.nameEn}</span>
      </div>
      <div class="gallery-thumbs">
        ${product.media.map((media) => `<button class="${media.url}"><span>${media.type}</span></button>`).join("")}
      </div>
    </div>
  `;
}

function ProductDetailHero(product) {
  return `
    <div class="detail-summary">
      <div class="eyebrow">Product sheet · ${product.remoCode}</div>
      <h1>${product.product.nameEn}</h1>
      <p class="spanish-name">${product.product.nameEs}</p>
      <div class="badge-row">
        ${ReadinessBadge(product.readiness.status)}
        ${ProductBadge("Technical sheet available")}
        ${ProductBadge("COMEX viability required")}
        ${product.packaging.privateLabelAvailable ? ProductBadge("Private label available") : ""}
      </div>
      <p class="trust-copy">
        REMO validates supplier information, export readiness, logistics feasibility and documentation availability before commercial activation.
      </p>
      ${QuickFactsPanel([
        ["Origin", `${product.product.originRegion}, Colombia`, "globe"],
        ["MOQ", product.capacity.exportableMoq, "box"],
        ["Monthly capacity", product.capacity.availableMonthlyExportCapacity, "chart"],
        ["Lead time", product.capacity.productionLeadTime, "calendar"],
        ["Logistics", formatCargo(product.logistics.temperatureCondition), "truck"],
        ["Updated", product.lastUpdated, "doc"]
      ])}
      <div class="hero-cta">
        <button class="primary-button" data-modal="full-sheet" data-product="${product.slug}">Request full sheet</button>
        <button class="secondary-button" data-modal="quote" data-product="${product.slug}">Request quotation</button>
        <button class="secondary-button" data-modal="sample" data-product="${product.slug}">Request sample</button>
        <button class="ghost-light" data-modal="meeting" data-product="${product.slug}">Schedule meeting with REMO</button>
      </div>
    </div>
  `;
}

function ExportableProductSheet(product) {
  return `
    ${ProductOverviewSection(product)}
    ${SupplierProfileSection(product)}
    ${TechnicalSpecsSection(product)}
    ${PackagingSection(product)}
    ${CapacitySection(product)}
    ${CommercialTermsSection(product)}
    ${LogisticsProfileSection(product)}
    ${TradeComplianceSection(product)}
    ${SuggestedMarketsSection(product)}
    ${ReadinessScorePanel(product)}
    ${RiskAndGapsPanel(product)}
    ${DocumentAccessPanel(product)}
    ${RequestInformationSection(product)}
  `;
}

function ProductOverviewSection(product) {
  return Section("overview", "Overview", `
    <p class="lead">${product.overview.shortDescription}</p>
    <p>${product.overview.extendedDescription}</p>
    <div class="three-column">
      ${InfoList("Uses", product.overview.uses)}
      ${InfoList("Differentiators", product.overview.differentiators)}
      ${InfoList("Recommended channels", product.overview.recommendedChannels.map(formatChannel))}
    </div>
    <div class="takeaway">This Colombian product has been structured by REMO to support international buyer evaluation, technical review and COMEX feasibility.</div>
  `);
}

function SupplierProfileSection(product) {
  return Section("supplier", "Supplier profile", `
    <div class="profile-grid">
      ${DataPoint("Company", product.supplier.companyName)}
      ${DataPoint("Commercial brand", product.supplier.commercialBrand)}
      ${DataPoint("Location", product.supplier.location)}
      ${DataPoint("Sector", product.supplier.sector)}
      ${DataPoint("Company size", product.supplier.companySize)}
      ${DataPoint("Contact policy", "Contact through REMO")}
    </div>
    <p class="privacy-note">NIT, RUT and sensitive contact data are hidden in public view. Buyer access is validated by REMO.</p>
    <p>${product.supplier.impactStory}</p>
  `);
}

function TechnicalSpecsSection(product) {
  return Section("specifications", "Product specifications", `
    <div class="two-column">
      ${InfoList("Technical profile", [
        `Composition: ${product.technicalSpecs.composition}`,
        `Shelf life: ${product.technicalSpecs.shelfLife}`,
        `Conservation: ${product.technicalSpecs.conservation}`,
        `Traceability: ${product.technicalSpecs.traceability}`
      ])}
      ${InfoList("Standards and restrictions", [
        ...product.technicalSpecs.applicableStandards,
        ...product.technicalSpecs.warnings
      ])}
    </div>
  `);
}

function PackagingSection(product) {
  const rows = [
    ["Presentations", product.packaging.presentations.join(", ")],
    ["Primary packaging", product.packaging.primaryPackaging],
    ["Secondary packaging", product.packaging.secondaryPackaging],
    ["Tertiary packaging", product.packaging.tertiaryPackaging],
    ["Units per box", product.packaging.unitsPerBox],
    ["Private label", product.packaging.privateLabelAvailable ? "Available" : "Not available"],
    ["Label languages", product.packaging.labelLanguages.join(", ")]
  ];
  return Section("packaging", "Presentations & packaging", `
    ${MiniTable(rows)}
  `);
}

function CapacitySection(product) {
  return Section("capacity", "Capacity & availability", `
    <div class="capacity-panel">
      <div>
        <strong>Capacity available for export</strong>
        <span>${product.capacity.availableMonthlyExportCapacity}</span>
      </div>
      <div class="capacity-meter"><i style="width:${product.capacity.capacityAvailablePercent}%"></i></div>
      <em>${product.capacity.capacityAvailablePercent}% sample available capacity indicator</em>
    </div>
    <div class="three-column">
      ${DataCard("Production lead time", product.capacity.productionLeadTime)}
      ${DataCard("Recommended first order", product.capacity.recommendedFirstOrderVolume)}
      ${DataCard("Replenishment", product.capacity.replenishmentFrequency)}
    </div>
  `);
}

function CommercialTermsSection(product) {
  return Section("commercial", "Commercial terms", `
    <div class="two-column">
      ${InfoList("Commercial setup", [
        `Reference price: ${product.commercialTerms.referencePrice}`,
        `Currency: ${product.commercialTerms.currency}`,
        `Price validity: ${product.commercialTerms.priceValidity}`,
        `Payment terms: ${product.commercialTerms.suggestedPaymentTerms}`
      ])}
      ${InfoList("Volume scenarios", product.commercialTerms.volumeScenarios)}
    </div>
    <div class="disclaimer">
      Reference prices are indicative and subject to volume, destination, Incoterm, exchange rate and final COMEX validation.
      <br />Los precios de referencia son orientativos y están sujetos a volumen, destino, Incoterm, tasa de cambio y validación COMEX final.
    </div>
  `);
}

function LogisticsProfileSection(product) {
  return Section("logistics", "Logistics profile", `
    ${QuickFactsPanel([
      ["Cargo type", formatCargo(product.logistics.cargoType), "truck"],
      ["Temperature", product.logistics.requiredTemperature, "chart"],
      ["MOQ", product.capacity.exportableMoq, "box"],
      ["Port / airport", product.logistics.suggestedPortOrAirport, "globe"]
    ], { inline: true })}
    ${InfoList("Logistics risks", product.logistics.logisticsRisks)}
  `);
}

function TradeComplianceSection(product) {
  return Section("compliance", "Trade & compliance", `
    <div class="profile-grid">
      ${DataPoint("Suggested HS code", product.tradeCompliance.suggestedHsCode)}
      ${DataPoint("Tariff description", product.tradeCompliance.tariffDescription)}
      ${DataPoint("Incoterms", product.tradeCompliance.possibleIncoterms.join(", "))}
      ${DataPoint("Previous export experience", product.tradeCompliance.previousExportExperience)}
    </div>
    <div class="disclaimer">HS code, market access requirements and regulatory conditions must be validated before any formal operation.</div>
  `);
}

function SuggestedMarketsSection(product) {
  return Section("markets", "Suggested markets", `
    <div class="market-grid">
      ${product.suggestedMarkets
        .map(
          (market) => `
          <article class="market-card">
            <strong>${market.countryOrRegion}</strong>
            <span>${formatChannel(market.channel)}</span>
            <p>${market.whyItFits}</p>
            <small>Barrier: ${market.keyBarrier}</small>
            <em>${market.nextStep}</em>
          </article>
        `
        )
        .join("")}
    </div>
  `);
}

function ReadinessScorePanel(product) {
  const readiness = READINESS_META[product.readiness.status];
  const dimensions = Object.entries(product.readiness.dimensions).slice(0, 8);
  return Section("readiness", "Readiness REMO", `
    <div class="readiness-panel">
      <div>
        ${ReadinessBadge(product.readiness.status)}
        <h3>${readiness.label}</h3>
        <p>Public view shows status and next step. Internal score stays restricted to REMO/data room views.</p>
      </div>
      <div class="score-lock">
        <span>${icon("lock")}</span>
        <strong>Internal score restricted</strong>
        <small>0-60 score visible only in REMO internal view.</small>
      </div>
    </div>
    <div class="dimension-grid">
      ${dimensions.map(([key, value]) => `<span><i style="width:${value * 20}%"></i><b>${humanizeKey(key)}</b></span>`).join("")}
    </div>
    <div class="next-step">Next validation step: ${product.readiness.nextValidationStep}</div>
  `);
}

function RiskAndGapsPanel(product) {
  return Section("risks", "Risks & gaps", `
    <div class="risk-list">
      ${product.risks
        .map(
          (risk) => `
        <article class="risk-card ${risk.level}">
          <span>${risk.type}</span>
          <strong>${risk.publicSummary}</strong>
          <p>${risk.requiredAction}</p>
          <small>${risk.responsibleParty} · ${risk.status}</small>
        </article>
      `
        )
        .join("")}
    </div>
    <div class="privacy-note">Public view shows only commercially relevant risks. Qualified buyer and REMO internal views unlock more detail.</div>
  `);
}

function DocumentAccessPanel(product, compact = false) {
  return `
    <section class="${compact ? "sidebar-card" : "sheet-section"}" id="${compact ? "" : "documents"}">
      <div class="section-heading">
        <span>${icon("doc")}</span>
        <div>
          <h2>Documents</h2>
          <p>Public, buyer, qualified buyer and data room access levels.</p>
        </div>
      </div>
      <div class="document-list ${compact ? "compact-docs" : ""}">
        ${product.documents
          .map(
            (doc) => `
          <div class="document-item">
            <span>${doc.name}</span>
            <b class="${doc.status}">${formatStatus(doc.status)}</b>
            <small>${ACCESS_LEVELS.find((level) => level.id === doc.accessLevel)?.label ?? doc.accessLevel}</small>
          </div>
        `
          )
          .join("")}
      </div>
      ${compact ? "" : AccessLevelPanel()}
    </section>
  `;
}

function BuyerActionsPanel(product) {
  return `
    <section class="sidebar-card buyer-actions">
      <strong>Buyer actions</strong>
      <button class="primary-button" data-modal="quote" data-product="${product.slug}">Request quotation</button>
      <button class="secondary-button" data-modal="full-sheet" data-product="${product.slug}">Request full sheet</button>
      <button class="secondary-button" data-modal="sample" data-product="${product.slug}">Request sample</button>
      <button class="secondary-button" data-modal="meeting" data-product="${product.slug}">Schedule meeting</button>
      <button class="text-button" data-shortlist="${product.slug}">Add to shortlist</button>
      <button class="text-button" data-compare="${product.slug}">Compare</button>
    </section>
  `;
}

function SupplierTrustCard(product) {
  return `
    <section class="sidebar-card">
      <div class="trust-card">
        <span class="trust-icon">${icon("shield")}</span>
        <strong>${product.supplier.commercialBrand}</strong>
        <p>${product.supplier.location}</p>
      </div>
      <div class="trust-copy small">
        Contact is managed through REMO. Sensitive legal and commercial data is protected by access level.
      </div>
    </section>
  `;
}

function RequestInformationSection(product) {
  return Section("request", "Request information", `
    <div class="request-panel">
      <div>
        <h3>Validate this opportunity with REMO</h3>
        <p>Request full product sheet, quotation, sample or COMEX feasibility before any formal operation.</p>
      </div>
      <button class="primary-button" data-modal="quote" data-product="${product.slug}">Start buyer request</button>
    </div>
  `);
}

function RequestModal(type, product) {
  const titles = {
    quote: "Request quotation",
    sample: "Request sample",
    "full-sheet": "Request full product sheet",
    meeting: "Schedule meeting with REMO",
    sourcing: "Request sourcing support"
  };
  return `
    <div class="modal-backdrop" role="dialog" aria-modal="true" aria-label="${titles[type] ?? "Buyer request"}">
      <form class="request-modal">
        <button type="button" class="modal-close" data-close-modal>×</button>
        <div class="eyebrow">Buyer validation</div>
        <h2>${titles[type] ?? "Buyer request"}</h2>
        <p>Your request has been received only as a frontend mock. No real data will be sent.</p>
        <div class="form-grid">
          ${Input("Buyer name", "name", true)}
          ${Input("Company", "company", true)}
          ${Input("Country", "country", true)}
          ${Input("Role", "role", false)}
          ${Input("Email", "email", true, "email")}
          ${Input("Phone / WhatsApp", "phone", false)}
          ${Input("Estimated volume", "volume", false)}
          ${Input("Destination country", "destination", true)}
          <label class="full-span">Channel
            <select required>
              <option>distributor</option>
              <option>retail</option>
              <option>food service</option>
              <option>industrial</option>
              <option>e-commerce</option>
              <option>institutional</option>
            </select>
          </label>
          <label class="full-span">Message
            <textarea placeholder="Tell REMO what you need to validate."></textarea>
          </label>
          <label class="consent full-span">
            <input type="checkbox" required />
            I understand REMO will validate the buyer profile before sharing restricted information.
          </label>
        </div>
        <button class="primary-button" type="submit" data-submit-request>Send mock request</button>
        <div class="modal-confirmation" hidden>
          Your request has been received. REMO will validate the buyer profile and contact you with the next steps.
          <br />Tu solicitud fue recibida. REMO validará el perfil comprador y te contactará con los siguientes pasos.
        </div>
      </form>
    </div>
  `;
}

function CompareProductsBar() {
  if (state.compare.size === 0) return "";
  const names = [...state.compare]
    .map((slug) => state.products.find((product) => product.slug === slug)?.product.nameEn)
    .filter(Boolean);
  return `
    <div class="compare-bar">
      <span>${icon("compare")}</span>
      <strong>${state.compare.size} product${state.compare.size > 1 ? "s" : ""} selected for comparison</strong>
      <p>${names.join(" · ")}</p>
      <button class="secondary-button" data-clear-compare>Clear</button>
    </div>
  `;
}

function AccessLevelPanel() {
  return `
    <div class="access-grid">
      ${ACCESS_LEVELS.map(
        (level, index) => `
        <article class="access-card ${index > 1 ? "locked" : ""}">
          <span>${index + 1}</span>
          <strong>${level.label}</strong>
          <p>${level.detail}</p>
          ${index > 1 ? `<em>${icon("lock")} Available after REMO buyer validation.</em>` : ""}
        </article>
      `
      ).join("")}
    </div>
  `;
}

function PatternCard(from, to) {
  return `
    <article class="pattern-card">
      <span>Marketplace pattern</span>
      <strong>${from}</strong>
      <i></i>
      <span>REMO adaptation</span>
      <b>${to}</b>
    </article>
  `;
}

function Section(id, title, body) {
  return `
    <section class="sheet-section" id="${id}">
      <div class="section-heading">
        <span>${icon(sectionIcon(title))}</span>
        <div>
          <h2>${title}</h2>
          <p>Structured for buyer evaluation and REMO validation.</p>
        </div>
      </div>
      ${body}
    </section>
  `;
}

function sectionIcon(title) {
  if (/logistics/i.test(title)) return "truck";
  if (/document|spec|compliance/i.test(title)) return "doc";
  if (/readiness|risk/i.test(title)) return "shield";
  if (/capacity|market/i.test(title)) return "chart";
  return "box";
}

function InfoList(title, items) {
  return `
    <div class="info-list">
      <strong>${title}</strong>
      <ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>
    </div>
  `;
}

function MiniTable(rows) {
  return `
    <div class="mini-table">
      ${rows.map(([key, value]) => `<div><strong>${key}</strong><span>${value}</span></div>`).join("")}
    </div>
  `;
}

function DataPoint(label, value) {
  return `<div class="data-point"><span>${label}</span><strong>${value}</strong></div>`;
}

function DataCard(label, value) {
  return `<article class="data-card"><span>${label}</span><strong>${value}</strong></article>`;
}

function QuickFact(label, value, iconName) {
  return `
    <div class="quick-fact">
      <span>${icon(iconName)}</span>
      <small>${label}</small>
      <strong>${value}</strong>
    </div>
  `;
}

function QuickFactsPanel(facts, options = {}) {
  return `
    <div class="quick-facts ${options.inline ? "inline" : ""}">
      ${facts.map(([label, value, iconName]) => QuickFact(label, value, iconName)).join("")}
    </div>
  `;
}

function ShortlistButton(product) {
  return `
    <button class="icon-button ${state.shortlist.has(product.slug) ? "active" : ""}" data-shortlist="${product.slug}" aria-label="Save to shortlist">
      ${icon("star")}
    </button>
  `;
}

function LanguageToggle() {
  return `<button class="ghost-button" data-lang-toggle>${state.language === "EN" ? "ES" : "EN"}</button>`;
}

const RequestQuoteModal = (product) => RequestModal("quote", product);
const RequestSampleModal = (product) => RequestModal("sample", product);
const RequestFullSheetModal = (product) => RequestModal("full-sheet", product);
const ScheduleMeetingModal = (product) => RequestModal("meeting", product);

function ReadinessBadge(status) {
  const meta = READINESS_META[status] ?? READINESS_META.under_technical_review;
  return `<span class="readiness-badge ${meta.tone}">${meta.label}</span>`;
}

function ProductBadge(label) {
  return `<span class="product-badge">${label}</span>`;
}

function DocumentChip(label) {
  return `<span class="document-chip">${icon("doc")}${label}</span>`;
}

function Input(label, name, required = false, type = "text") {
  return `<label>${label}<input name="${name}" type="${type}" ${required ? "required" : ""} /></label>`;
}

function filteredProducts() {
  return state.products.filter((product) => {
    const haystack = `${product.product.nameEs} ${product.product.nameEn} ${product.product.category} ${product.product.originRegion} ${product.tags.join(" ")}`.toLowerCase();
    const searchMatch = !state.search || haystack.includes(state.search.toLowerCase());
    const categoryMatch = state.filters.category === "all" || product.product.category === state.filters.category;
    const readinessMatch = state.filters.readiness === "all" || product.readiness.status === state.filters.readiness;
    const logisticsMatch =
      state.filters.logistics === "all" ||
      product.logistics.temperatureCondition === state.filters.logistics ||
      product.logistics.cargoType === state.filters.logistics;
    return searchMatch && categoryMatch && readinessMatch && logisticsMatch;
  });
}

function bindEvents() {
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => navigateToProduct(button.dataset.view));
  });
  document.querySelectorAll("[data-back-listing]").forEach((button) => {
    button.addEventListener("click", navigateToListing);
  });
  document.querySelector("[data-search]")?.addEventListener("input", (event) => {
    state.search = event.target.value;
    render();
  });
  document.querySelectorAll("[data-filter]").forEach((select) => {
    select.addEventListener("change", (event) => {
      state.filters[select.dataset.filter] = event.target.value;
      render();
    });
  });
  document.querySelectorAll("[data-modal]").forEach((button) => {
    button.addEventListener("click", () => {
      const product = state.products.find((item) => item.slug === button.dataset.product) ?? null;
      state.modal = { type: button.dataset.modal, product };
      render();
    });
  });
  document.querySelector("[data-close-modal]")?.addEventListener("click", () => {
    state.modal = null;
    render();
  });
  document.querySelector("[data-submit-request]")?.addEventListener("click", (event) => {
    event.preventDefault();
    const form = event.target.closest("form");
    if (!form.reportValidity()) return;
    form.querySelector(".modal-confirmation").hidden = false;
  });
  document.querySelectorAll("[data-shortlist]").forEach((button) => {
    button.addEventListener("click", () => {
      toggleSet(state.shortlist, button.dataset.shortlist);
      button.classList.toggle("active", state.shortlist.has(button.dataset.shortlist));
    });
  });
  document.querySelectorAll("[data-compare]").forEach((button) => {
    button.addEventListener("click", () => {
      toggleSet(state.compare, button.dataset.compare);
      render();
    });
  });
  document.querySelector("[data-clear-compare]")?.addEventListener("click", () => {
    state.compare.clear();
    render();
  });
  document.querySelector("[data-scroll-products]")?.addEventListener("click", () => {
    document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
  });
  document.querySelector("[data-lang-toggle]")?.addEventListener("click", () => {
    state.language = state.language === "EN" ? "ES" : "EN";
    render();
  });
}

function toggleSet(set, value) {
  if (!value) return;
  if (set.has(value)) set.delete(value);
  else set.add(value);
}

function formatCargo(value) {
  return String(value).replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatChannel(value) {
  return String(value).replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatStatus(value) {
  return String(value).replace(/_/g, " ");
}

function humanizeKey(value) {
  return String(value).replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);
}

init().catch((error) => {
  app.innerHTML = `<div class="error-state">Could not load Vitrina REMO template: ${escapeHtml(error.message)}</div>`;
});
