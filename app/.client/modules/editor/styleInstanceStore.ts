// styleInstanceStore.ts

export interface CSSRules {
  [selector: string]: { [property: string]: string }; // CSS rules for multiple selectors
}

declare global {
  interface Window {
    styleInstance?: CSSRules;
  }
}

class StyleInstanceStore {
  constructor() {
    // Initialize the global style instance on the window object
    window.styleInstance = window.styleInstance || {};
  }

  // Save a set of CSS rules
  saveStyle(rules: CSSRules): void {
    window.styleInstance = rules;
  }

  // Retrieve the stored CSS rules
  getStyle(): CSSRules | undefined {
    return window.styleInstance;
  }
}

// Create a singleton instance of the style store
export const styleInstanceStore = new StyleInstanceStore();
