// 環境変数の安全な取得
const getEnvVar = (key: string): string | undefined => {
  try {
    return typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env[key] : undefined;
  } catch {
    return undefined;
  }
};

const projectId = (() => {
  const url = getEnvVar('VITE_SUPABASE_URL') || "https://hyqefzhiugwacdrilhwr.supabase.co";
  try {
    return new URL(url).hostname.split('.')[0];
  } catch {
    return "hyqefzhiugwacdrilhwr";
  }
})();

const publicAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY') 
  || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5cWVmemhpdWd3YWNkcmlsaHdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5NDY0MTYsImV4cCI6MjA2OTUyMjQxNn0.KH1fesa5dCmshgaOLm7TXq0YvBPwoK6C8vRuBQOQ95w";

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-9b3ab15c`;

export interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  created_at: string;
  updated_at: string;
}

class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error (${response.status}):`, errorText);
      throw new Error(`API request failed: ${response.status} ${errorText}`);
    }

    return response.json();
  }

  async getPosts(category?: string): Promise<Post[]> {
    const endpoint = category ? `/posts?category=${encodeURIComponent(category)}` : '/posts';
    return this.request<Post[]>(endpoint);
  }

  async createPost(post: Omit<Post, 'id' | 'created_at' | 'updated_at'>): Promise<Post> {
    return this.request<Post>('/posts', {
      method: 'POST',
      body: JSON.stringify(post),
    });
  }

  async updatePost(id: string, post: Partial<Omit<Post, 'id' | 'created_at' | 'updated_at'>>): Promise<Post> {
    return this.request<Post>(`/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(post),
    });
  }

  async deletePost(id: string): Promise<void> {
    return this.request<void>(`/posts/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();