require 'sinatra'
require 'sinatra/json'
require 'sequel'


configure do
    DB = Sequel.connect('sqlite://Records.db')
    require_relative 'record'

    DB.create_table? :records do
        primary_key :id
        String :name
        Int :score
    end
    
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

post '/record' do

    records = DB[:records]

    records.insert(:name => params[:name], :score => params[:score])

    print_all_records

end

get '/records_all_time' do
    @retrieved_data = Record.order_by(:score)

    erb :welcome
end

def print_all_records

    records = DB[:records]
    
    records.all.each do |record|
        puts "Player: #{record[:name]} Score: #{record[:score]}"
    end

end