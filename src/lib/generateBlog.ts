"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    'Create a detailed blog post about  topic given  with the following structure:\n\n1. **Title**: Provide a catchy, engaging, and clear title for the blog post.\n\n2. **Content**: Write the blog content in Markdown format, ensuring it is well-structured and easy to follow. Include:\n    - An **introduction** that introduces the topic and grabs the reader’s attention.\n    - **Headings** (use \\`#\\`, \\`##\\`, \\`###\\` as appropriate) to break the content into clear sections.\n    - **Bullet points** or **numbered lists** to present key information concisely.\n    - Relevant **code snippets** enclosed in triple backticks (\\`\\`\\`) where necessary.\n    - **Links** to external resources or references (in Markdown format).\n    - A **conclusion** to wrap up the post and summarize key points.\n    - Use **bold**, _italics_, and \\`inline code\\` formatting where needed to emphasize important parts.\n\nReturn the output as an object in the format:\n{\n  "title": "Your generated title here",\n  "content": "Your Markdown content here"\n}',
});
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export default async function generateBlogPost(
  prompt: string
): Promise<{ title: string; content: string }> {
  const chatSession = model.startChat({
    generationConfig,

    history: [
      {
        role: "user",
        parts: [{ text: "A blog about react and framer motion\n" }],
      },
      {
        role: "model",
        parts: [
          {
            text: '```json\n{\n  "title": "Elevate Your React Apps with Framer Motion: A Guide to Smooth Animations and Interactions",\n  "content": "# Elevate Your React Apps with Framer Motion: A Guide to Smooth Animations and Interactions\\n\\n## Introduction\\n\\nBuilding dynamic and engaging web applications is all about creating seamless user experiences. One powerful tool for achieving this is **Framer Motion**, a React library designed to bring your animations and interactions to life. In this blog post, we\'ll delve into the world of Framer Motion, exploring its key features, benefits, and practical examples to help you elevate your React projects.\\n\\n## Why Framer Motion?\\n\\nFramer Motion stands out for its simplicity, flexibility, and powerful capabilities. Here\'s why you should consider using it:\\n\\n* **Declarative Animations:** Define animations using intuitive properties like `x`, `y`, `scale`, `rotate`, and more, making it easy to express your desired motion.\\n* **Component-Based:** Integrate animations directly into your React components, seamlessly blending them with your application\'s structure.\\n* **Performance Optimization:** Framer Motion leverages the browser\'s native animation capabilities for optimal performance, even with complex animations.\\n* **Gesture Handling:** Create interactive experiences with intuitive gesture recognition for touch, mouse, and keyboard inputs.\\n* **Advanced Features:** Explore features like physics-based animations, motion values, and variants for highly customizable and expressive motion design.\\n\\n## Getting Started\\n\\n1. **Installation:**\\n\\n   ```bash\\n   npm install framer-motion\\n   ```\\n\\n2. **Basic Animation:**\\n\\n   ```javascript\\n   import { motion } from \'framer-motion\';\\n\\n   function MyComponent() {\\n     return (\\n       <motion.div\\n         animate={{ x: 100, opacity: 0.5 }}\\n         transition={{ duration: 1 }}\\n       >\\n         Hello, world!\\n       </motion.div>\\n     );\\n   }\\n   ```\\n\\n   This code creates a `div` element that animates its position (`x`) and opacity over one second.\\n\\n## Key Features\\n\\n### 1. Variants\\n\\n   Variants allow you to define different animation states for a component. For example:\\n\\n   ```javascript\\n   const boxVariants = {\\n     hover: { scale: 1.1, transition: { duration: 0.2 } },\\n     tap: { scale: 0.9, transition: { duration: 0.1 } }\\n   };\\n\\n   <motion.div variants={boxVariants} whileHover="hover" whileTap="tap" />\\n   ```\\n\\n   This code defines two variants, `hover` and `tap`, which are triggered when the mouse hovers or clicks on the element.\\n\\n### 2. Motion Values\\n\\n   Motion values allow you to interact with animated properties in real-time. For example:\\n\\n   ```javascript\\n   import { motion, useMotionValue } from \'framer-motion\';\\n\\n   function MyComponent() {\\n     const x = useMotionValue(0);\\n\\n     return (\\n       <motion.div style={{ x }} drag="x" />\\n     );\\n   }\\n   ```\\n\\n   This code creates a `motion.div` element that can be dragged horizontally using the `drag` property. The `x` value is updated dynamically as the element is dragged.\\n\\n### 3. Transitions\\n\\n   Transitions control the easing, duration, and other aspects of the animation. For example:\\n\\n   ```javascript\\n   <motion.div animate={{ x: 100 }} transition={{ duration: 1, ease: \'easeInOut\' }} />\\n   ```\\n\\n   This code animates the `x` position over one second with an `easeInOut` transition.\\n\\n## Conclusion\\n\\nFramer Motion is a powerful and intuitive library for creating engaging and performant animations in React applications. Its declarative nature, component-based approach, and extensive features make it an excellent choice for designers and developers alike. By leveraging Framer Motion, you can enhance user engagement, add visual flair, and create unforgettable web experiences. Explore the official documentation ([https://www.framer.com/motion/](https://www.framer.com/motion/)) for a deeper dive into its capabilities and unlock the full potential of animation in your React projects."\n}\n```',
          },
        ],
      },
    ],
  });
  const result = await chatSession.sendMessage(prompt);
  console.log(result.response.text());
  try {
    const res = JSON.parse(result.response.text().slice(7, -4));
    return res;
  } catch {
    return { title: "", content: "" };
  }
}
