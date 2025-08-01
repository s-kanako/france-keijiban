// src/pages/PostDetail.tsx
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../../utils/supabase/client'

type Post = {
  id: string
  title: string
  content: string
}

export default function PostDetail() {
  const { id } = useParams()
  const [post, setPost] = useState<Post | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase.from('posts').select('*').eq('id', id).single()
      if (error) {
        console.error(error)
      } else {
        setPost(data)
      }
    }

    fetchPost()
  }, [id])

  if (!post) return <div>Loading...</div>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p>{post.content}</p>
    </div>
  )
}
