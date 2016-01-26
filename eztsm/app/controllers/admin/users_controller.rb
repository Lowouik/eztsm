class Admin::UsersController < ApplicationController
  def index
    @users = User.paginate(:page => params[:page])
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    params[:user].delete(:password) if params[:user][:password].blank?
    puts params
    puts "user params : " + user_params.to_s
    if @user.update_attributes(user_params)
     respond_to do |format|
        format.html { 
        flash[:success] = "User params[:id] updated"
        redirect_to admin_user_path
        }
        format.json { render json: @user, status: :updated, location: @user }
      end
    else
      respond_to do |format|
        format.html {
        flash[:error] = "Unable to update user"
        @users = User.paginate(:page => params[:page])
        render action: "index" 
        }
        format.json { render json: @update.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  def user_params
    params.require(:user).permit(:login, :email, :description, :password, :is_admin)
  end
end

