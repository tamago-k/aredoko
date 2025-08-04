# app/controllers/api/items_controller.rb
module Api
    class ItemsController < ApplicationController
        before_action :authenticate_user!

        before_action :set_item, only: [:show, :update, :destroy]

        # GET /api/items
        def index
            @items = Item.all
            render json: @items
        end

        # GET /api/items/:id
        def show
            render json: @item
        end

        # POST /api/items
        def create
            category_id = params[:category]
            category_id = nil if category_id.blank? || category_id == "none"

            location_id = params[:location]
            location_id = nil if location_id.blank? || location_id == "none"

            @item = Item.new(
                name: params[:name],
                description: params[:description],
                category_id: category_id,
                location_id: location_id,
                # tags: params[:tags] || [],
                owned_by_user_id: current_user.id
            )

            if @item.save
                render json: @item, status: :created
            else
                render json: { errors: @item.errors.full_messages }, status: :unprocessable_entity
            end
        end

        # PATCH/PUT /api/items/:id
        def update
            if @item.update(item_params)
                render json: @item
            else
                render json: { errors: @item.errors.full_messages }, status: :unprocessable_entity
            end
        end

        # DELETE /api/items/:id
        def destroy
            @item.destroy
            head :no_content
        end

        private

        def set_item
            @item = Item.find(params[:id])
            rescue ActiveRecord::RecordNotFound
            render json: { error: "Item not found" }, status: :not_found
        end

        def item_params
            params.require(:item).permit(:name, :category, :location, :description, :photo_url)
        end

        def authenticate_user!
            token = request.headers["Authorization"]&.split(" ")&.last
            payload = JsonWebToken.decode(token) rescue nil
            @current_user = User.find_by(id: payload["user_id"]) if payload

            render json: { error: "Unauthorized" }, status: :unauthorized and return unless @current_user
        end

        def current_user
            @current_user
        end
    end
end
