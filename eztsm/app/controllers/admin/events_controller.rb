class Admin::EventsController < ApplicationController
  def index
    @events = Event.order(timestamp: :desc)
  end
end
