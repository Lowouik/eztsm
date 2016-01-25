class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_filter :must_be_logged_in_and_app_initialized
  helper_method :current_user

  private
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def must_be_logged_in_and_app_initialized
    if current_user
      unless Setting.initialized_on or params[:controller] == "rails_settings_ui/settings"
        flash[:info] = "First things first. Please take a minute to configure ezTSM."
        redirect_to admin_settings_path
      end
    else
      redirect_to login_path
    end
  end
end
