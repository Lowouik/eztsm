class Event < ActiveRecord::Base
  belongs_to :user

  scope :by_user, lambda {|user_login| where('users.login = ?', user_login).joins(:user)}
  scope :after, -> after { where("timestamp >= ?", after) }
  scope :before, -> before { where("timestamp <= ?", before.to_date + 1.day) }
end
