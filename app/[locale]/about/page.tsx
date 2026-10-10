import { getTranslations, setRequestLocale } from 'next-intl/server'
import React from 'react'

const About = async ({ params }: PageProps<'/[locale]/about'>) => {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('About')

  return (
    <main className="mx-auto max-w-6xl px-5 py-16">
      <section className="mb-16 text-center">
        <h1 className="mb-5 text-4xl font-bold tracking-tight md:text-5xl">{t('title')}</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{t('description')}</p>
      </section>

      <section className="mb-16 grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border p-6">
          <h2 className="mb-3 text-xl font-semibold">{t('mission.title')}</h2>
          <p className="text-muted-foreground">{t('mission.description')}</p>
        </div>
        <div className="rounded-xl border p-6">
          <h2 className="mb-3 text-xl font-semibold">{t('vision.title')}</h2>
          <p className="text-muted-foreground">{t('vision.description')}</p>
        </div>
        <div className="rounded-xl border p-6">
          <h2 className="mb-3 text-xl font-semibold">{t('values.title')}</h2>
          <p className="text-muted-foreground">{t('values.description')}</p>
        </div>
      </section>

      <section className="rounded-2xl bg-muted p-8 text-center md:p-12">
        <h2 className="mb-4 text-3xl font-bold">{t('team.title')}</h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">{t('team.description')}</p>
      </section>
    </main>
  )
}

export default About