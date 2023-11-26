export interface AnnotationProps {
  "lx:label": string
  'xs:documentation': string
  'lx:path': string
  'li:transactions': string
}

export interface ElementInlineAttributes {
  name?: string
  minOccurs?: string
  maxOccurs?: string
  type?: string
}
export interface ComplexTypeInlineAttributes {
  name?: string
}



export interface SimpleTypeInlineAttributes {
  name?: string
}
export interface EnumerationInlineAttributes {
  value?: string
}

export interface AttributeInlineAttributes {
  name?: string
  use?: string
  type?: string
  fixed?: string
}

export interface SchemaItemProps<T, U> {
  inlineAttributes: U
  annotation: <k extends keyof T>(key: k) => T[k]
}

export type NS = { [ns: string]: string }

type LocalName =
  'xs:element'
  | 'xs:attribute'
  | 'xs:enumeration'
  | 'xs:simpleType'
  | 'xs:complexType'
  | 'xs:annotation'
  | 'xs:documentation'
  | 'xs:appinfo'
  | 'lx:schemadetail'
  | 'li:subschema'
  | 'lx:path'
  | 'lx:label'
  | 'li:transactions'
  | 'lx:references'
  | 'lx:target'
  | 'xs:restriction'
  | 'xs:pattern'