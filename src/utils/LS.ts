type Paths = "recents";

export class LS {
  static get<T>(path: Paths): T | undefined {
    if (typeof window === "undefined") return;
    const data = localStorage.getItem(`${process.env.NODE_ENV}-${path}`);
    if (!data) return;
    return JSON.parse(data);
  }

  static set<T>(path: Paths, data: T): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(
     `${process.env.NODE_ENV}-${path}`,
      JSON.stringify(data)
    );
  }
}
