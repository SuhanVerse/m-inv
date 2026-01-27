var items = Items;

//Render App
function render() {
  var $app = $("#app");
  $app.empty();

  var $itemsElement = createItems(items);
  $app.append($itemsElement);
}

//Initialize App
$(document).ready(function () {
  render();
});

//Edit Completed Function
function editCompleted(itemId) {
  items = $.map(items, function (item) {
    if (item.id == itemId) {
      return $.extend({}, item, { completed: !item.completed });
    }
    return item;
  });
  render();
}

function removeItem(itemId) {
  items = $.grep(items, function (item) {
    return item.id !== itemId;
  });
  render();
  setTimeout(function () {
    alert("Item Deleted Successfully!");
  }, 0);
}
