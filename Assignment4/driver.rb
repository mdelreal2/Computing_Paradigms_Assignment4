require 'sinatra'
require 'sinatra/json'
require 'sequel'
require_relative 'player'

#create an in memory sqlite database
DB = Sequel.sqlite

#create a table with following items in the database if it doesnt already exist
DB.create_table :items do

    primary_key :id
    String :name
    Int :score
    DateTime :date

end

#handles the initial request for the page
get '/' do

    #use this to grab the leaderboards
    #
    #

    #render the template in the view folders
    erb :welcome
end

get '/start_game' do

    erb :game
end

#handles request to add new player data (and also returns all the other players)
#this is a post not a get, posts are used to send data to the server
post '/records_all_time' do

#should move this to another post and set once the game ends 
    #create a new Player with the data from the browser
    Player.create(:name => params[:name],
                  :score => params[:score],
                  :date => DateTime.now)

    #get all the records and turn each into a hash and store it in an array
    records = Player.reverse_order(:score).map do |player|
        {:name => player.name, :score => player.score}
    end

    #turn the array of hashes into json
    return json records

end