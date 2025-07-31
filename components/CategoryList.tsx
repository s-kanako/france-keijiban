import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { api, type Category } from "../utils/api";

interface CategoryListProps {
  onCategorySelect?: (category?: string) => void;
  selectedCategory?: string;
}

export function CategoryList({ onCategorySelect, selectedCategory }: CategoryListProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await api.getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    const newCategory = selectedCategory === categoryName ? undefined : categoryName;
    if (onCategorySelect) {
      onCategorySelect(newCategory);
    }
  };

  if (loading) {
    return (
      <section className="py-8">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-medium text-foreground mb-2">CATEGORY</h2>
            <p className="text-muted-foreground">カテゴリから探す</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="bg-card rounded-full border border-border p-4 animate-pulse"
              >
                <div className="text-center">
                  <div className="w-8 h-8 bg-muted rounded mx-auto mb-2"></div>
                  <div className="h-4 bg-muted rounded w-20 mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-xl font-medium text-foreground mb-2">CATEGORY</h2>
          <p className="text-muted-foreground">カテゴリから探す</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* すべて表示ボタン */}
          <div className="text-center mb-6">
            <Button
              variant={selectedCategory ? "outline" : "default"}
              onClick={() => onCategorySelect && onCategorySelect(undefined)}
              className="mb-4"
            >
              すべて表示
            </Button>
          </div>

          {/* カテゴリグリッド */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.name ? "default" : "outline"}
                className="h-auto p-4 flex flex-col items-center space-y-2 rounded-xl hover:scale-105 transition-transform"
                onClick={() => handleCategoryClick(category.name)}
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="text-sm text-center leading-tight">
                  {category.name}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}