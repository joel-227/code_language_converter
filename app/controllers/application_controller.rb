class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :authenticate_user!
  skip_before_action :authenticate_user!, only: [:landing, :home]

  private

  def configure_permitted_parameters

    devise_parameter_sanitizer.permit(:sign_up, keys: [:avatar_url])
    devise_parameter_sanitizer.permit(:account_update, keys: [:email, :image_url])

  end

end
