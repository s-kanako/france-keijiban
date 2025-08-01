import { useEffect, useState } from 'react'
import { supabase } from '/utils/supabase/client.tsx'
import { Link } from 'react-router-dom'

type Post = {
  id: string
  title: string
  content: string
}

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase.from('posts').select('*')
      if (error) {
        console.error(error)
      } else {
        setPosts(data)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">投稿一覧</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="mb-2">
            <Link to={`/posts/${post.id}`} className="text-blue-600 underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
