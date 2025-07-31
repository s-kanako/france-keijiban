import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Heart, MessageCircle, Bookmark } from "lucide-react";

interface PostCardProps {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  likes: number;
  comments: number;
  image?: string;
}

export function PostCard({ title, excerpt, category, author, date, likes, comments, image }: PostCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 hover:scale-[1.02] bg-card border-border/50">
      {image && (
        <div className="aspect-video overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="secondary" className="bg-muted text-muted-foreground">
            {category}
          </Badge>
          <span className="text-sm text-muted-foreground">{date}</span>
        </div>
        
        <h3 className="font-medium text-foreground mb-2 line-clamp-2 hover:text-primary cursor-pointer transition-colors">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">
          {excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="w-6 h-6">
              <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                {author.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">{author}</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-muted-foreground hover:text-accent transition-colors">
              <Heart className="h-4 w-4" />
              <span className="text-sm">{likes}</span>
            </button>
            <button className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors">
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">{comments}</span>
            </button>
            <button className="text-muted-foreground hover:text-primary transition-colors">
              <Bookmark className="h-4 w-4" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}