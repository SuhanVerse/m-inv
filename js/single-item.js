// single-item.js

//Create a single item element

function createSingleItem(item) {
  var $div = $('<div class ="single-item"></div>');

  // Build user-controlled content as text rather than parsing it as HTML.
  var $checkbox = $('<input type="checkbox">')
    .prop("checked", item.completed)
    .attr("aria-label", `Mark ${item.name} as ${item.completed ? "incomplete" : "completed"}`);
  var $name = $("<p></p>")
    .text(item.name)
    .css("text-decoration", item.completed ? "line-through" : "none");
  var $edit = $('<button class="btn icon-btn edit-btn" type="button"><i class="fa-regular fa-pen-to-square"></i></button>')
    .attr("aria-label", `Edit ${item.name}`);
  var $remove = $('<button class="btn icon-btn remove-btn" type="button"><i class="fa-regular fa-trash-can"></i></button>')
    .attr("aria-label", `Remove ${item.name}`);
  $div.append($checkbox, $name, $edit, $remove);

  //Add event listener for checkbox
  $div.find('input[type="checkbox"]').on("change", function () {
    editCompleted(item.id);
  });

  //Add event listener for remove button
  $div.find(".remove-btn").on("click", function () {
    removeItem(item.id);
  });

  //Add event listener for edit button
  $div.find(".edit-btn").on("click", function () {
    setEditId(item.id);
  });

  return $div;
}
