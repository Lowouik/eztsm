require 'rails-settings-ui'

#= Application-specific
#
# # You can specify a controller for RailsSettingsUi::ApplicationController to inherit from:
RailsSettingsUi.parent_controller = '::AdminController' # default: '::ApplicationController'
#
# # Render RailsSettingsUi inside a custom layout (set to 'application' to use app layout, default is RailsSettingsUi's own layout)
RailsSettingsUi::ApplicationController.layout 'application'

RailsSettingsUi.setup do |config|
 config.settings_class = "Setting"
 config.ignored_settings = [:initialized_on]
end

Rails.application.config.to_prepare do
  # If you use a *custom layout*, make route helpers available to RailsSettingsUi:
  RailsSettingsUi.inline_main_app_routes!
 
  # Note initialization date so we won't anymore display settings by default
  RailsSettingsUi::ApplicationController.module_eval do
    after_action :update_initialized_on

    private
    def update_initialized_on
      Setting.initialized_on ||= Time.now
    end
  end
end
