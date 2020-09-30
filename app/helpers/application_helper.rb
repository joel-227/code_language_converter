module ApplicationHelper
  def request_highlight(request)
    "language-#{request.original_language}"
  end

  def translation_highlight(request)
    "language-#{request.language}"
  end

  def text_class(language)
    "text-#{language.downcase}"
  end
end
