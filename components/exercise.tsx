"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Volume2, CheckCircle2, XCircle } from "lucide-react"
import { ExerciseResult } from "@/components/exercise-result"
import { getLessonsForLanguage } from "@/lib/lesson-data"

interface ExerciseProps {
  lesson: {
    id: number
    title: string
  }
  language: string
  onComplete: (stars: number) => void
  onBack: () => void
}

export function Exercise({ lesson, language, onComplete, onBack }: ExerciseProps) {
  const lessonData = getLessonsForLanguage(language).find((l) => l.id === lesson.id)
  const questions = lessonData?.questions || []

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  const handleSubmit = () => {
    const correct = selectedAnswer.toLowerCase().trim() === currentQuestion.correctAnswer.toLowerCase().trim()
    setIsCorrect(correct)
    setShowFeedback(true)
    if (correct) {
      setCorrectAnswers((prev) => prev + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setSelectedAnswer("")
      setShowFeedback(false)
      setIsCorrect(false)
    } else {
      setShowResult(true)
    }
  }

  const calculateStars = () => {
    const percentage = (correctAnswers / questions.length) * 100
    if (percentage >= 90) return 3
    if (percentage >= 70) return 2
    if (percentage >= 50) return 1
    return 0
  }

  if (showResult) {
    return (
      <ExerciseResult
        correctAnswers={correctAnswers}
        totalQuestions={questions.length}
        stars={calculateStars()}
        onContinue={() => onComplete(calculateStars())}
      />
    )
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center">
        <Card className="p-8">
          <p className="text-center text-muted-foreground">Keine Fragen verfügbar</p>
          <Button onClick={onBack} className="mt-4 w-full">
            Zurück
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex-1">
                <Progress value={progress} className="h-3" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                {currentQuestionIndex + 1}/{questions.length}
              </span>
            </div>
          </div>

          {/* Question Card */}
          <Card className="p-8 mb-6">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold text-balance">{currentQuestion.question}</h2>
                <Button variant="ghost" size="icon" className="flex-shrink-0">
                  <Volume2 className="w-5 h-5" />
                </Button>
              </div>
              {currentQuestion.hint && !showFeedback && (
                <p className="text-sm text-muted-foreground">Tipp: {currentQuestion.hint}</p>
              )}
            </div>

            {currentQuestion.type === "multiple-choice" && currentQuestion.options && (
              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <Button
                    key={option}
                    variant={selectedAnswer === option ? "default" : "outline"}
                    className="w-full justify-start text-left h-auto py-4 px-6 text-lg"
                    onClick={() => setSelectedAnswer(option)}
                    disabled={showFeedback}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            )}

            {currentQuestion.type === "translation" && (
              <div>
                <input
                  type="text"
                  value={selectedAnswer}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  placeholder="Deine Antwort..."
                  className="w-full px-6 py-4 text-lg border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  disabled={showFeedback}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && selectedAnswer && !showFeedback) {
                      handleSubmit()
                    }
                  }}
                />
              </div>
            )}
          </Card>

          {/* Feedback */}
          {showFeedback && (
            <Card
              className={`p-6 mb-6 ${
                isCorrect ? "bg-success/10 border-success" : "bg-destructive/10 border-destructive"
              }`}
            >
              <div className="flex items-center gap-4">
                {isCorrect ? (
                  <CheckCircle2 className="w-8 h-8 text-success flex-shrink-0" />
                ) : (
                  <XCircle className="w-8 h-8 text-destructive flex-shrink-0" />
                )}
                <div className="flex-1">
                  <h3 className={`font-bold text-lg mb-1 ${isCorrect ? "text-success" : "text-destructive"}`}>
                    {isCorrect ? "Richtig!" : "Nicht ganz richtig"}
                  </h3>
                  {!isCorrect && (
                    <p className="text-sm">
                      Die richtige Antwort ist: <strong>{currentQuestion.correctAnswer}</strong>
                    </p>
                  )}
                </div>
              </div>
            </Card>
          )}

          {/* Action Button */}
          <div className="flex justify-end">
            {!showFeedback ? (
              <Button size="lg" onClick={handleSubmit} disabled={!selectedAnswer} className="px-12">
                Prüfen
              </Button>
            ) : (
              <Button size="lg" onClick={handleNext} className="px-12">
                Weiter
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
