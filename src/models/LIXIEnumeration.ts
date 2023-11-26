import { XMLElement } from "libxmljs"
import { LIXIItem } from "./LIXIItem.js"
import { AnnotationProps, EnumerationInlineAttributes } from "./types.js"

class LIXIEnumeration {
  static create(item: XMLElement) {
    const lixiItem = LIXIItem.create<AnnotationProps, EnumerationInlineAttributes>(item)
    return new LIXIEnumeration(lixiItem)
  }
  constructor(public item: LIXIItem<AnnotationProps, EnumerationInlineAttributes>) {
    if (item.item.name() !== 'enumeration') throw Error('NotLIXIEnumerationError')
  }

  get inlineAttributes(): EnumerationInlineAttributes {
    const value = this.item.inlineAttributeHelper.get('value')
    return {
      value,
    }
  }
}

export default LIXIEnumeration