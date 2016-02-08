function getNodeNameFromTable(row){
  // Variable declarations and retrieve node name from the first td of the row
  var nodeName = $('td:first', $(row).parents('tr')).text();
  var node = ''
    //
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
      $('#viewNodeModalBodyMain-node_name').append(' <button type="button" id="viewNodeModalBodyMain-node_name-renameNodeButton" class="btn btn-xs btn-default has-tooltip" title="Rename" onclick="prepareNodeRenaming(\'' + node[0]['node_name'] + '\')"><span class="glyphicon glyphicon-option-horizontal"></span></button>') 
      // domain name
      $('#viewNodeModalBodyMain-domain_name').append(' <button type="button" id="viewNodeModalBodyMain-domain_name-changeDomainButton" class="btn btn-xs btn-default has-tooltip" title="Change domain" onclick="prepareDomainChanging(\'' + node[0]['node_name'] + '\', \'' + node[0]['domain_name'] + '\')"><span class="glyphicon glyphicon-option-horizontal"></span></button><span id="viewNodeModalBodyMain-domain_name-changeDomainLoadingIcon" class="glyphicon glyphicon-refresh glyphicon-refresh-animate" style="display:none"></span>')
    },
    error: function(){
      genericError()
    }
  });
  $('#viewNodeModal').modal({
    show: true
  });
}

function prepareNodeRenaming(currentNode){
  var renameNodeInputWidth = (currentNode.length + 1) * 9
  if (renameNodeInputWidth > 290 ) {
    renameNodeInputWidth = 290
  }
  $('#viewNodeModalBodyMain-node_name').html('<input id="viewNodeModalBodyMain-node_name-inputField" class="string required" style="width:' + renameNodeInputWidth + 'px" type="text" value="' + currentNode + '"/> <span id="viewNodeModalBodyMain-node_name-renameNodeLoadingIcon" class="glyphicon glyphicon-refresh glyphicon-refresh-animate" style="display:none"></span><span id="viewNodeModalBodyMain-node_name-renameNodeOKnCancelButtons"> <button class="btn btn-xs btn-success has-tooltip" title="OK" onclick="renameNode(\'' + currentNode + '\')"><span class="glyphicon glyphicon-ok"></span></button> <button class="btn btn-xs btn-danger has-tooltip" title="Cancel" onclick="cancelNodeRenaming(\'' + currentNode + '\')"><span class="glyphicon glyphicon-remove"></span></button></span>')
}

function prepareDomainChanging(nodeName, currentDomain){
// get Domain List
  var result
  domain_list = ''
  $("#viewNodeModalBodyMain-domain_name-changeDomainButton").hide()
  $("#viewNodeModalBodyMain-domain_name-changeDomainLoadingIcon").show()

  $.ajax({
    type: "GET",
    dataType: "json",
    url: '/domains',
    data: result,
    success: function(result){
      if ( result.exit_status != 0 ){
        $('#viewNodeModalBodyErrors').html('<span class="text-danger">An error occured while renaming node. Error details:<br />' + result['output'] + '</span>')
      } else {
        domainsListBox = '<select id="viewNodeModalBodyMain-domain_name-changeDomainSelectBox"> <option> ' + currentDomain + ' </option>'
        result.domains.forEach(function(entry) {
          if ( entry.domain_name != currentDomain ) {
            domainsListBox += ' <option> ' + entry.domain_name + '</option>'
          }
        }) 
        domainsListBox += '</select><span id="viewNodeModalBodyMain-domain_name-changeDomainLoadingIcon" class="glyphicon glyphicon-refresh glyphicon-refresh-animate"style="display:none"></span><span id="viewNodeModalBodyMain-domain_name-changeDomainOKnCancelButtons"> <button class="btn btn-xs btn-success has-tooltip" title="OK" onclick="changeDomain(\'' + nodeName + ', ' + currentDomain + '\')"><span class="glyphicon glyphicon-ok"></span></button> <button class="btn btn-xs btn-danger has-tooltip" title="Cancel" onclick="cancelDomainChanging(\'' + nodeName + '\', \'' + currentDomain + '\')"><span class="glyphicon glyphicon-remove"></span></button></span>'
        $('#viewNodeModalBodyMain-domain_name').html(domainsListBox)
      }
    },
    error: function(){
      genericError()
    },
    complete: function(){
      $("#viewNodeModalBodyMain-domain_name-changeDomainLoadingIcon").hide()
    }
  });

}

function cancelNodeRenaming(node){
  $('#viewNodeModalBodyMain-node_name').html(node + ' <button type="button" id="viewNodeModalBodyMain-node_name-renameNodeButton" class="btn btn-xs btn-default has-tooltip" title="Rename" onclick="prepareNodeRenaming(\'' + node + '\')"><span class="glyphicon glyphicon-option-horizontal"></span></button>')
  $('#viewNodeModalBodyErrors').html('')
}

function cancelDomainChanging(node, domain){
  $('#viewNodeModalBodyMain-domain_name').html(domain + ' <button type="button" id="viewNodeModalBodyMain-domain_name-changeDomainButton" class="btn btn-xs btn-default has-tooltip" title="Change domain" onclick="prepareDomainChanging(\'' + node + '\', \'' + domain + '\')"><span class="glyphicon glyphicon-option-horizontal"></span></button><span id="viewNodeModalBodyMain-domain_name-changeDomainLoadingIcon" class="glyphicon glyphicon-refresh glyphicon-refresh-animate" style="display:none"></span>')
  $('#viewNodeModalBodyErrors').html('')
}


function renameNode(currentName) {
  var result
  // sanitize input
  newName = $("#viewNodeModalBodyMain-node_name-inputField").val().toUpperCase().replace(/[^0-9A-Z\-\._%]/gi, '')
  $("#viewNodeModalBodyMain-node_name-inputField").val(newName)

  var postData = {
    current_name: currentName,
    new_name: newName
  };

  $("#viewNodeModalBodyMain-node_name-renameNodeOKnCancelButtons").hide()
  $("#viewNodeModalBodyMain-node_name-renameNodeLoadingIcon").show()

  $.ajax({
    type: "POST",
    dataType: "json",
    url: '/node/rename',
    data: result,
    success: function(result){
      if ( result.exit_status != 0 ){
        $('#viewNodeModalBodyErrors').html('<span class="text-danger">An error occured while renaming node. Error details:<br />' + result['output'] + '</span>')
      } else {
      $('#viewNodeModalBodyErrors').html('')
      $('#viewNodeModalHeader').html(newName)
      cancelNodeRenaming(newName)
      }
    },
    error: function(){
      genericError()
    },
    complete: function(){
      $("#viewNodeModalBodyMain-node_name-renameNodeLoadingIcon").hide()
      $("#viewNodeModalBodyMain-node_name-renameNodeOKnCancelButtons").show()
    },
    data: postData
  });
}

function changeDomain(nodeName, currentDomain){
  var result
  newDomain = $("#viewNodeModalBodyMain-domain_name-changeDomainSelectBox option:selected").text()

  var postData = {
    node_name: nodeName,
    current_domain: currentDomain,
    new_domain: newDomain
  };

  $("#viewNodeModalBodyMain-domain_name-changeDomainOKnCancelButtons").hide()
  $("#viewNodeModalBodyMain-domain_name-changeDomainLoadingIcon").show()

  $.ajax({
    type: "POST",
    dataType: "json",
    url: '/node/update',
    data: result,
    success: function(result){
      if ( result.exit_status != 0 ){
        $('#viewNodeModalBodyErrors').html('<span class="text-danger">An error occured while updating node\'s domain. Error details:<br />' + result['output'] + '</span>')
      } else {
      $('#viewNodeModalBodyErrors').html('')
      canceldomainChanging(newDomain)
      }
    },
    error: function(){
      genericError()
    },
    complete: function(){
      $("#viewNodeModalBodyMain-domain_name-changeDomainLoadingIcon").hide()
      $("#viewNodeModalBodyMain-domain_name-changeDomainOKnCancelButtons").show()
    },
    data: postData
  });
}

function genericError(){
  $('#viewNodeModalBodyErrors').html('<span class="text-danger">An error occured while trying to retrieve node informations. Please try again later or contact your ezTSM administrator.</span>')
}
