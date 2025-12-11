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
          const errorData = await response.json();
          logger.error('OpenAI API Error:', errorData);
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

    // 3. Intelligent Fallback Responses
    const lowerMsg = message.toLowerCase();
    let responseText = "I'm here to help with your career journey. What would you like to know?";

    if (context?.name) {
      responseText = `Hi ${context.name}! ` + responseText;
    }

    if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
      responseText = context?.name
        ? `Hello ${context.name}! 👋 I'm your AI career assistant. ${context.goal ? `I see you're interested in ${context.goal}. ` : ''}How can I help you today?`
        : "Hello! 👋 I'm your AI career assistant. I can help you explore career paths, learn new skills, and plan your professional journey. What's on your mind?";
    } else if (lowerMsg.includes('python')) {
      responseText = "Python is an excellent choice! 🐍 It's widely used in:\n\n• Data Science & Machine Learning\n• Web Development (Django, Flask)\n• Automation & Scripting\n• AI/ML Engineering\n\nI recommend starting with Python basics, then specializing based on your career goals. Would you like specific learning resources?";
    } else if (lowerMsg.includes('react') || lowerMsg.includes('javascript')) {
      responseText = "React is the industry standard for modern web development! ⚛️\n\nKey benefits:\n• High demand in job market\n• Component-based architecture\n• Strong ecosystem\n• Great for SPAs and mobile (React Native)\n\nI suggest building projects while learning. Start with the official React docs and create a portfolio. Need project ideas?";
    } else if (lowerMsg.includes('salary') || lowerMsg.includes('pay')) {
      responseText = "Salaries vary by location, experience, and specialization. Here are some averages:\n\n• Junior Developer: $60k-$85k\n• Mid-level: $85k-$130k\n• Senior: $130k-$180k+\n• Specialized roles (ML, Cloud): Often higher\n\nRemember: Skills, portfolio, and negotiation matter more than titles. Focus on continuous learning!";
    } else if (lowerMsg.includes('career') || lowerMsg.includes('job')) {
      responseText = "Let me help you with your career planning! 🎯\n\nI can assist with:\n• Identifying the right career path\n• Creating a learning roadmap\n• Skill gap analysis\n• Industry insights\n• Interview preparation\n\nWhat specific aspect would you like to explore?";
    } else if (lowerMsg.includes('learn') || lowerMsg.includes('course')) {
      responseText = "Great question about learning! 📚\n\nCheck out our Resources page for curated courses in:\n• Programming (Python, JavaScript, etc.)\n• Data Science & ML\n• Web Development\n• Design & UX\n\nWould you like recommendations for a specific skill or career path?";
    } else {
      responseText = `I understand you're asking about "${message}". While I'm currently in demo mode, I can still help! 💡\n\nTry asking me about:\n• Career paths and opportunities\n• Learning resources and courses\n• Skill development strategies\n• Industry trends\n\nOr visit our Careers page to explore different paths!`;
    }

    return NextResponse.json({
      response: responseText,
      source: 'fallback'
    });

  } catch (error) {
    logger.error('Chat API Error:', error);
    return NextResponse.json(
      {
        error: 'Sorry, I encountered an error. Please try again.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
