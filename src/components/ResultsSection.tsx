import { Paper, Text, Grid, Divider } from '@mantine/core';
import { Calculations } from '../hooks/useCalculations';

interface ResultsSectionProps {
  calculations: Calculations;
}

interface ResultRowProps {
  label: string;
  value: number;
  isEuro?: boolean;
  isPercentage?: boolean;
}

function ResultRow({ label, value, isEuro = false, isPercentage = false }: ResultRowProps) {
  const formattedValue = isEuro 
    ? `€${value.toFixed(2)}`
    : isPercentage 
      ? `${value.toFixed(2)}%`
      : value.toFixed(0);

  return (
    <Grid.Col span={6}>
      <Text fw={500}>{label}:</Text>
      <Text size="xl" c={value >= 0 ? 'green' : 'red'}>
        {formattedValue}
      </Text>
    </Grid.Col>
  );
}

export function ResultsSection({ calculations }: ResultsSectionProps) {
  return (
    <Paper shadow="xs" p="md" bg="gray.0">
      <Grid>
        <ResultRow label="Lead confermati" value={calculations.confirmedLeads} />
        <ResultRow label="Lead cancellati" value={calculations.canceledLeads} />
        <ResultRow label="Lead fatturabili" value={calculations.adjustedLeads} />
        
        <Grid.Col span={12}><Divider my="sm" label="Costi" /></Grid.Col>
        
        <ResultRow label="Costo affiliati originale" value={calculations.originalAffiliateCost} isEuro />
        <ResultRow label="Costo affiliati aggiustato" value={calculations.adjustedAffiliateCost} isEuro />
        <ResultRow label="Risparmio da tolleranza" value={calculations.costSavingsFromTolerance} isEuro />
        <ResultRow label="Costi call center" value={calculations.totalCallCenterCosts} isEuro />
        <ResultRow label="Costi resi" value={calculations.totalReturnCosts} isEuro />
        <ResultRow label="Costi spedizione" value={calculations.totalShippingCosts} isEuro />
        <ResultRow label="Costi prodotto" value={calculations.totalProductCosts} isEuro />
        <ResultRow label="Costi totali" value={calculations.totalCosts} isEuro />
        
        <Grid.Col span={12}><Divider my="sm" label="Profittabilità" /></Grid.Col>
        
        <ResultRow label="Ricavo totale" value={calculations.totalRevenue} isEuro />
        <ResultRow label="Profitto netto" value={calculations.netProfit} isEuro />
        <ResultRow label="Margine di profitto" value={calculations.profitMargin} isPercentage />
        <ResultRow label="Costo per lead confermato" value={calculations.costPerConfirmedLead} isEuro />
      </Grid>
    </Paper>
  );
}