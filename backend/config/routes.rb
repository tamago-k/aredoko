Rails.application.routes.draw do
  namespace :api do
    resources :users, only: [:create]
    post "login", to: "sessions#create"
    resources :items, only: [:index, :create, :show, :update, :destroy]
    resources :categories
    resources :tags
    resources :locations
  end
end