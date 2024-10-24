import { Container, Title, Box } from '@mantine/core';
import { InputSection } from './InputSection';
import { ResultsSection } from './ResultsSection';
import { useState } from 'react';
import { CalculatorValues, useCalculations } from '../hooks/useCalculations';

export function Calculator() {
  const [values, setValues] = useState<CalculatorValues>({
    totalLeads: 100,
    costPerLead: 10,
    sellingPrice: 50,
    callCenterCostPerCall: 2,
    returnCostPerPackage: 5,
    shippingCostPerPackage: 7,
    productCostPerUnit: 20,
    confirmationRate: 60,
  });

  const calculations = useCalculations(values);

  return (
    <Box bg="gray.1" mih="100vh" py="xl">
      <Container size="md">
        <Title order={2} mb="lg" ta="center">Calcolatore Lead e Profittabilità COD</Title>
        <InputSection values={values} onChange={setValues} />
        <ResultsSection calculations={calculations} />
      </Container>
    </Box>
  );
}