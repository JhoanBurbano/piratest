import { Error as FirebaseError } from '@firebase/auth-types';
import { AuthErrorCodes } from 'firebase/auth/web-extension';
import { CustomErrorResponse } from '../interfaces/errors.interface';
import { PATHS } from '../enums/paths.enum';

class ErrorsService {
  handleGeneralError(error: unknown): CustomErrorResponse {
    if (this.isFirebaseError(error)) {
      return this.handleFirebaseError(error as FirebaseError);
    } else {
      console.error('Error no manejado:', error, (error as { code: string; message: string }).code);
    }
    return {
      notify: {
        title: 'Error',
        content: 'Try again, If problem persist contact support team.',
        severity: 'error',
      },
    };
  }

  isFirebaseError(error: unknown) {
    const parseError = error as { code: string };
    return !!Object.values(AuthErrorCodes).find((value) => value === parseError.code);
  }

  handleFirebaseError(error: FirebaseError): CustomErrorResponse {
    switch (error.code) {
      case AuthErrorCodes.EMAIL_EXISTS:
        return {
          notify: { title: 'Login', content: '¡Email has an account!', severity: 'warning' },
          path: PATHS.LOGIN,
        };
      case AuthErrorCodes.INVALID_PASSWORD:
        console.error('Contraseña incorrecta');
        return {
          notify: { title: 'Failed', content: 'Inavlid credentials. Try again', severity: 'error' },
        };
      case AuthErrorCodes.INVALID_LOGIN_CREDENTIALS:
        console.error('Contraseña incorrecta');
        return {
          notify: { title: 'Failed', content: 'Inavlid credentials. Try again', severity: 'error' },
        };
      default:
        console.error('Error de Firebase no manejado:', error, error.code);
        return { notify: { title: 'Error', content: 'Process failed', severity: 'error' } };
    }
  }
}

export default new ErrorsService();
