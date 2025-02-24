import { ReactNode } from 'react';

export interface Element {
  children: Array<ElementNode | Text>;
  type:
    | 'bulleted-list'
    | 'numbered-list'
    | 'list-item'
    | 'list-item-child'
    | 'table'
    | 'table_head'
    | 'table_body'
    | 'table_row'
    | 'table_cell'
    | 'table_header_cell'
    | 'block-quote'
    | 'paragraph'
    | 'heading-one'
    | 'heading-two'
    | 'heading-three'
    | 'heading-four'
    | 'heading-five'
    | 'heading-six'
    | 'class'
    | 'link'
    | 'image'
    | 'video'
    | 'iframe'
    | 'embed'
    | 'code-block';
  [key: string]: unknown;
}

export type ImageMimeTypes =
  | 'image/webp'
  | 'image/jpeg'
  | 'image/bmp'
  | 'image/gif'
  | 'image/png';

export type VideoMimeTypes =
  | 'video/quicktime'
  | 'video/mp4'
  | 'video/ogg'
  | 'video/webm'
  | 'video/x-msvideo';

export type AssetMimeTypes = ImageMimeTypes | VideoMimeTypes | string;

export interface Text extends Mark {
  text: string;
}

export interface Mark {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
}

export interface ClassProps {
  className: string;
}

export interface ClassElement extends ClassProps, Element {
  type: 'class';
}

export interface LinkProps {
  href: string;
  className?: string;
  rel?: string;
  id?: string;
  title?: string;
  openInNewTab?: boolean;
}

export interface LinkElement extends LinkProps, Element {
  type: 'link';
}

export interface ImageProps {
  src: string;
  title?: string;
  width?: number;
  height?: number;
  handle?: string;
  mimeType?: AssetMimeTypes;
  altText?: string;
}

export interface ImageElement extends ImageProps, Element {
  type: 'image';
}

export interface VideoProps {
  src: string;
  title?: string;
  width?: number;
  height?: number;
  handle?: string;
}

export interface VideoElement extends VideoProps, Element {
  type: 'video';
}

export interface IFrameProps {
  url: string;
  width?: number;
  height?: number;
}

export interface IFrameElement extends IFrameProps, Element {
  type: 'iframe';
}

export type EmbedProps<T = any> = T & {
  nodeId: string;
  nodeType: string;
  isInline?: boolean;
};

export interface EmbedElement extends EmbedProps, Element {
  type: 'embed';
}

export type ElementNode =
  | Element
  | ClassElement
  | LinkElement
  | ImageElement
  | IFrameElement
  | VideoElement
  | EmbedElement;

export type Node = ElementNode | Text;

export type RichTextContent =
  | Array<ElementNode>
  | { children: Array<ElementNode> };

export type AssetReference = {
  id: string;
  mimeType: AssetMimeTypes;
  [key: string]: any;
};

export type Reference = {
  id: string;
  [key: string]: any;
};

export type EmbedReferences = Array<Reference | AssetReference>;

export type RichTextProps = {
  content: RichTextContent;
  renderers?: NodeRendererType;
  references?: EmbedReferences;
};

export interface DefaultElementProps {
  children: ReactNode;
}

export interface ClassRendererProps
  extends DefaultElementProps,
    Partial<ClassProps> {}

export interface LinkRendererProps
  extends DefaultElementProps,
    Partial<LinkProps> {}

type DefaultNodeRenderer = (props: DefaultElementProps) => JSX.Element;
type LinkNodeRenderer = (props: LinkRendererProps) => JSX.Element;
type ClassNodeRenderer = (props: ClassRendererProps) => JSX.Element;
type ImageNodeRenderer = (props: Partial<ImageProps>) => JSX.Element;
type VideoNodeRenderer = (props: Partial<VideoProps>) => JSX.Element;
type IFrameNodeRenderer = (props: Partial<IFrameProps>) => JSX.Element;
type EmbedNodeRenderer = (props: any) => JSX.Element;

interface AssetRendererType {
  application?: EmbedNodeRenderer;
  audio?: EmbedNodeRenderer;
  font?: EmbedNodeRenderer;
  image?: EmbedNodeRenderer;
  model?: EmbedNodeRenderer;
  text?: EmbedNodeRenderer;
  video?: EmbedNodeRenderer;
  [key: string]: EmbedNodeRenderer | undefined;
}

export interface NodeRendererType {
  a?: LinkNodeRenderer;
  class?: ClassNodeRenderer;
  img?: ImageNodeRenderer;
  video?: VideoNodeRenderer;
  iframe?: IFrameNodeRenderer;
  h1?: DefaultNodeRenderer;
  h2?: DefaultNodeRenderer;
  h3?: DefaultNodeRenderer;
  h4?: DefaultNodeRenderer;
  h5?: DefaultNodeRenderer;
  h6?: DefaultNodeRenderer;
  p?: DefaultNodeRenderer;
  ul?: DefaultNodeRenderer;
  ol?: DefaultNodeRenderer;
  li?: DefaultNodeRenderer;
  list_item_child?: DefaultNodeRenderer;
  table?: DefaultNodeRenderer;
  table_head?: DefaultNodeRenderer;
  table_body?: DefaultNodeRenderer;
  table_row?: DefaultNodeRenderer;
  table_cell?: DefaultNodeRenderer;
  table_header_cell?: DefaultNodeRenderer;
  blockquote?: DefaultNodeRenderer;
  bold?: DefaultNodeRenderer;
  italic?: DefaultNodeRenderer;
  underline?: DefaultNodeRenderer;
  code?: DefaultNodeRenderer;
  code_block?: DefaultNodeRenderer;
  Asset?: AssetRendererType;
  embed?: {
    [key: string]: EmbedNodeRenderer | undefined;
  };
}

export interface RemoveEmptyElementType {
  h1?: Boolean;
  h2?: Boolean;
  h3?: Boolean;
  h4?: Boolean;
  h5?: Boolean;
  h6?: Boolean;
  table_head?: Boolean;
}

export * from './util/isElement';
export * from './util/isText';
