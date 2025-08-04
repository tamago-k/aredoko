class ApplicationController < ActionController::API
  def authenticate_request!
    header = request.headers['Authorization']
    token = header.split(' ').last if header
    decoded = JsonWebToken.decode(token)
    @current_user = User.find_by(id: decoded[:user_id]) if decoded

    render json: { error: 'Not Authorized' }, status: :unauthorized unless @current_user
  end
end
