function meet_me_halfway(x)
{
  x.preventDefault();
  geocode();
}


function geocode()
{
  console.log(addresses);
  var token = $('#yelp_form input[name=authenticity_token]').val();
  $.ajax({
      dataType: 'json',
      type: "get",
      url: "/home/geocode",
      data: { authenticity_token:token, addresses:addresses }
    }).done( yelp_search );
  return false;
}

function yelp_search(x)
{
  var yelp_search_term = $('#yelp_search_query').val();
  var token = $('#yelp_form input[name=authenticity_token]').val();
  $.ajax({
    dataType: 'json',
    type: 'get',
    url: "/home/yelp_search",
    data: {authenticity_token:token, 'search[yelp_search]':yelp_search_term, 'search[geo_center]':x}
  }).done(process);
  return false;
}

function process(x)
{
  $('#yelp_search').addClass('hide');
  _.each(x.businesses, print_business_name)
}

function print_business_name(business)
{
  var holder = $('<p>');
  holder.text(business.name);
  $('body').append(holder);
}