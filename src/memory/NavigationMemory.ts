import fs from "fs";
import path from "path";
import {
  NavigationGraph,
  NavigationNode,
  NavigationEdge,
} from "../models/NavigationGraph";

export class NavigationMemory {
  private outputPath = path.resolve("reports/navigation-graph.json");

  private graph: NavigationGraph = {
    nodes: [],
    edges: [],
  };

  addNode(url: string, title: string): void {
    const existing = this.graph.nodes.find(
      (node: NavigationNode) => node.url === url
    );

    if (existing) {
      existing.lastSeenAt = new Date().toISOString();
      return;
    }

    const node: NavigationNode = {
      url,
      title,
      firstSeenAt: new Date().toISOString(),
      lastSeenAt: new Date().toISOString(),
    };

    this.graph.nodes.push(node);
  }

  addEdge(fromUrl: string, toUrl: string, actionText: string): void {
    const exists = this.graph.edges.some(
      (edge: NavigationEdge) =>
        edge.fromUrl === fromUrl &&
        edge.toUrl === toUrl &&
        edge.actionText === actionText
    );

    if (exists) return;

    const edge: NavigationEdge = {
      fromUrl,
      toUrl,
      actionText,
      createdAt: new Date().toISOString(),
    };

    this.graph.edges.push(edge);
  }

  save(): void {
    fs.writeFileSync(
      this.outputPath,
      JSON.stringify(this.graph, null, 2),
      "utf-8"
    );
  }
}