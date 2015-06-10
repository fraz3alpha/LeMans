console.log("Removing annoying bits around the video")

var nodes_to_remove = ['breakingnews', 'etatCourse', 'meteo', 'previsions', 'chronos', 'channels', 'ddlCategorieChronos-menu']
var nodes_to_remove_class = ['header', 'subcontent', 'logout', 'tudor', 'retour']
 
var nodes = document.getElementsByTagName("div")
for (var i=0; i<nodes.length; i++) {
  //if (nodes[i].type == "div") {
  if (jQuery.inArray(nodes[i].id, nodes_to_remove) > -1) {
    console.log('Removing: ' + nodes[i])
  }
  //}
}

// Remove styles
$('link[rel=stylesheet]').prop('disabled',true);

function removeElement(index, e) {

  id = $(e).attr('id');
  class_value = $(e).attr('class')

  if (id) {
    if ($.inArray(id, nodes_to_remove) > -1) {
      console.log(index + ": " + id);
      $(e).remove()
    }
  }

  if (class_value) {
    if ($.inArray(class_value, nodes_to_remove_class) > -1) {
      console.log(index + ": " + class_value);
      $(e).remove()
    }
 
 }
}

$("div").each(function (index) {
  removeElement(index, this);
});
$("ul").each(function (index) {
  removeElement(index, this);
});

console.log('Setting the background to black')
document.body.style.backgroundColor="black"

console.log('Making the video larger')

$('#zoneVideo iframe').each(function (index) {
  console.log(this);
  $(this).attr('height', '700');
  $(this).attr('width', '1400');
});
