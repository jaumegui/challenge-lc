Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, constraints: { format: :json }, defaults: { format: :json } do
    
    
    resources :items, only: %i(index show destroy) do
        collection do 
          get '/packup/:id', to: 'items#packup'
          get '/pickup/:id', to: 'items#pickup'
          get '/checkup/:id', to: 'items#checkup'
      end
    end

    post 'items/:id/:item_id/:poste_id', to: 'items#create'

    resources :operators, only: %i(index show) do
      collection do 
        delete '/poste/:id', to: 'operators#destroy'
      end
    end
    
    resources :postes, only: %i(index show) do 
        collection do 
          get '/:id/status/:item', to: 'postes#status'
      end
    end

    get '/products', to: 'products#index'
  end
end
