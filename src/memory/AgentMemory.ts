export class AgentMemory {
  private visitedUrls = new Set<string>();
  private visitedActions = new Set<string>();

  isVisitedUrl(url: string): boolean {
    return this.visitedUrls.has(url);
  }

  addUrl(url: string): void {
    this.visitedUrls.add(url);
  }

  hasAction(action: string): boolean {
    return this.visitedActions.has(action);
  }

  addAction(action: string): void {
    this.visitedActions.add(action);
  }
}