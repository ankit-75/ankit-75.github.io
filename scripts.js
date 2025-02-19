// Function to calculate the HRA Exemption
function calculateHRAExemption() {
  const basicSalary = parseFloat(document.getElementById('basicSalary').value) || 0;
  const hraPaid = parseFloat(document.getElementById('hraPaid').value) || 0;
  const rentPaid = parseFloat(document.getElementById('rentPaid').value) || 0;
  const rentExemption = rentPaid - (0.4 * basicSalary);
  return Math.min(hraPaid, rentPaid, rentExemption);
}

// Function to calculate the tax for Old Regime (including breakdown)
function calculateOldRegimeTax(income, deductions = 0, hraExemption = 0) {
  let taxableIncome = income - deductions - hraExemption;
  let tax = 0;
  let breakdown = [];
  let taxRebate = 0;
  let marginalRelief = 0;
  let taxPayable = 0;
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

  if(taxableIncome <= 500000){
    if(tax <= 12500){
      taxRebate = tax;
    }else{
      taxPayable = tax;
    }
  }else{
    // calculate marginal relief
    let marginaIncome = taxableIncome - 500000;
    let minTax = Math.min(marginaIncome, tax);
   
    if(minTax == marginaIncome){
      marginalRelief = tax - marginaIncome;
      taxPayable = minTax;
    }else{
      taxPayable = tax;
    }
  }
  return { tax, breakdown, taxableIncome, taxRebate, marginalRelief, taxPayable };
}

// Function to calculate the tax for New Regime
function calculateNewRegimeTax(income) {
  let taxableIncome = income - 75000;
  let tax = 0;
  let breakdown = [];
  let taxRebate = 0;
  let marginalRelief = 0;
  let taxPayable = 0;
  // Tax Slabs for New Regime
  if (taxableIncome <= 300000) {
    tax = 0;
    breakdown.push({ slab: '₹0 – ₹3 L', taxableIncome: taxableIncome, rate: '0%', tax: '₹0' });
  } else if (taxableIncome <= 700000) {
    let slabTax = (taxableIncome - 300000) * 0.05;
    tax = slabTax;
    breakdown.push({ slab: '₹3 L – ₹7 L', taxableIncome: taxableIncome - 300000, rate: '5%', tax: `₹${slabTax.toFixed(2)}` });
  } else if (taxableIncome <= 1000000) {
    let slabTax = 400000 * 0.05 + (taxableIncome - 700000) * 0.1;
    tax = slabTax;
    breakdown.push({ slab: '₹3 L – ₹7 L', taxableIncome: 400000, rate: '5%', tax: '₹20000' });
    breakdown.push({ slab: '₹7 L – ₹10 L', taxableIncome: taxableIncome - 700000, rate: '10%', tax: `₹${((taxableIncome - 700000) * 0.1).toFixed(2)}` });
  } else if (taxableIncome <= 1200000) {
    let slabTax = 400000 * 0.05 + 300000 * 0.1 + (taxableIncome - 1000000) * 0.15;
    tax = slabTax;
    breakdown.push({ slab: '₹3 L – ₹7 L', taxableIncome: 400000, rate: '5%', tax: '₹20000' });
    breakdown.push({ slab: '₹7 L – ₹10 L', taxableIncome: 300000, rate: '10%', tax: '₹30000' });
    breakdown.push({ slab: '₹10 L – ₹12 L', taxableIncome: taxableIncome - 1000000, rate: '15%', tax: `₹${((taxableIncome - 1000000) * 0.15).toFixed(2)}` });
  } else if (taxableIncome <= 1500000) {
    let slabTax = 400000 * 0.05 + 300000 * 0.1 + 200000 * 0.15 + (taxableIncome - 1200000) * 0.2;
    tax = slabTax;
    breakdown.push({ slab: '₹3 L – ₹7 L', taxableIncome: 400000, rate: '5%', tax: '₹20000' });
    breakdown.push({ slab: '₹7 L – ₹10 L', taxableIncome: 300000, rate: '10%', tax: '₹30000' });
    breakdown.push({ slab: '₹10 L – ₹12 L', taxableIncome: 200000, rate: '15%', tax: '₹30000' });
    breakdown.push({ slab: '₹12 L – ₹15 L', taxableIncome: taxableIncome - 1200000, rate: '20%', tax: `₹${((taxableIncome - 1200000) * 0.2).toFixed(2)}` });
  } else {
    let slabTax = 400000 * 0.05 + 300000 * 0.1 + 200000 * 0.15 + 300000 * 0.2 + (taxableIncome - 1500000) * 0.3;
    tax = slabTax;
    breakdown.push({ slab: '₹3 L – ₹7 L', taxableIncome: 400000, rate: '5%', tax: '₹20000' });
    breakdown.push({ slab: '₹7 L – ₹10 L', taxableIncome: 300000, rate: '10%', tax: '₹30000' });
    breakdown.push({ slab: '₹10 L – ₹12 L', taxableIncome: 200000, rate: '15%', tax: '₹30000' });
    breakdown.push({ slab: '₹12 L – ₹15 L', taxableIncome: 300000, rate: '20%', tax: '₹60000' });
    breakdown.push({ slab: '₹15 L and above', taxableIncome: taxableIncome - 1500000, rate: '30%', tax: `₹${((taxableIncome - 1500000) * 0.3).toFixed(2)}` });
  }

  if(taxableIncome <= 700000){
    if(tax <= 25000){
      taxRebate = tax;
    }else{
      taxPayable = tax;
    }
  } else{
    // calculate marginal relief
    let marginaIncome = taxableIncome - 700000;
    let minTax = Math.min(marginaIncome, tax);
   
    if(minTax == marginaIncome){
      marginalRelief = tax - marginaIncome;
      taxPayable = minTax;
    }else{
      taxPayable = tax;
    }
  }

  return { tax, breakdown, taxableIncome, taxRebate, marginalRelief, taxPayable };
}

// Function to calculate the tax for New Regime
function calculateNewRegimeTax2025_26(income) {
  let taxableIncome = income - 75000;
  let tax = 0;
  let breakdown = [];
  let taxRebate = 0;
  let marginalRelief = 0;
  let taxPayable = 0;
  // Tax Slabs for New Regime
  if (taxableIncome <= 400000) {
    tax = 0;
    breakdown.push({ slab: '₹0 – ₹4 L', taxableIncome: taxableIncome, rate: '0%', tax: '₹0' });
  } else if (taxableIncome <= 800000) {
    let slabTax = (taxableIncome - 400000) * 0.05;
    tax = slabTax;
    breakdown.push({ slab: '₹4 L – ₹8 L', taxableIncome: taxableIncome - 400000, rate: '5%', tax: `₹${slabTax.toFixed(2)}` });
  } else if (taxableIncome <= 1200000) {
    let slabTax = 400000 * 0.05 + (taxableIncome - 800000) * 0.1;
    tax = slabTax;
    breakdown.push({ slab: '₹4 L – ₹8 L', taxableIncome: 400000, rate: '5%', tax: '₹20000' });
    breakdown.push({ slab: '₹8 L – ₹12 L', taxableIncome: taxableIncome - 800000, rate: '10%', tax: `₹${((taxableIncome - 800000) * 0.1).toFixed(2)}` });
  } else if (taxableIncome <= 1600000) {
    let slabTax = 400000 * 0.05 + 400000 * 0.1 + (taxableIncome - 1200000) * 0.15;
    tax = slabTax;
    breakdown.push({ slab: '₹4 L – ₹8 L', taxableIncome: 400000, rate: '5%', tax: '₹20000' });
    breakdown.push({ slab: '₹8 L – ₹12 L', taxableIncome: 400000, rate: '10%', tax: '₹40000' });
    breakdown.push({ slab: '₹12 L – ₹16 L', taxableIncome: taxableIncome - 1200000, rate: '15%', tax: `₹${((taxableIncome - 1200000) * 0.15).toFixed(2)}` });
  } else if (taxableIncome <= 2000000) {
    let slabTax = 400000 * 0.05 + 400000 * 0.1 + 400000 * 0.15 + (taxableIncome - 1600000) * 0.2;
    tax = slabTax;
    breakdown.push({ slab: '₹4 L – ₹8 L', taxableIncome: 400000, rate: '5%', tax: '₹20000' });
    breakdown.push({ slab: '₹8 L – ₹12 L', taxableIncome: 400000, rate: '10%', tax: '₹40000' });
    breakdown.push({ slab: '₹12 L – ₹16 L', taxableIncome: 400000, rate: '15%', tax: '₹60000' });
    breakdown.push({ slab: '₹10 L – ₹12.5 L', taxableIncome: taxableIncome - 1600000, rate: '20%', tax: `₹${((taxableIncome - 1600000) * 0.2).toFixed(2)}` });
  } else if (taxableIncome <= 2400000){
    let slabTax = 400000 * 0.05 + 400000 * 0.1 + 400000 * 0.15 + 400000 * 0.2 + (taxableIncome - 200000) * 0.25;
    tax = slabTax;
    breakdown.push({ slab: '₹4 L – ₹8 L', taxableIncome: 400000, rate: '5%', tax: '₹20000' });
    breakdown.push({ slab: '₹8 L – ₹12 L', taxableIncome: 400000, rate: '10%', tax: '₹40000' });
    breakdown.push({ slab: '₹12 L – ₹16 L', taxableIncome: 400000, rate: '15%', tax: '₹60000' });
    breakdown.push({ slab: '₹16 L – ₹20 L', taxableIncome: 400000, rate: '20%', tax: '₹80000' });
    breakdown.push({ slab: '₹20 L – ₹24 L', taxableIncome: taxableIncome - 2000000, rate: '25%', tax: `₹${((taxableIncome - 2000000) * 0.25).toFixed(2)}` });
  }

  else {
    let slabTax = 400000 * 0.05 + 400000 * 0.1 + 400000 * 0.15 + 400000 * 0.2 + 400000 * 0.25 +  (taxableIncome - 2400000) * 0.30;
    tax = slabTax;
    breakdown.push({ slab: '₹4 L – ₹8 L', taxableIncome: 400000, rate: '5%', tax: '₹20000' });
    breakdown.push({ slab: '₹8 L – ₹12 L', taxableIncome: 400000, rate: '10%', tax: '₹40000' });
    breakdown.push({ slab: '₹12 L – ₹16 L', taxableIncome: 400000, rate: '15%', tax: '₹60000' });
    breakdown.push({ slab: '₹16 L – ₹20 L', taxableIncome: 400000, rate: '20%', tax: '₹80000' });
    breakdown.push({ slab: '₹20 L – ₹24 L', taxableIncome: 400000, rate: '25%', tax: '₹100000' });
    breakdown.push({ slab: '₹24 L and above', taxableIncome: taxableIncome - 1250000, rate: '30%', tax: `₹${((taxableIncome - 2400000) * 0.30).toFixed(2)}` });
  }

  if(taxableIncome <= 1200000){
    if(tax <= 60000){
      taxRebate = tax;
    }else{
      taxPayable = tax;
    }
  }else{
    // calculate marginal relief
    let marginaIncome = taxableIncome - 1200000;
    let minTax = Math.min(marginaIncome, tax);
    if(minTax == marginaIncome){
      marginalRelief = tax - marginaIncome;
      taxPayable = minTax;
    }else{
      taxPayable = tax;
    }
  }

  return { tax, breakdown, taxableIncome, taxRebate, marginalRelief, taxPayable };
}


// Function to calculate the tax for Old Regime (including breakdown)
function taxBreakup(...numbers) {
  let breakdown = [];
  breakdown.push({ index: '1', name: 'Gross Income', amount : `${numbers[0]}`, total: '' });
  breakdown.push({ index: '2', name: 'House rent allowances under section 10(13A)', amount : `${numbers[1]}`, total: '' });
  let newIncome = (numbers[0]- numbers[1]);
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
  
  breakdown.push({ index: '14', name: 'Tax on Total Income ', amount : '', total: `${numbers[7].tax.toFixed(2)}` });

  breakdown.push({ index: '15', name: 'Rebate section 87A (if applicable )', amount : '', total: `${numbers[7].taxRebate.toFixed(2)}` });
  
  breakdown.push({ index: '6', name: 'Marginal Relief  (if applicable )', amount : '', total: `${numbers[7].marginalRelief.toFixed(2)}` });
  

  breakdown.push({ index: '15', name: 'Net Tax Payable (excluding cess)', amount : '', total: `${numbers[7].taxPayable}` });
  return { breakdown };
}

// Function to calculate the tax for Old Regime (including breakdown)
function taxBreakupNew(...numbers) {
  let breakdown = [];
  breakdown.push({ index: '1', name: 'Gross Income', amount : `${numbers[0]}`, total: '' });
 
  breakdown.push({ index: '2', name: 'Standard Deduction under section 16(ia) ', amount : `${numbers[1]}`, total: '' });
  let newIncome = (numbers[0]- numbers[1]);
  breakdown.push({ index: '3', name: 'Total income after section 16 [3-4] ', amount : '', total: `${newIncome}` });
  
  
  breakdown.push({ index: '4', name: 'Tax on Total Income ', amount : '', total: `${numbers[2].tax.toFixed(2)}` });

  breakdown.push({ index: '5', name: 'Rebate section 87A (if applicable )', amount : '', total: `${numbers[2].taxRebate.toFixed(2)}` });
  
  breakdown.push({ index: '6', name: 'Marginal Relief  (if applicable )', amount : '', total: `${numbers[2].marginalRelief.toFixed(2)}` });
  

  breakdown.push({ index: '7', name: 'Net Tax Payable (excluding cess)', amount : '', total: `${numbers[2].taxPayable.toFixed(2)}` });
  return { breakdown };
}

// Main function to calculate tax and display results
function calculateTax() {
  const incomeOld = parseFloat(document.getElementById('income').value);
  const incomeNew = parseFloat(document.getElementById('income').value);
  
  const deduction80c = parseFloat(document.getElementById('deduction80c').value) || 0;
  const deductionNPS = parseFloat(document.getElementById('deductionNPS').value) || 0;
  const deductionHealth = parseFloat(document.getElementById('deductionHealth').value) || 0;
  const deductionHRA = parseFloat(document.getElementById('deductionHRA').value) || 0;
  const interestHomeLoan = parseFloat(document.getElementById('interestHomeLoan').value) || 0;
  const financialYear = parseFloat(document.getElementById('financialYear').value);

  if (isNaN(incomeOld) || incomeOld < 250000 || isNaN(incomeNew) || incomeNew <= 0) {
    alert('Please enter valid income! (greater than 250000)');
    return;
  }

  
  const totalOldDeductions = deduction80c + deductionNPS + deductionHealth + deductionHRA + interestHomeLoan + 50000;
  const hraExemption = 0; // calculateHRAExemption();

  // Calculate tax for both regimes
  const oldTaxResults = calculateOldRegimeTax(incomeOld, totalOldDeductions, hraExemption);
  const newTaxResults = financialYear == 2024 ? calculateNewRegimeTax(incomeNew) : calculateNewRegimeTax2025_26(incomeNew);

  // Display the results
  document.getElementById('oldTax').textContent = (oldTaxResults.taxPayable)  .toFixed(2);
  document.getElementById('newTax').textContent = (newTaxResults.taxPayable)  .toFixed(2);

  const taxBreakupResult =  taxBreakup(incomeOld, deductionHRA, 50000, deduction80c, deductionNPS, deductionHealth, interestHomeLoan, oldTaxResults)

  const taxBreakupResultNew =  taxBreakupNew(incomeNew, 75000,  newTaxResults)



  const oldTaxCalculation = document.getElementById("oldTaxCalculation");
  oldTaxCalculation.innerHTML = 'Old Regime Tax Calculation Breakdown';

  const oldSlabCalculation = document.getElementById("oldSlabCalculation");
  oldSlabCalculation.innerHTML = 'Tax Slabs Calculation';

  const newTaxCalculation = document.getElementById("newTaxCalculation");
  newTaxCalculation.innerHTML = 'New Regime Tax Calculation Breakdown';

  const newSlabCalculation = document.getElementById("newSlabCalculation");
  newSlabCalculation.innerHTML = 'Tax Slabs Calculation';


  // Display HRA Exemption
  //document.getElementById('hraExemption').textContent = `HRA Exemption: ₹${hraExemption.toFixed(2)}`;

  const svgContainer = document.getElementById("svg");
  svgContainer.innerHTML = '';
  const animItem = bodymovin.loadAnimation({
    wrapper: svgContainer,
    animType: "svg",
    loop: false,
    autoplay: true,
    path: "https://ankit-75.github.io/data.json"
  });

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

  // Display Tax Regiem Head for Old Regime  
  const headText = `<tr>
                    <th>Slab</th>
                    <th>Taxable Income (₹)</th>
                    <th>Tax Rate</th>
                    <th>Calculated Tax (₹)</th>
                  </tr>`;
  const oldRegimeBreakdownHead = document.getElementById('oldRegimeBreakdownHead');
  oldRegimeBreakdownHead.innerHTML = headText;
  


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

  oldBreakdown.innerHTML += `<tr>
                              <td colspan="3">Total Tax</td>
                              <td>₹${(oldTaxResults.tax - oldTaxResults.taxRebate)}</td>
                            </tr>`;


// Display Tax All Breakdown for New Regime
const newRegimeTaxBreakbownBody = document.getElementById('newRegimeTaxBreakbownBody');
newRegimeTaxBreakbownBody.innerHTML = '';
taxBreakupResultNew.breakdown.forEach(item => {
  const row = `<tr>
                <td>${item.index}</td>
                <td>${item.name}</td>
                <td>${item.amount}</td>
                <td>${item.total}</td>
              </tr>`;
              newRegimeTaxBreakbownBody.innerHTML += row;
});

  // Display Tax Regiem Head for New Regime  
  const newRegimeBreakdownHead = document.getElementById('newRegimeBreakdownHead');
  newRegimeBreakdownHead.innerHTML = headText;

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
  newBreakdown.innerHTML += `<tr>
                              <td colspan="3">Total Tax</td>
                              <td>₹${(newTaxResults.tax - newTaxResults.taxRebate)}</td>
                            </tr>`;


//path: "https://assets2.lottiefiles.com/packages/lf20_u4yrau.json"
  // Calculate and display savings
  const savings = oldTaxResults.taxPayable - newTaxResults.taxPayable;
  if (savings > 0) {
    document.getElementById('savings').textContent = `You save ₹${savings.toFixed(2)} by choosing the New Tax Regime.`;
  } else {
    let text = `You save ₹${ (-savings).toFixed(2)} by choosing the Old Tax Regime.`;
    if(parseInt(savings) == 0){
        text = `You can choose any tax regime.`
    }
    document.getElementById('savings').textContent = text
  }
}
