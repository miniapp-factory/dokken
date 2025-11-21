"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

const questions = [
  {
    question: "What is your favorite type of activity?",
    options: [
      { text: "Reading books", animal: "cat" },
      { text: "Playing sports", animal: "dog" },
      { text: "Exploring nature", animal: "fox" },
      { text: "Staying cozy at home", animal: "hamster" },
      { text: "Riding a horse", animal: "horse" },
    ],
  },
  {
    question: "Which environment do you prefer?",
    options: [
      { text: "Quiet library", animal: "cat" },
      { text: "Open field", animal: "dog" },
      { text: "Forest trail", animal: "fox" },
      { text: "Small cage", animal: "hamster" },
      { text: "Stables", animal: "horse" },
    ],
  },
  {
    question: "What is your favorite food?",
    options: [
      { text: "Fish", animal: "cat" },
      { text: "Meat", animal: "dog" },
      { text: "Berries", animal: "fox" },
      { text: "Seeds", animal: "hamster" },
      { text: "Hay", animal: "horse" },
    ],
  },
  {
    question: "How do you like to spend your weekend?",
    options: [
      { text: "Sleeping", animal: "cat" },
      { text: "Playing fetch", animal: "dog" },
      { text: "Hiking", animal: "fox" },
      { text: "Napping", animal: "hamster" },
      { text: "Riding", animal: "horse" },
    ],
  },
  {
    question: "What is your personality like?",
    options: [
      { text: "Independent", animal: "cat" },
      { text: "Friendly", animal: "dog" },
      { text: "Curious", animal: "fox" },
      { text: "Shy", animal: "hamster" },
      { text: "Strong", animal: "horse" },
    ],
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (animal: string) => {
    const newAnswers = [...answers, animal];
    setAnswers(newAnswers);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      const scores: Record<string, number> = {
        cat: 0,
        dog: 0,
        fox: 0,
        hamster: 0,
        horse: 0,
      };
      newAnswers.forEach((a) => {
        scores[a] = (scores[a] ?? 0) + 1;
      });
      const max = Math.max(...Object.values(scores));
      const topAnimals = Object.entries(scores)
        .filter(([, v]) => v === max)
        .map(([k]) => k);
      setResult(topAnimals[0]); // pick first if tie
    }
  };

  const handleRetake = () => {
    setCurrent(0);
    setAnswers([]);
    setResult(null);
  };

  if (result) {
    return (
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-xl font-semibold">You are a {result}!</h2>
        <img
          src={`/${result}.png`}
          alt={result}
          width={256}
          height={256}
          className="rounded"
        />
        <Share text={`I am a ${result}! ${url}`} />
        <Button variant="outline" onClick={handleRetake}>
          Retake Quiz
        </Button>
      </div>
    );
  }

  const currentQuestion = questions[current];
  const shuffledOptions = shuffleArray(currentQuestion.options);

  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-lg font-medium">{currentQuestion.question}</h3>
      <div className="flex flex-col gap-2">
        {shuffledOptions.map((opt, idx) => (
          <Button
            key={idx}
            onClick={() => handleAnswer(opt.animal)}
            className="w-full"
          >
            {opt.text}
          </Button>
        ))}
      </div>
    </div>
  );
}
