Rails.application.routes.draw do
  mount RailsSettingsUi::Engine, at: 'admin/settings'
  get 'home/index'
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'home#index'

  get 'login' => 'sessions#new', :as => 'login'
  get 'logout' => 'sessions#destroy', :as => 'logout'
  get 'sessions/new'
  post 'sessions' => 'sessions#create'

  get 'change_password' => 'password_resets#new'
  patch 'change_password' => 'password_resets#edit'

  get 'nodes' => 'nodes#index'
  post 'nodes' => 'nodes#create'
  get 'domains' => 'domains#index'
  get 'optsets' => 'optsets#index'
  get 'schedules' => 'schedules#index'
  patch 'schedules' => 'schedules#update'
  get 'active_schedules' => 'schedules#list_by_node'

  get 'node' => 'nodes#view'
  post 'node/rename' => 'nodes#rename'
  post 'node/update' => 'nodes#update'
  delete 'node' => 'nodes#delete'

  get 'reports/top50' => 'reports#get_top_50'
  get 'reports/orphaned_nodes' => 'reports#nodes_without_schedules'
  get 'reports/activity' => 'reports#last_7_days_activity'
  get 'reports/stgpools' => 'reports#stgpools_index'
  get 'reports/stgpool' => 'reports#show_stgpool'

  namespace :admin do
    get 'events' => 'events#index'
    get 'settings' => 'settings#index'
    resources 'users', :except => [ :show, :new ]
  end
  # Example of regular route:
    #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
