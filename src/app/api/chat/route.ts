import { NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const CAREER_COUNSELOR_PROMPT = `You are an expert career counselor and advisor for the Smart Career Navigator platform. Your role is to:

1. Provide personalized career guidance based on user's skills, interests, and goals
2. Suggest specific learning paths and resources
3. Offer insights on industry trends and job market demands
4. Help users identify skill gaps and create action plans
5. Be encouraging, professional, and actionable in your advice

Keep responses concise (2-3 paragraphs max), practical, and tailored to the user's context.

IMPORTANT: The current date and time is ${new Date().toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}. Always use this date when answering questions about time or date.`;

// Helper to simulate "thinking" time for realism
const simulateThinking = async () => {
  const delay = Math.floor(Math.random() * 1500) + 1000; // 1-2.5 seconds
  await new Promise(resolve => setTimeout(resolve, delay));
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, context } = body;

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Build context string
    const userContext = context?.name
      ? `User: ${context.name}${context.goal ? `, Career Goal: ${context.goal}` : ''}${context.skills ? `, Skills: ${context.skills}` : ''}`
      : 'Guest user';

    // 1. Try OpenAI (Primary)
    if (OPENAI_API_KEY) {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: `${CAREER_COUNSELOR_PROMPT}\n\nContext: ${userContext}` },
              { role: 'user', content: message }
            ],
            temperature: 0.7,
            max_tokens: 500
          })
        });

        if (!response.ok) {
          throw new Error(`OpenAI API failed: ${response.status}`);
        }

        const data = await response.json();
        const text = data.choices?.[0]?.message?.content;

        if (text) {
          return NextResponse.json({
            response: text,
            source: 'openai'
          });
        }
      } catch (e) {
        logger.error("OpenAI API failed:", e);
        // Continue to fallback
      }
    }

    // 2. Try Google Gemini (Fallback)
    if (GEMINI_API_KEY) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `${CAREER_COUNSELOR_PROMPT}\n\nContext: ${userContext}\n\nUser Question: ${message}`
              }]
            }]
          })
        });

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (text) {
          return NextResponse.json({
            response: text,
            source: 'gemini'
          });
        }
      } catch (e) {
        logger.error("Gemini API failed:", e);
        // Continue to fallback
      }
    }

    // 3. Intelligent Fallback Responses (Simulation Mode)
    // Even if no AI is connected, we simulate a thoughtful response
    await simulateThinking();

    const lowerMsg = message.toLowerCase();
    let responseText = "";

    // -- Greeting --
    if (lowerMsg.match(/\b(hi|hello|hey|greetings|morning|afternoon)\b/)) {
      responseText = context?.name
        ? `Hello ${context.name}! 👋 I'm your AI Career Navigator. I can help you build your roadmap, find learning resources, or analyze career paths. What's your main goal for today?`
        : "Hello! 👋 I'm your AI Career Navigator. Whether you're looking to switch careers, upskill, or find a new job, I'm here to help. What would you like to explore first?";
    }

    // -- Tech Skills: Java --
    else if (lowerMsg.includes('java') && !lowerMsg.includes('script')) {
      responseText = "Java is a powerhouse of the enterprise world! ☕\n\n**Why it's valuable:**\n- **Backend Systems:** Powers large-scale applications (banking, retail).\n- **Android Development:** The foundation of native Android apps.\n- **Big Data:** Tools like Hadoop and Spark run on Java.\n\n**Recommendation:** Start with Core Java (OOP concepts), then move to Spring Boot for web development. We have some great courses in the Resources section to get you started!";
    }

    // -- Tech Skills: Python --
    else if (lowerMsg.includes('python')) {
      responseText = "Python is currently one of the most versatile and compatible languages. 🐍\n\n**Key Career Paths:**\n1. **Data Science & AI:** The standard for ML libraries (PyTorch, TensorFlow).\n2. **Web Development:** Django and Flask make backend builds fast.\n3. **Automation:** Perfect for scripting and DevOps tasks.\n\nIt's beginner-friendly but scales to massive production systems. Are you interested in the Data Science track or Web Development?";
    }

    // -- Tech Skills: Web Dev (React, JS, HTML, CSS) --
    else if (lowerMsg.match(/(react|javascript|typescript|html|css|frontend|web dev)/)) {
      responseText = "Frontend development is an exciting field with high demand! ⚛️\n\n**Current Industry Standards:**\n- **React & Next.js:** The dominant frameworks for modern UIs.\n- **TypeScript:** Essential for maintainable, large-scale codebases.\n- **Tailwind CSS:** For rapid, responsive styling.\n\nTo build a strong portfolio, I suggest starting with a personal project like a dashboard or e-commerce site. Would you like a specific project idea suitable for your level?";
    }

    // -- Career & Jobs --
    else if (lowerMsg.match(/(career|job|internship|hiring|role|path)/)) {
      responseText = "Navigating your career path requires a strategic approach. 🎯\n\nI can assist you by:\n- **Analyzing your current skills** to find gaps.\n- **Suggesting high-growth roles** that match your profile.\n- **Structuring a learning path** to get you job-ready.\n\nIf you visit the **Careers** page, you can see detailed breakdowns of different roles. Or, tell me your current skills, and I can suggest a match right now!";
    }

    // -- Resources & Learning --
    else if (lowerMsg.match(/(resource|course|learn|study|guide|tutorial)/)) {
      responseText = "Continuous learning is the key to growth! 📚\n\nI've curated a list of top-rated resources for you in our **Resources** section, covering:\n- **Interactive Courses** (Coursera, Udemy)\n- **Video Tutorials**\n- **Documentation & Articles**\n\nI specifically recommend focused, project-based learning. Is there a specific technology you want to master this week?";
    }

    // -- Compensation --
    else if (lowerMsg.match(/(salary|pay|money|compensat|earn|rate)/)) {
      responseText = "Compensation varies significantly based on location, experience, and tech stack. 💰\n\n**General Estimates (Annual):**\n- **Junior Dev:** $60k - $90k\n- **Mid-Level:** $90k - $140k\n- **Senior/specialist:** $140k - $200k+\n\n*Pro Tip:* Specialized skills in Cloud (AWS/Azure) or AI/ML often command a 20-30% premium. Focus on building profound expertise in a niche to maximize your earning potential.";
    }

    // -- Default Fallback (Smart Redirect) --
    else {
      responseText = `That's an interesting question about "${message}".\n\nWhile I focus primarily on career guidance and technical skill-building, I can best assist if you ask about:\n\n- **Specific Technologies** (e.g., "What is Next.js?")\n- **Career Roles** (e.g., "How to become a DevOps Engineer?")\n- **Learning Resources** (e.g., "Best React courses")\n\nWhy not check out our **Careers page** to see the structured paths we offer?`;
    }

    return NextResponse.json({
      response: responseText,
      source: 'simulated_ai'
    });

  } catch (error) {
    logger.error('Chat API Error:', error);
    return NextResponse.json(
      {
        error: 'I apologize, but I am having trouble connecting right now. Please try again in a moment.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
