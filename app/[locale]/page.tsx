'use client'

import { img_url, useDeleteTodoMutation, useGetTodoQuery } from '@/api/todo.api'
import AddTodoDialog from '@/components/AddTodoDialog'
import EditTodoDialog from '@/components/EditTodoDialog'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

const Home = () => {
  const t = useTranslations('Home')
  const { data, refetch } = useGetTodoQuery('')
  const [deleteTodo] = useDeleteTodoMutation()
  const [addOpen, setAddOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [selectedTodo, setSelectedTodo] = useState<any>(null)

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id).unwrap()
      await refetch()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="p-5">
      <Button onClick={() => setAddOpen(true)}>{t('add')}</Button>
      <AddTodoDialog open={addOpen} setOpen={setAddOpen} onSuccess={() => { void refetch() }} />
      <div className="mt-5 flex flex-wrap gap-5 text-center">
        {data?.data?.map((el: any) => (
          <div key={el.id} className="flex w-70 max-h-140 flex-col gap-2.5 rounded-2xl border p-3">
            <img src={`${img_url}/${el.images?.[0]?.imageName}`} className='w-full h-50' alt={el.name} />
            <h1 className="text-2xl font-bold">{el.name}</h1>
            <p>{el.description}</p>
            <h3>{el.isCompleted ? t('done') : t('undone')}</h3>
            <Link className='w-full' href={`/${el.id}`}>
              <Button className={"bg-green-200 text-green-950 w-full"}>{t('info')}</Button>
            </Link>
            <Button variant="destructive" onClick={() => handleDelete(el.id)}>{t('delete')}</Button>
            <Button onClick={() => {
              setSelectedTodo(el)
              setEditOpen(true)
            }}>{t('edit')}</Button>
          </div>
        ))}
      </div>
      {selectedTodo && (
        <EditTodoDialog todo={selectedTodo} open={editOpen} setOpen={setEditOpen} onSuccess={() => { void refetch() }}/>
      )}
    </div>
  )
}

export default Home