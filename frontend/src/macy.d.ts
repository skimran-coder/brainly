declare module "macy" {
  interface MacyOptions {
    container: string | HTMLElement;
    trueOrder?: boolean;
    waitForImages?: boolean;
    margin?: {
      x: number;
      y: number;
    };
    columns?: number;
    breakAt?: {
      [key: number]: number;
    };
  }

  interface MacyInstance {
    recalculate: (waitForImages?: boolean) => void;
    runOnImageLoad: (callback: () => void, waitForImages?: boolean) => void;
    remove: () => void;
  }

  const Macy: (options: MacyOptions) => MacyInstance;

  export = Macy;
}
