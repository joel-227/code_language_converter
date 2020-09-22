require 'test_helper'

class TranslationRequestsControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get translation_requests_new_url
    assert_response :success
  end

  test "should get create" do
    get translation_requests_create_url
    assert_response :success
  end

end
