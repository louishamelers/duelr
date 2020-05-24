import {Banner} from '../../app/core/services/banner.service';

export const emailVerified: Banner = {
  type: 'success',
  title: 'Account verified!',
  text: 'Your Legion account has been verified!'
};

export const verifyEmail: Banner = {
  type: 'warning',
  title: 'Verify account!',
  text: 'Click here to verify your account.'
};

export const emailSent: Banner = {
  type: 'info',
  title: 'Email sent.',
  text: 'A verification email has been sent to '
};
