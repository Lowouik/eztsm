// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap-sprockets
//= require bootstrap-toggle
//= require rails.validations
//= require_tree .

$(document).on("ready page:change", function() {
  // Activate bootstrap tooltips
  $('.has-tooltip').tooltip();

  // Reload node index when edit node modal is closed
  $("#viewNodeModal").on('hidden.bs.modal', function () {
    document.location.reload();
  })
});

function callCreateNodeModal(){
  var result

  // Building domains list box
  $.ajax({
    type: "GET",
    dataType: "json",
    url: '/domains',
    data: result,
    success: function(result){
      if ( result.exit_status != 0 ){
        $('#createNodeModalBodyErrors').html('<span class="text-danger">An error occured while getting domains list. Error details:<br />' + result.output + '</span>')
      } else {
        domainsListBox = ''
        result.domains.forEach(function(entry) {
          domainsListBox += ' <option> ' + entry.domain_name + '</option>'
        })
        $('#node_domain_name').append(domainsListBox)
      }
    },
    error: function(){
      $('#createNodeModalBodyErrors').html('<span class="text-danger">An error occured while getting domains list. Error details:<br />' + result.output + '</span>')
    }
  });

  // Building opt_set listbox
  $.ajax({
    type: "GET",
    dataType: "json",
    url: '/optsets',
    data: result,
    success: function(result){
      if ( result.exit_status != 0 ){
        $('#createNodeModalBodyErrors').html('<span class="text-danger">An error occured while getting option sets list. Error details:<br />' + result.output + '</span>')
      } else {
        optionSetsListBox = ''
        result.optsets.forEach(function(entry) {
          optionSetsListBox += ' <option> ' + entry.optionset_name + '</option>'
        })
        $('#node_opt_set').append(optionSetsListBox)
      }
    },
    error: function(){
      $('#createNodeModalBodyErrors').html('<span class="text-danger">An error occured while getting option sets list. Error details:<br />' + result.output + '</span>')
    }
  });


  $('#createNodeModal').modal({
    show: true
  }); 
}
