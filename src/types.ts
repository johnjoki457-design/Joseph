export type VideoCategory = 'all' | 'farming' | 'feeding' | 'breeding' | 'harvest' | 'cooking';

export interface MurrelVideo {
  id: string; // YouTube Video ID
  title: string;
  description: string;
  category: 'farming' | 'feeding' | 'breeding' | 'harvest' | 'cooking';
  author: string;
  duration?: string;
  publishedDate?: string;
  views?: string;
  tags: string[];
  keyTakeaways?: string[];
  isCustom?: boolean;
}

export interface FarmCalculation {
  waterVolumeLiters: number;
  stockingDensity: number; // fish per 1000L or m3
  fingerlingsCount: number;
  survivalRate: number; // percentage e.g. 80
  cultureMonths: number;
  targetWeightKg: number;
  fcr: number; // Feed conversion ratio
  totalYieldKg: number;
  totalFeedKg: number;
  estimatedFeedCost: number;
  estimatedRevenue: number;
  estimatedNetMargin: number;
  currency: string;
}
