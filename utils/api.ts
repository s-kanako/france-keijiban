import { projectId, publicAnonKey } from "./supabase/info";

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-9b3ab15c`;

interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  image_url?: string | null;
  created_at: string;
  updated_at: string;
  likes: number;
  comments: number;
}

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface CreatePostData {
  title: string;
  content: string;
  category: string;
  author: string;
  image_url?: string;
}

interface SignupData {
  email: string;
  password: string;
  name: string;
}

class ApiClient {
  private getHeaders(accessToken?: string) {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken || publicAnonKey}`,
    };
    return headers;
  }

  async signup(data: SignupData) {
    try {
      const response = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Signup failed");
      }

      return result;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  }

  async getPosts(category?: string): Promise<Post[]> {
    try {
      const url = new URL(`${BASE_URL}/posts`);
      if (category) {
        url.searchParams.append("category", category);
      }

      const response = await fetch(url.toString(), {
        headers: this.getHeaders(),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch posts");
      }

      return result.posts || [];
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  }

  async createPost(data: CreatePostData, accessToken?: string): Promise<Post> {
    try {
      const response = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: this.getHeaders(accessToken),
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create post");
      }

      return result.post;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  }

  async getPost(id: string): Promise<Post> {
    try {
      const response = await fetch(`${BASE_URL}/posts/${id}`, {
        headers: this.getHeaders(),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch post");
      }

      return result.post;
    } catch (error) {
      console.error("Error fetching post:", error);
      throw error;
    }
  }

  async deletePost(id: string, accessToken: string): Promise<void> {
    try {
      const response = await fetch(`${BASE_URL}/posts/${id}`, {
        method: "DELETE",
        headers: this.getHeaders(accessToken),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      throw error;
    }
  }

  async getCategories(): Promise<Category[]> {
    try {
      const response = await fetch(`${BASE_URL}/categories`, {
        headers: this.getHeaders(),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch categories");
      }

      return result.categories || [];
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  }

  // Helper method for backwards compatibility
  async healthCheck(): Promise<{ message: string }> {
    try {
      const response = await fetch(`${BASE_URL}/health`, {
        headers: this.getHeaders(),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Health check failed");
      }

      return result;
    } catch (error) {
      console.error("Error during health check:", error);
      throw error;
    }
  }
}

export const api = new ApiClient();
export type { Post, Category, CreatePostData, SignupData };