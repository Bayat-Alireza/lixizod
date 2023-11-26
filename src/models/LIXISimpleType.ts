import { XMLElement } from "libxmljs"
import { LIXIItem } from "./LIXIItem.js"
import { AnnotationProps, SimpleTypeInlineAttributes } from "./types.js"

class LIXISimpleType {
  static create(item: XMLElement) {
    const lixiItem = LIXIItem.create<AnnotationProps, SimpleTypeInlineAttributes>(item)
    return new LIXISimpleType(lixiItem)
  }
  constructor(public item: LIXIItem<AnnotationProps, SimpleTypeInlineAttributes>) {
    if (item.item.name() !== 'simpleType') throw Error('NotLIXISimpleTypeError')
  }

  get inlineAttributes(): SimpleTypeInlineAttributes {
    const name = this.item.inlineAttributeHelper.get('name')
    return {
      name,
    }
  }
}


export default LIXISimpleType