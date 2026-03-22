"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateMockTest } from "@/lib/actions/mocktest.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const subjects = [
  { id: "Physics", label: "Physics" },
  { id: "Chemistry", label: "Chemistry" },
  { id: "Math", label: "Mathematics" },
] as const;

const formSchema = z.object({
  examType: z.enum(["Mains", "Advanced"], {
    message: "Please select an exam type.",
  }),
  subjects: z.array(z.string()).refine((value) => value.length > 0, {
    message: "You have to select at least one subject.",
  }),
  difficulty: z.enum(["Easy", "Medium", "Hard"], {
    message: "Please select a difficulty level.",
  }),
  focusOnMistakes: z.boolean(),
});

export default function MockTestSetupPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subjects: ["Physics", "Chemistry", "Math"],
      focusOnMistakes: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsGenerating(true);
      const res = await generateMockTest(values);
      if (res.success) {
        toast.success(res.message || "Mock test created!");
        router.push(`/hub/mock-test?id=${res.testId}`);
      } else {
        toast.error(res.message || "Failed to generate mock test");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while generating the mock test.");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 my-10 space-y-8 bg-card rounded-xl shadow-sm border border-border">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Setup Mock Test</h1>
        <p className="text-muted-foreground mt-2">
          Configure your standard JEE Mock Test to start practicing.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="examType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Exam Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-6"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Mains" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        JEE Mains
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Advanced" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        JEE Advanced
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subjects"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Subjects</FormLabel>
                  <FormDescription>
                    Select the subjects to include in the mock test.
                  </FormDescription>
                </div>
                {subjects.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="subjects"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Difficulty</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a difficulty level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="focusOnMistakes"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border-2 border-primary/20 bg-surface-container-low p-4 shadow-sm border-dashed">
                <div className="space-y-0.5">
                  <FormLabel className="text-base font-bold text-primary flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm" data-icon="troubleshoot">troubleshoot</span>
                    Focus on Past Mistakes
                  </FormLabel>
                  <FormDescription className="text-outline">
                    Dynamically weigh questions based on topics you previously struggled with.
                  </FormDescription>
                </div>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="w-8 h-8 rounded-full border-4 border-black data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isGenerating}>
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating your JEE paper...
              </>
            ) : (
              "Generate Mock Test"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
