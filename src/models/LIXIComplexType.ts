import { XMLElement } from "libxmljs"
import { LIXIItem } from "./LIXIItem.js"
import { AnnotationProps, ComplexTypeInlineAttributes } from "./types.js"

class LIXIComplexType {
  static create(item: XMLElement) {
    const lixiItem = LIXIItem.create<AnnotationProps, ComplexTypeInlineAttributes>(item)
    return new LIXIComplexType(lixiItem)
  }
  constructor(public item: LIXIItem<AnnotationProps, ComplexTypeInlineAttributes>) {
    if (item.item.name() !== 'complexType') throw Error('NotLIXIComplexTypeError')
  }

  get inlineAttributes(): ComplexTypeInlineAttributes {
    const name = this.item.inlineAttributeHelper.get('name')
    return {
      name,
    }
  }
}

export default LIXIComplexType