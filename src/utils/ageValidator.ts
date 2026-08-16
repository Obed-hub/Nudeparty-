export interface AgeCheckResult {
  isValid: boolean;
  age: number;
  yearsUntil18: number;
  daysUntil18: number;
  message: string;
}

export function calculateAge(birthDateString: string): AgeCheckResult {
  if (!birthDateString) {
    return {
      isValid: false,
      age: 0,
      yearsUntil18: 18,
      daysUntil18: 18 * 365,
      message: 'Please enter a valid date of birth.'
    };
  }

  const birthDate = new Date(birthDateString);
  if (isNaN(birthDate.getTime())) {
    return {
      isValid: false,
      age: 0,
      yearsUntil18: 18,
      daysUntil18: 18 * 365,
      message: 'Invalid date format.'
    };
  }

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  // Calculate exact 18th birthday
  const eighteenthBirthday = new Date(birthDate.getFullYear() + 18, birthDate.getMonth(), birthDate.getDate());
  const diffTime = eighteenthBirthday.getTime() - today.getTime();
  const daysUntil18 = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  const yearsUntil18 = Math.max(0, 18 - age);

  const isValid = age >= 18;

  let message = '';
  if (isValid) {
    message = `Age verified: ${age} years old. You meet the strictly 18+ requirement!`;
  } else if (age < 0 || age > 115) {
    message = 'Please provide a realistic date of birth.';
  } else {
    message = `Access Restricted: You are ${age} years old. This event is strictly 18+. You will be eligible in approx. ${daysUntil18} days.`;
  }

  return {
    isValid,
    age,
    yearsUntil18,
    daysUntil18,
    message
  };
}

export function generatePassCode(countryCode: string, stateCode?: string): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const region = (stateCode || countryCode || 'VIP').toUpperCase().slice(0, 3);
  return `NP-${region}-${randomNum}`;
}
