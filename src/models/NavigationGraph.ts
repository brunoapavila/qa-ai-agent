export interface NavigationNode {
  url: string;
  title: string;
  firstSeenAt: string;
  lastSeenAt: string;
}

export interface NavigationEdge {
  fromUrl: string;
  toUrl: string;
  actionText: string;
  createdAt: string;
}

export interface NavigationGraph {
  nodes: NavigationNode[];
  edges: NavigationEdge[];
}