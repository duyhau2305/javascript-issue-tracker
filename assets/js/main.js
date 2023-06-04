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

            console.log("todoItems: ", todoItems)

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

       