import { Annotation } from "./Annotation.js";
import { InlineAttributes } from "./InlineAttributes.js";
import libxml from "libxmljs";
import { NS } from "./types.js";


interface InlineAttributeHelper<U> {
    get: <k extends keyof U>(key: k) => string | undefined
    attributes: <k extends keyof U>() => U
}
interface AnnotationHelper<T> {
    get: <k extends keyof T>(key: k) => string | undefined
}

export class LIXIItem<T, U> {
    // create an static function to create a new SchemaItem
    static create<T, U>(item: libxml.XMLElement) {
        const annotationEle = item.find('xs:annotation', this.ns)[0] as libxml.XMLElement;
        const annotationHelper = new Annotation<T>(annotationEle, LIXIItem.ns);
        const inlineAttributeHelper = new InlineAttributes<U>(item);
        return new LIXIItem<T, U>(item, annotationHelper, inlineAttributeHelper);
    }
    static readonly ns: NS = {
        'xs': 'http://www.w3.org/2001/XMLSchema',
        'lx': 'lixi.org.au/schema/appinfo_elements',
        'li': 'lixi.org.au/schema/appinfo_instructions'
    }
    constructor(
        public item: libxml.XMLElement,
        public annotationHelper: AnnotationHelper<T>,
        public inlineAttributeHelper: InlineAttributeHelper<U>
    ) { }

    get inlineAttributes(): U {
        return this.inlineAttributeHelper.attributes()
    }

    annotation = <k extends keyof T>(key: k): T[k] => {
        return this.annotationHelper.get(key) as T[k];

    }

}