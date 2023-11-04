export const formatNumber = number => {
  // Check if the input is a valid number
  if (isNaN(number)) {
    return 'Invalid Number';
  }

  // Round the number to 2 decimal places
  const roundedNumber = number.toFixed(2);

  // Format the number as a string with commas as thousands separators
  const parts = roundedNumber.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Ensure two decimal places
  if (parts.length === 1) {
    parts.push('00');
  } else if (parts[1].length === 1) {
    parts[1] += '0';
  }

  return parts.join('.');
};
