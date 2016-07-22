class Admin::EventsController < ApplicationController
  has_scope :by_user
  has_scope :after
  has_scope :before

  def index
    @by_user = params[:by_user]
    @after = params[:after]
    @before = params[:before]
    @events = apply_scopes(Event).all.paginate(:page => params[:page], :per_page => 20).order(timestamp: :desc)
    #    @events = Event.paginate(:page => params[:page], :per_page => 20).order(timestamp: :desc)
  end
end
