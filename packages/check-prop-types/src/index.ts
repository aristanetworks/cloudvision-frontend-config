import { ValidationMap } from 'prop-types';

const REACT_PROP_TYPES_SECRET = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

const loggedTypeFailures: { [key: string]: boolean } = {};
let printWarning: (text: string) => void = () => undefined;

if (process.env.NODE_ENV !== 'production' || process.env.GEIGER_ENV === 'staging') {
  printWarning = (text) => {
    const message = 'Warning: ' + text;

    if (typeof console !== 'undefined') {
      console.error(message); // eslint-disable-line no-console
    }

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (e) {
      // Do nothing.
    }
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(
  /* eslint-disable @typescript-eslint/no-explicit-any */
  typeSpecs: ValidationMap<any>,
  values: { [key: string]: any },
  location: string,
  componentName: string,
  getStack?: (() => string) | null,
  warningLogger?: (
    condition: boolean,
    format: string,
    location: string,
    message: string,
    stack: string,
  ) => void,
  shouldLogAllTypeFailures = false,
  /* eslint-enable @typescript-eslint/no-explicit-any */
): void {
  if (process.env.NODE_ENV !== 'production' || process.env.GEIGER_ENV === 'staging') {
    for (const typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        let error;

        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          const typeSpec = typeSpecName in typeSpecs ? typeSpecs[typeSpecName] : undefined;

          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpec !== 'function') {
            const err = Error(
              (componentName || 'React class') +
                ': ' +
                location +
                ' type `' +
                typeSpecName +
                '` is invalid; ' +
                'it must be a function, usually from the `prop-types` package, but received `' +
                typeof typeSpecs[typeSpecName] +
                '`.',
            );
            err.name = 'Invariant Violation';
            throw err;
          }

          error = typeSpec(
            values,
            typeSpecName,
            componentName,
            location,
            typeSpecName,
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore: This secret argument violates the function signature, but that's fine
            REACT_PROP_TYPES_SECRET,
          );
        } catch (e) {
          error = e;
        }

        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') +
              ': type specification of ' +
              location +
              ' `' +
              typeSpecName +
              '` is invalid; the type checker ' +
              'function must return `null` or an `Error` but returned a ' +
              typeof error +
              '. ' +
              'You may have forgotten to pass an argument to the type checker ' +
              'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
              'shape all require an argument).',
          );
        }

        if (
          error instanceof Error &&
          (shouldLogAllTypeFailures || !(error.message in loggedTypeFailures))
        ) {
          // Only monitor this failure once because there tends to be a lot of the same error.
          loggedTypeFailures[error.message] = true;

          const stack = getStack ? getStack() : '';

          if (warningLogger) {
            warningLogger(
              false,
              'Failed %s type: %s%s',
              location,
              error.message,
              stack != null ? stack : '',
            );
          } else {
            printWarning(
              'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : ''),
            );
          }
        }
      }
    }
  }
}

export default checkPropTypes;
