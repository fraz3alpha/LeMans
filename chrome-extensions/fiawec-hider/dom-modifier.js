console.log("Removing annoying bits around the video")

var nodes_to_remove = ['breakingnews', 'etatCourse', 'meteo', 'previsions', 'chronos', 'channels']
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

console.log('Setting the background to black')
document.body.style.backgroundColor="black"
