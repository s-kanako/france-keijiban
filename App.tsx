import { useState } from "react";
import { Header } from "./components/Header";
import { CategoryList } from "./components/CategoryList";
import { PostList } from "./components/PostList";
import { Footer } from "./components/Footer";
import { PostForm } from "./components/PostForm";
import { FloatingActionButton } from "./components/FloatingActionButton";
import { AuthProvider } from "./components/AuthContext";
import { Button } from "./components/ui/button";
import { Toaster } from "./components/ui/sonner";

function AppContent() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCategorySelect = (category?: string) => {
    setSelectedCategory(category);
  };

  const handlePostCreated = () => {
    // 投稿作成後にリストを更新
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-b from-background to-muted/20">
          <div className="container px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl sm:text-3xl font-medium text-foreground mb-4">
              フランス生活の小さな発見を<br className="sm:hidden" />シェアしよう
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
              調味料の代用品、お得なスーパー情報、おすすめコスメまで。<br />
              フランス在住日本人同士で、暮らしに役立つリアルな情報を共有できるコミュニティです。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <PostForm onPostCreated={handlePostCreated}>
                <Button size="lg" className="bg-primary hover:bg-primary/90 px-8">
                  今すぐ投稿してみる
                </Button>
              </PostForm>
              <Button variant="outline" size="lg" className="px-8">
                投稿を見る
              </Button>
            </div>
          </div>
        </section>

        <CategoryList 
          onCategorySelect={handleCategorySelect}
          selectedCategory={selectedCategory}
        />
        <PostList 
          selectedCategory={selectedCategory}
          key={`${selectedCategory}-${refreshKey}`}
        />
      </main>

      <Footer />
      <FloatingActionButton onPostCreated={handlePostCreated} />
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}