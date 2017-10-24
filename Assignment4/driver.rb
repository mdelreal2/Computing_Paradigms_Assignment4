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

    DB.create_table? :users do
        primary_key :id
        String :user_id
        String :ball_color
        String :background_color
        String :timer_color
        String :menu_background_color
        String :menu_records_color
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

post '/register_user' do

    users = DB[:users]

    user_id_exists = Setting[:user_id => params[:user_id]]

    #if there is not a user id with the given string then create their default settings to run the game
    if user_id_exists.nil?
        users.insert(:user_id => params[:user_id], :ball_color => "white", :background_color => "black", :timer_color => "white", :menu_background_color => "white", :menu_records_color => "black")
    end
end

post '/change_settings' do

    users = DB[:users]

    user_id_exists = Setting[:user_id => params[:user_id]]

    #if there is a user id with the given string then create their default settings to run the game
    if !user_id_exists.nil?
        users.where(:name => params[name]).update(:ball_color => params[:ball_color], :background_color => params[:background_color], :timer_color => params[:timer_color], :menu_background_color => params[:menu_background_color], :menu_records_color => params[:menu_records_color])
    end

end

get '/include_settings' do

    @retrieved_settings = Settings.where(:user_id => params[:user_id])
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