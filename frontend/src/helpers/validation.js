
export const isValid = (password) => {
  // Regular expression for password validation
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
  // Test the password against the regular expression
  return regex.test(password);

}

export function validEmail(email) {
  // Expressão regular para validar um endereço de e-mail
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}


export function validation(data, isValidPassword, isValidEmail, setError) {
  const { email, password, confirmPassword } = data;

  if (!email || !password || !confirmPassword) {
    setError('All fields are required!')
    return false
  } else if (!isValidEmail(email)) {
    setError('This is Email is not valid!')
    return false

  } else if (!isValidPassword(password)) {
    setError('Password must contain minimum 8 characters, including: 1 lowercase letter, 1 special character(@$!%*?&), 1 capital letter and at least 1 number(0-9)')
    return false

  } else if (password.length > 20 || confirmPassword.length > 20) {
    setError('Password cannot be longer than 20 characters.')
    return false
  } else if (password !== confirmPassword) {
    setError('Password and Confirm Password have to match!')
    return false
  }
  return true
}
