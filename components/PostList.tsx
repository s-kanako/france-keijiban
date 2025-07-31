import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Loader2, RefreshCw } from "lucide-react";
import { api, type Post } from "../utils/api";

interface PostListProps {
  selectedCategory?: string;
}

export function PostList({ selectedCategory }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async (showRefreshLoader = false) => {
    try {
      if (showRefreshLoader) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);
      
      const fetchedPosts = await api.getPosts(selectedCategory);
      setPosts(fetchedPosts);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError(err instanceof Error ? err.message : "投稿の取得に失敗しました");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory]);

  const formatRelativeTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) {
      return "1時間未満前";
    } else if (diffHours < 24) {
      return `${diffHours}時間前`;
    } else if (diffDays < 7) {
      return `${diffDays}日前`;
    } else {
      const diffWeeks = Math.floor(diffDays / 7);
      return `${diffWeeks}週間前`;
    }
  };

  if (loading) {
    return (
      <section className="py-8">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-medium text-foreground mb-2">NEWS</h2>
            <p className="text-muted-foreground">
              {selectedCategory ? `${selectedCategory}の投稿` : "新着掲示板"}
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-lg border border-border p-8 text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">投稿を読み込み中...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-medium text-foreground mb-2">NEWS</h2>
            <p className="text-muted-foreground">新着掲示板</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-lg border border-border p-8 text-center">
              <p className="text-destructive mb-4">{error}</p>
              <Button onClick={() => fetchPosts()} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                再試行
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-xl font-medium text-foreground mb-2">NEWS</h2>
          <p className="text-muted-foreground">
            {selectedCategory ? `${selectedCategory}の投稿` : "新着掲示板"}
          </p>
          <div className="flex justify-center mt-4">
            <Button 
              onClick={() => fetchPosts(true)} 
              variant="outline" 
              size="sm"
              disabled={refreshing}
            >
              {refreshing ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              更新
            </Button>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {posts.length === 0 ? (
            <div className="bg-card rounded-lg border border-border p-8 text-center">
              <p className="text-muted-foreground">
                {selectedCategory 
                  ? `${selectedCategory}の投稿がまだありません。最初の投稿をしてみませんか？`
                  : "投稿がまだありません。最初の投稿をしてみませんか？"
                }
              </p>
            </div>
          ) : (
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              {posts.map((post, index) => (
                <div key={post.id}>
                  <div className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors cursor-pointer group">
                    <div className="flex-1 mr-4">
                      <h3 className="text-foreground group-hover:text-primary transition-colors mb-1">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{formatRelativeTime(post.created_at)}</span>
                        {post.likes > 0 && (
                          <>
                            <span>•</span>
                            <span>👍 {post.likes}</span>
                          </>
                        )}
                        {post.comments > 0 && (
                          <>
                            <span>•</span>
                            <span>💬 {post.comments}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className="bg-muted text-muted-foreground shrink-0"
                    >
                      {post.category}
                    </Badge>
                  </div>
                  {index < posts.length - 1 && (
                    <div className="border-b border-border"></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}