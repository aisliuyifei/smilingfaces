class FaceSet < ActiveRecord::Base
  validates_presence_of :token, :message => 'Token不得为空。'
  
end
