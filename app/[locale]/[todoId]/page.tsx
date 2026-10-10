'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { img_url, useGetTodoByIdQuery, useAddTodoImagesMutation, useDeleteTodoImageMutation} from '@/api/todo.api'

const TodoInfo = () => {
  const t = useTranslations('TodoInfo')
  const params = useParams()
  const todoId = Number(params.todoId)
  const { data, refetch } = useGetTodoByIdQuery(todoId)
  const [addTodoImages] = useAddTodoImagesMutation()
  const [deleteTodoImage] = useDeleteTodoImageMutation()
  const [images, setImages] = useState<File[]>([])
  
  const handleAddImages = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (images.length === 0) return
    try {
      await addTodoImages({ todoId, images }).unwrap()
      setImages([])
      e.currentTarget.reset()
      await refetch()
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteImage = async (imageId: number) => {
    try {
      await deleteTodoImage(imageId).unwrap()
      await refetch()
    } catch (error) {
      console.error(error)
    }
  }
  if (!data?.data) return <p>{t('notFound')}</p>
  const todo = data.data
  return (
    <div className="mx-auto max-w-2xl p-5">
      <h1 className="mb-2 text-3xl font-bold">{todo.name}</h1>
      <p className="mb-5">{todo.description}</p>
        <Swiper modules={[Navigation, Pagination]} navigation pagination={{ clickable: true }} spaceBetween={10} slidesPerView={1}>
          {todo.images.map((image: any) => (
            <SwiperSlide key={image.id}>
              <div className="flex flex-col items-center gap-3 pb-10">
                <img className="h-80 w-full rounded-xl object-contain" src={`${img_url}/${image.imageName}`} alt={todo.name} />
                <button className="rounded-md bg-red-600 px-4 py-2 text-white disabled:opacity-50" onClick={() => handleDeleteImage(image.id)}>
                  {t('deleteImage')}
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <form onSubmit={handleAddImages} className="mt-5 flex flex-col gap-3">
          <label htmlFor="images" className="font-medium">{t('addImage')}</label>
          <input id="images" type="file" accept="image/*" multiple onChange={(e) => setImages(Array.from(e.target.files || []))} />
          <button type="submit" className="rounded-md bg-black px-4 py-2 text-white disabled:opacity-50">
            {t('addImage')}
          </button>
        </form>
    </div>
  )
}

export default TodoInfo