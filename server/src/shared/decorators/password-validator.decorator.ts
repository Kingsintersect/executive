import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ async: false })
class IsPasswordStrongConstraint implements ValidatorConstraintInterface {
   validate(password: string) {
      const hasLetter = /[A-Za-z]/.test(password);
      const hasNumber = /\d/.test(password);
      const hasSpecialChar = /[@$!%*?&]/.test(password);
      return hasLetter && hasNumber && hasSpecialChar;
   }

   defaultMessage() {
      return 'Password must contain at least one letter, one number, and one special character';
   }
}

export function IsPasswordStrong(validationOptions?: ValidationOptions) {
   return function (object: object, propertyName: string) {
      registerDecorator({
         target: object.constructor,
         propertyName: propertyName,
         options: validationOptions,
         constraints: [],
         validator: IsPasswordStrongConstraint,
      });
   };
}
