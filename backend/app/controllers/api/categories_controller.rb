class Api::CategoriesController < ApplicationController
    before_action :set_category, only: %i[show update destroy]

    def index
    categories = Category.all.order(:id).map do |category|
        category.attributes.merge(itemCount: category.items.count)
    end
    render json: categories
    end
    
    def show
        render json: @category
    end

    def create
        category = Category.new(category_params)
        category.item_count ||= 0
        if category.save
        render json: category, status: :created
        else
        render json: { errors: category.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update
        if @category.update(category_params)
        render json: @category
        else
        render json: { errors: @category.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        @category.destroy
        head :no_content
    end

    private

    def set_category
        @category = Category.find(params[:id])
    end

    def category_params
        params.require(:category).permit(:name, :color)
    end
end