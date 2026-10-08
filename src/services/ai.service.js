/**
 * AI Integration Service
 * OpenAI (GPT-4o), Claude (Anthropic), Google Gemini
 */

import { OpenAI } from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';

const openai = new OpenAI({ apiKey: process.env.SBR_OPENAI_API_KEY });
const anthropic = new Anthropic({ apiKey: process.env.SBR_ANTHROPIC_API_KEY });
const gemini = new GoogleGenerativeAI(process.env.SBR_GEMINI_API_KEY);

// ============================================================================
// SBR AQL - ISLAMIC KNOWLEDGE (GPT-4o)
// ============================================================================
export async function askSBRAql(question, context = {}) {
  try {
    const systemPrompt = `You are SBR Aql, an advanced Islamic knowledge assistant.
    Provide verified academic Islamic knowledge based on Quran, Hadith, and scholarly consensus.
    Always cite sources and mention if something requires scholarly verification.
    Context: ${JSON.stringify(context)}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: question }
      ],
      max_tokens: 1500,
      temperature: 0.7
    });

    return {
      success: true,
      engine: 'SBR Aql (GPT-4o)',
      answer: response.choices[0].message.content,
      tokens: response.usage.total_tokens
    };
  } catch (error) {
    console.error('SBR Aql error:', error);
    return { success: false, error: error.message };
  }
}

// ============================================================================
// SBR QALAM - SMART WRITING (Claude 3.5 Sonnet)
// ============================================================================
export async function askSBRQalam(text, task = 'refine', context = {}) {
  try {
    const taskPrompts = {
      refine: 'Refine and improve the following text for clarity and elegance:',
      polish: 'Polish the following text with better vocabulary and structure:',
      outline: 'Create a detailed outline from the following text:',
      summarize: 'Provide a comprehensive summary of:'
    };

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1500,
      messages: [
        {
          role: 'user',
          content: `${taskPrompts[task] || taskPrompts.refine}\n\n${text}`
        }
      ]
    });

    return {
      success: true,
      engine: 'SBR Qalam (Claude 3.5)',
      result: response.content[0].text,
      task: task
    };
  } catch (error) {
    console.error('SBR Qalam error:', error);
    return { success: false, error: error.message };
  }
}

// ============================================================================
// SBR SAFAR - TRAVEL & LOCATION (Gemini 2.5)
// ============================================================================
export async function askSBRSafar(question, location = {}) {
  try {
    const model = gemini.getGenerativeModel({ model: 'gemini-pro' });
    const prompt = `You are SBR Safar, a travel and location intelligence assistant.
    Help with mosque finding, travel recommendations, and location-based guidance.
    User location: ${JSON.stringify(location)}
    Question: ${question}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    return {
      success: true,
      engine: 'SBR Safar (Gemini)',
      answer: response.text(),
      location: location
    };
  } catch (error) {
    console.error('SBR Safar error:', error);
    return { success: false, error: error.message };
  }
}

// ============================================================================
// BATCH AI PROCESSING
// ============================================================================
export async function processBatchAI(requests) {
  const results = await Promise.all(
    requests.map(async (req) => {
      switch (req.engine) {
        case 'aql':
          return await askSBRAql(req.prompt, req.context);
        case 'qalam':
          return await askSBRQalam(req.text, req.task, req.context);
        case 'safar':
          return await askSBRSafar(req.prompt, req.location);
        default:
          return { success: false, error: 'Unknown engine' };
      }
    })
  );
  return results;
}
