export interface ElementMap {
  tag: string;
  type?: string | null;
  text?: string | null;
  name?: string | null;
  placeholder?: string | null;
  ariaLabel?: string | null;
  role?: string | null;
  href?: string | null;
  selector?: string | null;
}

export interface PageMap {
  title: string;
  url: string;
  buttons: ElementMap[];
  links: ElementMap[];
  inputs: ElementMap[];
  selects: ElementMap[];
  textareas: ElementMap[];
  clickables: ElementMap[];
}

export interface SystemMap {
  startedAt: string;
  updatedAt: string;
  pages: PageMap[];
}