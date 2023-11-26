import { Annotation } from './Annotation'
import { InlineAttributes } from './InlineAttributes'
import { SchemaItem } from './SchemaItem'
import {
  AnnotationProps,
  ElementInlineAttributes,
  SchemaItemProps
} from './types'

interface SchemaElementProps {
  inlineAttributes: ElementInlineAttributes
  childElements: { mutuallyExclusive: boolean; elements: NodeListOf<Element> }
  childAttributes: { attributes: NodeListOf<Element> }
}

export default class SchemaElement implements SchemaElementProps {
  static createInstance = (item: Element) => {
    const schemaItem = SchemaItem.create<
      AnnotationProps,
      ElementInlineAttributes
    >(item)
    return new SchemaElement(item, schemaItem)
  }
  constructor(
    public item: Element,
    private schemaItem: SchemaItemProps<
      AnnotationProps,
      ElementInlineAttributes
    >
  ) {}

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

  get childAttributes(): { attributes: NodeListOf<Element> } {
    if (this.item.nodeName === 'xs:complexType') {
      const attributes = this.item.querySelectorAll(':scope > attribute')
      return { attributes }
    }
    const attributes = this.item.querySelectorAll(
      ':scope > complexType > attribute'
    )
    return { attributes }
  }

  get inlineAttributes(): ElementInlineAttributes {
    return this.schemaItem.inlineAttributes
  }

  get childElements() {
    if (this.item.nodeName === 'xs:complexType') {
      const sequenceElements = this.item.querySelectorAll(
        ':scope > sequence > element'
      )
      const choiceElements = this.item.querySelectorAll(
        ':scope > choice > element'
      )
      const mutuallyExclusive = choiceElements.length > 0
      const elements = mutuallyExclusive ? choiceElements : sequenceElements
      return { mutuallyExclusive, elements }
    }
    const sequenceElements = this.item.querySelectorAll(
      ':scope > complexType > sequence > element'
    )
    const choiceElements = this.item.querySelectorAll(
      ':scope > complexType > choice > element'
    )
    const mutuallyExclusive = choiceElements.length > 0
    const elements = mutuallyExclusive ? choiceElements : sequenceElements
    return { mutuallyExclusive, elements }
  }
}
