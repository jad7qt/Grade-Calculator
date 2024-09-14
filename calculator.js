

window.onload=function(){
    loadTableData();
    document.getElementById('addRowButton').addEventListener('click', () => addRow());
}

// save table date to local browser storage
function saveTableData() {
    const rows = document.querySelectorAll('#calculatorTable tr');
    const tableData = [];

    rows.forEach(row => {
        const assignmentNameInput = row.querySelector('td:nth-child(2) input');
        const gradeReceivedInput = row.querySelector('td:nth-child(3) input');
        const weightInput = row.querySelector('td:nth-child(4) input');

        const rowData = {
            assignmentName: assignmentNameInput ? assignmentNameInput.value || '':'',
            gradeReceived: gradeReceivedInput ? gradeReceivedInput.value || '':'',
            weight: weightInput ? weightInput.value || '':'',
        };
        tableData.push(rowData);
    });

    localStorage.setItem('tableData', JSON.stringify(tableData));
}

// Function to add a row
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
        <td> <button id="removeRowButton" class="btn btn-danger" onclick="removeRow(${rowCount})">X</button>
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

// Function to remove row
function removeRow(i) {
    document.getElementById(`row${i}`).remove();
    saveTableData();
    
    // clear table data and reload based on local storage
    clearTable();
    loadTableData();
}

// Function to load table data from local storage
function loadTableData() {
    const storedData = JSON.parse(localStorage.getItem('tableData')) || [{assignmentName: "", gradeReceived: '', weight: ""}, {assignmentName: "", gradeReceived: "", weight: ""}, {assignmentName: "", gradeReceived: "", weight: ""}];

    storedData.forEach(rowData => {
        addRow(rowData);
    });
}

// Function to clear current table
function clearTable() {
    const rows = document.querySelectorAll('#calculatorTable tr');
    rows.forEach(row => {
        row.remove();
    });
}

// Calculate final grade
function calculateGrade() {
    const rows = JSON.parse(localStorage.getItem('tableData'));

    // verify both weight and grade entered for each fow
    sum = 0;
    denom = 0;
    rows.forEach(rowData =>{
        if(rowData.gradeReceived && rowData.weight){
            sum = sum + (rowData.gradeReceived * rowData.weight);
            denom = denom + (1 * rowData.weight);
        }
    });
    const gradeInput = document.getElementById('calcBox');
    gradeInput.value=sum/denom;
    // write sum to final grade on page
}