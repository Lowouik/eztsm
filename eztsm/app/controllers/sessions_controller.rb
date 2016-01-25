class SessionsController < ApplicationController
  skip_before_filter :must_be_logged_in_and_app_initialized, :only => [:new, :create, :destroy]

  def new
  end

  def create
    user = User.find_by_login(params[:sessions][:login])
    if user && user.authenticate(params[:sessions][:password])
      session[:user_id] = user.id
      flash[:success] = 'Successfully logged in'
      redirect_to root_url
    else
      flash[:danger] = 'Invalid login or password'
      redirect_to login_path
    end
  end

  def destroy
    session[:user_id] = nil
    flash[:success] = 'Logged out.'
    redirect_to root_url
  end
end
