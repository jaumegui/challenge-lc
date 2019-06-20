module Api
  class PostesController < ApplicationController
    def index
      sleep 1 # Simulate loading time
      @postes = Poste.all
    end
  end
end
