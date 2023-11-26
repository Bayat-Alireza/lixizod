import libxml, { XMLElement } from 'libxmljs'

export class InlineAttributes<T> {
  constructor(private element: XMLElement | null) { }

  get = <k extends keyof T>(key: k): string | undefined => {
    return this.element?.getAttribute(key as string)?.value() || undefined;
  };

}
