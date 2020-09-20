class Translation < ApplicationRecord
  belongs_to :user
  belongs_to :translation_request
end
