class UserMailer < ApplicationMailer
  default from: 'community@codeconverter.com'

  def first_translation_email
    @user = params[:user]
    mail(to: @user.email, subject: "Someone translated your request!")
  end

end
