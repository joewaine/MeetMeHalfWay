var addresses = [];

$(function(){
  $('#submit_num').click(display_addresses);
  $('#submit_addresses').click(collect_addresses);
  $('#search_yelp').click(meet_me_halfway)
});



// STEP 1 -> Hide/Show appropriate form & show X number of address fields
function display_addresses(x)
{
  x.preventDefault();
  $('#num_locations').addClass('hide');
  $('#addresses').removeClass('hide');


  for (var i = 0; i < $('input#num_locations').val(); i++)
  {

    var address_input = $("<input class='addresses' name='addresses' placeholder='Address' type='text'><br>");
    $('#address_form div').after(address_input);
    // address_input.insertAfter('#address_form > div');
  }
}

// STEP 2 -> add each address to global variable 'addresses' array
function collect_addresses(x)
{
  x.preventDefault();
  _.each($('.addresses'), add_address_to_array);
  show_display_options();
}

// STEP 2.5
function add_address_to_array(address)
{
  addresses.push($(address).val());
}

// STEP 3-> hide addresses form, display
function show_display_options()
{
  $('#address_form').addClass('hide');
  $('#yelp_search').removeClass('hide');
}