class TranslationRequestsController < ApplicationController
  def new
    @translation_request = TranslationRequest.new
  end

  def create
    @translation_request = TranslationRequest.new(translation_request_params)
    @translation_request.user = current_user
    if @translation_request.save
      redirect_to translation_requests_path
    else
      render :new
    end
  end

  def index
    @translation_requests = TranslationRequest.all

  end

  def show
  end

  private

  def translation_request_params
    params.require(:translation_request).permit(:original_language, :converted_language, :content)
  end

end
