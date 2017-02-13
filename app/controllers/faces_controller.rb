class FacesController < ApplicationController
  before_action :set_face, only: [:show, :edit, :update, :destroy]

  # GET /faces
  # GET /faces.json
  def index
    @faces = Face.all
  end
  
  def search_by_token
    @face = Face.find_by_token (params[:token])
    @names = ["朱吉成", "陈与书", "邢毅珏", "陈子妍", "杨紫逸", "范天煜", "王佳怡", "傅家欣", "奚铭豪", "王乙萱", "王绍隐", "杨伯文", "刘闵杰", "曾可颐", "尚佳琪", "周紫依", "祝越", "刘毅舟", "闵涵鋆", "艾家宝", "易予佳", "王子曦", "侯霁芸", "康子怡", "张安慧", "伍睿", "吴锐", "张子涵", "刘嘉毅", "胡艾妮", "黄雨晨", "段存瀚", "唐骏扬", "张书祯", "张华杰", "金博文", "曹艺欣", "彭旭崑", "左米玉", "瞿恺忻", "严诗雨", "罗妍晖", "陆俊屹", "路晨曦", "邹骏晖", "孙姮", "张盛宇", "朱辰昊", "郝郁郁", "潘圣琦", "柳子涵", "李涵", "王奕婷", "宋烨晨", "严永恒", "韦佳仪", "李俊逸", "贾梓越", "鞠于欣", "黄智俊", "符蓉", "顾筱语", "郑宇昂", "管奕凌", "常灏缤", "白漪洋", "邬俊逸", "康宁"]
    respond_to do |format|
      if @face
        format.json { render json:{"result"=>1,"name"=>@names[@face.u_id]}  }
      else
        format.json { render json:{"result"=>0,"name"=>"未识别"} }
      end
    end
  end

  # GET /faces/1
  # GET /faces/1.json
  def show
    
  end

  # GET /faces/new
  def new
    @face = Face.new
  end

  # GET /faces/1/edit
  def edit
  end

  # POST /faces
  # POST /faces.json
  def create
    @face = Face.new(face_params)

    respond_to do |format|
      if @face.save
        format.html { redirect_to @face, notice: 'Face was successfully created.' }
        format.json { render :show, status: :created, location: @face }
      else
        format.html { render :new }
        format.json { render json: @face.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /faces/1
  # PATCH/PUT /faces/1.json
  def update
    respond_to do |format|
      if @face.update(face_params)
        format.html { redirect_to @face, notice: 'Face was successfully updated.' }
        format.json { render :show, status: :ok, location: @face }
      else
        format.html { render :edit }
        format.json { render json: @face.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /faces/1
  # DELETE /faces/1.json
  def destroy
    @face.destroy
    respond_to do |format|
      format.html { redirect_to faces_url, notice: 'Face was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_face
      @face = Face.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def face_params
      params.require(:face).permit(:token, :u_id)
    end
end
