import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2.47.7";
import * as kv from "./kv_store.tsx";

const app = new Hono();

app.use("*", cors({
  origin: "*",
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
}));

app.use("*", logger(console.log));

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

// ユーザー登録
app.post("/make-server-9b3ab15c/auth/signup", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return c.json({ error: "Email, password, and name are required" }, 400);
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log("User creation error:", error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ user: data.user });
  } catch (error) {
    console.log("Signup error:", error);
    return c.json({ error: "Internal server error during signup" }, 500);
  }
});

// 投稿一覧取得
app.get("/make-server-9b3ab15c/posts", async (c) => {
  try {
    const category = c.req.query("category");
    
    const posts = await kv.getByPrefix("post:");
    let filteredPosts = posts;

    if (category) {
      filteredPosts = posts.filter(post => post.category === category);
    }

    // 日付順でソート（新しい順）
    filteredPosts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return c.json({ posts: filteredPosts });
  } catch (error) {
    console.log("Error fetching posts:", error);
    return c.json({ error: "Internal server error while fetching posts" }, 500);
  }
});

// 投稿作成
app.post("/make-server-9b3ab15c/posts", async (c) => {
  try {
    const accessToken = c.req.header("Authorization")?.split(" ")[1];
    
    if (!accessToken || accessToken === Deno.env.get("SUPABASE_ANON_KEY")) {
      // 認証が必要ない場合はゲスト投稿として扱う
    } else {
      const { data: { user }, error } = await supabase.auth.getUser(accessToken);
      if (error || !user) {
        return c.json({ error: "Unauthorized" }, 401);
      }
    }

    const body = await c.req.json();
    const { title, content, category, author, image_url } = body;

    if (!title || !content || !category || !author) {
      return c.json({ error: "Title, content, category, and author are required" }, 400);
    }

    const postId = crypto.randomUUID();
    const now = new Date().toISOString();
    
    const post = {
      id: postId,
      title,
      content,
      category,
      author,
      image_url: image_url || null,
      created_at: now,
      updated_at: now,
      likes: 0,
      comments: 0
    };

    await kv.set(`post:${postId}`, post);

    return c.json({ post });
  } catch (error) {
    console.log("Error creating post:", error);
    return c.json({ error: "Internal server error while creating post" }, 500);
  }
});

// 特定の投稿取得
app.get("/make-server-9b3ab15c/posts/:id", async (c) => {
  try {
    const postId = c.req.param("id");
    const post = await kv.get(`post:${postId}`);

    if (!post) {
      return c.json({ error: "Post not found" }, 404);
    }

    return c.json({ post });
  } catch (error) {
    console.log("Error fetching post:", error);
    return c.json({ error: "Internal server error while fetching post" }, 500);
  }
});

// 投稿削除
app.delete("/make-server-9b3ab15c/posts/:id", async (c) => {
  try {
    const accessToken = c.req.header("Authorization")?.split(" ")[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken!);
    
    if (error || !user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const postId = c.req.param("id");
    const post = await kv.get(`post:${postId}`);

    if (!post) {
      return c.json({ error: "Post not found" }, 404);
    }

    await kv.del(`post:${postId}`);

    return c.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log("Error deleting post:", error);
    return c.json({ error: "Internal server error while deleting post" }, 500);
  }
});

// カテゴリ一覧取得
app.get("/make-server-9b3ab15c/categories", async (c) => {
  try {
    const categories = [
      { id: "supermarket", name: "スーパー・買い物", icon: "🛒" },
      { id: "seasoning", name: "調味料・代用品", icon: "🧂" },
      { id: "cosmetics", name: "コスメ・美容", icon: "💄" },
      { id: "housing", name: "住まい・インテリア", icon: "🏠" },
      { id: "health", name: "健康・医療", icon: "🏥" },
      { id: "tips", name: "日常の知恵", icon: "💡" },
      { id: "travel", name: "旅行・観光", icon: "✈️" },
      { id: "work", name: "仕事・手続き", icon: "📋" }
    ];

    return c.json({ categories });
  } catch (error) {
    console.log("Error fetching categories:", error);
    return c.json({ error: "Internal server error while fetching categories" }, 500);
  }
});

Deno.serve(app.fetch);