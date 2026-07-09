/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  capacity: string;
  description: string;
  specs: {
    weight: string;
    dimensions: string;
    material: string;
    packagingUnit: string;
    dispensingSystem: string;
    useCase: string;
  };
  features: string[];
}

export interface Certification {
  id: string;
  title: string;
  subtitle: string;
  authority: string;
  description: string;
  standard: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  category: "environmental" | "protection" | "efficiency";
}

export interface QualityStep {
  id: number;
  phase: string;
  title: string;
  description: string;
  metric: string;
  status: "certified" | "verified" | "validated";
}

export interface MockupCategory {
  id: string;
  name: string;
  items: MockupItem[];
}

export interface MockupItem {
  id: string;
  name: string;
  description: string;
  previewType: "stationery" | "digital" | "logistics" | "exhibition" | "packaging";
}
