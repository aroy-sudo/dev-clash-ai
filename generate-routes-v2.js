const fs = require('fs');
const path = require('path');

const routes = [
  { file: '1_Target.html', dest: 'app/onboarding/target/page.tsx', next: '/onboarding/path' },
  { file: '2_Choose_Path.html', dest: 'app/onboarding/path/page.tsx', next: '/onboarding/blueprint', prev: '/onboarding/target' },
  { file: '3_Blueprint.html', dest: 'app/onboarding/blueprint/page.tsx', next: '/hub', prev: '/onboarding/path' },
  { file: '4_Hub.html', dest: 'app/hub/page.tsx' },
  { file: '5_Roadmap.html', dest: 'app/hub/roadmap/page.tsx' },
  { file: '6_Mock_Test.html', dest: 'app/hub/mock-test/page.tsx' },
  { file: '7_Choose_Difficulty.html', dest: 'app/hub/choose-difficulty/page.tsx' },
  { file: '8_Doubt_Solver.html', dest: 'app/hub/doubt-solver/page.tsx' },
  { file: '9_AI_Assessment.html', dest: 'app/hub/ai-assessment/page.tsx' },
];

function cleanJSX(str) {
  if (!str) return '';
  let jsx = str;
  jsx = jsx.replace(/class=/g, 'className=');
  jsx = jsx.replace(/for=/g, 'htmlFor=');
  jsx = jsx.replace(/<!--([\s\S]*?)-->/g, '{/*$1*/}');
  jsx = jsx.replace(/<img([^>]*[^\/])>/g, '<img$1 />');
  jsx = jsx.replace(/<input([^>]*[^\/])>/g, '<input$1 />');
  jsx = jsx.replace(/<br>/g, '<br />');
  jsx = jsx.replace(/<hr>/g, '<hr />');
  jsx = jsx.replace(/fill-rule=/g, 'fillRule=');
  jsx = jsx.replace(/clip-rule=/g, 'clipRule=');
  jsx = jsx.replace(/stroke-width=/g, 'strokeWidth=');
  jsx = jsx.replace(/stroke-linecap=/g, 'strokeLinecap=');
  jsx = jsx.replace(/stroke-linejoin=/g, 'strokeLinejoin=');
  jsx = jsx.replace(/style="[^"]*"/g, "");
  return jsx;
}

routes.forEach((route) => {
  const { file, dest, next, prev } = route;
  const sourcePath = path.join(__dirname, 'stitch-screens', file);
  if (!fs.existsSync(sourcePath)) {
    console.warn(`File not found: ${sourcePath}`);
    return;
  }
  
  const content = fs.readFileSync(sourcePath, 'utf8');
  const isHub = dest.includes('/hub/');
  const isHubSection = dest.includes('/hub');
  
  const mainMatch = content.match(/(<main[^>]*>[\s\S]*?<\/main>)/i);
  const footerMatch = content.match(/(<footer[^>]*>[\s\S]*?<\/footer>)/i);
  const headerMatch = content.match(/(<header[^>]*>[\s\S]*?<\/header>)/i);
  const navMatch = content.match(/(<nav[^>]*>[\s\S]*?<\/nav>)/i);

  let headerJSX = !isHubSection && headerMatch ? cleanJSX(headerMatch[1]) : '';
  let navJSX = !isHubSection && navMatch ? cleanJSX(navMatch[1]) : '';
  let footerJSX = !isHubSection && footerMatch ? cleanJSX(footerMatch[1]) : '';
  let mainJSX = mainMatch ? cleanJSX(mainMatch[1]) : '';
  
  if (mainJSX) {
    mainJSX = mainJSX.replace(/<main([^>]*)>/i, '<motion.main$1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}>');
    mainJSX = mainJSX.replace(/<\/main>/i, '</motion.main>');
  }

  let fullJSX = headerJSX + navJSX + mainJSX + footerJSX;
  
  if (next) {
    fullJSX = fullJSX.replace(/<button((?:(?!\bonClick\b)[^>])*)>([\s\S]*?\b(Next|Continue Draft|Finalize Path)\b[\s\S]*?)<\/button>/gi, 
      '<button$1 onClick={() => router.push("' + next + '")}>$2</button>'
    );
    fullJSX = fullJSX.replace(/<button((?:(?!\bonClick\b)[^>])*)className="([^"]*group relative flex items-center[^"]*)"([^>]*)>/gi, 
      '<button$1className="$2" onClick={() => router.push("' + next + '")} $3>'
    );
    fullJSX = fullJSX.replace(/<a((?:(?!\bonClick\b)[^>])*)className="([^"]*group relative flex items-center[^"]*)"([^>]*)>([\s\S]*?)<\/a>/gi, 
      '<a$1className="$2" onClick={(e) => { e.preventDefault(); router.push("' + next + '"); }} $3>$4</a>'
    );
  }
  
  if (prev) {
    fullJSX = fullJSX.replace(/<button((?:(?!\bonClick\b)[^>])*)>([\s\S]*?\bBack\b[\s\S]*?)<\/button>/gi, 
      '<button$1 onClick={() => router.push("' + prev + '")}>$2</button>'
    );
  }
  
  const destPath = path.join(__dirname, dest);
  const destDir = path.dirname(destPath);
  
  fs.mkdirSync(destDir, { recursive: true });
  
  const tsxContent = "'use client';\n\nimport React from 'react';\nimport { motion } from 'framer-motion';\nimport { useRouter } from 'next/navigation';\n\nexport default function Page() {\n  const router = useRouter();\n  \n  return (\n    <div className=\"w-full min-h-screen relative\">\n      " + fullJSX + "\n    </div>\n  );\n}\n";
  
  fs.writeFileSync(destPath, tsxContent);
  console.log('Generated ' + dest);
});
