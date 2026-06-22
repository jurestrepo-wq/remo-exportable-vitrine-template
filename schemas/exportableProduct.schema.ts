export type ProductPublicationStatus =
  | "sample_placeholder"
  | "draft"
  | "under_remo_review"
  | "validated_by_remo"
  | "paused";

export type AccessLevel = "public" | "registered_buyer" | "qualified_buyer" | "nda_data_room" | "remo_internal";

export type ReadinessStatus = "validated_by_remo" | "under_preparation" | "under_technical_review" | "not_ready";

export type CargoType = "general_cargo" | "refrigerated" | "frozen" | "special_cargo";

export type TemperatureCondition = "ambient" | "refrigerated" | "frozen" | "controlled";

export type DocumentStatus = "available" | "pending" | "under_review" | "available_under_nda" | "data_room";

export type RiskLevel = "low" | "medium" | "high" | "internal_only";

export type BuyerChannel = "distributor" | "retail" | "food_service" | "industrial" | "ecommerce" | "institutional" | "other";

export type ProductCategory =
  | "agrofoods"
  | "cosmetics"
  | "manufacturing"
  | "fashion"
  | "handcrafts"
  | "industrial_inputs"
  | "specialty_products";

export interface ExportableProduct {
  id: string;
  slug: string;
  remoCode: string;
  status: ProductPublicationStatus;
  accessLevel: AccessLevel;
  lastUpdated: string;
  sampleData: boolean;
  responsibleRemoOwner: string;
  product: ProductInfo;
  supplier: SupplierInfo;
  media: ProductMedia[];
  overview: ProductOverview;
  technicalSpecs: TechnicalSpecs;
  packaging: PackagingInfo;
  capacity: CapacityInfo;
  commercialTerms: CommercialTerms;
  tradeCompliance: TradeComplianceInfo;
  logistics: LogisticsProfile;
  suggestedMarkets: SuggestedMarket[];
  readiness: ReadinessAssessment;
  risks: RiskItem[];
  documents: DocumentItem[];
  tags: string[];
  ctas: CTAConfig[];
}

export interface ProductInfo {
  nameEs: string;
  nameEn: string;
  category: ProductCategory;
  subcategory: string;
  originCity: string;
  originRegion: string;
  originCountry: "Colombia";
  supplierType: string;
}

export interface SupplierInfo {
  companyName: string;
  commercialBrand: string;
  location: string;
  sector: string;
  yearFounded?: string;
  companySize: string;
  impactStory: string;
  publicContactPolicy: "through_remo";
  authorizedForPublication: boolean;
}

export interface ProductMedia {
  type: "image" | "video" | "document_preview";
  url: string;
  alt: string;
  accessLevel: AccessLevel;
}

export interface ProductOverview {
  shortDescription: string;
  extendedDescription: string;
  uses: string[];
  applications: string[];
  differentiators: string[];
  idealInternationalBuyer: string;
  recommendedChannels: BuyerChannel[];
}

export interface TechnicalSpecs {
  composition: string;
  physicalCharacteristics: string[];
  chemicalCharacteristics?: string[];
  microbiologicalCharacteristics?: string[];
  shelfLife: string;
  conservation: string;
  warnings: string[];
  applicableStandards: string[];
  certifications: string[];
  sanitaryRegistration?: string;
  traceability: string;
}

export interface PackagingInfo {
  presentations: string[];
  primaryPackaging: string;
  secondaryPackaging: string;
  tertiaryPackaging: string;
  unitsPerBox: string;
  netWeightPerUnit: string;
  grossWeightPerBox: string;
  boxDimensions: string;
  boxesPerPallet: string;
  unitsPerPallet: string;
  palletType: string;
  privateLabelAvailable: boolean;
  customLabeling: boolean;
  labelLanguages: string[];
  barcode: string;
}

export interface CapacityInfo {
  installedMonthlyCapacity: string;
  availableMonthlyExportCapacity: string;
  productionLeadTime: string;
  orderPreparationTime: string;
  productiveMoq: string;
  exportableMoq: string;
  recommendedFirstOrderVolume: string;
  replenishmentFrequency: string;
  seasonalAvailability: string;
  productionRestrictions: string;
  scalability: string;
  capacityAvailablePercent: number;
}

export interface CommercialTerms {
  referencePrice: string;
  currency: string;
  priceVisibilityLevel: AccessLevel;
  priceValidity: string;
  minimumTrm?: string;
  volumeScenarios: string[];
  suggestedPaymentTerms: string;
  estimatedDeliveryTime: string;
  volumeDiscounts: string;
  exclusivity: string;
  authorizedDistribution: string;
  recommendedChannels: BuyerChannel[];
}

export interface TradeComplianceInfo {
  suggestedHsCode: string;
  tariffDescription: string;
  possibleIncoterms: string[];
  certificateOfOrigin: DocumentStatus;
  tradeAgreements: string[];
  availableDocuments: string[];
  pendingDocuments: string[];
  previousExportExperience: string;
  prioritizedMarkets: string[];
  knownRestrictions: string[];
}

export interface LogisticsProfile {
  cargoType: CargoType;
  temperatureCondition: TemperatureCondition;
  requiredTemperature: string;
  storageRequirements: string;
  netGrossWeight: string;
  volumetricWeight: string;
  unitDimensions: string;
  boxDimensions: string;
  palletDimensions: string;
  estimated20ContainerCapacity: string;
  estimated40ContainerCapacity: string;
  logisticsRisks: string[];
  recommendedInsurance: string;
  suggestedPortOrAirport: string;
  suggestedTransportMode: string;
}

export interface SuggestedMarket {
  countryOrRegion: string;
  channel: BuyerChannel;
  whyItFits: string;
  keyBarrier: string;
  nextStep: string;
}

export interface ReadinessAssessment {
  status: ReadinessStatus;
  publicLabel: string;
  internalScore: number;
  maxScore: 60;
  lastUpdated: string;
  nextValidationStep: string;
  dimensions: Record<
    | "productDefined"
    | "productionCapacity"
    | "documentation"
    | "technicalSheet"
    | "exportablePackaging"
    | "internationalCosting"
    | "logisticsFeasibility"
    | "regulatoryCompliance"
    | "potentialMargin"
    | "businessCommitment"
    | "exportExperience"
    | "marketPotential",
    number
  >;
}

export interface RiskItem {
  type: "commercial" | "logistics" | "financial" | "regulatory" | "documentation" | "productive" | "reputation" | "quality" | "market";
  level: RiskLevel;
  publicSummary: string;
  requiredAction: string;
  responsibleParty: "supplier" | "buyer" | "remo" | "joint";
  status: "open" | "in_progress" | "mitigated" | "internal";
}

export interface DocumentItem {
  name: string;
  status: DocumentStatus;
  accessLevel: AccessLevel;
  updatedAt: string;
}

export interface CTAConfig {
  label: string;
  action: "request_full_sheet" | "request_quote" | "request_sample" | "schedule_meeting" | "validate_comex" | "shortlist" | "compare";
  primary?: boolean;
}
