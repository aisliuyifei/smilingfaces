def retryable(options = {}, &block)
  opts = { :tries => 1, :on => Exception, :interval => 0 }.merge(options)
  retry_exception, retries, interval = opts[:on], opts[:tries], opts[:interval]
  begin
    return yield
  rescue retry_exception
    sleep(interval) if interval > 0
    if (retries -= 1) > 0
      retry
    end
  end
  yield
end

namespace :faces do
  task :init  => :environment do 
    (0..67).each do |x|
      params = {
        "api_key"=>"WkJOVENIkOOA3xyGwI0eTYu1WEnUxO-C",
        "api_secret"=>"f_2DV_rlyu7d3jprneXZl7dn_fGXG-eG",
        "image_url"=>"http://sf.diosapp.com.cn/SmilingFaces/www/images/#{x}.jpg"
      }
      uri = URI.parse("https://api-cn.faceplusplus.com/facepp/v3/detect")
      res = Net::HTTP.post_form(uri, params)   
      retryable(:tries => 3, :on =>Exception,:interval => 1 ) do 
          body = JSON.parse res.body
          token = body["faces"][0]["face_token"]
          face = Face.new
          face.u_id=x
          face.token = token
          face.save
          puts face.u_id
      end
    end
  end
  
  task :new_set  => :environment do
    params = {
      "api_key"=>"WkJOVENIkOOA3xyGwI0eTYu1WEnUxO-C",
      "api_secret"=>"f_2DV_rlyu7d3jprneXZl7dn_fGXG-eG"
    }
    uri = URI.parse("https://api-cn.faceplusplus.com/facepp/v3/faceset/create")
    res = Net::HTTP.post_form(uri, params)   
    retryable(:tries => 3, :on =>Exception,:interval => 1 ) do 
        body = JSON.parse res.body
        token = body["faceset_token"]
        faceset = FaceSet.new
        faceset.token = token
        faceset.save
        puts faceset.id
    end
  end
  
  task :add_faces
    tokens = Face.all.collect{|t|;t.token}
    while tokens.count>0
      a=""
      5.times do 
       a+=tokens.pop.to_s+","
      end
      a.chop!
      params = {
        "api_key"=>"WkJOVENIkOOA3xyGwI0eTYu1WEnUxO-C",
        "api_secret"=>"f_2DV_rlyu7d3jprneXZl7dn_fGXG-eG",
        "faceset_token"=>FaceSet.last.token,
        "face_tokens"=>a
      }
      uri = URI.parse("https://api-cn.faceplusplus.com/facepp/v3/faceset/addface")
      res = Net::HTTP.post_form(uri, params)   
      retryable(:tries => 3, :on =>Exception,:interval => 1 ) do 
          body = JSON.parse res.body
          count = body["face_count"]
          puts count
      end
    end
  end
  
  task :compare
    img_url="http://sf.diosapp.com.cn/SmilingFaces/www/images/9198317491505172.jpg"
  
    params = {
      "api_key"=>"WkJOVENIkOOA3xyGwI0eTYu1WEnUxO-C",
      "api_secret"=>"f_2DV_rlyu7d3jprneXZl7dn_fGXG-eG",
      "image_url"=>img_url,
      "faceset_token"=>FaceSet.last.token
    }
    
    uri = URI.parse("https://api-cn.faceplusplus.com/facepp/v3/search")
    res = Net::HTTP.post_form(uri, params)   
    body = JSON.parse res.body
    
    #
    arr = ["朱吉成", "陈与书", "邢毅珏", "陈子妍", "杨紫逸", "范天煜", "王佳怡", "傅家欣", "奚铭豪", "王乙萱", "王绍隐", "杨伯文", "刘闵杰", "曾可颐", "尚佳琪", "周紫依", "祝越", "刘毅舟", "闵涵鋆", "艾家宝", "易予佳", "王子曦", "侯霁芸", "康子怡", "张安慧", "伍睿", "吴锐", "张子涵", "刘嘉毅", "胡艾妮", "黄雨晨", "段存瀚", "唐骏扬", "张书祯", "张华杰", "金博文", "曹艺欣", "彭旭崑", "左米玉", "瞿恺忻", "严诗雨", "罗妍晖", "陆俊屹", "路晨曦", "邹骏晖", "孙姮", "张盛宇", "朱辰昊", "郝郁郁", "潘圣琦", "柳子涵", "李涵", "王奕婷", "宋烨晨", "严永恒", "韦佳仪", "李俊逸", "贾梓越", "鞠于欣", "黄智俊", "符蓉", "顾筱语", "郑宇昂", "管奕凌", "常灏缤", "白漪洋", "邬俊逸", "康宁"]
    puts arr[Face.find_by_token(body["results"][0]["face_token"]).u_id]
    
  end
  
  
end
