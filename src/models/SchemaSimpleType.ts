import { Annotation } from './Annotation'
import { InlineAttributes } from './InlineAttributes'
import { SchemaItem } from './SchemaItem'
import {
  AnnotationProps,
  SchemaItemProps,
  SimpleTypeInlineAttributes
} from './types'

interface SchemaSimpleTypeProps {
  inlineAttributes: SimpleTypeInlineAttributes
  annotation: AnnotationProps
}
export class SchemaSimpleType implements SchemaSimpleTypeProps {
  constructor(
    public item: Element,
    private schemaItem: SchemaItemProps<
      AnnotationProps,
      SimpleTypeInlineAttributes
    >
  ) {}
  static createInstance = (item: Element) => {
    const schemaItem = SchemaItem.create<
      AnnotationProps,
      SimpleTypeInlineAttributes
    >(item)
    return new SchemaSimpleType(item, schemaItem)
  }

  get inlineAttributes(): SimpleTypeInlineAttributes {
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

  get baseRestriction() {
    return this.item.querySelector('restriction')?.getAttribute('base')
  }

  tokens() {
    if (this.baseRestriction === 'xs:token') {
      return this.item.querySelectorAll('restriction > enumeration')
    }
  }

  static getTokenDetail(token: Element) {
    const value = token.getAttribute('value') || ''
    const label = token.querySelector('label')?.textContent || ''
    const path = token.querySelector('path')?.textContent || ''
    const documentation =
      token.querySelector('documentation')?.textContent || ''
    return {
      value,
      label,
      path,
      documentation
    }
  }
}
