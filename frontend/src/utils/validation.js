const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLeadForm(values) {
  const errors = {};

  if (!values.name?.trim()) {
    errors.name = 'Name is required';
  } else if (values.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!values.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = 'Enter a valid email address';
  }

  if (!values.budgetRange?.trim()) {
    errors.budgetRange = 'Please select a budget range';
  }

  if (!values.message?.trim()) {
    errors.message = 'Message is required';
  } else if (values.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
