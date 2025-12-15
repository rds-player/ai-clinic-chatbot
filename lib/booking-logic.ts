// Portuguese phone number validation
export function validatePortuguesePhone(phone: string): boolean {
  // Accepts: +351912345678, 912345678, +351 912 345 678, etc.
  const cleanPhone = phone.replace(/[\s-]/g, '');
  const regex = /^(\+351)?[0-9]{9}$/;
  return regex.test(cleanPhone);
}

// Format phone number to standard format
export function formatPhoneNumber(phone: string): string {
  const cleanPhone = phone.replace(/[\s-]/g, '');
  if (cleanPhone.startsWith('+351')) {
    return cleanPhone;
  }
  if (cleanPhone.length === 9) {
    return `+351${cleanPhone}`;
  }
  return cleanPhone;
}

// Generate available time slots for a given date
export function getAvailableSlots(date: Date): string[] {
  const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday

  // Sunday is closed
  if (dayOfWeek === 0) {
    return [];
  }

  // Saturday: 9:00-13:00
  if (dayOfWeek === 6) {
    return [
      '09:00', '09:30', '10:00', '10:30',
      '11:00', '11:30', '12:00', '12:30'
    ];
  }

  // Monday-Friday: 9:00-19:00
  return [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30'
  ];
}

// Check if a date is a valid booking date (not in the past, not Sunday)
export function isValidBookingDate(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  date.setHours(0, 0, 0, 0);

  // Can't book in the past
  if (date < today) {
    return false;
  }

  // Can't book on Sundays
  if (date.getDay() === 0) {
    return false;
  }

  return true;
}

// Validate name (at least 2 words)
export function validateName(name: string): boolean {
  const trimmed = name.trim();
  const words = trimmed.split(/\s+/);
  return words.length >= 2 && words.every(word => word.length >= 2);
}

// Basic email format validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string): boolean {
  return emailRegex.test(email.trim());
}
