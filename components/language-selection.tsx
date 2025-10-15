"use client"
import { Card } from "@/components/ui/card"
import { Globe } from "lucide-react"

interface Language {
  code: string
  name: string
  nativeName: string
  flag: string
}

const languages: Language[] = [
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇵🇹" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
]

interface LanguageSelectionProps {
  onSelectLanguage: (language: string) => void
}

export function LanguageSelection({ onSelectLanguage }: LanguageSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-6">
              <Globe className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-5xl font-bold mb-4 text-balance">Welche Sprache möchtest du lernen?</h1>
            <p className="text-xl text-muted-foreground text-balance">Wähle eine Sprache und beginne deine Lernreise</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {languages.map((language) => (
              <Card
                key={language.code}
                className="p-6 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary group"
                onClick={() => onSelectLanguage(language.code)}
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <span className="text-5xl">{language.flag}</span>
                  <div>
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{language.name}</h3>
                    <p className="text-sm text-muted-foreground">{language.nativeName}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">Kostenlos • Effektiv • Macht Spaß</p>
          </div>
        </div>
      </div>
    </div>
  )
}
