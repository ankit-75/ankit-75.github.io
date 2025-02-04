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


// Function to calculate the tax for Old Regime (including breakdown)
function taxBreakup(...numbers) {
  let breakdown = [];
  breakdown.push({ index: '1', name: 'Gross Income', amount : `${numbers[0]}`, total: '' });
  breakdown.push({ index: '2', name: 'House rent allowances under section 10(13A)', amount : `${numbers[1]}`, total: '' });
  let newIncome = (numbers[0]- numbers[1]).toFixed(2);
  breakdown.push({ index: '3', name: 'Total income after section 10 [1-2] ', amount : '', total: `${newIncome}` });
  
  breakdown.push({ index: '4', name: 'Standard Deduction under section 16(ia) ', amount : `${numbers[2]}`, total: '' });
  newIncome = newIncome - numbers[2];
  breakdown.push({ index: '5', name: 'Total income after section 16 [3-4] ', amount : '', total: `${newIncome}` });
  
  breakdown.push({ index: '6', name: 'Deduction under section 80C', amount : `${numbers[3]}`, total: '' });
  newIncome = newIncome - numbers[3];
  breakdown.push({ index: '7', name: 'Total income after section 80C [5-6] ', amount : '', total: `${newIncome}` });
  
  breakdown.push({ index: '8', name: 'NPS under section 80CCD(1B)', amount : `${numbers[4]}`, total: '' });
  newIncome = newIncome - numbers[4];
  breakdown.push({ index: '9', name: 'Total income after 80CCD(1B) [7-8] ', amount : '', total: `${newIncome}` });
  
  breakdown.push({ index: '10', name: 'Health insurance premium section 80D', amount : `${numbers[5]}`, total: '' });
  newIncome = newIncome - numbers[5];
  breakdown.push({ index: '11', name: 'Total income after 80D(1B) [9-10] ', amount : '', total: `${newIncome}` });
  
  breakdown.push({ index: '12', name: 'Interest paid on Home loan section 24(A)', amount : `${numbers[6]}`, total: '' });
  newIncome = newIncome - numbers[6];
  breakdown.push({ index: '13', name: 'Total income after 24(A) [11-12] ', amount : '', total: `${newIncome}` });
  
 
  return { breakdown };
}

// Main function to calculate tax and display results
function calculateTax() {
  const incomeOld = parseFloat(document.getElementById('income').value);
  const incomeNew = parseFloat(document.getElementById('incomeNew').value);
  
  const deduction80c = parseFloat(document.getElementById('deduction80c').value) || 0;
  const deductionNPS = parseFloat(document.getElementById('deductionNPS').value) || 0;
  const deductionHealth = parseFloat(document.getElementById('deductionHealth').value) || 0;
  const deductionHRA = parseFloat(document.getElementById('deductionHRA').value) || 0;
  const interestHomeLoan = parseFloat(document.getElementById('interestHomeLoan').value) || 0;

  const basicSalary = parseFloat(document.getElementById('basicSalary').value) || 0;
  const hraPaid = parseFloat(document.getElementById('hraPaid').value) || 0;
  const rentPaid = parseFloat(document.getElementById('rentPaid').value) || 0;

  if (isNaN(incomeOld) || incomeOld <= 0 || isNaN(incomeNew) || incomeNew <= 0) {
    alert('Please enter valid income!');
    return;
  }

  const taxBreakupResult =  taxBreakup(incomeOld, deductionHRA, 50000, deduction80c, deductionNPS, deductionHealth, interestHomeLoan)

  console.log(taxBreakupResult);
  const totalOldDeductions = deduction80c + deductionNPS + deductionHealth + deductionHRA + interestHomeLoan + 50000;
  const hraExemption = calculateHRAExemption(basicSalary, hraPaid, rentPaid);

  // Calculate tax for both regimes
  const oldTaxResults = calculateOldRegimeTax(incomeOld, totalOldDeductions, hraExemption);
  const newTaxResults = calculateNewRegimeTax(incomeNew);

  // Display the results
  document.getElementById('oldTax').textContent = oldTaxResults.tax.toFixed(2);
  document.getElementById('newTax').textContent = newTaxResults.tax.toFixed(2);

  // Display HRA Exemption
  document.getElementById('hraExemption').textContent = `HRA Exemption: ₹${hraExemption.toFixed(2)}`;


  // Display Tax All Breakdown for Old Regime
  const oldRegimeTaxBreakbownBody = document.getElementById('oldRegimeTaxBreakbownBody');
  oldRegimeTaxBreakbownBody.innerHTML = '';
  taxBreakupResult.breakdown.forEach(item => {
    const row = `<tr>
                  <td>${item.index}</td>
                  <td>${item.name}</td>
                  <td>${item.amount}</td>
                  <td>${item.total}</td>
                </tr>`;
    oldRegimeTaxBreakbownBody.innerHTML += row;
  });
  // Display Tax Breakdown Head for Old Regime  
  const headText = `<tr>
                    <th>Slab</th>
                    <th>Taxable Income (₹)</th>
                    <th>Tax Rate</th>
                    <th>Calculated Tax (₹)</th>
                  </tr>`;
  const oldRegimeBreakdownHead = document.getElementById('oldRegimeBreakdownHead');
  oldRegimeBreakdownHead.innerHTML = headText;
  const newRegimeBreakdownHead = document.getElementById('oldRegimeBreakdownHead');
  newRegimeBreakdownHead.innerHTML = headText;


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
