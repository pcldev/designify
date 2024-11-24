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

  // Save or update a single CSS rule
  addRule(selector: string, rule: { [property: string]: string }): void {
    // If the selector already exists, merge the new rule
    window.styleInstance = window.styleInstance || {};
    window.styleInstance[selector] = {
      ...(window.styleInstance[selector] || {}),
      ...rule,
    };
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

const compileCssWithSelector = (
  selector: string,
  styleData: { [key: string]: string },
): string => {
  let cssText = "";

  Object.entries(styleData).forEach(([key, value]) => {
    const rule = key.replace("&", selector); // Replace "&" with the actual selector
    cssText += `${rule} { ${value} } `;
  });

  return cssText;
};
export const addCssRule = (
  iframeDocument: Document,
  selector: string,
  styles: { [key: string]: string },
) => {
  // Create a style tag if it doesn't already exist
  let styleTag = iframeDocument.getElementById(
    "dynamic-styles",
  ) as HTMLStyleElement;

  if (!styleTag) {
    styleTag = iframeDocument.createElement("style");
    styleTag.id = "dynamic-styles";
    iframeDocument.head.appendChild(styleTag);
  }

  // Access the style sheet
  const sheet = styleTag.sheet as CSSStyleSheet;

  const styleData = compileCssWithSelector(selector, styles);

  // Construct the CSS rule text
  const cssRule = styleData;

  // Insert the rule into the style sheet
  try {
    if (cssRule) {
      sheet.insertRule(cssRule, sheet.cssRules.length);
      console.log("Inserted CSS rule:", cssRule);
    }
  } catch (error) {
    console.error("Failed to insert rule:", error);
  }
};

// Get the CSS text for a specific class name
export function getCssTextByClassName(
  styleElement: HTMLStyleElement,
  className: string,
): string | null {
  if (styleElement?.sheet?.cssRules) {
    const cssText = Array.from(styleElement.sheet.cssRules)
      .filter((rule): rule is CSSStyleRule => {
        return rule.selectorText.includes(`.${className}`);
      })
      .map((rule) => rule.cssText)
      .join("\n");

    return cssText || "";
  } else {
    console.warn("No CSS rules found in the style element.");
    return null;
  }
}
