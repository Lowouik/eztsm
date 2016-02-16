function getNodeNameFromTable(row){

  // Variable declarations and retrieve node name from the first td of the row
  var nodeName = $('td:first', $(row).parents('tr')).text();
  var node = ''
  var backdeleteSwitchValue = ''

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
        if (key == 'max_mp_allowed') {
          $('#viewNodeModalBodyMain').append(
            '<hr />' +
            '<row>' +
              '<div class="col-xs-4"><strong>VIEW SCHEDULES:</strong></div>' +
              '<div class="col-xs-8">' +
                '<span id="viewNodeModalBodyMain-schedules"><span id="viewNodeModalBodyMain-schedules-schedulesDetails"></span><span id="viewNodeModalBodyMain-schedules-getSchedulesLoadingIcon" class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span></span><span id="viewNodeModalBodyMain-schedules-errorField"></span>' +
              '</div>' +
              '<br />' +
            '</row>' +
            '<hr />'
          )
        }
        if (key == 'lastacc_time') {
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
        if (key == 'node_name') {
          $('#viewNodeModalBodyMain').append(
            '<row>' +
              '<div class="col-xs-4"></div>' +
              '<div class="col-xs-8">' +
                '<span id="viewNodeModalBodyMain-password><button id="viewNodeModalBodyMain-password-button" type="button" class="btn btn-default btn-sm">Update Password</button></span>' +
              '</div>' +
              '<br />' +
            '</row>'
          )
        }
      }
      // Customize some fields that can be modified through ajax requests
      // Let's start with the node name
      $('#viewNodeModalBodyMain-node_name').append(' <button type="button" id="viewNodeModalBodyMain-node_name-renameNodeButton" class="btn btn-xs btn-default has-tooltip" title="Rename" onclick="prepareNodeRenaming(\'' + node[0]['node_name'] + '\')"><span class="glyphicon glyphicon-option-horizontal"></span></button>') 
      // domain name
      $('#viewNodeModalBodyMain-domain_name').append(' <button type="button" id="viewNodeModalBodyMain-domain_name-changeDomainButton" class="btn btn-xs btn-default has-tooltip" title="Change domain" onclick="prepareDomainChanging(\'' + node[0]['domain_name'] + '\')"><span class="glyphicon glyphicon-option-horizontal"></span></button><span id="viewNodeModalBodyMain-domain_name-changeDomainLoadingIcon" class="glyphicon glyphicon-refresh glyphicon-refresh-animate" style="display:none"></span>')
      // option_set
      $('#viewNodeModalBodyMain-option_set').append(' <button type="button" id="viewNodeModalBodyMain-option_set-changeOptionSetButton" class="btn btn-xs btn-default has-tooltip" title="Change Option Set" onclick="prepareOptionSetChanging(\'' + node[0]['option_set'] + '\')"><span class="glyphicon glyphicon-option-horizontal"></span></button><span id="viewNodeModalBodyMain-option_set-changeOptionSetLoadingIcon" class="glyphicon glyphicon-refresh glyphicon-refresh-animate" style="display:none"></span>')
      // max_mp_allowed
      $('#viewNodeModalBodyMain-max_mp_allowed').html('<input id="viewNodeModalBodyMain-max_mp_allowed-inputField" class="input-default" type="number" style="width: 40px" onchange="handleMaxMpAllowedChange()" min="1" max="4" value="' + $('#viewNodeModalBodyMain-max_mp_allowed').text() + '" /><span id="viewNodeModalBodyMain-max_mp_allowed-changeMaxMpAllowedLoadingIcon" class="glyphicon glyphicon-refresh glyphicon-refresh-animate" style="display:none"></span><span id="viewNodeModalBodyMain-max_mp_allowed-changeMaxMpAllowedOKnCancelButtons" style="display: none"> <button class="btn btn-xs btn-success has-tooltip" title="OK" onclick="updateMaxMpAllowed()"><span class="glyphicon glyphicon-ok"></span></button> <button class="btn btn-xs btn-danger has-tooltip" title="Cancel" onclick="cancelMaxMpAllowedUpdating(\'' + node[0]['max_mp_allowed'] + '\')"><span class="glyphicon glyphicon-remove"></span></button></span>')
      // backdelete button
      if ( $('#viewNodeModalBodyMain-backdelete').text() == 'YES' ){
        backdeleteSwitchValue = 'checked'
      } 
      $('#viewNodeModalBodyMain-backdelete').html('<input id="viewNodeModalBodyMain-backdelete-switch" type="checkbox" ' + backdeleteSwitchValue + ' data-toggle="toggle" data-on="YES" data-off="NO" data-size="mini" onchange=updateBackDelete()><span id="viewNodeModalBodyMain-backdelete-updateBackDeleteLoadingIcon" class="glyphicon glyphicon-refresh glyphicon-refresh-animate" style="display:none"></span>')
      $('#viewNodeModalBodyMain-backdelete-switch').bootstrapToggle()
      // Schedules
      prepareSchedulesChanging(node[0]['node_name'],node[0]['domain_name'])
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

function prepareDomainChanging(currentDomain){
  // get Domain List
  nodeName = $('#viewNodeModalHeader').text()
  var result
  $("#viewNodeModalBodyMain-domain_name-changeDomainButton").hide()
  $("#viewNodeModalBodyMain-domain_name-changeDomainLoadingIcon").show()

  $.ajax({
    type: "GET",
    dataType: "json",
    url: '/domains',
    data: result,
    success: function(result){
      if ( result.exit_status != 0 ){
        $('#viewNodeModalBodyErrors').html('<span class="text-danger">An error occured while getting domains list. Error details:<br />' + result.output + '</span>')
      } else {
        domainsListBox = '<select id="viewNodeModalBodyMain-domain_name-changeDomainSelectBox"> <option> ' + currentDomain + ' </option>'
        result.domains.forEach(function(entry) {
          if ( entry.domain_name != currentDomain ) {
            domainsListBox += ' <option> ' + entry.domain_name + '</option>'
          }
        }) 
        domainsListBox += '</select><span id="viewNodeModalBodyMain-domain_name-changeDomainLoadingIcon" class="glyphicon glyphicon-refresh glyphicon-refresh-animate"style="display:none"></span><span id="viewNodeModalBodyMain-domain_name-changeDomainOKnCancelButtons"> <button class="btn btn-xs btn-success has-tooltip" title="OK" onclick="changeDomain(\'' + nodeName + '\')"><span class="glyphicon glyphicon-ok"></span></button> <button class="btn btn-xs btn-danger has-tooltip" title="Cancel" onclick="cancelDomainChanging(\'' + nodeName + '\', \'' + currentDomain + '\')"><span class="glyphicon glyphicon-remove"></span></button></span>'
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

function prepareOptionSetChanging(currentOptionSet){
  // get Option Sets List
  nodeName = $('#viewNodeModalHeader').text()
  var result
  $("#viewNodeModalBodyMain-option_set-changeOptionSetButton").hide()
  $("#viewNodeModalBodyMain-option_set-changeOptionSetLoadingIcon").show()

  $.ajax({
    type: "GET",
    dataType: "json",
    url: '/optsets',
    data: result,
    success: function(result){
      if ( result.exit_status != 0 ){
        $('#viewNodeModalBodyErrors').html('<span class="text-danger">An error occured while getting option sets list. Error details:<br />' + result['output'] + '</span>')
      } else {
        optionSetsListBox = '<select id="viewNodeModalBodyMain-option_set-changeOptionSetSelectBox"> <option> ' + currentOptionSet + ' </option>'
        result.optsets.forEach(function(entry) {
          if ( entry.option_set != currentOptionSet ) {
            optionSetsListBox += ' <option> ' + entry.optionset_name + '</option>'
          }
        }) 
        optionSetsListBox += '</select><span id="viewNodeModalBodyMain-option_set-changeOptionSetLoadingIcon" class="glyphicon glyphicon-refresh glyphicon-refresh-animate"style="display:none"></span><span id="viewNodeModalBodyMain-option_set-changeOptionSetOKnCancelButtons"> <button class="btn btn-xs btn-success has-tooltip" title="OK" onclick="changeOptionSet(\'' + nodeName + '\')"><span class="glyphicon glyphicon-ok"></span></button> <button class="btn btn-xs btn-danger has-tooltip" title="Cancel" onclick="cancelOptionSetChanging(\'' + nodeName + '\', \'' + currentOptionSet + '\')"><span class="glyphicon glyphicon-remove"></span></button></span>'
        $('#viewNodeModalBodyMain-option_set').html(optionSetsListBox)
      }
    },
    error: function(){
      genericError()
    },
    complete: function(){
      $("#viewNodeModalBodyMain-option_set-changeOptionSetLoadingIcon").hide()
    }
  });
}

function prepareSchedulesChanging(node, domain) {

  var activeSchedulesJSON = []
  var domainSchedulesJSON = []
  var activeSchedulesList = []

  // Resetting fields
  $("#viewNodeModalBodyMain-schedules-schedulesDetails").html('')
  $("#viewNodeModalBodyMain-schedules-errorField").html('')

  $('#viewNodeModalBodyMain-schedules-getSchedulesLoadingIcon').show()

  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: '/active_schedules?node_name=' + node,
    data: activeSchedulesJSON,
    success: function(activeSchedulesJSON){
      if ( activeSchedulesJSON.exit_status != 0 && activeSchedulesJSON.exit_status != 11 ){ //11 means no schedule associated yet
        getSchedulesGenericError()
      } else {
        activeSchedulesJSON.schedules.forEach(function(schedule){
          activeSchedulesList.push(schedule.schedule_name)
        })
        $.ajax({
          type: "GET",
          dataType: "json",
          url: '/schedules?domain_name=' + domain,
          data: domainSchedulesJSON,
          success: function(domainSchedulesJSON){
            if ( domainSchedulesJSON.exit_status == 11){
                $("#viewNodeModalBodyMain-schedules-schedulesDetails").html('There are no schedules for this specific domain.')
            } else if ( domainSchedulesJSON.exit_status != 0 ){
              getSchedulesGenericError()
            } else {
              domainSchedulesJSON.schedules.forEach(function(schedule){
                if (activeSchedulesList.indexOf(schedule.schedule_name) > -1) {scheduleChecked = 'checked'} else { scheduleChecked = '' } // Schedule name is part of activeSchedulesList Array
                  $("#viewNodeModalBodyMain-schedules-schedulesDetails").append('<span id="viewNodeModalBodyMain-schedules-' + schedule.schedule_name + 'LoadingIcon" class="glyphicon glyphicon-refresh glyphicon-refresh-animate" style="display:none"></span><input id="viewNodeModalBodyMain-schedules-' + schedule.schedule_name + 'CheckBox" type="checkbox" ' + scheduleChecked + ' data-toggle="toggle" data-on="YES" data-off="NO" data-size="mini" onChange="updateScheduleAssociation(\'' + domain + '\',\'' + schedule.schedule_name + '\')">' + schedule.schedule_name + ' <span id="viewNodeModalBodyMain-schedules-' + schedule.schedule_name + 'Details" class="glyphicon glyphicon-question-sign" data-toggle="tooltip" data-placement="top" title="Start time: ' + schedule.starttime + '\nDuration: ' + schedule.duration + ' ' + schedule.durunits.toLowerCase() + '\nDays: ' + schedule.dayofweek + '"></span><br />')
                $('#viewNodeModalBodyMain-schedules-' + schedule.schedule_name + 'Details').tooltip()
              })
            }
          },
          error: function(){
            getSchedulesGenericError()
          },
          complete: function(){
            $('#viewNodeModalBodyMain-schedules-getSchedulesLoadingIcon').hide()
          }
        })
      }
    },
    error: function(){
      getSchedulesGenericError()
    }
  })
}

function cancelNodeRenaming(node){
  $('#viewNodeModalBodyMain-node_name').html(node + '<button type="button" id="viewNodeModalBodyMain-node_name-renameNodeButton" class="btn btn-xs btn-default has-tooltip" title="Rename" onclick="prepareNodeRenaming(\'' + node + '\')"><span class="glyphicon glyphicon-option-horizontal"></span></button>')
  $('#viewNodeModalBodyErrors').html('')
}

function cancelDomainChanging(node, domain){
  $('#viewNodeModalBodyMain-domain_name').html(domain + '<button type="button" id="viewNodeModalBodyMain-domain_name-changeDomainButton" class="btn btn-xs btn-default has-tooltip" title="Change Domain" onclick="prepareDomainChanging(\''  + domain + '\')"><span class="glyphicon glyphicon-option-horizontal"></span></button><span id="viewNodeModalBodyMain-domain_name-changeDomainLoadingIcon" class="glyphicon glyphicon-refresh glyphicon-refresh-animate" style="display:none"></span>')
  $('#viewNodeModalBodyErrors').html('')
}

function cancelOptionSetChanging(node, optset){
  $('#viewNodeModalBodyMain-option_set').html(optset + '<button type="button" id="viewNodeModalBodyMain-option_set-changeOptionSetButton" class="btn btn-xs btn-default has-tooltip" title="Change Option Set" onclick="prepareOptionSetChanging(\'' + node + '\', \'' + optset + '\')"><span class="glyphicon glyphicon-option-horizontal"></span></button><span id="viewNodeModalBodyMain-option_set-changeOptionSetLoadingIcon" class="glyphicon glyphicon-refresh glyphicon-refresh-animate" style="display:none"></span>')
  $('#viewNodeModalBodyErrors').html('')
}

function cancelMaxMpAllowedUpdating(maxMpAllowed) {
  $("#viewNodeModalBodyMain-max_mp_allowed-changeMaxMpAllowedOKnCancelButtons").hide()
  $("#viewNodeModalBodyMain-max_mp_allowed-inputField").val(maxMpAllowed)  
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

function changeDomain(nodeName){
  var result
  newDomain = $("#viewNodeModalBodyMain-domain_name-changeDomainSelectBox option:selected").text()
  var postData = {
    node_name: nodeName,
    domain: newDomain
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
        updateError(result['output'])
      } else {
      $('#viewNodeModalBodyErrors').html('')
      cancelDomainChanging(nodeName, newDomain)
      prepareSchedulesChanging(nodeName, newDomain)
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

function changeOptionSet(nodeName){
  var result
  newOptionSet = $("#viewNodeModalBodyMain-option_set-changeOptionSetSelectBox option:selected").text()
  var postData = {
    node_name: nodeName,
    option_set: newOptionSet
  };

  $("#viewNodeModalBodyMain-option_set-changeOptionSetOKnCancelButtons").hide()
  $("#viewNodeModalBodyMain-option_set-changeOptionSetLoadingIcon").show()

  $.ajax({
    type: "POST",
    dataType: "json",
    url: '/node/update',
    data: result,
    success: function(result){
      if ( result.exit_status != 0 ){
        updateError(result['output'])
      } else {
      $('#viewNodeModalBodyErrors').html('')
      cancelOptionSetChanging(nodeName, newOptionSet)
      }
    },
    error: function(){
      genericError()
    },
    complete: function(){
      $("#viewNodeModalBodyMain-option_set-changeOptionSetLoadingIcon").hide()
      $("#viewNodeModalBodyMain-option_set-changeOptionSetOKnCancelButtons").show()
    },
    data: postData
  });
}

function updateMaxMpAllowed(){
  nodeName = $('#viewNodeModalHeader').text()
  var result
  newMaxMpAllowed = $("#viewNodeModalBodyMain-max_mp_allowed-inputField").val()
  var postData = {
    node_name: nodeName,
    max_mp_allowed: newMaxMpAllowed
  };

  $("#viewNodeModalBodyMain-max_mp_allowed-changeMaxMpAllowedOKnCancelButtons").hide()
  $("#viewNodeModalBodyMain-max_mp_allowed-changeMaxMpAllowedLoadingIcon").show()

  $.ajax({
    type: "POST",
    dataType: "json",
    url: '/node/update',
    data: result,
    success: function(result){
      if ( result.exit_status != 0 ){
        updateError(result['output'])
      } else {
      $('#viewNodeModalBodyErrors').html('')
      cancelMaxMpAllowedUpdating(newMaxMpAllowed)
      }
    },
    error: function(){
      genericError()
    },
    complete: function(){
      $("#viewNodeModalBodyMain-max_mp_allowed-changeMaxMpAllowedLoadingIcon").hide()
    },
    data: postData
  });
}

function updateBackDelete(){
  nodeName = $('#viewNodeModalHeader').text()
  var result
  backdelete = $("#viewNodeModalBodyMain-backdelete-switch").prop('checked')
  var postData = {
    node_name: nodeName,
    backdelete: backdelete
  };

  $("#viewNodeModalBodyMain-backdelete-switch").bootstrapToggle('disable')
  $("#viewNodeModalBodyMain-backdelete-updateBackdeleteLoadingIcon").show()

  $.ajax({
    type: "POST",
    dataType: "json",
    url: '/node/update',
    data: result,
    success: function(result){
      if ( result.exit_status != 0 ){
        updateError(result.output)
      } else {
      $('#viewNodeModalBodyErrors').html('')
      }
    },
    error: function(){
      genericError()
    },
    complete: function(){
      $("#viewNodeModalBodyMain-backdelete-updateBackDeleteLoadingIcon").hide()
      $("#viewNodeModalBodyMain-backdelete-switch").bootstrapToggle('enable')
    },
    data: postData
  });
}

function updateScheduleAssociation(domain, schedule){
  nodeName = $('#viewNodeModalHeader').text()
  var result
  association = $("#viewNodeModalBodyMain-schedules-" + schedule + 'CheckBox').prop('checked')

  $('#viewNodeModalBodyMain-schedules-' + schedule + 'CheckBox').hide()
  $('#viewNodeModalBodyMain-schedules-' + schedule + 'LoadingIcon').show()

  var postData = {
    node_name: nodeName,
    domain_name: domain,
    schedule_name: schedule,
    association: association
  }

  $.ajax({
    type: "PATCH",
    dataType: "json",
    url: '/schedules',
    data: result,
    success: function(result){
      if ( result.exit_status != 0 ){
        updateScheduleAssociationError(result.output)
      } else {
      $('#viewNodeModalBodyErrors').html('')
      }
    },
    error: function(){
      updateScheduleAssociationError()
    },
    complete: function(){
  $('#viewNodeModalBodyMain-schedules-' + schedule + 'CheckBox').show()
  $('#viewNodeModalBodyMain-schedules-' + schedule + 'LoadingIcon').hide()
    },
    data: postData
  });
}

function handleMaxMpAllowedChange(){
  $("#viewNodeModalBodyMain-max_mp_allowed-changeMaxMpAllowedOKnCancelButtons").show()
}

function updateError(errorDetails){
  $('#viewNodeModalBodyErrors').html('<span class="text-danger">An error occured while updating node\'s property. Error details:<br />' + errorDetails + '</span>')
}

function updateScheduleAssociationError(errorDetails){
  $('#viewNodeModalBodyMain-schedules-errorField').html('<span class="text-danger">An error occured while updating schedule association. Error details:<br />' + errorDetails + '</span>')
}
function getSchedulesGenericError(){
  $('#viewNodeModalBodyMain-schedules-errorField').html('<span class="text-danger">An error occured while trying to retrieve schedules informations. Please try again later or contact your ezTSM administrator.</span>')
}

function genericError(){
  $('#viewNodeModalBodyErrors').html('<span class="text-danger">An error occured while trying to retrieve node informations. Please try again later or contact your ezTSM administrator.</span>')
}

