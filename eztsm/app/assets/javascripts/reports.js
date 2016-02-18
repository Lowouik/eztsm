$(document).ready(function(){
  $("#stgpoolStatusForm").bind('ajax:send', function(){
    $("#stgpoolStatusOKButton").hide()
    $("#stgpoolStatusLoadingIcon").show()
  })
  .bind('ajax:complete', function(){
    $("#stgpoolStatusOKButton").show()
    $("#stgpoolStatusLoadingIcon").hide()
  })
})
