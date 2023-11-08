$(function () {
  loadProducts();
  $(".Products").on("click", ".deleteBtn", deleteButton);
  $(".container").on("click", ".addBtn", toggleAddBtn);
  $(".container").on("click", ".editBtn", handleEditBtn);
  $(".container").on("click", "#closeaddBtn", function () {
    $(".addProduct").toggle();
  });
  $(".container").on("click", "#saveBtn", function () {
    var id = $("#_id").val();
    var name = $("#name").val();
    var price = $("#price").val();
    var color = $("#color").val();
    var department = $("#department").val();
    var description = $("#description").val();
    console.log("Save button worked");
    $.ajax({
      url: "https://usman-fake-api.herokuapp.com/api/products/" + id,
      data: {
        name: name,
        price: price,
        color: color,
        department: department,
        description: description,
      },
      method: "PUT",
      success: function (response) {
        console.log(response);
        loadProducts();
        $("#updateModal").modal("hide");
      },
    });
  });
});

// toggle add btn start
var clicks = true;
function toggleAddBtn() {
  if (clicks) {
    $(".addProduct").toggle();
    clicks = false;
  } else {
    addButton();
    $(".addProduct").toggle();
    clicks = true;
  }
}

function handleEditBtn() {
  var btn = $(this);
  var div = btn.closest("#Product");
  let id = div.attr("data-id");
  $.ajax({
    url: "https://usman-fake-api.herokuapp.com/api/products/" + id,
    method: "GET",
    success: function (response) {
      $("#_id").val(response._id);
      $("#name").val(response.name);
      $("#price").val(response.price);
      $("#color").val(response.color);
      $("#department").val(response.department);
      $("#description").val(response.description);
      $("#updateModal").modal("show");
    },
  });
}
// toggle add btn end
function addButton() {
  console.log("Add button working");
  let name = $(".addProduct #name").val();
  let price = $(".addProduct #price").val();
  let color = $(".addProduct #color").val();
  let department = $(".addProduct #department").val();
  let description = $(".addProduct #description").val();
  $.ajax({
    url: "https://usman-fake-api.herokuapp.com/api/products",
    method: "POST",
    data: {
      name: name,
      price: price,
      color: color,
      department: department,
      description: description,
    },
    error: function () {
      alert("error in adding");
    },
    success: function () {
      $(".addProduct #name").val("");
      $(".addProduct #price").val("");
      $(".addProduct #color").val("");
      $(".addProduct #department").val("");
      $(".addProduct #description").val("");
      loadProducts();
    },
  });
}
function deleteButton() {
  var btn = $(this);
  var div = btn.closest("#Product");
  let id = div.attr("data-id");
  $.ajax({
    url: "https://usman-fake-api.herokuapp.com/api/products/" + id,
    method: "DELETE",
    error: function () {
      alert("Error occured");
    },
    success: function () {
      loadProducts();
    },
  });
}

function loadProducts() {
  $.ajax({
    url: "https://usman-fake-api.herokuapp.com/api/products",
    method: "GET",
    error: function () {
      var products = $(".Products");
      products.empty();
      products.append("<h2>Error Occured</h2>");
    },
    success: function (response) {
      var productsDiv = $(".Products");
      productsDiv.empty();
      for (var i = 0; i < response.length; i++) {
        var prod = response[i];
        productsDiv.append(
          `<div class ="product" id="Product" data-id="${prod._id}"><h3>${prod.name}</h3><h4>${prod.price}</h4><h4>${prod.description}</h4><h4>${prod.color}</h4><p>${prod.description}<button class="btn btn-danger btn-sm float-right deleteBtn">Delete</button><button class="btn btn-warning btn-sm float-right editBtn">Edit</button></p></div>`,
        );
      }
    },
  });
}
