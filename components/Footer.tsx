export function Footer() {
  return (
    <footer className="border-t bg-card mt-12">
      <div className="container px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground text-xs font-medium">F</span>
              </div>
              <span className="font-medium text-foreground">France Life</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              フランス在住日本人のための生活情報コミュニティ。日常の小さな発見をシェアして、みんなで豊かなフランス生活を。
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-foreground mb-4">リンク</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  利用規約
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  プライバシーポリシー
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  お問い合わせ
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  ヘルプ
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-foreground mb-4">カテゴリ</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  スーパー・買い物
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  調味料・代用品
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  コスメ・美容
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  住まい・インテリア
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 text-center">
          <p className="text-muted-foreground text-sm">
            © 2025 France Life. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}