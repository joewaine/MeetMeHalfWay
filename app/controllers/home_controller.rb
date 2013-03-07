class HomeController < ApplicationController
  def index
  end

  def geocode
    addresses = []
    params[:addresses].each do |address|
      addresses << address
    end
    addresses.map! { |address| Geocoder.search(address).first }

    addresses_coordinates = []
    addresses.each do |address|
      addresses_coordinates << [address.latitude, address.longitude]
    end
    geographic_center = Geocoder::Calculations.geographic_center(addresses_coordinates)
    render :json => geographic_center

  end

  def yelp_search
    location = (params[:search][:geo_center]).join(',')
    yelp_search = (params[:search][:yelp_search]).split.join('+')

    consumer_key = 'LmFQc5uB_C8JT6H68unMhw'
    consumer_secret = 'lMXuoP7iXl2RtP_sLQp-1VQ0140'
    token = 'EPQjlIeYYjPSTjWwzuBhQ6pAEY2VFcnY'
    token_secret = '8U5nThr7yTmj6ULA9yd4AF-zImI'

    api_host = 'api.yelp.com'

    consumer = OAuth::Consumer.new(consumer_key, consumer_secret, {:site => "http://#{api_host}"})
    access_token = OAuth::AccessToken.new(consumer, token, token_secret)
    path = "/v2/search?term=#{yelp_search}e&sort=2&radius_filter=8000&ll=#{location}"
    result = access_token.get(path).body
    render :json => result
  end
end