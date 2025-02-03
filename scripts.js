  // Function to calculate the tax for Old Regime (including breakdown)
function calculateOldRegimeTax(income, deductions = 0, hraExemption = 0) {
  let taxableIncome = income - deductions - hraExemption;
  let tax = 0;
  let breakdown = [];

  // Tax Slabs for Old Regime
  if (taxableIncome <= 250000) {
    tax = 0;
    breakdown.push('Income upto ₹2.5 L – No Tax');
  } else if (taxableIncome <= 500000) {
    let slabTax = (taxableIncome - 250000) * 0.05;
    tax = slabTax;
    breakdown.push(`Income ₹2.5 L – ₹5 L: ₹${(taxableIncome - 250000)} * 5% = ₹${slabTax.toFixed(2)}`);
  } else if (taxableIncome <= 1000000) {
    let slabTax = 250000 * 0.05 + (taxableIncome - 500000) * 0.2;
    tax = slabTax;
    breakdown.push(`Income ₹2.5 L – ₹5 L: ₹250000 * 5% = ₹12500`);
    breakdown.push(`Income ₹5 L – ₹${taxableIncome}: ₹${(taxableIncome - 500000)} * 20% = ₹${((taxableIncome - 500000) * 0.2).toFixed(2)}`);
  } else {
    let slabTax = 250000 * 0.05 + 500000 * 0.2 + (taxableIncome - 1000000) * 0.3;
    tax = slabTax;
    breakdown.push(`Income ₹2.5 L – ₹5 L: ₹250000 * 5% = ₹12500`);
    breakdown.push(`Income ₹5 L – ₹10 L: ₹500000 * 20% = ₹100000`);
    breakdown.push(`Income ₹10 L and above: ₹${(taxableIncome - 1000000)} * 30% = ₹${((taxableIncome - 1000000) * 0.3).toFixed(2)}`);
  }

  return { tax, breakdown };
}

// Function to calculate the tax for New Regime
function calculateNewRegimeTax(income) {
  let taxableIncome = income;
  let tax = 0;
  let breakdown = [];

  // Tax Slabs for New Regime
  if (taxableIncome <= 250000) {
    tax = 0;
    breakdown.push('Income upto ₹2.5 L – No Tax');
  } else if (taxableIncome <= 500000) {
    let slabTax = (taxableIncome - 250000) * 0.05;
    tax = slabTax;
    breakdown.push(`Income ₹2.5 L – ₹5 L: ₹${(taxableIncome - 250000)} * 5% = ₹${slabTax.toFixed(2)}`);
  } else if (taxableIncome <= 750000) {
    let slabTax = 250000 * 0.05 + (taxableIncome - 500000) * 0.1;
    tax = slabTax;
    breakdown.push(`Income ₹2.5 L – ₹5 L: ₹250000 * 5% = ₹12500`);
    breakdown.push(`Income ₹5 L – ₹${taxableIncome}: ₹${(taxableIncome - 500000)} * 10% = ₹${((taxableIncome - 500000) * 0.1).toFixed(2)}`);
  } else if (taxableIncome <= 1000000) {
    let slabTax = 250000 * 0.05 + 250000 * 0.1 + (taxableIncome - 750000) * 0.15;
    tax = slabTax;
    breakdown.push(`Income ₹2.5 L – ₹5 L: ₹250000 * 5% = ₹12500`);
    breakdown.push(`Income ₹5 L – ₹7.5 L: ₹250000 * 10% = ₹25000`);
    breakdown.push(`Income ₹7.5 L – ₹${taxableIncome}: ₹${(taxableIncome - 750000)} * 15% = ₹${((taxableIncome - 750000) * 0.15).toFixed(2)}`);
  } else if (taxableIncome <= 1250000) {
    let slabTax = 250000 * 0.05 + 250000 * 0.1 + 250000 * 0.15 + (taxableIncome - 1000000) * 0.2;
    tax = slabTax;
    breakdown.push(`Income ₹2.5 L – ₹5 L: ₹250000 * 5% = ₹12500`);
    breakdown.push(`Income ₹5 L – ₹7.5 L: ₹250000 * 10% = ₹25000`);
    breakdown.push(`Income ₹7.5 L – ₹10 L: ₹250000 * 15% = ₹37500`);
    breakdown.push(`Income ₹10 L – ₹${taxableIncome}: ₹${(taxableIncome - 1000000)} * 20% = ₹${((taxableIncome - 1000000) * 0.2).toFixed(2)}`);
  } else {
    let slabTax = 250000 * 0.05 + 250000 * 0.1 + 250000 * 0.15 + 250000 * 0.2 + (taxableIncome - 1250000) * 0.25;
    tax = slabTax;
    breakdown.push(`Income ₹2.5 L – ₹5 L: ₹250000 * 5% = ₹12500`);
    breakdown.push(`Income ₹5 L – ₹7.5 L: ₹250000 * 10% = ₹25000`);
    breakdown.push(`Income ₹7.5 L – ₹10 L: ₹250000 * 15% = ₹37500`);
    breakdown.push(`Income ₹10 L – ₹12.5 L: ₹250000 * 20% = ₹50000`);
    breakdown.push(`Income ₹12.5 L and above: ₹${(taxableIncome - 1250000)} * 25% = ₹${((taxableIncome - 1250000) * 0.25).toFixed(2)}`);
  }

  return { tax, breakdown };
}

 // Function to calculate HRA Exemption
 function calculateHRAExemption(basicSalary, hraPaid, rentPaid) {
  let minHRAExemption = Math.min(hraPaid, rentPaid, rentPaid - (0.4 * basicSalary));
  return minHRAExemption > 0 ? minHRAExemption : 0;  // HRA exemption can't be negative
}

// Function to calculate tax and display the results
function calculateTax() {
  const incomeOld = parseFloat(document.getElementById('income').value);
  const incomeNew = parseFloat(document.getElementById('incomeNew').value);
  
  const deduction80c = parseFloat(document.getElementById('deduction80c').value) || 0;
  const deductionNPS = parseFloat(document.getElementById('deductionNPS').value) || 0;
  const deductionHealth = parseFloat(document.getElementById('deductionHealth').value) || 0;
  const deductionHRA = parseFloat(document.getElementById('deductionHRA').value) || 0;

  const basicSalary = parseFloat(document.getElementById('basicSalary').value) || 0;
  const hraPaid = parseFloat(document.getElementById('hraPaid').value) || 0;
  const rentPaid = parseFloat(document.getElementById('rentPaid').value) || 0;

  if (isNaN(incomeOld) || incomeOld <= 0 || isNaN(incomeNew) || incomeNew <= 0) {
    alert('Please enter valid income!');
    return;
  }

  const totalOldDeductions = deduction80c + deductionNPS + deductionHealth + deductionHRA;
  const hraExemption = calculateHRAExemption(basicSalary, hraPaid, rentPaid);

  // Calculate tax for both regimes
  const oldTaxResults = calculateOldRegimeTax(incomeOld, totalOldDeductions, hraExemption);
  const newTaxResults = calculateNewRegimeTax(incomeNew);

  // Display the results
  document.getElementById('oldTax').textContent = oldTaxResults.tax.toFixed(2);
  document.getElementById('newTax').textContent = newTaxResults.tax.toFixed(2);

  // Display HRA Exemption
  document.getElementById('hraExemption').textContent = `HRA Exemption: ₹${hraExemption.toFixed(2)}`;

  // Display Tax Breakdown for Old Regime
  const breakdownList = document.getElementById('breakdownList');
  breakdownList.innerHTML = '';  // Clear previous breakdown
  oldTaxResults.breakdown.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    breakdownList.appendChild(li);
  });

  // Display Tax Breakdown for New Regime (same approach as Old Regime)
  // ... Repeat same for the New Regime if needed

  // Calculate and display savings
  const savings = oldTaxResults.tax - newTaxResults.tax;
  if (savings > 0) {
    document.getElementById('savings').textContent = `You save ₹${savings.toFixed(2)} by choosing the New Tax Regime.`;
  } else {
    document.getElementById('savings').textContent = `You save ₹${-savings.toFixed(2)} by choosing the Old Regime.`;
  }
}
