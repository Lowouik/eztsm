function getNodeNameFromTable(row){
  // Variable declarations and retrieve node name from the first td of the row
  var nodeName = $('td:first', $(row).parents('tr')).text();
  var node = ''

  // Empty fields
  $('#viewNodeModalBodyErrors').html('')
  $('#viewNodeModalBodyMain').html('')

  // Get node description JSON using node name
  $('#viewNodeModalHeader').html(nodeName)
  $.ajax({
    type: "GET",
    dataType: "json",
    url: '/node?node_name=' + nodeName,
    data: node,
    success: function(node){
      for (key in node[0]){
        if (key == 'lastacc_time' || key == 'max_mp_allowed') {
          $('#viewNodeModalBodyMain').append('<hr />')
        }
        $('#viewNodeModalBodyMain').append(
          '<row>' +
            '<div class="col-xs-4">' +
              '<strong>' + key.toUpperCase() + ':</strong> ' +
            '</div>' +
            '<div class="col-xs-8">' +
              '<span id="viewNodeModalBodyMain-' + key + '">' + node[0][key] + '</span>' +
            '</div>' + 
            '<br />' +
          '</row>'
        )
      }
    },
    error: function() {
      $('#viewNodeModalBodyErrors').html('<span class="text-danger">An error occured while trying to retrieve node informations. Please try again later.</span>')
    }
  });
  $('#viewNodeModal').modal({
    show: true
  });
}

