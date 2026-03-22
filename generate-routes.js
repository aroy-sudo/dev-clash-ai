const fs = require('fs');
const path = require('path');

const routes = [
  { file: '1_Target.html', dest: 'app/onboarding/target/page.tsx' },
  { file: '2_Choose_Path.html', dest: 'app/onboarding/path/page.tsx' },
  { file: '3_Blueprint.html', dest: 'app/onboarding/blueprint/page.tsx' },
  { file: '4_Hub.html', dest: 'app/hub/page.tsx' },
  { file: '5_Roadmap.html', dest: 'app/hub/roadmap/page.tsx' },
  { file: '6_Mock_Test.html', dest: 'app/hub/mock-test/page.tsx' },
  { file: '7_Choose_Difficulty.html', dest: 'app/hub/choose-difficulty/page.tsx' },
  { file: '8_Doubt_Solver.html', dest: 'app/hub/doubt-solver/page.tsx' },
  { file: '9_AI_Assessment.html', dest: 'app/hub/ai-assessment/page.tsx' },
];

function processHtmlToJsx(htmlContent) {
  // Extract content between <main...> and </main>
  const mainMatch = htmlContent.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (!mainMatch) return null;
  
  let jsx = mainMatch[1];
  
  // Basic HTML to JSX conversions
  jsx = jsx.replace(/class=/g, 'className=');
  jsx = jsx.replace(/for=/g, 'htmlFor=');
  jsx = jsx.replace(/<!--([\s\S]*?)-->/g, '{/*$1*/}');
  
  // Close unclosed tags
  jsx = jsx.replace(/<img([^>]*[^\/])>/g, '<img$1 />');
  jsx = jsx.replace(/<input([^>]*[^\/])>/g, '<input$1 />');
  jsx = jsx.replace(/<br>/g, '<br />');
  jsx = jsx.replace(/<hr>/g, '<hr />');

  // Fix SVG fill rules
  jsx = jsx.replace(/fill-rule=/g, 'fillRule=');
  jsx = jsx.replace(/clip-rule=/g, 'clipRule=');
  jsx = jsx.replace(/stroke-width=/g, 'strokeWidth=');
  jsx = jsx.replace(/stroke-linecap=/g, 'strokeLinecap=');
  jsx = jsx.replace(/stroke-linejoin=/g, 'strokeLinejoin=');

  // Fix inline styles
  jsx = jsx.replace(/style="([^"]*)"/g, (match, p1) => {
    // Basic conversion for style string to object - very rough, ignores complex CSS variables
    // For popup pop-art themes, most inline styles here are just strings.
    // It's safer to remove complex inline styles or translate them manually later.
    return `style={{}}`;
  });
  
  return jsx;
}

routes.forEach(({ file, dest }) => {
  const sourcePath = path.join(__dirname, 'stitch-screens', file);
  if (!fs.existsSync(sourcePath)) {
    console.warn(`File not found: ${sourcePath}`);
    return;
  }
  
  const content = fs.readFileSync(sourcePath, 'utf8');
  const jsxInner = processHtmlToJsx(content);
  
  if (!jsxInner) {
    console.warn(`Could not extract <main> from ${file}`);
    return;
  }
  
  const destPath = path.join(__dirname, dest);
  const destDir = path.dirname(destPath);
  
  fs.mkdirSync(destDir, { recursive: true });
  
  // Wrap in a Framer Motion component for "flipping through notebook" feel
  const tsxContent = `'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Page() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      exit={{ opacity: 0, y: -30, rotateX: -10 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8"
    >
      ${jsxInner}
    </motion.div>
  );
}
`;
  
  fs.writeFileSync(destPath, tsxContent);
  console.log(`Generated ${dest}`);
});
