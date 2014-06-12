console.log("Testing in this tab")

var nodes_to_remove = ['menu','services', 'popup-multiuser', 'popup-subscribe', 'popup-login']
var nodes_to_remove_class = ['livetv-bottom-channel-title', 'livetv-rightside', 'livetv-bottom ', 'livetv-bottom hidden', 'livetv-player-promo', 'popup-mask', 'plu_menu_v5', 'ply_services_v5', 'ply_nedstat_v5', 'ply_marker_v5', 'ply_footerscript_v5']

var nodes = document.getElementsByTagName("div")
for (var i=0; i<nodes.length; i++) {
  //if (nodes[i].type == "div") {
  if (jQuery.inArray(nodes[i].id, nodes_to_remove) > -1) {
    console.log(nodes[i])
  }
  //}
}

// Remove styles
$('link[rel=stylesheet]').prop('disabled',true);

$("div").each(function (index) {
  id = $(this).attr('id')
  class_value = $(this).attr('class')

  if (id) {
    if ($.inArray(id, nodes_to_remove) > -1) {
      console.log(index + ": " + id);
      $(this).remove()
    }
  }

  if (class_value) {
    if ($.inArray(class_value, nodes_to_remove_class) > -1) {
      console.log(index + ": " + class_value);
      $(this).remove()
    }
  }
});

console.log("Attempting to remove livetv-player style")
$('.livetv-player').removeAttr('style')
$('.livetv-player').css({height: '100%'})
$('.livetv-container.clear').removeAttr('style')
$('.livetv').removeAttr('style')

document.body.style.backgroundColor="black"
