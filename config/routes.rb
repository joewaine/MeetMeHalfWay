Meetmehalfway::Application.routes.draw do

  root :to => 'home#index'
  resources :home do
    collection do
      get :geocode
      get :yelp_search
    end
  end

end