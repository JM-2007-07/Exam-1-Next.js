import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import React, { Suspense } from 'react'
import LocaleSwitcher from './LocaleSwitcher'

const Header = () => {
  const t = useTranslations('Header')

  return (
    <div className='flex gap-5 items-center p-4'>
        <Link href={`/`} className='text-4xl font-bold'>Exam</Link>
        <Link href={`/`} className='px-2.5 rounded-2xl border '>{t('home')}</Link>
        <Link href={`/about`} className='px-2.5 rounded-2xl border '>{t('about')}</Link>
        <Suspense fallback={<div className='ml-auto' />}>
          <LocaleSwitcher />
        </Suspense>
    </div>
  )
}

export default Header
