class FaceSetsController < ApplicationController
  before_action :set_face_set, only: [:show, :edit, :update, :destroy]

  # GET /face_sets
  # GET /face_sets.json
  def index
    @face_sets = FaceSet.all
  end

  # GET /face_sets/1
  # GET /face_sets/1.json
  def show
  end

  # GET /face_sets/new
  def new
    @face_set = FaceSet.new
  end

  # GET /face_sets/1/edit
  def edit
  end

  # POST /face_sets
  # POST /face_sets.json
  def create
    @face_set = FaceSet.new(face_set_params)

    respond_to do |format|
      if @face_set.save
        format.html { redirect_to @face_set, notice: 'Face set was successfully created.' }
        format.json { render :show, status: :created, location: @face_set }
      else
        format.html { render :new }
        format.json { render json: @face_set.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /face_sets/1
  # PATCH/PUT /face_sets/1.json
  def update
    respond_to do |format|
      if @face_set.update(face_set_params)
        format.html { redirect_to @face_set, notice: 'Face set was successfully updated.' }
        format.json { render :show, status: :ok, location: @face_set }
      else
        format.html { render :edit }
        format.json { render json: @face_set.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /face_sets/1
  # DELETE /face_sets/1.json
  def destroy
    @face_set.destroy
    respond_to do |format|
      format.html { redirect_to face_sets_url, notice: 'Face set was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_face_set
      @face_set = FaceSet.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def face_set_params
      params.require(:face_set).permit(:token)
    end
end
