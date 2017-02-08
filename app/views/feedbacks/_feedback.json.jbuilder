json.extract! feedback, :id, :code, :desc, :photo, :error, :created_at, :updated_at
json.url feedback_url(feedback, format: :json)