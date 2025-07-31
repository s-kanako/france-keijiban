import { PostForm } from "./PostForm";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";

interface FloatingActionButtonProps {
  onPostCreated?: () => void;
}

export function FloatingActionButton({ onPostCreated }: FloatingActionButtonProps) {
  return (
    <div className="fixed bottom-6 right-6 z-40 md:hidden">
      <PostForm onPostCreated={onPostCreated}>
        <Button 
          size="lg" 
          className="w-14 h-14 rounded-full shadow-lg bg-accent hover:bg-accent/90 hover:scale-105 transition-all duration-200"
        >
          <PlusCircle className="h-6 w-6" />
        </Button>
      </PostForm>
    </div>
  );
}