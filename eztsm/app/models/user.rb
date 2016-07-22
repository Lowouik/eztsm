class User < ActiveRecord::Base

  has_many :events
  has_secure_password
    
  validates_presence_of :password_digest, :login
  validates :password, presence: { on: create }, length: { minimum: 8 }, if: :password_digest_changed?
  validates :login, :uniqueness => { :case_sensitive => false }
  validates :email, :allow_blank => true, :uniqueness => { :case_sensitive => false }
end
