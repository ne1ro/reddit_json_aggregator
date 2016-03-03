'use strict';

// Convert form to JSON params
function convertFormToJson(form){
  var array = $(form).serializeArray();
  var json = {};

  $.each(array, function() {
    json[this.name] = this.value || '';
  });

  return json;
}

// Send async request to sort
$('#sort_btn').click(function() {
  $.ajax({
    type: 'POST',
    url: '/sort',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify(convertFormToJson($('#data'))),
    dataType: 'json',
    success: function(data) {
      $('#result').text(data.result);
    }
  });
});
