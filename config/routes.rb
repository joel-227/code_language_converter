Rails.application.routes.draw do
  get 'translations/new'
  get 'sandbox', to: "pages#sandbox"
  devise_for :users
  root to: 'pages#home'
  resources :translation_requests, only: [:new, :create, :index, :show] do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
    resources :translations, only: [:new, :create]
  end
end

