# フランス生活情報シェア

フランス在住日本人のための生活情報共有コミュニティサイトです。調味料の代用品、お得なスーパー情報、おすすめコスメなど、暮らしに役立つリアルな情報を共有できます。

## 🚀 デプロイ方法

このプロジェクトは以下の方法で公開できます：

### 1. Vercel (推奨)

最も簡単な方法です：

1. [Vercel](https://vercel.com) にサインアップ
2. GitHubリポジトリをインポート
3. 環境変数を設定：
   - `VITE_SUPABASE_URL`: `https://hyqefzhiugwacdrilhwr.supabase.co`
   - `VITE_SUPABASE_ANON_KEY`: あなたのSupabase匿名キー
4. デプロイ完了！

### 2. Netlify

1. [Netlify](https://netlify.com) にサインアップ
2. GitHubリポジトリをインポート
3. ビルド設定：
   - Build command: `npm run build`
   - Publish directory: `dist`
4. 環境変数を設定（Vercelと同じ）
5. デプロイ完了！

### 3. GitHub Pages

無料でホスティング：

1. リポジトリの Settings > Pages を開く
2. Source を "GitHub Actions" に設定
3. `.github/workflows/deploy.yml` ファイルを作成
4. Push すると自動デプロイ

## 🛠️ ローカル開発

```bash
# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview
```

## 📁 プロジェクト構造

```
├── App.tsx                 # メインアプリケーション
├── components/            # Reactコンポーネント
│   ├── AuthContext.tsx   # 認証コンテキスト
│   ├── CategoryList.tsx  # カテゴリ一覧
│   ├── PostForm.tsx      # 投稿フォーム
│   ├── PostList.tsx      # 投稿一覧
│   └── ui/               # UIコンポーネント
├── utils/                # ユーティリティ
│   ├── api.ts           # API クライアント
│   └── supabase/        # Supabase設定
├── styles/              # スタイル
│   └── globals.css      # グローバルCSS
└── supabase/           # バックエンド
    └── functions/      # Edge Functions
```

## 🔧 カスタマイズ

### 色の変更

`styles/globals.css` でカラーパレットを変更できます：

```css
:root {
  --primary: #8ca08c;      /* メインカラー */
  --accent: #a24c4c;       /* アクセントカラー */
  --background: #f6f1eb;   /* 背景色 */
  --foreground: #2c2c2c;   /* テキスト色 */
}
```

### カテゴリの追加

`components/PostForm.tsx` と `supabase/functions/server/index.tsx` でカテゴリを追加できます。

## 🔐 セキュリティ

- 環境変数は必ず設定してください
- Supabaseの Row Level Security (RLS) を有効にすることを推奨します
- 本番環境では HTTPS を使用してください

## 📞 サポート

質問や問題があれば Issue を作成してください。

## 📄 ライセンス
## 7/31 デプロイ中
MIT License
