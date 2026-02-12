'use server';
/**
 * @fileOverview An AI agent that generates poetic and brand-aligned scent narratives for Flamora candles.
 *
 * - generateScentNarrative - A function that handles the scent narrative generation process.
 * - GenerateScentNarrativeInput - The input type for the generateScentNarrative function.
 * - GenerateScentNarrativeOutput - The return type for the generateScentNarrative function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateScentNarrativeInputSchema = z.object({
  topNotes: z.string().describe('The top notes of the candle scent (e.g., bergamot, lemon zest).'),
  midNotes: z.string().describe('The middle notes of the candle scent (e.g., jasmine, rose, cedarwood).'),
  baseNotes: z.string().describe('The base notes of the candle scent (e.g., sandalwood, amber, musk).'),
});
export type GenerateScentNarrativeInput = z.infer<typeof GenerateScentNarrativeInputSchema>;

const GenerateScentNarrativeOutputSchema = z.object({
  narrative: z
    .string()
    .describe('A poetic, brand-aligned short description of the candle scent, evoking a softer kind of light.'),
});
export type GenerateScentNarrativeOutput = z.infer<typeof GenerateScentNarrativeOutputSchema>;

export async function generateScentNarrative(
  input: GenerateScentNarrativeInput
): Promise<GenerateScentNarrativeOutput> {
  return generateScentNarrativeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateScentNarrativePrompt',
  input: {schema: GenerateScentNarrativeInputSchema},
  output: {schema: GenerateScentNarrativeOutputSchema},
  prompt: `You are a creative writer for FLAMORA, a candle brand known for "A softer kind of light".
Your style is minimalist, warm, sophisticated, and uses language that evokes a sense of peace and natural elegance, often associated with dried flowers and soft, creamy tones.

Craft a poetic and concise narrative (2-4 sentences) that describes a candle scent based on its notes.

Scent Notes:
Top: {{{topNotes}}}
Mid: {{{midNotes}}}
Base: {{{baseNotes}}}

Example Output: "Hương đầu tươi mát từ cam bergamot mở ra cánh cửa dẫn lối vào vườn hồng buổi sớm, nơi nốt giữa của hoa hồng Bungari hòa quyện tinh tế. Nền hương gỗ đàn hương và hổ phách dịu nhẹ, ôm trọn không gian trong sự ấm áp và yên bình."

Generate the narrative for the provided notes, aligning with the Flamora brand aesthetic.
`,
});

const generateScentNarrativeFlow = ai.defineFlow(
  {
    name: 'generateScentNarrativeFlow',
    inputSchema: GenerateScentNarrativeInputSchema,
    outputSchema: GenerateScentNarrativeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
