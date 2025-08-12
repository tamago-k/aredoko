class Api::TagsController < ApplicationController
    before_action :set_tag, only: %i[show update destroy]

    def index
        tags = Tag.all.map do |tag|
            tag.attributes.merge(itemCount: tag.item_count)
        end
        render json: tags
    end

    def show
        render json: @tag
    end

    def create
        tag = Tag.new(tag_params)
        tag.item_count ||= 0
        if tag.save
        render json: tag, status: :created
        else
        render json: { errors: tag.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update
        if @tag.update(tag_params)
        render json: @tag
        else
        render json: { errors: @tag.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        @tag.destroy
        head :no_content
    end

    private

    def set_tag
        @tag = Tag.find(params[:id])
    end

    def tag_params
        params.require(:tag).permit(:name)
    end
end