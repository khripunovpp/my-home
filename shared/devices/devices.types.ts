
export interface ZigbeeEndpoint {
  bindings: ZigbeeBinding[];
  clusters: ZigbeeClusters;
  configured_reportings: ZigbeeConfiguredReporting[];
  scenes: any[]; // можно уточнить, если появятся примеры
}

export interface ZigbeeClusters {
  input: string[];
  output: string[];
}

export interface ZigbeeBinding {
  cluster: string;
  target: ZigbeeBindingTarget;
}

export interface ZigbeeBindingTarget {
  endpoint: number;
  ieee_address: string;
  type: string;
}

export interface ZigbeeConfiguredReporting {
  attribute: string;
  cluster: string;
  maximum_report_interval: number;
  minimum_report_interval: number;
  reportable_change: number;
}

export interface ZigbeeDevice {
  disabled: boolean;
  endpoints: Record<string, ZigbeeEndpoint>;
  friendly_name: string;
  ieee_address: string;
  interview_completed: boolean;
  interview_state: string;
  interviewing: boolean;
  supported: boolean;
  type: 'Coordinator' | 'EndDevice' | 'Router' | string;

  // опциональные поля
  date_code?: string;
  definition?: DeviceDefinition;
  manufacturer?: string;
  model_id?: string;
  network_address?: number;
  power_source?: string;
  software_build_id?: string;
}

export interface DeviceDefinition {
  description: string;
  exposes: Expose[];
  model: string;
  options: Option[];
  source: string;
  supports_ota: boolean;
  vendor: string;
}

export type Expose = ExposeProperty | ExposeComposite | ExposeLight;

export interface ExposeProperty {
  access: number;
  description: string;
  label: string;
  name: string;
  property: string;
  type: 'binary' | 'numeric' | 'enum' | string;
  unit?: string;
  category?: string;
  value_off?: string | boolean;
  value_on?: string | boolean;
  value_max?: number;
  value_min?: number;
  value_step?: number;
  values?: string[];
  presets?: ExposePreset[];
}

export interface ExposeComposite {
  features: ExposeProperty[];
  type: 'composite';
  label: string;
  name: string;
  property: string;
}

export interface ExposeLight {
  features: (ExposeProperty | ExposeComposite)[];
  type: 'light';
}

export interface ExposePreset {
  description: string;
  name: string;
  value: number;
}

export interface Option {
  access: number;
  description: string;
  label: string;
  name: string;
  property: string;
  type: 'numeric' | 'binary' | 'enum' | string;
  unit?: string;
  value_min?: number;
  value_max?: number;
  value_step?: number;
  values?: string[];
}