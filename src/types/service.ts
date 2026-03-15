export type ServiceType = "self-serve" | "managed";

export interface Service {
  id: string;
  name: string;
  category: string;
  type: ServiceType;
  icon_key: string;
  keywords: string[];
  niches: string[];
}
