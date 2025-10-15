"use client"

import { useState } from "react"
import { LanguageSelection } from "@/components/language-selection"
import { LessonPath } from "@/components/lesson-path"

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)

  if (!selectedLanguage) {
    return <LanguageSelection onSelectLanguage={setSelectedLanguage} />
  }

  return <LessonPath language={selectedLanguage} onBack={() => setSelectedLanguage(null)} />
}
