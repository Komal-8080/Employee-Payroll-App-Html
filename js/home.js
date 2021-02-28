var empPayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
    if (site_properties.use_local_storage.match("true")) {
        getEmployeePayrollDataFromStorage();
    }else 
        getEmployeePayrollDataFromServer();
});

function getEmployeePayrollDataFromStorage() {
    empPayrollList = localStorage.getItem('EmployeePayrollList') ?
                        JSON.parse(localStorage.getItem('EmployeePayrollList')) : [] ;
    processEmployeePayrollDataResponse();
}

function processEmployeePayrollDataResponse() {
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
}

function getEmployeePayrollDataFromServer() {
    makeServiceCall("GET", site_properties.server_url, true)
        .then(responseText => {
            employeePayrollList = JSON.parse(responseText);
            processEmployeePayrollDataResponse();
        })
        .catch(error => {
            console.log("GET Error Status: "+JSON.stringify(error));
            empPayrollList = [];
            processEmployeePayrollDataResponse();
        });
}

function createInnerHtml() {
    console.log(empPayrollList);
    if(empPayrollList.length == 0) return;
    const headerHtml = " <th>Profile</th><th>Name</th><th>Gender</th><th>Department</th>"+
                        "<th>Salary</th><th>Start Date</th><th>Actions</th>";    
    let innerHtml = `${headerHtml}`;   
    for(const empPayrollData of empPayrollList) {
        innerHtml= `${innerHtml}
        <tr>
            <td><img class ="profile" src="${empPayrollData._profilePic}" alt=""></td>
            <td>${empPayrollData._name}</td>
            <td>${empPayrollData._gender}</td>
            <td>${getDeptHtml(empPayrollData._department)}</td>
            <td>${empPayrollData._salary}</td>
            <td>${stringifyDate(empPayrollData._startDate)}</td>
            <td>
                <img id="${empPayrollData.id}" onclick="remove(this)" 
                           src="../assets/icons/delete-black-18dp.svg" alt="delete" >
                <img id="${empPayrollData.id}" onclick="update(this)" 
                           src="../assets/icons/create-black-18dp.svg"  alt="edit">
            </td>
        </tr> 
        `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}

function getDeptHtml(deptList) {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml} <div class = 'dept-label'>${dept}</div>`
    }
    return deptHtml;
}

function remove(node) {
    var empPayrollData = empPayrollList.find(empData => empData.id == node.id);
    if(!empPayrollData) return;
    const index = empPayrollList
                 .map(empData => empData.id)
                 .indexOf(empPayrollData.id);
    empPayrollList.splice(index, 1);
    if (site_properties.use_local_storage.match("true")) {
        localStorage.setItem("EmployeePayrollList", JSON.stringify(empPayrollList));
        createInnerHtml();
    }else {
        const deleteURL = site_properties.server_url + empPayrollData.id.toString();
        makeServiceCall("DELETE", deleteURL,false)
            .then(responseText => {
                createInnerHtml();
            }).catch(error => {
                console.log("DELETE Error Status: " +JSON.stringif(error))
                  })
    }
    // localStorage.setItem("EmployeePayrollList", JSON.stringify(empPayrollList));
    // document.querySelector(".emp-count").textContent = empPayrollList.length
    // createInnerHtml();
}

function update(node) {
    let empPayrollData = empPayrollList.find(empData => empData.id == node.id)
    if (!empPayrollData) return;
    localStorage.setItem('editEmp', JSON.stringify(empPayrollData))
    window.location.replace(site_properties.add_emp_payroll_page);
}