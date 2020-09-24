require 'test_helper'

class MyRequestsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get my_requests_index_url
    assert_response :success
  end

end
