// Function to calculate the HRA Exemption
function calculateHRAExemption(basicSalary, hraPaid, rentPaid) {
  const rentExemption = rentPaid - (0.4 * basicSalary);
  return Math.min(hraPaid, rentPaid, rentExemption);
}

// Function to calculate the tax for Old Regime (including breakdown)
function calculateOldRegimeTax(income, deductions = 0, hraExemption = 0) {
  let taxableIncome = income - deductions - hraExemption;
  let tax = 0;
  let breakdown = [];

  // Tax Slabs for Old Regime
  if (taxableIncome <= 250000) {
    tax = 0;
    breakdown.push({ slab: '₹0 – ₹2.5 L', taxableIncome: taxableIncome, rate: '0%', tax: '₹0' });
  } else if (taxableIncome <= 500000) {
    let slabTax = (taxableIncome - 250000) * 0.05;
    tax = slabTax;
    breakdown.push({ slab: '₹2.5 L – ₹5 L', taxableIncome: taxableIncome - 250000, rate: '5%', tax: `₹${slabTax.toFixed(2)}` });
  } else if (taxableIncome <= 1000000) {
    let slabTax = 250000 * 0.05 + (taxableIncome - 500000) * 0.2;
    tax = slabTax;
    breakdown.push({ slab: '₹2.5 L – ₹5 L', taxableIncome: 250000, rate: '5%', tax: '₹12500' });
    breakdown.push({ slab: '₹5 L – ₹10 L', taxableIncome: taxableIncome - 500000, rate: '20%', tax: `₹${((taxableIncome - 500000) * 0.2).toFixed(2)}` });
  } else {
    let slabTax = 250000 * 0.05 + 500000 * 0.2 + (taxableIncome - 1000000) * 0.3;
    tax = slabTax;
    breakdown.push({ slab: '₹2.5 L – ₹5 L', taxableIncome: 250000, rate: '5%', tax: '₹12500' });
    breakdown.push({ slab: '₹5 L – ₹10 L', taxableIncome: 500000, rate: '20%', tax: '₹100000' });
    breakdown.push({ slab: '₹10 L and above', taxableIncome: taxableIncome - 1000000, rate: '30%', tax: `₹${((taxableIncome - 1000000) * 0.3).toFixed(2)}` });
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
    breakdown.push({ slab: '₹0 – ₹2.5 L', taxableIncome: taxableIncome, rate: '0%', tax: '₹0' });
  } else if (taxableIncome <= 500000) {
    let slabTax = (taxableIncome - 250000) * 0.05;
    tax = slabTax;
    breakdown.push({ slab: '₹2.5 L – ₹5 L', taxableIncome: taxableIncome - 250000, rate: '5%', tax: `₹${slabTax.toFixed(2)}` });
  } else if (taxableIncome <= 750000) {
    let slabTax = 250000 * 0.05 + (taxableIncome - 500000) * 0.1;
    tax = slabTax;
    breakdown.push({ slab: '₹2.5 L – ₹5 L', taxableIncome: 250000, rate: '5%', tax: '₹12500' });
    breakdown.push({ slab: '₹5 L – ₹7.5 L', taxableIncome: taxableIncome - 500000, rate: '10%', tax: `₹${((taxableIncome - 500000) * 0.1).toFixed(2)}` });
  } else if (taxableIncome <= 1000000) {
    let slabTax = 250000 * 0.05 + 250000 * 0.1 + (taxableIncome - 750000) * 0.15;
    tax = slabTax;
    breakdown.push({ slab: '₹2.5 L – ₹5 L', taxableIncome: 250000, rate: '5%', tax: '₹12500' });
    breakdown.push({ slab: '₹5 L – ₹7.5 L', taxableIncome: 250000, rate: '10%', tax: '₹25000' });
    breakdown.push({ slab: '₹7.5 L – ₹10 L', taxableIncome: taxableIncome - 750000, rate: '15%', tax: `₹${((taxableIncome - 750000) * 0.15).toFixed(2)}` });
  } else if (taxableIncome <= 1250000) {
    let slabTax = 250000 * 0.05 + 250000 * 0.1 + 250000 * 0.15 + (taxableIncome - 1000000) * 0.2;
    tax = slabTax;
    breakdown.push({ slab: '₹2.5 L – ₹5 L', taxableIncome: 250000, rate: '5%', tax: '₹12500' });
    breakdown.push({ slab: '₹5 L – ₹7.5 L', taxableIncome: 250000, rate: '10%', tax: '₹25000' });
    breakdown.push({ slab: '₹7.5 L – ₹10 L', taxableIncome: 250000, rate: '15%', tax: '₹37500' });
    breakdown.push({ slab: '₹10 L – ₹12.5 L', taxableIncome: taxableIncome - 1000000, rate: '20%', tax: `₹${((taxableIncome - 1000000) * 0.2).toFixed(2)}` });
  } else {
    let slabTax = 250000 * 0.05 + 250000 * 0.1 + 250000 * 0.15 + 250000 * 0.2 + (taxableIncome - 1250000) * 0.25;
    tax = slabTax;
    breakdown.push({ slab: '₹2.5 L – ₹5 L', taxableIncome: 250000, rate: '5%', tax: '₹12500' });
    breakdown.push({ slab: '₹5 L – ₹7.5 L', taxableIncome: 250000, rate: '10%', tax: '₹25000' });
    breakdown.push({ slab: '₹7.5 L – ₹10 L', taxableIncome: 250000, rate: '15%', tax: '₹37500' });
    breakdown.push({ slab: '₹10 L – ₹12.5 L', taxableIncome: 250000, rate: '20%', tax: '₹50000' });
    breakdown.push({ slab: '₹12.5 L and above', taxableIncome: taxableIncome - 1250000, rate: '25%', tax: `₹${((taxableIncome - 1250000) * 0.25).toFixed(2)}` });
  }

  return { tax, breakdown };
}

// Main function to calculate tax and display results
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
  const oldBreakdown = document.getElementById('oldRegimeBreakdown');
  oldBreakdown.innerHTML = '';
  oldTaxResults.breakdown.forEach(item => {
    const row = `<tr>
                  <td>${item.slab}</td>
                  <td>₹${item.taxableIncome}</td>
                  <td>${item.rate}</td>
                  <td>${item.tax}</td>
                </tr>`;
    oldBreakdown.innerHTML += row;
  });

  // Display Tax Breakdown for New Regime
  const newBreakdown = document.getElementById('newRegimeBreakdown');
  newBreakdown.innerHTML = '';
  newTaxResults.breakdown.forEach(item => {
    const row = `<tr>
                  <td>${item.slab}</td>
                  <td>₹${item.taxableIncome}</td>
                  <td>${item.rate}</td>
                  <td>${item.tax}</td>
                </tr>`;
    newBreakdown.innerHTML += row;
  });

  // Calculate and display savings
  const savings = oldTaxResults.tax - newTaxResults.tax;
  if (savings > 0) {
    document.getElementById('savings').textContent = `You save ₹${savings.toFixed(2)} by choosing the New Tax Regime.`;
  } else {
    document.getElementById('savings').textContent = '';
  }
}
