import CodeGenerator from "apollo-codegen-core/lib/utilities/CodeGenerator";
export interface Class {
  className: string;
  modifiers: string[];
  superClass?: string;
  adoptedProtocols?: string[];
}
export interface Struct {
  structName: string;
  adoptedProtocols?: string[];
  description?: string;
}
export interface Protocol {
  protocolName: string;
  adoptedProtocols?: string[];
}
export interface Property {
  propertyName: string;
  typeName: string;
  isOptional?: boolean;
  description?: string;
}
export declare function escapedString(string: string): string;
export declare function escapeIdentifierIfNeeded(identifier: string): string;
export declare class SwiftGenerator<Context> extends CodeGenerator<
  Context,
  {
    typeName: string;
  }
> {
  constructor(context: Context);
  multilineString(string: string): void;
  comment(comment?: string): void;
  deprecationAttributes(
    isDeprecated: boolean | undefined,
    deprecationReason: string | undefined
  ): void;
  namespaceDeclaration(namespace: string | undefined, closure: Function): void;
  namespaceExtensionDeclaration(
    namespace: string | undefined,
    closure: Function
  ): void;
  classDeclaration(
    { className, modifiers, superClass, adoptedProtocols }: Class,
    closure: Function
  ): void;
  structDeclaration(
    { structName, description, adoptedProtocols }: Struct,
    closure: Function
  ): void;
  propertyDeclaration({ propertyName, typeName, description }: Property): void;
  propertyDeclarations(properties: Property[]): void;
  protocolDeclaration(
    { protocolName, adoptedProtocols }: Protocol,
    closure: Function
  ): void;
  protocolPropertyDeclaration({ propertyName, typeName }: Property): void;
  protocolPropertyDeclarations(properties: Property[]): void;
}
