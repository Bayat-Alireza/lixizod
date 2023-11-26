import { LIXIItem } from './LIXIItem.js'
import {
  AnnotationProps,
  AttributeInlineAttributes,
  SchemaItemProps
} from './types.js'

interface SchemaAttributeProps {
  inlineAttributes: AttributeInlineAttributes
  annotation: AnnotationProps
  getReferences: () => string[]
}

export class SchemaAttribute implements SchemaAttributeProps {
  constructor(
    public item: Element,
    private schemaItem: SchemaItemProps<
      AnnotationProps,
      AttributeInlineAttributes
    >
  ) { }
  static createInstance = (item: Element) => {
    const schemaItem = LIXIItem.create<
      AnnotationProps,
      AttributeInlineAttributes
    >(item)
    return new SchemaAttribute(item, schemaItem)
  }

  get inlineAttributes(): AttributeInlineAttributes {
    return this.schemaItem.inlineAttributes
  }
  get annotation(): AnnotationProps {
    const documentation = this.schemaItem.annotation('documentation')
    const label = this.schemaItem.annotation('label')
    const path = this.schemaItem.annotation('path')
    return {
      label,
      documentation,
      path
    }
  }

  getReferences(): string[] {
    const isReferenceType = this.inlineAttributes.type === 'referenceType'
    if (isReferenceType) {
      const targets = Array.from(this.item.querySelectorAll('target'))
      return targets.reduce((acc, c) => {
        const path = c.textContent
        if (path) {
          acc.push(path)
        }
        return acc
      }, [] as string[])
    }
    return []
  }
}
