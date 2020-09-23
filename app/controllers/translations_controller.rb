class TranslationsController < ApplicationController
  def new
    @translation_request = TranslationRequest.find(params[:translation_request_id])
    @translation = Translation.new
  end

  def create
    @translation = Translation.new(translation_params)
    @translation.user = current_user
    @translation_request = TranslationRequest.find(params[:translation_request_id])
    @translation.translation_request = @translation_request
    if @translation.save
      flash[:notice] = "Your translation has been submitted"
      redirect_to translation_request_path(@translation_request)
    else
      flash[:notice] = "Sorry, something went wrong"
      render :new
    end
  end

  private

  def translation_params
    params.require(:translation).permit(:content)
  end
end


