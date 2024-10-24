import { Paper, Stack, NumberInput } from '@mantine/core';
import { CalculatorValues } from '../hooks/useCalculations';

interface InputSectionProps {
  values: CalculatorValues;
  onChange: (values: CalculatorValues) => void;
}

export function InputSection({ values, onChange }: InputSectionProps) {
  const handleChange = (field: keyof CalculatorValues) => (val: number | string) => {
    const newValue = Number(val) || 0;
    onChange({
      ...values,
      [field]: newValue,
    });
  };

  return (
    <Paper shadow="xs" p="md" mb="lg">
      <Stack spacing="md">
        <NumberInput
          label="Numero totale lead"
          value={values.totalLeads}
          onChange={handleChange('totalLeads')}
          min={0}
        />
        <NumberInput
          label="Costo per lead (€)"
          value={values.costPerLead}
          onChange={handleChange('costPerLead')}
          min={0}
          precision={2}
          prefix="€"
        />
        <NumberInput
          label="Prezzo di vendita (€)"
          value={values.sellingPrice}
          onChange={handleChange('sellingPrice')}
          min={0}
          precision={2}
          prefix="€"
        />
        <NumberInput
          label="Costo chiamata call center (€)"
          value={values.callCenterCostPerCall}
          onChange={handleChange('callCenterCostPerCall')}
          min={0}
          precision={2}
          prefix="€"
        />
        <NumberInput
          label="Costo per reso (€)"
          value={values.returnCostPerPackage}
          onChange={handleChange('returnCostPerPackage')}
          min={0}
          precision={2}
          prefix="€"
        />
        <NumberInput
          label="Costo spedizione per pacco (€)"
          value={values.shippingCostPerPackage}
          onChange={handleChange('shippingCostPerPackage')}
          min={0}
          precision={2}
          prefix="€"
        />
        <NumberInput
          label="Costo prodotto per unità (€)"
          value={values.productCostPerUnit}
          onChange={handleChange('productCostPerUnit')}
          min={0}
          precision={2}
          prefix="€"
        />
        <NumberInput
          label="Tasso di conferma (%)"
          value={values.confirmationRate}
          onChange={handleChange('confirmationRate')}
          min={0}
          max={100}
          precision={2}
          suffix="%"
        />
      </Stack>
    </Paper>
  );
}