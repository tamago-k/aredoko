FROM ruby:3.2

# Node と yarn をインストール（JSビルド用）
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get update -qq && \
    apt-get install -y nodejs yarn postgresql-client

# 作業ディレクトリ
WORKDIR /app

# Gemfileを先にコピーして依存解決
COPY ./Gemfile ./Gemfile.lock ./
RUN bundle install

# ソースコード全体をコピー
COPY . .

# ポート開放 & APIモードでRails起動
EXPOSE 3001
CMD ["rails", "server", "-b", "0.0.0.0", "-p", "3001"]