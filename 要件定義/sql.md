```mermaid
erDiagram
    users ||--o{ videos : "作成"
    users ||--o{ likes : "付ける"
    users ||--o{ comments : "投稿"
    videos ||--o{ likes : "受け取る"
    videos ||--o{ comments : "持つ"
    videos ||--o{ video_tags : "持つ"
    videos ||--o{ video_references : "持つ"
    tags ||--o{ video_tags : "関連付け"
    reference_items ||--o{ video_references : "関連付け"

    users {
        BIGINT id PK
        UUID auth_id FK
        TEXT username
        TEXT avatar
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    videos {
        BIGINT id PK
        BIGINT user_id FK
        TEXT title
        TEXT description
        TEXT video_url
        TEXT manim_url
        TEXT thumbnail_url
        BIGINT views
        TEXT article_url
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    likes {
        BIGINT user_id PK,FK
        BIGINT video_id PK,FK
        TIMESTAMP created_at
    }

    comments {
        BIGINT id PK
        BIGINT user_id FK
        BIGINT video_id FK
        TEXT content
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    tags {
        BIGINT id PK
        TEXT name
    }

    video_tags {
        BIGINT video_id PK,FK
        BIGINT tag_id PK,FK
        TIMESTAMP created_at
    }

    reference_items {
        BIGINT id PK
        TEXT title
        TEXT url
        TIMESTAMP created_at
    }

    video_references {
        BIGINT video_id PK,FK
        BIGINT reference_id PK,FK
        TIMESTAMP created_at
    }