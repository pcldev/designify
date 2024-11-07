import type { ReactNode } from "react";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { sandboxHeaders } from "./configs";
import { styleInstanceStore } from "./styleInstanceStore";

interface ISandboxProps {
  children: ReactNode;
}

const Sandbox: React.FC<ISandboxProps> = ({ children }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [contentRef, setContentRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const iframeDoc = iframeRef.current?.contentDocument;

    if (iframeDoc) {
      // Write the headers (CSS link tags) into the iframe's <head>
      iframeDoc.open();
      iframeDoc.write(`
        <html>
          <head>
            ${sandboxHeaders} 

          </head>          
        </html>
      `);
      iframeDoc.close();

      // Retrieve the saved CSS rules from the styleInstanceStore
      const cssRules = styleInstanceStore.getStyle();

      console.log(";cssRulesL ", cssRules);
      if (cssRules) {
        const styleTag = iframeDoc.createElement("style");
        let cssText = "";

        // Convert the CSS rules object to CSS text
        Object.entries(cssRules).forEach(([selector, rules]) => {
          cssText += `${selector} { `;
          Object.entries(rules).forEach(([property, value]) => {
            cssText += `${property}: ${value}; `;
          });
          cssText += "} ";
        });

        styleTag.textContent = cssText;
        iframeDoc.head.appendChild(styleTag); // Inject the style tag into the iframe's head
        console.log("Applied CSS rules to iframe:", cssText);
      }

      // Set the <body> element as the portal target
      setContentRef(iframeDoc.body);
    }
  }, []);

  return (
    <iframe
      ref={iframeRef}
      style={{ height: "100%", border: "none", width: "100%" }}
      sandbox={
        "allow-same-origin allow-scripts allow-top-navigation allow-presentation"
      }
      title="Designify Sandbox"
    >
      {contentRef &&
        ReactDOM.createPortal(
          <div id="designify-page-editor">{children}</div>,
          contentRef,
        )}
    </iframe>
  );
};

export default Sandbox;
