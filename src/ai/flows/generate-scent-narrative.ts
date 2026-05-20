"use server";
/**
 * @fileOverview Generates poetic and brand-aligned scent narratives for Flamora candles.
 *
 * - generateScentNarrative - Handles scent narrative generation.
 * - GenerateScentNarrativeInput - The input type for generateScentNarrative.
 * - GenerateScentNarrativeOutput - The return type for generateScentNarrative.
 */

import { z } from "zod";

const GenerateScentNarrativeInputSchema = z.object({
  topNotes: z
    .string()
    .describe(
      "The top notes of the candle scent (e.g., bergamot, lemon zest).",
    ),
  midNotes: z
    .string()
    .describe(
      "The middle notes of the candle scent (e.g., jasmine, rose, cedarwood).",
    ),
  baseNotes: z
    .string()
    .describe(
      "The base notes of the candle scent (e.g., sandalwood, amber, musk).",
    ),
});
export type GenerateScentNarrativeInput = z.infer<
  typeof GenerateScentNarrativeInputSchema
>;

const GenerateScentNarrativeOutputSchema = z.object({
  narrative: z
    .string()
    .describe(
      "A poetic, brand-aligned short description of the candle scent, evoking Just Hang It, Just Breathe Fresh.",
    ),
});
export type GenerateScentNarrativeOutput = z.infer<
  typeof GenerateScentNarrativeOutputSchema
>;

export async function generateScentNarrative(
  input: GenerateScentNarrativeInput,
): Promise<GenerateScentNarrativeOutput> {
  const validatedInput = GenerateScentNarrativeInputSchema.parse(input);
  const apiKey =
    process.env.GEMINI_API_KEY ??
    process.env.GOOGLE_GENAI_API_KEY ??
    process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Missing Gemini API key. Set GEMINI_API_KEY, GOOGLE_GENAI_API_KEY, or GOOGLE_API_KEY.",
    );
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: buildPrompt(validatedInput),
              },
            ],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "object",
            properties: {
              narrative: {
                type: "string",
              },
            },
            required: ["narrative"],
          },
        },
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`Gemini request failed with status ${response.status}.`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts
    ?.map((part: { text?: string }) => part.text ?? "")
    .join("")
    .trim();

  if (!text) {
    throw new Error("Gemini returned an empty narrative response.");
  }

  return GenerateScentNarrativeOutputSchema.parse(JSON.parse(text));
}

function buildPrompt(input: GenerateScentNarrativeInput) {
  return `You are a creative writer for FLAMORA, a candle brand known for "Just Hang It, Just Breathe Fresh".
Your style is minimalist, warm, sophisticated, and uses language that evokes a sense of peace and natural elegance, often associated with dried flowers and soft, creamy tones.

Craft a poetic and concise narrative (2-4 sentences) that describes a candle scent based on its notes.

Scent Notes:
Top: ${input.topNotes}
Mid: ${input.midNotes}
Base: ${input.baseNotes}

Generate the narrative for the provided notes, aligning with the Flamora brand aesthetic.
Return only JSON that matches this shape: {"narrative":"..."}.`;
}
