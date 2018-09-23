import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLScalarType,
  GraphQLEnumType
} from "graphql";
import { LegacyCompilerContext } from "apollo-codegen-core/lib/compiler/legacyIR";
import { GraphQLType } from "graphql";
export declare function possibleTypesForType(
  context: LegacyCompilerContext,
  type: GraphQLType
):
  | ReadonlyArray<import("graphql/type/definition").GraphQLObjectType>
  | (
      | GraphQLScalarType
      | import("graphql/type/definition").GraphQLObjectType
      | GraphQLEnumType
      | import("graphql/type/definition").GraphQLInputObjectType
      | GraphQLList<any>
      | GraphQLNonNull<any>)[];
export declare function typeNameFromGraphQLType(
  context: LegacyCompilerContext,
  type: GraphQLType,
  bareTypeName?: string,
  isOptional?: boolean,
  isInputObject?: boolean
): string;
