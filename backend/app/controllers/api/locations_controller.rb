class Api::LocationsController < ApplicationController
    before_action :set_location, only: %i[show update destroy]

    def index
    locations = Location.all.order(:id).map do |location|
        location.attributes.merge(itemCount: location.items.count)
    end
    render json: locations
    end
    
    def show
        render json: @location
    end

    def create
        location = Location.new(location_params)
        location.item_count ||= 0
        if location.save
        render json: location, status: :created
        else
        render json: { errors: location.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update
        if @location.update(location_params)
        render json: @location
        else
        render json: { errors: @location.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        @location.destroy
        head :no_content
    end

    private

    def set_location
        @location = Location.find(params[:id])
    end

    def location_params
        params.require(:location).permit(:name, :color)
    end
end