Rails.application.routes.draw do
  get 'likes/create'
  get 'my_requests/index'
  get 'translations/new'
  get 'sandbox', to: "pages#sandbox"
  get 'landing', to: "pages#landing"
  get 'home', to: "pages#home"
  devise_for :users
  root to: 'pages#landing'
  resources :my_requests, only: [:index]
  resources :translation_requests, only: [:new, :create, :index, :show] do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
    resources :translations, only: [:new, :create]
  end

  resources :translation, only: [:show] do
    resource :likes, only: [:create, :destroy]
  end
end

