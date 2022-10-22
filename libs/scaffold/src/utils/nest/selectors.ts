export const MODULE_DECORATOR =
  'ClassDeclaration Decorator:has(Identifier[name=Module])';

export const CONTROLLERS_ARRAY_IN_MODULE_DECORATOR =
  MODULE_DECORATOR +
  ' PropertyAssignment:has(Identifier[name=controllers]) ArrayLiteralExpression';

export const PROVIDERS_ARRAY_IN_MODULE_DECORATOR =
  MODULE_DECORATOR +
  ' PropertyAssignment:has(Identifier[name=providers]) ArrayLiteralExpression';

export const IMPORTS_ARRAY_IN_MODULE_DECORATOR =
  MODULE_DECORATOR +
  ' PropertyAssignment:has(Identifier[name=imports]) ArrayLiteralExpression';

export const EXPORTS_ARRAY_IN_MODULE_DECORATOR =
  MODULE_DECORATOR +
  ' PropertyAssignment:has(Identifier[name=exports]) ArrayLiteralExpression';
