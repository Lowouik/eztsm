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
      // Fetch node properties then display them
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
      // Customize some fields that can be modified through ajax requests
      // Let's start with the node name
      renameNodeButton = ' <button type="button" class="btn btn-xs btn-default has-tooltip" title="Rename" onclick="renameNode(\'' + node[0]['node_name'] + '\')"><span class="glyphicon glyphicon-option-horizontal"></span></button>'
      $('#viewNodeModalBodyMain-node_name').append(renameNodeButton) 

    },
    error: function() {
      $('#viewNodeModalBodyErrors').html('<span class="text-danger">An error occured while trying to retrieve node informations. Please try again later.</span>')
    }
  });
  $('#viewNodeModal').modal({
    show: true
  });
}

function renameNode(currentNode){
  $('#viewNodeModalBodyMain-node_name').html('<input id="viewNodeModalBodyMain-node_name-inputField" class="string required" style="width:' + (currentNode.length + 1) * 9 + 'px" type="text" value="' + currentNode + '"/>' + renameNodeButton + ' <button class="btn btn-xs btn-success has-tooltip" title="OK" onclick="#"><span class="glyphicon glyphicon-ok-circle"></span></button> <button class="btn btn-xs btn-danger has-tooltip" title="Cancel" onclick="cancelNodeRenaming(\'' + currentNode + '\')"><span class="glyphicon glyphicon-remove-circle"></span></button>')
}

function cancelNodeRenaming(node){
  $('#viewNodeModalBodyMain-node_name').html(node + renameNodeButton)
  $('#viewNodeModalBodyErrors').html('')
}
