"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const change_case_1 = require("change-case");
const Inflector = require("inflected");
const printing_1 = require("apollo-codegen-core/lib/utilities/printing");
const language_1 = require("./language");
const types_1 = require("./types");
const graphql_1 = require("graphql");
function enumCaseName(name) {
  return change_case_1.camelCase(name);
}
exports.enumCaseName = enumCaseName;
function operationClassName(name) {
  return change_case_1.pascalCase(name);
}
exports.operationClassName = operationClassName;
function caseClassNameForPropertyName(propertyName) {
  return change_case_1.pascalCase(Inflector.singularize(propertyName));
}
exports.caseClassNameForPropertyName = caseClassNameForPropertyName;
function caseClassNameForFragmentName(fragmentName) {
  return change_case_1.pascalCase(fragmentName);
}
exports.caseClassNameForFragmentName = caseClassNameForFragmentName;
function caseClassNameForInlineFragment(inlineFragment) {
  return "As" + change_case_1.pascalCase(String(inlineFragment.typeCondition));
}
exports.caseClassNameForInlineFragment = caseClassNameForInlineFragment;
function propertyFromInputField(
  context,
  field,
  namespace,
  parentCaseClassName
) {
  const name = field.name;
  const unescapedPropertyName = isMetaFieldName(name)
    ? name
    : change_case_1.camelCase(name);
  const propertyName = language_1.escapeIdentifierIfNeeded(
    unescapedPropertyName
  );
  const type = field.type;
  const isList =
    type instanceof graphql_1.GraphQLList ||
    type instanceof graphql_1.GraphQLList;
  const isOptional = !(type instanceof graphql_1.GraphQLNonNull);
  const bareType = graphql_1.getNamedType(type);
  if (graphql_1.isCompositeType(bareType)) {
    const bareTypeName = printing_1.join(
      [
        namespace,
        parentCaseClassName,
        language_1.escapeIdentifierIfNeeded(
          change_case_1.pascalCase(Inflector.singularize(name))
        )
      ],
      "."
    );
    const typeName = types_1.typeNameFromGraphQLType(
      context,
      type,
      bareTypeName,
      isOptional,
      true
    );
    return Object.assign({}, field, {
      propertyName,
      typeName,
      isOptional,
      isList,
      description: field.description || undefined
    });
  } else {
    const typeName = types_1.typeNameFromGraphQLType(
      context,
      type,
      undefined,
      isOptional,
      true
    );
    return Object.assign({}, field, {
      propertyName,
      typeName,
      isOptional,
      isList,
      description: field.description || undefined
    });
  }
}
exports.propertyFromInputField = propertyFromInputField;
function propertyFromLegacyField(
  context,
  field,
  namespace,
  parentCaseClassName
) {
  const name = field.responseName;
  const unescapedPropertyName = isMetaFieldName(name)
    ? name
    : change_case_1.camelCase(name);
  const propertyName = language_1.escapeIdentifierIfNeeded(
    unescapedPropertyName
  );
  const type = field.type;
  const isList =
    type instanceof graphql_1.GraphQLList ||
    type instanceof graphql_1.GraphQLList;
  const isOptional =
    field.isConditional || !(type instanceof graphql_1.GraphQLNonNull);
  const bareType = graphql_1.getNamedType(type);
  if (graphql_1.isCompositeType(bareType)) {
    const bareTypeName = printing_1.join(
      [
        namespace,
        parentCaseClassName,
        language_1.escapeIdentifierIfNeeded(
          change_case_1.pascalCase(Inflector.singularize(name))
        )
      ],
      "."
    );
    const typeName = types_1.typeNameFromGraphQLType(
      context,
      type,
      bareTypeName,
      isOptional
    );
    return Object.assign({}, field, {
      propertyName,
      typeName,
      isOptional,
      isList
    });
  } else {
    const typeName = types_1.typeNameFromGraphQLType(
      context,
      type,
      undefined,
      isOptional
    );
    return Object.assign({}, field, {
      propertyName,
      typeName,
      isOptional,
      isList
    });
  }
}
exports.propertyFromLegacyField = propertyFromLegacyField;
function isMetaFieldName(name) {
  return name.startsWith("__");
}
//# sourceMappingURL=naming.js.map