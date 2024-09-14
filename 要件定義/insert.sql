-- サンプルデータを users テーブルに挿入
INSERT INTO
  users (auth_id, username, avatar)
VALUES
  (
    '0e060f78-1560-4877-9112-87120e78510b',
    'ガネーシャ',
    'https://slthsjneofwnmtffmcer.supabase.co/storage/v1/object/public/icons/icon1.jpg'
  ),
  (
    '5424b27c-0101-4a4a-9be3-51c12532d074',
    '土屋',
    'https://slthsjneofwnmtffmcer.supabase.co/storage/v1/object/public/icons/icon2.jpg'
  ),
  (
    '8593b706-d74b-4dc8-9258-ddf4291a0ef5',
    'kasiteto',
    'https://slthsjneofwnmtffmcer.supabase.co/storage/v1/object/public/icons/icon3.png?t=2024-08-30T11%3A57%3A07.670Z'
  );

-- videosテーブル
INSERT INTO videos (user_id, title, description, video_url, manim_url, thumbnail_url, views, article_url) VALUES
    (1, 'サンプル動画1', 'これは動画1の説明です', 'https://slthsjneofwnmtffmcer.supabase.co/storage/v1/object/public/videos/displayEquations.mp4', 'https://example.com/manim1.py', 'https://slthsjneofwnmtffmcer.supabase.co/storage/v1/object/public/thumbneils/thumbnail2.png?t=2024-08-30T12%3A10%3A43.263Z', 100, 'https://slthsjneofwnmtffmcer.supabase.co/storage/v1/object/public/articles/samplearticle.md?t=2024-08-30T12%3A19%3A27.231Z'),
    (2, 'サンプル動画2', 'これは動画2の説明です', 'https://slthsjneofwnmtffmcer.supabase.co/storage/v1/object/public/videos/CreateCircle.mp4', 'https://example.com/manim2.py', 'https://slthsjneofwnmtffmcer.supabase.co/storage/v1/object/public/thumbneils/thumbnail3.png?t=2024-08-30T12%3A11%3A04.055Z', 150, 'https://slthsjneofwnmtffmcer.supabase.co/storage/v1/object/public/articles/samplearticle.md?t=2024-08-30T12%3A19%3A27.231Z'),
    (3, 'サンプル動画3', 'これは動画3の説明です', 'https://slthsjneofwnmtffmcer.supabase.co/storage/v1/object/public/videos/displayTextJP.mp4', 'https://example.com/manim3.py', 'https://slthsjneofwnmtffmcer.supabase.co/storage/v1/object/public/thumbneils/thumbnail.png?t=2024-08-30T12%3A11%3A12.010Z', 200, 'https://slthsjneofwnmtffmcer.supabase.co/storage/v1/object/public/articles/samplearticle.md?t=2024-08-30T12%3A19%3A27.231Z');

-- likesテーブル
INSERT INTO likes (user_id, video_id) VALUES
    (1, 2),
    (2, 3),
    (3, 1),
    (3, 2),
    (3, 3);

-- commentsテーブル
INSERT INTO comments (user_id, video_id, content) VALUES
    (1, 1, 'すばらしい動画です！'),
    (1, 2, 'とても参考になりました。'),
    (2, 3, 'この動画が本当に気に入りました！'),
    (2, 1, '説明がわかりやすいです！'),
    (3, 2, 'コンテンツが素晴らしかったです！');

-- tagsテーブル
INSERT INTO tags (name) VALUES
    ('教育'),
    ('エンターテイメント'),
    ('チュートリアル'),
    ('科学'),
    ('技術');

-- video_tagsテーブル
INSERT INTO video_tags (video_id, tag_id) VALUES
    (1, 1),
    (1, 3),
    (2, 2),
    (2, 4),
    (3, 5);

-- reference_itemsテーブル
INSERT INTO reference_items (title, url) VALUES
    ('参考資料1', 'https://zenn.dev/k41531/articles/828e81c86560ae'),
    ('参考資料2', 'https://zenn.dev/decl/articles/8d5c80a2331be0'),
    ('参考資料3', 'https://qiita.com/ochimusha01/items/7f6685a1034fee00c6bd');

-- video_referencesテーブル
INSERT INTO video_references (video_id, reference_id) VALUES
    (1, 1),
    (2, 2),
    (3, 3),

