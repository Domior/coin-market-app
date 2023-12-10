import { PASSWORD_PATTERN } from './patterns';

export const EMAIL_RULES = [
  {
    type: 'email',
    message: 'The input is not valid E-mail!',
  },
  {
    required: true,
    message: 'Please enter your email!',
  },
];

export const PASSWORD_RULES = [
  {
    required: true,
    message: 'Please enter your password!',
  },
  {
    pattern: PASSWORD_PATTERN,
    message: 'Please enter valid password type!',
  },
];
