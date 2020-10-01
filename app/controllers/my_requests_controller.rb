class MyRequestsController < ApplicationController
  def index
    @translation_requests = TranslationRequest.where(user: current_user).order("translation_requests.created_at DESC")
  end
end
