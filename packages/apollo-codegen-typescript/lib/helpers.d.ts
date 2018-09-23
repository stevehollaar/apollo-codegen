import { GraphQLType } from "graphql";
import * as t from "@babel/types";
import { CompilerOptions } from "apollo-codegen-core/lib/compiler";
export declare function createTypeFromGraphQLTypeFunction(
  compilerOptions: CompilerOptions
): (graphQLType: GraphQLType, typeName?: string) => t.TSType;