"use client";

import { useFormState, useFormStatus } from "react-dom";
import { generateNarrativeAction } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialState = {
  message: "",
  narrative: "",
  errors: undefined,
};

function SubmitButton() {
    const { pending } = useFormStatus();
  
    return (
      <Button type="submit" disabled={pending}>
        {pending ? "Đang tạo..." : "Tạo câu chuyện"}
      </Button>
    );
}

export default function ScentGeneratorPage() {
  const [state, formAction] = useFormState(generateNarrativeAction, initialState);

  return (
    <div className="container mx-auto py-12">
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Scent Narrative Creator</CardTitle>
                <CardDescription>
                Công cụ tạo câu chuyện hương thơm theo phong cách của Flamora.
                </CardDescription>
            </CardHeader>
            <form action={formAction}>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="topNotes">Hương đầu (Top Notes)</Label>
                        <Input id="topNotes" name="topNotes" placeholder="e.g., Cam Bergamot, Chanh Vàng" required />
                        {state?.errors?.topNotes && <p className="text-sm text-destructive">{state.errors.topNotes[0]}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="midNotes">Hương giữa (Mid Notes)</Label>
                        <Input id="midNotes" name="midNotes" placeholder="e.g., Hoa Nhài Trắng, Hoa Hồng" required />
                        {state?.errors?.midNotes && <p className="text-sm text-destructive">{state.errors.midNotes[0]}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="baseNotes">Hương cuối (Base Notes)</Label>
                        <Input id="baseNotes" name="baseNotes" placeholder="e.g., Gỗ Đàn Hương, Hổ Phách" required />
                        {state?.errors?.baseNotes && <p className="text-sm text-destructive">{state.errors.baseNotes[0]}</p>}
                    </div>
                    {state?.narrative && (
                         <div className="space-y-2 pt-4">
                            <Label>Kết quả</Label>
                            <div className="p-4 bg-secondary rounded-md border">
                                <p className="text-foreground/90 italic">{state.narrative}</p>
                            </div>
                        </div>
                    )}
                    {state?.message && !state.narrative && <p className="text-sm text-destructive">{state.message}</p>}
                </CardContent>
                <CardFooter>
                    <SubmitButton />
                </CardFooter>
            </form>
        </Card>
    </div>
  );
}
