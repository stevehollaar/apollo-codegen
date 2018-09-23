import { CompilerOptions } from "apollo-codegen-core/lib/compiler";
export interface FlowCompilerOptions extends CompilerOptions {
  useFlowReadOnlyTypes: boolean;
}
export declare function createTypeAnnotationFromGraphQLTypeFunction(
  compilerOptions: FlowCompilerOptions
): Function;