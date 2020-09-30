# Preview all emails at http://localhost:3000/rails/mailers/user_mailer
class UserMailerPreview < ActionMailer::Preview
  def first_translation_email
    UserMailer.with(user: User.first).first_translation_email
  end
end
