import { LegacyCompilerContext } from "apollo-codegen-core/lib/compiler/legacyIR";
import { GraphQLType } from "graphql";
export declare function typeNameFromGraphQLType(
  context: LegacyCompilerContext,
  type: GraphQLType,
  bareTypeName?: string | null,
  nullable?: boolean
): string;
