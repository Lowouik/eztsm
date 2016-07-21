class PasswordResetsController < ApplicationController

  def new
    puts flash[:notice]
    puts flash[:error] 
    @user = User.find(session[:user_id])
  end

  def edit
    @user = User.find(session[:user_id])
    if params[:user][:password] != params[:user][:password_confirmation]
      flash.now[:danger] = 'Password and confirmation password do not match'
      render action: 'new'
    elsif params[:user][:password].empty?
      flash.now[:danger] = 'Password cannot be blank'
      render action: 'new'  
    elsif @user.update_attributes(params.require(:user).permit(:password))
      flash[:success] = 'Your password has been successfully updated'
      redirect_to root_url
    else
      flash[:danger] = 'Unable to update your password: '
      render action: 'new'
    end
  end 
end
