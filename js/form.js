// form.js

//Create Form Element
function createForm(editId, itemToEdit) {
  var $form = $("<form></form>");

  //added value and dynamic button name
  $form.html(`
        <h2>Maker Inventory</h2>
        <div class="form-control">
        <input 
        type="text"
        class = "form-input"
        placeholder = "e.g. Oled Display">
        <button type = "submit" class= "btn" >
        Add item
        </button>
        </div>
        `);

  $form.find(".form-input")
    .val(itemToEdit ? itemToEdit.name : "")
    .attr("aria-label", "Inventory item name");
  $form.find('button[type="submit"]').text(editId ? "Update" : "Add item");

  $form.on("submit", function (e) {
    e.preventDefault();
    var $input = $form.find(".form-input");
    var value = $.trim($input.val());

    if (!value) {
      alert("Please provide value");
      return;
    }

    //added conditions
    if (editId) {
      updateItemName(value);
    } else {
      addItem(value);
    }
    $input.val("");
  });

  return $form;
}
