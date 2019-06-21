Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, constraints: { format: :json }, defaults: { format: :json } do
    resources :operators, only: %i(index show destroy)
    resources :postes, only: %i(index show) do 
        collection do 
          get '/:id/status/:item', to: 'postes#status'
      end
    end
  end
end
