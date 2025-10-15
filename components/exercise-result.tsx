"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Star, Trophy } from "lucide-react"

interface ExerciseResultProps {
  correctAnswers: number
  totalQuestions: number
  stars: number
  onContinue: () => void
}

export function ExerciseResult({ correctAnswers, totalQuestions, stars, onContinue }: ExerciseResultProps) {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <Card className="p-8 text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/20 mb-4">
                <Trophy className="w-12 h-12 text-primary" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Lektion abgeschlossen!</h1>
              <p className="text-muted-foreground">
                Du hast {correctAnswers} von {totalQuestions} Fragen richtig beantwortet
              </p>
            </div>

            <div className="mb-8">
              <div className="text-6xl font-bold text-primary mb-4">{percentage}%</div>
              <div className="flex items-center justify-center gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-8 h-8 ${i < stars ? "fill-warning text-warning" : "text-muted-foreground"}`}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Button size="lg" className="w-full" onClick={onContinue}>
                Weiter
              </Button>
              <p className="text-sm text-muted-foreground">
                {stars === 3 && "Perfekt! Du bist ein Star!"}
                {stars === 2 && "Sehr gut! Weiter so!"}
                {stars === 1 && "Gut gemacht! Übe weiter!"}
                {stars === 0 && "Nicht aufgeben! Versuche es nochmal!"}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
