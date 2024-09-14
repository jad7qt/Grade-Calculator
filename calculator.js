

window.onload=function(){
    loadTableData();
    document.getElementById('addRowButton').addEventListener('click', () => addRow());
}

// save table date to local browser storage
function saveTableData() {
    const rows = document.querySelectorAll('#calculatorTable tr');
    const tableData = [];

    rows.forEach(row => {
        console.log(row);
        const assignmentNameInput = row.querySelector('td:nth-child(2) input');
        console.log(assignmentNameInput); //null
        const gradeReceivedInput = row.querySelector('td:nth-child(3) input');
        console.log(gradeReceivedInput); // testing
        const weightInput = row.querySelector('td:nth-child(4) input');
        console.log(weightInput); // 

        const rowData = {
            assignmentName: assignmentNameInput ? assignmentNameInput.value || '':'',
            gradeReceived: gradeReceivedInput ? gradeReceivedInput.value || '':'',
            weight: weightInput ? weightInput.value || '':'',
        };
        tableData.push(rowData);
    });

    localStorage.setItem('tableData', JSON.stringify(tableData));
}

// Function to add a new row
function addRow(rowData = {}) {
    const table = document.getElementById('calculatorTable');
    const rowCount = table.rows.length + 1;
    const row = document.createElement('tr');
    row.id = `row${rowCount}`;
    if (rowData == {}){
        row.innerHTML = `
        <th scope="row">${rowCount}</th>
        <td><input type="text" value=""></input></td>
        <td><input type="number" value=""></td>
        <td><input type="number" value=""></td>
    `;
    }else{
        row.innerHTML = `
        <th scope="row">${rowCount}</th>
        <td><input value="${rowData.assignmentName ? rowData.assignmentName || '':''}"></td>
        <td><input type="number" value="${rowData.gradeReceived || ''}"></td>
        <td><input type="number" value="${rowData.weight || ''}"></td>
    `;
    }
    table.appendChild(row);

    // Add event listeners to the inputs to save data on change
    row.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', saveTableData);
    });

    // Save the updated table data
    saveTableData();
}

// Function to load table data from local storage
function loadTableData() {
    const storedData = JSON.parse(localStorage.getItem('tableData')) || [{assignmentName: "Testing", gradeReceived: 10, weight: ""}, {assignmentName: "", gradeReceived: "", weight: ""}, {assignmentName: "", gradeReceived: "", weight: ""}];

    storedData.forEach(rowData => {
        addRow(rowData);
    });
}