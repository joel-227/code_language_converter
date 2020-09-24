module ApplicationHelper
  def code_class(request)
    "language-#{request.original_language}"
  end
end
