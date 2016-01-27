class User < ActiveRecord::Base

  has_secure_password
    
  validates_presence_of :password_digest, :login
  validates :login, :uniqueness => { :case_sensitive => false }
  validates :email, :allow_blank => true, :uniqueness => { :case_sensitive => false }
end
