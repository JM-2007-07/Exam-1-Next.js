'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useAddTodoMutation } from '@/api/todo.api'

export default function AddTodoDialog({ open, setOpen, onSuccess }: any) {
  const t = useTranslations('TodoDialog')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [images, setImages] = useState<File[]>([])
  const [addTodo, { isLoading }] = useAddTodoMutation()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await addTodo({ name, description, images })
      setName('')
      setDescription('')
      setImages([])
      setOpen(false)
      onSuccess()
    } catch (error) {
      console.error(error)
    }
  }
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setOpen(false)}>
      <div className="w-full max-w-md rounded-xl bg-white p-6 text-black shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="mb-4 text-xl font-bold">{t('addTitle')}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input className="rounded-md border p-2" value={name} onChange={(e) => setName(e.target.value)} placeholder={t('name')} required />
          <textarea className="rounded-md border p-2" value={description} onChange={(e) => setDescription(e.target.value)} placeholder={t('description')} required />
          <input className="rounded-md border p-2" type="file" accept="image/*" multiple onChange={(e) => setImages(Array.from(e.target.files || []))} />
          <div className="flex justify-end gap-2">
            <button type="button" className="rounded-md border px-4 py-2" onClick={() => setOpen(false)}>{t('cancel')}</button>
            <button type="submit" className="rounded-md bg-black px-4 py-2 text-white disabled:opacity-50">{t('add')}</button>
          </div>
        </form>
      </div>
    </div>
  )
}