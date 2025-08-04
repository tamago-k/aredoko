module Api
  class UsersController < ApplicationController
    def create
      user = User.new(user_params)
      if user.save
        token = JwtService.encode(user_id: user.id)
        render json: { message: "ユーザー登録成功", token: token }, status: :created
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
  end
end