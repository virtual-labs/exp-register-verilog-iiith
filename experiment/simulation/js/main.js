// Register Verilog Simulation

export function enableDragSort(className) {
    const lists = document.getElementsByClassName(className);
    Array.from(lists).forEach(list => {
        enableDragList(list);
    });
}

function enableDragList(list) {
    const items = list.getElementsByTagName("li");
    Array.from(items).forEach(item => {
        item.addEventListener("dragstart", handleDragStart);
        item.addEventListener("dragend", handleDragEnd);
        item.addEventListener("dragover", handleDragOver);
        item.addEventListener("drop", handleDrop);
    });
}

function handleDragStart(e) {
    e.target.classList.add("dragging");
    e.dataTransfer.setData("text/plain", e.target.id);
}

function handleDragEnd(e) {
    e.target.classList.remove("dragging");
}

function handleDragOver(e) {
    e.preventDefault();
    const draggingItem = document.querySelector(".dragging");
    if (!draggingItem) return;
    
    const siblings = [...e.target.parentNode.querySelectorAll("li:not(.dragging)")];
    const nextSibling = siblings.find(sibling => {
        const box = sibling.getBoundingClientRect();
        const offset = e.clientY - box.top - box.height / 2;
        return offset < 0;
    });
    
    if (nextSibling) {
        e.target.parentNode.insertBefore(draggingItem, nextSibling);
    }
}

function handleDrop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    const draggedItem = document.getElementById(id);
    const dropTarget = e.target.closest("li");
    
    if (dropTarget && draggedItem !== dropTarget) {
        const dropTargetParent = dropTarget.parentNode;
        const draggedItemParent = draggedItem.parentNode;
        
        if (dropTargetParent === draggedItemParent) {
            const dropTargetIndex = Array.from(dropTargetParent.children).indexOf(dropTarget);
            const draggedItemIndex = Array.from(draggedItemParent.children).indexOf(draggedItem);
            
            if (dropTargetIndex < draggedItemIndex) {
                dropTargetParent.insertBefore(draggedItem, dropTarget);
            } else {
                dropTargetParent.insertBefore(draggedItem, dropTarget.nextSibling);
            }
        }
    }
}

// Add this function to adjust column heights
function adjustColumnHeights() {
    const columns = document.querySelectorAll('.v-datalist-container');
    let maxHeight = 0;
    
    // Find the maximum height
    columns.forEach(column => {
        const height = column.offsetHeight;
        maxHeight = Math.max(maxHeight, height);
    });
    
    // Set all columns to the maximum height
    columns.forEach(column => {
        column.style.height = `${maxHeight}px`;
    });
}

export function refreshWorkingArea() {
    enableDragSort('drag-sort-enable');
    refreshObservations();
    setTimeout(adjustColumnHeights, 100);
}

export function enableDragItem(item) {
    item.setAttribute('draggable', true);
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragend', handleDragEnd);
    item.addEventListener('dragover', handleDragOver);
    item.addEventListener('drop', handleDrop);
}

export function refreshObservations() {
    document.getElementById('result').innerHTML = '';
    document.getElementById('table-head').innerHTML = '';
    document.getElementById('table-body').innerHTML = '';
}

export function resetSimulation() {
    // Reset all input fields
    document.getElementById('module-name').value = '';
    document.getElementById('tb-name').value = '';
    document.getElementById('module-name-tb').value = '';
    
    // Reset all selectors
    const selectors = [
        'input1-selector', 'input2-selector', 'input3-selector', 'output-selector',
        'clock-selector', 'reset-selector', 'reset-condition', 'output-assign',
        'reset-value', 'output-assign-else', 'input-assign',
        'reg1-selector', 'reg2-selector', 'reg3-selector', 'wire-selector',
        'port1-selector', 'port2-selector', 'port3-selector', 'port4-selector'
    ];
    
    selectors.forEach(selector => {
        const element = document.getElementById(selector);
        if (element) {
            element.selectedIndex = 0;
        }
    });
    
    // Reset observations
    refreshObservations();
    
    // Re-enable validate button
    const validateButton = document.querySelector('button[onclick="validateCode()"]');
    if (validateButton) {
        validateButton.disabled = false;
        validateButton.style.opacity = '1';
        validateButton.style.cursor = 'pointer';
    }
    
    // Reset code block order with random initial order
    const moduleBlocks = document.getElementById('module-blocks');
    const testbenchBlocks = document.getElementById('testbench-blocks');
    
    // Shuffle function
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    if (selectedTab === currentTab.SR) {
        // Reset to shift register with random order
        const moduleOrder = shuffle(['1', '2', '3', '4', '5', '6']);
        const testbenchOrder = shuffle(['1TB', '2TB', '3TB', '4TB', '5TB', '6TB', '7TB']);
        
        moduleOrder.forEach(id => {
            const block = document.getElementById(id);
            if (block) moduleBlocks.appendChild(block);
        });
        
        testbenchOrder.forEach(id => {
            const block = document.getElementById(id);
            if (block) testbenchBlocks.appendChild(block);
        });
    } else {
        // Reset to parallel register with random order
        const moduleOrder = shuffle(['1', '2', '3', '4', '5', '6']);
        const testbenchOrder = shuffle(['1TB', '2TB', '3TB', '4TB', '5TB', '6TB', '7TB']);
        
        moduleOrder.forEach(id => {
            const block = document.getElementById(id);
            if (block) moduleBlocks.appendChild(block);
        });
        
        testbenchOrder.forEach(id => {
            const block = document.getElementById(id);
            if (block) testbenchBlocks.appendChild(block);
        });
    }
}

export function display() {
    if (selectedTab === currentTab.PR) {
        // Update for parallel register
        document.getElementById("input1-selector").innerHTML = `
            <option value="" disabled selected>Select an input</option>
            <option value="clk">clk</option>
            <option value="rst">rst</option>
            <option value="d[3:0]">d[3:0]</option>
        `;
        document.getElementById("input2-selector").innerHTML = `
            <option value="" disabled selected>Select an input</option>
            <option value="clk">clk</option>
            <option value="rst">rst</option>
            <option value="d[3:0]">d[3:0]</option>
        `;
        document.getElementById("input3-selector").innerHTML = `
            <option value="" disabled selected>Select an input</option>
            <option value="clk">clk</option>
            <option value="rst">rst</option>
            <option value="d[3:0]">d[3:0]</option>
        `;
        document.getElementById("output-selector").innerHTML = `
            <option value="" disabled selected>Select an output</option>
            <option value="q[3:0]">q[3:0]</option>
        `;
        document.getElementById("reg1-selector").innerHTML = `
            <option value="" disabled selected>Select signal</option>
            <option value="clk">clk</option>
            <option value="rst">rst</option>
            <option value="d[3:0]">d[3:0]</option>
        `;
        document.getElementById("reg2-selector").innerHTML = `
            <option value="" disabled selected>Select signal</option>
            <option value="clk">clk</option>
            <option value="rst">rst</option>
            <option value="d[3:0]">d[3:0]</option>
        `;
        document.getElementById("reg3-selector").innerHTML = `
            <option value="" disabled selected>Select signal</option>
            <option value="clk">clk</option>
            <option value="rst">rst</option>
            <option value="d[3:0]">d[3:0]</option>
        `;
        document.getElementById("wire-selector").innerHTML = `
            <option value="" disabled selected>Select signal</option>
            <option value="q[3:0]">q[3:0]</option>
        `;
        
        // Update testbench code for parallel register
        document.getElementById("5TB").innerHTML = `
            <p>&nbsp;&nbsp;initial begin</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;clk = 0; rst = 1; d = 4'b0000;</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;#10 rst = 0;</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;#10 d = 4'b1010;</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;#10 d = 4'b0101;</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;#10 $finish;</p>
            <p>&nbsp;&nbsp;end</p>
        `;
    } else {
        // Reset to shift register options
        document.getElementById("input1-selector").innerHTML = `
            <option value="" disabled selected>Select an input</option>
            <option value="clk">clk</option>
            <option value="rst">rst</option>
            <option value="d">d</option>
        `;
        document.getElementById("input2-selector").innerHTML = `
            <option value="" disabled selected>Select an input</option>
            <option value="clk">clk</option>
            <option value="rst">rst</option>
            <option value="d">d</option>
        `;
        document.getElementById("input3-selector").innerHTML = `
            <option value="" disabled selected>Select an input</option>
            <option value="clk">clk</option>
            <option value="rst">rst</option>
            <option value="d">d</option>
        `;
        document.getElementById("output-selector").innerHTML = `
            <option value="" disabled selected>Select an output</option>
            <option value="q">q</option>
        `;
        document.getElementById("reg1-selector").innerHTML = `
            <option value="" disabled selected>Select signal</option>
            <option value="clk">clk</option>
            <option value="rst">rst</option>
            <option value="d">d</option>
        `;
        document.getElementById("reg2-selector").innerHTML = `
            <option value="" disabled selected>Select signal</option>
            <option value="clk">clk</option>
            <option value="rst">rst</option>
            <option value="d">d</option>
        `;
        document.getElementById("reg3-selector").innerHTML = `
            <option value="" disabled selected>Select signal</option>
            <option value="clk">clk</option>
            <option value="rst">rst</option>
            <option value="d">d</option>
        `;
        document.getElementById("wire-selector").innerHTML = `
            <option value="" disabled selected>Select signal</option>
            <option value="q">q</option>
        `;
        
        // Reset testbench code for shift register
        document.getElementById("5TB").innerHTML = `
            <p>&nbsp;&nbsp;initial begin</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;clk = 0; rst = 1; d = 0;</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;#10 rst = 0;</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;#10 d = 1;</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;#10 d = 0;</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;#10 $finish;</p>
            <p>&nbsp;&nbsp;end</p>
        `;
    }
    
    // Reset all selectors when switching modes
    const selectors = [
        'input1-selector', 'input2-selector', 'input3-selector', 'output-selector',
        'clock-selector', 'reset-selector', 'reset-condition', 'output-assign',
        'reset-value', 'output-assign-else', 'input-assign',
        'reg1-selector', 'reg2-selector', 'reg3-selector', 'wire-selector',
        'port1-selector', 'port2-selector', 'port3-selector', 'port4-selector'
    ];
    
    selectors.forEach(selector => {
        const element = document.getElementById(selector);
        if (element) {
            element.selectedIndex = 0;
        }
    });

    // Clear observation column when switching tabs
    refreshObservations();
    
    // Re-enable validate button when switching tabs
    const validateButton = document.querySelector('button[onclick="validateCode()"]');
    if (validateButton) {
        validateButton.disabled = false;
        validateButton.style.opacity = '1';
        validateButton.style.cursor = 'pointer';
    }
}

// Add this function at the top level
function isValidModuleName(name) {
    // Check if name is empty or contains special characters/hyphens
    return name && /^[a-zA-Z0-9_]+$/.test(name);
}

export function validateCode() {
    // Check if validation has already passed
    const resultDiv = document.getElementById("result");
    if (resultDiv.innerHTML.includes("All validations passed")) {
        return; // Don't allow re-validation if already passed
    }

    // Clear any existing truth table before validation
    document.getElementById('table-head').innerHTML = '';
    document.getElementById('table-body').innerHTML = '';

    const moduleName = document.getElementById("module-name").value;
    const tbName = document.getElementById("tb-name").value;
    const moduleNameTB = document.getElementById("module-name-tb").value;
    
    // Validate module names
    if (!isValidModuleName(moduleName)) {
        document.getElementById("result").innerHTML = `<div class="v-error" style="color: red; font-weight: bold;">Invalid module name. Use only letters, numbers, and underscores.</div>`;
        return;
    }
    
    if (!isValidModuleName(tbName)) {
        document.getElementById("result").innerHTML = `<div class="v-error" style="color: red; font-weight: bold;">Invalid testbench name. Use only letters, numbers, and underscores.</div>`;
        return;
    }
    
    // Check module name matching
    if (moduleName !== moduleNameTB) {
        document.getElementById("result").innerHTML = `<div class="v-error" style="color: red; font-weight: bold;">Module name in Verilog module (${moduleName}) does not match with module name in testbench (${moduleNameTB})</div>`;
        return;
    }
    
    // Check testbench name format
    if (!tbName.endsWith('_tb')) {
        document.getElementById("result").innerHTML = `<div class="v-error" style="color: red; font-weight: bold;">Testbench name should end with '_tb'</div>`;
        return;
    }
    
    // Validate code block order
    const moduleBlocks = document.getElementById('module-blocks');
    const testbenchBlocks = document.getElementById('testbench-blocks');
    
    // Check module block order
    const moduleOrder = Array.from(moduleBlocks.children).map(block => block.id);
    const correctModuleOrder = ['1', '2', '3', '4', '5', '6'];
    if (JSON.stringify(moduleOrder) !== JSON.stringify(correctModuleOrder)) {
        document.getElementById("result").innerHTML = `<div class="v-error" style="color: red; font-weight: bold;">Verilog module code blocks are not in correct order</div>`;
        return;
    }
    
    // Check testbench block order
    const testbenchOrder = Array.from(testbenchBlocks.children).map(block => block.id);
    const correctTestbenchOrder = ['1TB', '2TB', '3TB', '4TB', '5TB', '6TB', '7TB'];
    if (JSON.stringify(testbenchOrder) !== JSON.stringify(correctTestbenchOrder)) {
        document.getElementById("result").innerHTML = `<div class="v-error" style="color: red; font-weight: bold;">Testbench code blocks are not in correct order</div>`;
        return;
    }
    
    const input1 = document.getElementById("input1-selector").value;
    const input2 = document.getElementById("input2-selector").value;
    const input3 = document.getElementById("input3-selector").value;
    const output = document.getElementById("output-selector").value;
    const clock = document.getElementById("clock-selector").value;
    const reset = document.getElementById("reset-selector").value;
    const resetCondition = document.getElementById("reset-condition").value;
    const outputAssign = document.getElementById("output-assign").value;
    const resetValue = document.getElementById("reset-value").value;
    const outputAssignElse = document.getElementById("output-assign-else").value;
    const inputAssign = document.getElementById("input-assign").value;
    const reg1 = document.getElementById("reg1-selector").value;
    const reg2 = document.getElementById("reg2-selector").value;
    const reg3 = document.getElementById("reg3-selector").value;
    const wire = document.getElementById("wire-selector").value;
    const port1 = document.getElementById("port1-selector").value;
    const port2 = document.getElementById("port2-selector").value;
    const port3 = document.getElementById("port3-selector").value;
    const port4 = document.getElementById("port4-selector").value;

    if (selectedTab === currentTab.PR) {
        // Parallel Register Validation
        if (input1 !== "clk" || input2 !== "rst" || input3 !== "d[3:0]" || output !== "q[3:0]") {
            let errorMsg = "Inputs and outputs are not correctly defined. Expected: clk, rst, d[3:0], q[3:0]<br>";
            errorMsg += `Received: ${input1}, ${input2}, ${input3}, ${output}`;
            document.getElementById("result").innerHTML = `<div class="v-error" style="color: red; font-weight: bold;">${errorMsg}</div>`;
            return;
        }
        
        if (clock !== "clk" || reset !== "rst" || resetCondition !== "rst") {
            document.getElementById("result").innerHTML = `<div class="v-error" style="color: red; font-weight: bold;">Clock and reset signals are not correctly defined</div>`;
            return;
        }
        
        if (outputAssign !== "q" || resetValue !== "0" || outputAssignElse !== "q" || inputAssign !== "d") {
            document.getElementById("result").innerHTML = `<div class="v-error" style="color: red; font-weight: bold;">Register logic is not correctly defined</div>`;
            return;
        }
        
        if (reg1 !== "clk" || reg2 !== "rst" || reg3 !== "d[3:0]" || wire !== "q[3:0]") {
            let errorMsg = "Testbench signals are not correctly defined. Expected: reg clk, rst, d[3:0]; wire q[3:0]<br>";
            errorMsg += `Received: reg ${reg1}, ${reg2}, ${reg3}; wire ${wire}`;
            document.getElementById("result").innerHTML = `<div class="v-error" style="color: red; font-weight: bold;">${errorMsg}</div>`;
            return;
        }
        
        if (port1 !== "clk" || port2 !== "rst" || port3 !== "d" || port4 !== "q") {
            document.getElementById("result").innerHTML = `<div class="v-error" style="color: red; font-weight: bold;">Testbench port connections are not correct</div>`;
            return;
        }
    } else {
        // Shift Register Validation
        if (input1 !== "clk" || input2 !== "rst" || input3 !== "d" || output !== "q") {
            let errorMsg = "Inputs and outputs are not correctly defined. Expected: clk, rst, d, q<br>";
            errorMsg += `Received: ${input1}, ${input2}, ${input3}, ${output}`;
            document.getElementById("result").innerHTML = `<div class="v-error" style="color: red; font-weight: bold;">${errorMsg}</div>`;
            return;
        }
        if (clock !== "clk" || reset !== "rst" || resetCondition !== "rst") {
            document.getElementById("result").innerHTML = `<div class="v-error">Clock and reset signals are not correctly defined</div>`;
            return;
        }
        if (outputAssign !== "q" || resetValue !== "0" || outputAssignElse !== "q" || inputAssign !== "d") {
            document.getElementById("result").innerHTML = `<div class="v-error">Register logic is not correctly defined</div>`;
            return;
        }
        if (reg1 !== "clk" || reg2 !== "rst" || reg3 !== "d" || wire !== "q") {
            document.getElementById("result").innerHTML = `<div class="v-error">Testbench signals are not correctly defined</div>`;
            return;
        }
        if (port1 !== "clk" || port2 !== "rst" || port3 !== "d" || port4 !== "q") {
            document.getElementById("result").innerHTML = `<div class="v-error">Testbench port connections are not correct</div>`;
            return;
        }
    }
    
    // If all validations pass, show success message and truth table
    document.getElementById("result").innerHTML = `<div class="v-success" style="color: green; font-weight: bold;">All validations passed! The code is correct.</div>`;
    generateTruthTable();
    
    // Disable validate button after successful validation
    const validateButton = document.querySelector('button[onclick="validateCode()"]');
    if (validateButton) {
        validateButton.disabled = true;
        validateButton.style.opacity = '0.5';
        validateButton.style.cursor = 'not-allowed';
    }
}

export function generateTruthTable() {
    const tableHead = document.getElementById("table-head");
    const tableBody = document.getElementById("table-body");
    tableHead.innerHTML = "";
    tableBody.innerHTML = "";

    // Create header
    const headerRow = document.createElement("tr");
    const headers = selectedTab === currentTab.PR ? 
        ["Time", "clk", "rst", "d[3:0]", "q[3:0]"] : 
        ["Time", "clk", "rst", "d", "q"];
    headers.forEach(header => {
        const th = document.createElement("th");
        th.textContent = header;
        headerRow.appendChild(th);
    });
    tableHead.appendChild(headerRow);

    // Create body
    const times = [0, 5, 10, 15, 20, 25, 30, 35, 40];
    const expectedValues = selectedTab === currentTab.PR ? [
        [0, 1, "4'b0000", "4'b0000"],
        [1, 1, "4'b0000", "4'b0000"],
        [0, 0, "4'b0000", "4'b0000"],
        [1, 0, "4'b0000", "4'b0000"],
        [0, 0, "4'b1010", "4'b0000"],
        [1, 0, "4'b1010", "4'b1010"],
        [0, 0, "4'b0101", "4'b1010"],
        [1, 0, "4'b0101", "4'b0101"],
        [0, 0, "4'b0000", "4'b0101"]
    ] : [
        [0, 1, 0, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0],
        [1, 0, 0, 0],
        [0, 0, 1, 0],
        [1, 0, 1, 1],
        [0, 0, 0, 1],
        [1, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    times.forEach((time, index) => {
        const row = document.createElement("tr");
        const values = [time, ...expectedValues[index]];
        values.forEach(value => {
            const td = document.createElement("td");
            td.textContent = value;
            row.appendChild(td);
        });
        tableBody.appendChild(row);
    });
}

// Initialize the simulation
(() => { 
    display();
    // Initial shuffle of code blocks
    const moduleBlocks = document.getElementById('module-blocks');
    const testbenchBlocks = document.getElementById('testbench-blocks');
    
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    // Shuffle module blocks
    const moduleOrder = shuffle(['1', '2', '3', '4', '5', '6']);
    moduleOrder.forEach(id => {
        const block = document.getElementById(id);
        if (block) moduleBlocks.appendChild(block);
    });
    
    // Shuffle testbench blocks
    const testbenchOrder = shuffle(['1TB', '2TB', '3TB', '4TB', '5TB', '6TB', '7TB']);
    testbenchOrder.forEach(id => {
        const block = document.getElementById(id);
        if (block) testbenchBlocks.appendChild(block);
    });
    
    refreshWorkingArea();
    
    // Adjust column heights after content is loaded
    setTimeout(adjustColumnHeights, 100);
})();
