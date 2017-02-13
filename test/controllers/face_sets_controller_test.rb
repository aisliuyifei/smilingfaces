require 'test_helper'

class FaceSetsControllerTest < ActionController::TestCase
  setup do
    @face_set = face_sets(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:face_sets)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create face_set" do
    assert_difference('FaceSet.count') do
      post :create, face_set: { token: @face_set.token }
    end

    assert_redirected_to face_set_path(assigns(:face_set))
  end

  test "should show face_set" do
    get :show, id: @face_set
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @face_set
    assert_response :success
  end

  test "should update face_set" do
    patch :update, id: @face_set, face_set: { token: @face_set.token }
    assert_redirected_to face_set_path(assigns(:face_set))
  end

  test "should destroy face_set" do
    assert_difference('FaceSet.count', -1) do
      delete :destroy, id: @face_set
    end

    assert_redirected_to face_sets_path
  end
end
