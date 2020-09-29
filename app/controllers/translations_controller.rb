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
    @translation.language = @translation_request.converted_language
    if @translation.save
      @translation.user.kudos_points += @translation.content.split(/\r\n/).count
      @translation.user.save
      UserMailer.with(user: @translation_request.user )
                .first_translation_email
                .deliver_later
      flash[:notice] = "Thanks for translating, you just won #{@translation.content.split(/\r\n/).count} points"
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


