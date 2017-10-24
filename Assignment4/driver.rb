require 'sinatra'
require 'sinatra/json'
require 'sequel'

#will be called on start to create a table of records
configure do
    DB = Sequel.connect('sqlite://Records.db')

    DB.create_table? :records do
        primary_key :id
        String :name
        Int :score
        DateTime :date
    end

    require_relative 'record'
    
end

#handles the initial request for the page
get '/' do

    #default display of records sorted by highest to lowest score
    @retrieved_data = Record.reverse_order(:score)

    #render the template in the view folders
    erb :welcome
end

#call to the server that loads the game template
get '/start_game' do

    erb :game
end

#call to the server that loads the settings template
get '/settings' do

    erb :settings
end

#call to the server that creates a record from the game
post '/record' do

    records = DB[:records]

    records.insert(:name => params[:name], :score => params[:score], :date => DateTime.now)
end

#call to the server that sends back all of the records from highest score to lowest score and reloads the template
get '/records_all_time' do
    @retrieved_data = Record.reverse_order(:score)

    erb :welcome
end

#call to the server that sends back all of the records from most recent to oldest date and reloads the template
get '/records_most_recent' do

    @retrieved_data = Record.reverse_order(:date)

    erb :welcome
end

#call to the server that sends back all of the records for a single person from highest to lowest score and reloads the template
get '/records_by_name/:name' do |name|

    @retrieved_data = Record.where(:name => name).reverse_order(:score)

    erb :welcome
end