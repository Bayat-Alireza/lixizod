import libxml, { XMLElement } from "libxmljs"
// import LIXIAttribute from "../../LIXIAttribute.js"
// import LIXIElement from "../../LIXIElement.js"
// import LIXIEnumeration from "./LIXIEnumeration.js"
// import LIXISimpleType from "../../LIXISimpleType.js"
// import LIXIComplexType from "../../LIXIComplexType.js"

type LocalName =
  'xs:element'
  | 'xs:attribute'
  | 'xs:enumeration'
  | 'xs:simpleType'
  | 'xs:complexType'
  | 'xs:annotation'
  | 'xs:documentation'
  | 'xs:appinfo'
  | 'lx:schemadetail'
  | 'li:subschema'
  | 'lx:path'
  | 'lx:label'
  | 'li:transactions'
  | 'lx:references'
  | 'lx:target'

class MainSchema {
  ns: { [ns: string]: string }
  XMLNamespaces: libxml.XMLNamespace[]
  mainDoc: libxml.XMLDocument
  constructor(public mainSchema: string | Buffer) {
    this.mainDoc = libxml.parseXml(mainSchema)
    this.XMLNamespaces = this.mainDoc.root().namespaces(true)
    this.ns = this.XMLNamespaces.reduce<{ [ns: string]: string }>((acc, cur) => {
      acc[cur.prefix()] = cur.href()
      return acc
    }, {})
  }


  getPaths(localName: LocalName) {
    let xPath: string = ''
    xPath = `//${localName}`.toString()
    if (localName === 'xs:complexType') {
      xPath = `//${localName}[@name]`.toString()
    }
    return this.mainDoc.find(xPath, this.ns).reduce<string[]>((acc, cur) => {
      acc.push((cur.find('.//lx:path', this.ns)[0] as XMLElement).text())
      // acc.push(cur.find('.//lx:path/text()[1]', this.ns)[0].toString())
      return acc
    }, [])
  }

  getItemsByLocalName(localName: LocalName) {
    let xPath: string = ''
    xPath = `//${localName}`.toString()
    if (localName === 'xs:complexType') {
      xPath = `//${localName}[@name]`.toString()
    }
    return this.mainDoc.find(xPath, this.ns) as XMLElement[]
  }


  getItemByName(localName: LocalName, name: string) {
    const xPath = `//${localName}[@name='${name}']`.toString()
    return this.mainDoc.find(xPath, this.ns) as XMLElement[]
  }

  getItemByPath(path: string) {
    const xPath = `//lx:path[(text()='${path}')]/../../..`.toString()
    const pathItem = this.mainDoc.find(xPath, this.ns)[0]
    return pathItem as XMLElement
  }
}

export default MainSchema