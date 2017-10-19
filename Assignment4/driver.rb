require 'sinatra'
require 'sinatra/json'
require 'sequel'


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
    #@retrieved_data = Record.order_by(:score)
    @retrieved_data = Record.reverse_order(:score)

    #render the template in the view folders
    erb :welcome
end

get '/start_game' do

    erb :game
end

get '/settings' do

    erb :settings
end

post '/record' do

    records = DB[:records]

    records.insert(:name => params[:name], :score => params[:score], :date => DateTime.now)
end

get '/records_all_time' do
    @retrieved_data = Record.reverse_order(:score)

    erb :welcome
end

get '/records_most_recent' do

    @retrieved_data = Record.reverse_order(:date)

    erb :welcome
end

get '/records_by_name/:name' do |name|

    @retrieved_data = Record.where(:name => name).reverse_order(:score)

    erb :welcome
end