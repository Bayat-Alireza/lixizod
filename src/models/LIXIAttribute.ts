import { LIXIItem } from "./LIXIItem.js";
import { XMLElement } from "libxmljs";
import { AnnotationProps, AttributeInlineAttributes } from "./types.js";



class LIXIAttribute {
  static create(item: XMLElement) {
    const lixiItem = LIXIItem.create<AnnotationProps, AttributeInlineAttributes>(item)
    return new LIXIAttribute(lixiItem)
  }
  constructor(public item: LIXIItem<AnnotationProps, AttributeInlineAttributes>) {
    if (item.item.name() !== 'attribute') throw Error('NotLIXIAttributeError')
  }

  get inlineAttributes(): AttributeInlineAttributes {
    const fixed = this.item.inlineAttributeHelper.get('fixed')
    const name = this.item.inlineAttributeHelper.get('name')
    const type = this.item.inlineAttributeHelper.get('type')
    const use = this.item.inlineAttributeHelper.get('use')
    return {
      fixed,
      name,
      type,
      use
    }
  }
}

export default LIXIAttribute