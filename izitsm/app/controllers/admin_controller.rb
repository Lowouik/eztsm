class AdminController < ApplicationController
  before_filter :admin_only

  private
  def admin_only
    redirect_to login_path unless current_user.is_admin
  end
end
