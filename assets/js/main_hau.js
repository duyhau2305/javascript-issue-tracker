// JavaScript code for handling events and adding functionality
// Define an array to store the to-do items
var todoItems = [];

// Function to add a new to-do item
function addTodo() {
    var issueInput = document.getElementById("issue-input");
    var severitySelect = document.getElementById("severity-select");

    var description = issueInput.value;
    var severity = severitySelect.value;

    // Create a new to-do object
    var todo = {
        description: description,
        severity: severity,
        status: "Open"
    };

    // Add the new to-do object to the array
    todoItems.push(todo);

    // Clear the input fields
    issueInput.value = "";
    severitySelect.selectedIndex = 0;

    // Refresh the to-do list
    displayTodoList();
}

// Function to update the status of a to-do item
function updateTodoStatus(index, status) {
    todoItems[index].status = status;
    displayTodoList();
}

// Function to delete a to-do item
function deleteTodoItem(index) {
    todoItems.splice(index, 1);
    displayTodoList();
}

// Function to display the to-do list
function displayTodoList() {
    var todoList = document.getElementById("todo-list");
    todoList.innerHTML = "";

    var searchInput = document.getElementById("search-input");
    var filterAllButton = document.getElementById("filter-all");
    var filterOpenButton = document.getElementById("filter-open");
    var filterCloseButton = document.getElementById("filter-close");
    var orderBySelect = document.getElementById("order-by-select");

    var searchText = searchInput.value.toLowerCase();
    var filterStatus = "all";

    if (filterOpenButton.classList.contains("active")) {
        filterStatus = "open";
    } else if (filterCloseButton.classList.contains("active")) {
        filterStatus = "close";
    }

    var orderBy = orderBySelect.value;

    var filteredItems = todoItems.filter(function (item) {
        var description = item.description.toLowerCase();
        var status = item.status.toLowerCase();

        return (
            (description.indexOf(searchText) !== -1 || searchText === "") &&
            (filterStatus === "all" || status === filterStatus)
        );
    });

    if (orderBy === "asc") {
        filteredItems.sort(function (a, b) {
            return a.description.localeCompare(b.description);
        });
    } else if (orderBy === "desc") {
        filteredItems.sort(function (a, b) {
            return b.description.localeCompare(a.description);
        });
    }

    filteredItems.forEach(function (item, index) {
        var listItem = document.createElement("li");
        var descriptionSpan = document.createElement("span");
        var severitySpan = document.createElement("span");
        var statusSpan = document.createElement("span");
        var updateButton = document.createElement("button");
        var deleteButton = document.createElement("button");

        descriptionSpan.innerText = item.description;
        severitySpan.innerText = "Severity: " + item.severity;
        statusSpan.innerText = "Status: " + item.status;

        updateButton.innerText = "Update";
        updateButton.addEventListener("click", function () {
            var newStatus = item.status === "Open" ? "Close" : "Open";
            updateTodoStatus(index, newStatus);
        });

        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", function () {
            deleteTodoItem(index);
        });

        listItem.appendChild(descriptionSpan);
        listItem.appendChild(document.createElement("br"));
        listItem.appendChild(severitySpan);
        listItem.appendChild(document.createElement("br"));
        listItem.appendChild(statusSpan);
        listItem.appendChild(document.createElement("br"));
        listItem.appendChild(updateButton);
        listItem.appendChild(deleteButton);

        todoList.appendChild(listItem);
    });
}

// Add event listener to the "Add" button
var addButton = document.getElementById("add-button");
addButton.addEventListener("click", addTodo);

// Add event listener to the search input field
var searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", displayTodoList);

// Add event listeners to the filter buttons
var filterAllButton = document.getElementById("filter-all");
var filterOpenButton = document.getElementById("filter-open");
var filterCloseButton = document.getElementById("filter-close");

filterAllButton.addEventListener("click", function () {
    filterAllButton.classList.add("active");
    filterOpenButton.classList.remove("active");
    filterCloseButton.classList.remove("active");
    displayTodoList();
});

filterOpenButton.addEventListener("click", function () {
    filterAllButton.classList.remove("active");
    filterOpenButton.classList.add("active");
    filterCloseButton.classList.remove("active");
    displayTodoList();
});

filterCloseButton.addEventListener("click", function () {
    filterAllButton.classList.remove("active");
    filterOpenButton.classList.remove("active");
    filterCloseButton.classList.add("active");
    displayTodoList();
});

// Add event listener to the "Order by" select field
var orderBySelect = document.getElementById("order-by-select");
orderBySelect.addEventListener("change", displayTodoList);