class Admin::UsersController < ApplicationController
  def index
    @users = User.paginate(:page => params[:page])
    @user = User.new
  end

  def edit
    @user = User.find(params[:id])
  end

  def create
    @user = User.new(user_params)
    if @user.save
      respond_to do |format|
        format.js {
          flash[:success] = "User #{@user.login} successfully created"
          render 'admin/users/user_modals_response'
        }
      end
    else
      respond_to do |format|
        format.js { render 'admin/users/user_modals_response' }
      end
    end
  end

  def update
    @user = User.find(params[:id])
    params[:user].delete(:password) if params[:user][:password].blank?
    puts params
    puts "user params : " + user_params.to_s
    if @user.update_attributes(user_params)
      respond_to do |format|
        format.js { 
          flash[:success] = "User #{@user.login} successfully updated"
          render 'admin/users/user_modals_response'
        }
      end
    else
      respond_to do |format|
        format.js { render 'admin/users/user_modals_response' }
      end
    end
  end

  private

  def user_params
    params.require(:user).permit(:login, :email, :description, :password, :is_admin)
  end
end

