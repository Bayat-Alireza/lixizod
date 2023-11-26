import { XMLElement } from "libxmljs"
import { LIXIItem } from "./LIXIItem.js"
import { AnnotationProps, ElementInlineAttributes } from "./types.js"

class LIXIElement {
  static create(item: XMLElement) {
    const lixiItem = LIXIItem.create<AnnotationProps, ElementInlineAttributes>(item)
    return new LIXIElement(lixiItem)
  }
  constructor(public item: LIXIItem<AnnotationProps, ElementInlineAttributes>) {
    if (item.item.name() !== 'element') throw Error('NotLIXIElementError')
  }

  get inlineAttributes(): ElementInlineAttributes {
    const maxOccurs = this.item.inlineAttributeHelper.get('maxOccurs')
    const name = this.item.inlineAttributeHelper.get('name')
    const type = this.item.inlineAttributeHelper.get('type')
    const minOccurs = this.item.inlineAttributeHelper.get('minOccurs')
    return {
      minOccurs,
      maxOccurs,
      name,
      type,

    }
  }

}

export default LIXIElement