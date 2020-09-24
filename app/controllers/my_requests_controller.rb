class MyRequestsController < ApplicationController
  def index
    @translation_requests = TranslationRequest.where(user: current_user)
  end
end
