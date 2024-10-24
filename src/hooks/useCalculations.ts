import { useMemo } from 'react';

export interface CalculatorValues {
  totalLeads: number;
  costPerLead: number;
  sellingPrice: number;
  callCenterCostPerCall: number;
  returnCostPerPackage: number;
  shippingCostPerPackage: number;
  productCostPerUnit: number;
  confirmationRate: number;
}

export interface Calculations {
  // Lead calculations
  confirmedLeads: number;
  canceledLeads: number;
  adjustedLeads: number;
  
  // Cost calculations
  originalAffiliateCost: number;
  adjustedAffiliateCost: number;
  costSavingsFromTolerance: number;
  totalCallCenterCosts: number;
  totalReturnCosts: number;
  totalShippingCosts: number;
  totalProductCosts: number;
  totalCosts: number;
  
  // Revenue and profit
  totalRevenue: number;
  netProfit: number;
  profitMargin: number;
  costPerConfirmedLead: number;
}

const TOLERANCE_THRESHOLD = 70; // 70% confirmation rate threshold
const LEAD_REDUCTION_RATE = 0.1; // Reduce 10% of leads if below threshold

export function useCalculations(values: CalculatorValues): Calculations {
  return useMemo(() => {
    // Lead calculations
    const confirmedLeads = Math.round(values.totalLeads * (values.confirmationRate / 100));
    const canceledLeads = values.totalLeads - confirmedLeads;
    
    // Tolerance adjustment
    const isConfirmationBelowThreshold = values.confirmationRate < TOLERANCE_THRESHOLD;
    const leadsToReduce = isConfirmationBelowThreshold 
      ? Math.round(values.totalLeads * LEAD_REDUCTION_RATE)
      : 0;
    const adjustedLeads = values.totalLeads - leadsToReduce;

    // Cost calculations
    const originalAffiliateCost = values.totalLeads * values.costPerLead;
    const adjustedAffiliateCost = adjustedLeads * values.costPerLead;
    const costSavingsFromTolerance = originalAffiliateCost - adjustedAffiliateCost;
    
    const totalCallCenterCosts = values.totalLeads * values.callCenterCostPerCall;
    const totalReturnCosts = canceledLeads * values.returnCostPerPackage;
    const totalShippingCosts = confirmedLeads * values.shippingCostPerPackage;
    const totalProductCosts = confirmedLeads * values.productCostPerUnit;

    const totalCosts = 
      adjustedAffiliateCost +
      totalCallCenterCosts +
      totalReturnCosts +
      totalShippingCosts +
      totalProductCosts;

    // Revenue and profit calculations
    const totalRevenue = confirmedLeads * values.sellingPrice;
    const netProfit = totalRevenue - totalCosts;
    const profitMargin = totalRevenue ? (netProfit / totalRevenue) * 100 : 0;
    const costPerConfirmedLead = confirmedLeads ? totalCosts / confirmedLeads : 0;

    return {
      confirmedLeads,
      canceledLeads,
      adjustedLeads,
      originalAffiliateCost,
      adjustedAffiliateCost,
      costSavingsFromTolerance,
      totalCallCenterCosts,
      totalReturnCosts,
      totalShippingCosts,
      totalProductCosts,
      totalCosts,
      totalRevenue,
      netProfit,
      profitMargin,
      costPerConfirmedLead,
    };
  }, [values]);
}