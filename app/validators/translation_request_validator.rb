class TranslationRequestValidator < ActiveModel::Validator
  def validate(translation_request)
    if translation_request.original_language == translation_request.converted_language
      translation_request.errors[:languages] << "languages cannot be the same"
    end
  end
end
