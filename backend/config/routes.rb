Rails.application.routes.draw do
  namespace :api do
    resources :users, only: [:create]
    post "login", to: "sessions#create"
  end
end