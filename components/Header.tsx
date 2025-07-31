import { Button } from "./ui/button";
import { Search, User } from "lucide-react";
import { PostForm } from "./PostForm";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/85">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-medium">F</span>
          </div>
          <h1 className="text-lg font-medium text-foreground">France Life</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            ホーム
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            カテゴリ一覧
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            投稿する
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            ログイン
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            <Search className="h-4 w-4" />
          </Button>
          <PostForm />
          <Button variant="ghost" size="sm" className="md:hidden">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}