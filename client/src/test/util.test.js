import   calculateEMI from '../utils/utils' 
describe('calculateEMI', () => {
  const rates = [
    { rate: .0325, max: 400_00 },
    { rate: .04, max: 1600_00 },
    { rate: .06, max: 1500_0 }, 
    { rate: .105, max: 190_000 },
  ];
  it('should calculate the EMI for the loan amount of 40700', () => {
    const loanAmount = 40700;
    const result = calculateEMI(loanAmount, rates);
    expect(result.totalAmount).toBeCloseTo(52502.5);
    expect(result.totalInterests).toBeCloseTo(11802.5);
  });
  it('should calculate the EMI for the loan amount of 201000', () => {
    const loanAmount = 201000;
    const result = calculateEMI(loanAmount, rates);
    expect(result.totalAmount).toBeCloseTo(220540);
    expect(result.totalInterests).toBeCloseTo(19540);
  });
  it('should calculate the EMI for the loan amount of 114200', () => {
    const loanAmount = 114200;
    const result = calculateEMI(loanAmount, rates);
    expect(result.totalAmount).toBeCloseTo(130168);
    expect(result.totalInterests).toBeCloseTo(15968);
  });

});
