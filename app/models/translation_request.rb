class TranslationRequest < ApplicationRecord
  include ActiveModel::Validations

  belongs_to :user
  has_many :translations

  validates :content, presence: true
  validates_with TranslationRequestValidator

end
