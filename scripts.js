// Function to calculate the tax for Old Regime
function calculateOldRegimeTax(income, deductions = 0, hraExemption = 0) {
    let taxableIncome = income - deductions - hraExemption;
    let tax = 0;
  
    if (taxableIncome <= 250000) {
      tax = 0;
    } else if (taxableIncome <= 500000) {
      tax = (taxableIncome - 250000) * 0.05;
    } else if (taxableIncome <= 1000000) {
      tax = 250000 * 0.05 + (taxableIncome - 500000) * 0.2;
    } else {
      tax = 250000 * 0.05 + 500000 * 0.2 + (taxableIncome - 1000000) * 0.3;
    }
  
    return tax;
  }
  
  // Function to calculate the tax for New Regime
  function calculateNewRegimeTax(income) {
    let taxableIncome = income;
    let tax = 0;
  
    if (taxableIncome <= 250000) {
      tax = 0;
    } else if (taxableIncome <= 500000) {
      tax = (taxableIncome - 250000) * 0.05;
    } else if (taxableIncome <= 750000) {
      tax = 250000 * 0.05 + (taxableIncome - 500000) * 0.1;
    } else if (taxableIncome <= 1000000) {
      tax = 250000 * 0.05 + 250000 * 0.1 + (taxableIncome - 750000) * 0.15;
    } else if (taxableIncome <= 1250000) {
      tax = 250000 * 0.05 + 250000 * 0.1 + 250000 * 0.15 + (taxableIncome - 1000000) * 0.2;
    } else if (taxableIncome <= 1500000) {
      tax = 250000 * 0.05 + 250000 * 0.1 + 250000 * 0.15 + 250000 * 0.2 + (taxableIncome - 1250000) * 0.25;
    } else {
      tax = 250000 * 0.05 + 250000 * 0.1 + 250000 * 0.15 + 250000 * 0.2 + 250000 * 0.25 + (taxableIncome - 1500000) * 0.3;
    }
  
    return tax;
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
    const oldTax = calculateOldRegimeTax(incomeOld, totalOldDeductions, hraExemption);
    const newTax = calculateNewRegimeTax(incomeNew);
  
    // Display the results
    document.getElementById('oldTax').textContent = oldTax.toFixed(2);
    document.getElementById('newTax').textContent = newTax.toFixed(2);
  
    // Display HRA Exemption
    document.getElementById('hraExemption').textContent = `HRA Exemption: ₹${hraExemption.toFixed(2)}`;
  
    const savings = oldTax - newTax;
    if (savings > 0) {
      document.getElementById('savings').textContent = `You save ₹${savings.toFixed(2)} by choosing the New Tax Regime.`;
    } else {
      document.getElementById('savings').textContent = `You save ₹${-savings.toFixed(2)} by choosing the Old Regime.`;
    }
  }
  