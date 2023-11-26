import { XMLElement } from 'libxmljs'
import { NS } from './types.js';

export class Annotation<T> {
  constructor(private annotation: XMLElement | null, private ns: NS) {
    if (annotation?.name() !== 'annotation') {
      this.annotation = null
    }
  }
  get = <k extends keyof T>(key: k): string => {
    const xPath = `.//${key as string}`.toString()
    const ele = this.annotation?.find(xPath as string, this.ns)[0] as XMLElement
    return ele ? (ele as XMLElement).text() : ''
  };

}

