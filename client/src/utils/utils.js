export default function calculateEMI(
  loanAmount,
  rates,
  numberOfMonths,
  currentLoanTitle,
  activeLoans = [],
  currentSalary
) {
  let totalInterests = 0;
  let totalAmount = loanAmount;
  let activeLoansDeductions = [];
  const totalInterestLayers = [];
  for (let i = 0; i < rates.length; i++) {
    let totalMaxAfterDeduction = rates[i].max;
    let layerInterest = 0;
    const nexMinIndex = i < rates.length - 2 ? i + 1 : i;
    if (loanAmount > 0) {
      // no active loans record
      if (activeLoans.length > 0) {
        const { newMax, newDeductions } = handleCalculateActiveLoans(
          rates[i],
          activeLoans,
          currentLoanTitle,
          activeLoansDeductions
        );
        activeLoansDeductions = newDeductions;
        totalMaxAfterDeduction = newMax;
      }

      //loan amount bigger than the layer max amount
      if (loanAmount > totalMaxAfterDeduction) {
        //loan amount minus the max is less than the layer min

        if (loanAmount - totalMaxAfterDeduction > rates[nexMinIndex].min) {
          layerInterest = calculateLayerInterest(
            totalMaxAfterDeduction,
            rates[i].interestRate,
            numberOfMonths
          );
          totalInterests += layerInterest;
          totalInterestLayers.push({
            totalInterestApplied: layerInterest,
            interestRate: rates[i].interestRate,
            title: rates[i].title,
            min: rates[i].min,
            max: totalMaxAfterDeduction,
            deductedAmount: totalMaxAfterDeduction,
          });
          loanAmount -= totalMaxAfterDeduction;
        }
        //loan amount minus the max is more than the layer min
        else {
          layerInterest = calculateLayerInterest(
            loanAmount - rates[nexMinIndex].min,
            rates[i].interestRate,
            numberOfMonths
          );
          totalInterests += layerInterest;
          totalInterestLayers.push({
            totalInterestApplied: layerInterest,
            interestRate: rates[i].interestRate,
            title: rates[i].title,
            min: rates[i].min,
            max: totalMaxAfterDeduction,
            deductedAmount: loanAmount - rates[nexMinIndex].min,
          });
          loanAmount = rates[nexMinIndex].min;
        }
      }
      //loan amount is less than the max
      else {
        layerInterest = calculateLayerInterest(
          loanAmount,
          rates[i].interestRate,
          numberOfMonths
        );
        totalInterests += layerInterest;
        totalInterestLayers.push({
          totalInterestApplied: layerInterest,
          interestRate: rates[i].interestRate,
          title: rates[i].title,
          min: rates[i].min,
          max: rates[i].max,
          deductedAmount: loanAmount,
        });
        loanAmount -= totalMaxAfterDeduction;
      }
    }
  }

  // totalAmount += totalInterests;
  const EMI = totalAmount + totalInterests;
  let initialValue = 0;
  activeLoansDeductions.reduce(
    (accumulator, currentValue) =>
      accumulator + Number(currentValue.activePayPerMonth),
    initialValue
  );
  const payPerMonth =
    EMI / numberOfMonths +
    activeLoansDeductions.reduce(
      (accumulator, currentValue) =>
        accumulator + Number(currentValue.activePayPerMonth),
      initialValue
    );
  const halfSalary = currentSalary / 2;
  const isEligible = halfSalary > payPerMonth;
  return {
    totalInterests,
    totalInterestLayers,
    activeLoansDeductions,
    payPerMonth,
    EMI,
    isEligible,
  };
}

function calculateLayerInterest(amount, rate, numberOfMonths) {
  return ((amount * rate) / 12) * numberOfMonths;
}

function handleCalculateActiveLoans(
  layer,
  activeLoans,
  currentLoanTitle,
  activeLoansDeductions
) {
  const newDeductions = [...activeLoansDeductions];

  for (const activeLoan of activeLoans) {
    if (
      activeLoan.activeLoanType === currentLoanTitle &&
      layer.title === activeLoan.activeLoanLayer
    ) {
      const leftLoanAmount =
        activeLoan.activeLoanPayPerMonthInput * activeLoan.activeLoanLeftMonths;
      newDeductions.push({
        activeDeductedType: currentLoanTitle,
        activeDeductedAmount: leftLoanAmount,
        activeDeductedLayer: layer.title,
        activePayPerMonth: activeLoan.activeLoanPayPerMonthInput,
      });
      return { newMax: layer.max - leftLoanAmount, newDeductions };
    }
  }
  // console.log(layer)
  return { newMax: layer.max, newDeductions };
}
