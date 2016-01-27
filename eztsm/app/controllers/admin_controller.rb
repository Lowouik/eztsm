class AdminController < ApplicationController
  before_filter :admin_only

  private
  def admin_only
    redirect_to '/' unless current_user.is_admin
  end
end
