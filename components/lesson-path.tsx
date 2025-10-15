"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Star, Lock, CheckCircle2, Circle } from "lucide-react"
import { Exercise } from "@/components/exercise"
import { getLessonsForLanguage } from "@/lib/lesson-data"

interface Lesson {
  id: number
  title: string
  description: string
  completed: boolean
  locked: boolean
  stars: number
  maxStars: number
}

interface LessonPathProps {
  language: string
  onBack?: () => void
}

export function LessonPath({ language, onBack }: LessonPathProps) {
  const [currentLesson, setCurrentLesson] = useState<number | null>(null)
  const [lessons, setLessons] = useState<Lesson[]>(() => {
    const languageLessons = getLessonsForLanguage(language)
    return languageLessons.map((lesson, index) => ({
      id: lesson.id,
      title: lesson.title,
      description: lesson.description,
      completed: false,
      locked: index !== 0,
      stars: 0,
      maxStars: 3,
    }))
  })

  const totalLessons = lessons.length
  const completedLessons = lessons.filter((l) => l.completed).length
  const progressPercentage = (completedLessons / totalLessons) * 100

  const handleLessonComplete = (lessonId: number, stars: number) => {
    setLessons((prev) =>
      prev.map((lesson, index) => {
        if (lesson.id === lessonId) {
          return { ...lesson, completed: true, stars }
        }
        if (lesson.id === lessonId + 1) {
          return { ...lesson, locked: false }
        }
        return lesson
      }),
    )
    setCurrentLesson(null)
  }

  if (currentLesson !== null) {
    const lesson = lessons.find((l) => l.id === currentLesson)
    if (lesson) {
      return (
        <Exercise
          lesson={lesson}
          language={language}
          onComplete={(stars) => handleLessonComplete(currentLesson, stars)}
          onBack={() => setCurrentLesson(null)}
        />
      )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex-1">
                <h1 className="text-2xl font-bold">Lernpfad</h1>
                <p className="text-sm text-muted-foreground">
                  {completedLessons} von {totalLessons} Lektionen abgeschlossen
                </p>
              </div>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>

          {/* Lesson Path */}
          <div className="space-y-6">
            {lessons.map((lesson, index) => (
              <div key={lesson.id} className="relative">
                {index > 0 && <div className="absolute left-1/2 -translate-x-1/2 -top-6 w-1 h-6 bg-border" />}
                <Card
                  className={`p-6 transition-all ${
                    lesson.locked
                      ? "opacity-60 cursor-not-allowed"
                      : "hover:shadow-lg cursor-pointer border-2 hover:border-primary"
                  } ${lesson.completed ? "bg-success/5 border-success/20" : ""}`}
                  onClick={() => !lesson.locked && setCurrentLesson(lesson.id)}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center ${
                        lesson.completed ? "bg-success/20" : lesson.locked ? "bg-muted" : "bg-primary/20"
                      }`}
                    >
                      {lesson.locked ? (
                        <Lock className="w-8 h-8 text-muted-foreground" />
                      ) : lesson.completed ? (
                        <CheckCircle2 className="w-8 h-8 text-success" />
                      ) : (
                        <Circle className="w-8 h-8 text-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{lesson.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{lesson.description}</p>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: lesson.maxStars }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < lesson.stars ? "fill-warning text-warning" : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    {!lesson.locked && !lesson.completed && <Button>Start</Button>}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
