"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function TestRunner({ questions, testId }: { questions: any[], testId: string }) {
  const router = useRouter();
  
  return (
    <div className="flex flex-col gap-4 p-4 border rounded-xl">
      <h2 className="text-xl font-bold">Mock Test Runner Placeholder</h2>
      <p>This component was missing from the repository history and has been stubbed to allow the project to build.</p>
      <p>Test ID: {testId}</p>
      <p>Total Questions: {questions.length}</p>
      <Button onClick={() => router.push('/hub')}>Return to Hub</Button>
    </div>
  );
}
