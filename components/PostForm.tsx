import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent } from "./ui/card";
import { PlusCircle, Upload, X, ImageIcon, Loader2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { api, type CreatePostData } from "../utils/api";
import { useAuth } from "./AuthContext";
import { toast } from "sonner@2.0.3";

const categories = [
  "スーパー・買い物",
  "調味料・代用品",
  "コスメ・美容",
  "住まい・インテリア",
  "健康・医療",
  "日常の知恵",
  "旅行・観光",
  "仕事・手続き"
];

interface PostFormProps {
  children?: React.ReactNode;
  onPostCreated?: () => void;
}

export function PostForm({ children, onPostCreated }: PostFormProps) {
  const { user, getAccessToken } = useAuth();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    author: "",
    image: null as File | null
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const postData: CreatePostData = {
        title: formData.title,
        content: formData.content,
        category: formData.category,
        author: formData.author,
        // 画像アップロード機能は後で実装
        image_url: undefined
      };

      const accessToken = await getAccessToken();
      await api.createPost(postData, accessToken || undefined);

      // フォームをリセット
      setFormData({
        title: "",
        content: "",
        category: "",
        author: "",
        image: null
      });
      setImagePreview(null);
      setOpen(false);

      toast.success("投稿が正常に作成されました！");
      
      // 親コンポーネントに投稿作成を通知
      if (onPostCreated) {
        onPostCreated();
      }
    } catch (error) {
      console.error("Post creation error:", error);
      toast.error(error instanceof Error ? error.message : "投稿の作成に失敗しました");
    } finally {
      setSubmitting(false);
    }
  };

  const isFormValid = formData.title && formData.content && formData.category && formData.author;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className="bg-primary hover:bg-primary/90">
            <PlusCircle className="h-4 w-4 mr-1" />
            投稿
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">新しい投稿を作成</DialogTitle>
          <DialogDescription>
            フランス生活で見つけた発見や情報を他の日本人の方とシェアしましょう。
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* タイトル */}
          <div className="space-y-2">
            <Label htmlFor="title">タイトル *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="例：Monoprixで見つけた日本の醤油に似た調味料"
              className="bg-input-background"
              required
              disabled={submitting}
            />
          </div>

          {/* カテゴリ選択 */}
          <div className="space-y-2">
            <Label htmlFor="category">カテゴリ *</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              required
              disabled={submitting}
            >
              <SelectTrigger className="bg-input-background">
                <SelectValue placeholder="カテゴリを選択してください" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 投稿者名 */}
          <div className="space-y-2">
            <Label htmlFor="author">投稿者名 *</Label>
            <Input
              id="author"
              value={formData.author}
              onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
              placeholder={user?.user_metadata?.name || "例：パリ在住さん"}
              className="bg-input-background"
              required
              disabled={submitting}
            />
          </div>

          {/* 画像アップロード */}
          <div className="space-y-2">
            <Label>画像（オプション）</Label>
            <p className="text-sm text-muted-foreground mb-2">
              ※画像アップロード機能は現在開発中です
            </p>
            {!imagePreview ? (
              <div className="border-2 border-dashed border-border rounded-lg p-6 opacity-50">
                <div className="text-center">
                  <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <Label
                    htmlFor="image-upload"
                    className="cursor-not-allowed inline-flex items-center px-4 py-2 bg-secondary/50 rounded-lg"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    画像を選択（準備中）
                  </Label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    disabled
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    JPG、PNG、GIF（最大10MB）
                  </p>
                </div>
              </div>
            ) : (
              <Card>
                <CardContent className="p-4">
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="プレビュー"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={removeImage}
                      disabled={submitting}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* 投稿内容 */}
          <div className="space-y-2">
            <Label htmlFor="content">投稿内容 *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="発見した情報や体験談を詳しく教えてください。どこで購入できるか、価格、使用感など具体的な情報があると他の方に役立ちます。"
              className="min-h-32 bg-input-background resize-none"
              required
              disabled={submitting}
            />
            <p className="text-sm text-muted-foreground">
              {formData.content.length}/1000文字
            </p>
          </div>

          {/* プレビュー */}
          {(formData.title || formData.content || formData.category) && (
            <div className="space-y-2">
              <Label>プレビュー</Label>
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    {formData.category && (
                      <Badge variant="secondary" className="bg-muted text-muted-foreground">
                        {formData.category}
                      </Badge>
                    )}
                  </div>
                  {formData.title && (
                    <h3 className="font-medium text-foreground mb-2">
                      {formData.title}
                    </h3>
                  )}
                  {formData.content && (
                    <p className="text-muted-foreground text-sm">
                      {formData.content.substring(0, 150)}
                      {formData.content.length > 150 && "..."}
                    </p>
                  )}
                  {formData.author && (
                    <div className="flex items-center mt-3">
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mr-2">
                        <span className="text-primary-foreground text-xs">
                          {formData.author.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">{formData.author}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* 送信ボタン */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              disabled={submitting}
            >
              キャンセル
            </Button>
            <Button 
              type="submit" 
              disabled={!isFormValid || submitting}
              className="bg-primary hover:bg-primary/90"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  投稿中...
                </>
              ) : (
                "投稿する"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}