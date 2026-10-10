'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useTransition } from 'react'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

const LocaleSwitcher = () => {
  const t = useTranslations('LocaleSwitcher')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  return (
    <div className='ml-auto flex gap-1 rounded-2xl border p-1' aria-label={t('label')}>
      {routing.locales.map((cur) => (
        <button
          key={cur}
          disabled={isPending}
          aria-pressed={cur === locale}
          title={t(cur)}
          onClick={() => startTransition(() => router.replace(pathname, { locale: cur }))}
          className={`rounded-xl px-2.5 uppercase disabled:opacity-50 ${cur === locale ? 'bg-black text-white' : ''}`}
        >
          {cur}
        </button>
      ))}
    </div>
  )
}

export default LocaleSwitcher
