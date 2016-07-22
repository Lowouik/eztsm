class Admin::EventsController < ApplicationController
  def index
    @events = Event.paginate(:page => params[:page], :per_page => 20).order(timestamp: :desc)
  end
end
