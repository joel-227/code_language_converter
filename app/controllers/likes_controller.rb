class LikesController < ApplicationController
  def create
    translation = Translation.find(params['translation_id'])
    translation.likes += 1
    if translation.save
      respond_to do |format|
        format.json { render json: translation.to_json }
      end
    end
  end
end
