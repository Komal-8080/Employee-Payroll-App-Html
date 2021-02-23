window.addEventListener('DOMContentLoaded', (event) => {
    const name=document.querySelector('#name');
    const textError=document.querySelector('.text-error');
    name.addEventListener('input', function() {
        if(name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new EmployeePayrollData()).name = name.value;
            textError.textContent="";
        }catch (e) {
            textError.textContent=e;
        }
    });
   
    const day = document.querySelector('#day');
    const year = document.querySelector('#year');
    const month = document.querySelector('#month');
    const dateError = document.querySelector('.date-error');
    [day, month, year].forEach(item => item.addEventListener('input', function () {
        if (month.value == 1) {
            if (isLeapYear(year.value)) {
                if (day.value > 29) {
                    dateError.textContent = "Invalid Date!";
                } else dateError.textContent = "";
            } else {
                if (day.value > 28) {
                    dateError.textContent = "Invalid Date!";
                } else dateError.textContent = "";
            }
        }
        if (month.value == 3 || month.value == 5 || month.value == 8 || month.value == 10) {
            if (day.value > 30) {
                dateError.textContent = "Invalid Date!";
            } else dateError.textContent = "";
        }
    }));

    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent=salary.value;
    salary.addEventListener('input', function() {
        output.textContent=salary.value;
    });

    checkForUpdate();

 });

const save = ()  => {
    try {
        let employeePayrollData = createEmployeePayroll();
        console.log(employeePayrollData);
        createAndUpdateStorage(employeePayrollData);
    } catch(e) {
         return;
    }
}

function createAndUpdateStorage(employeePayrollData) {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if (employeePayrollList != undefined) {
        employeePayrollList.push(employeePayrollData);
    }else {
        employeePayrollList = [employeePayrollData]
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList))
}

const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    try {
        employeePayrollData.name = getInputValueById('#name');
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.note = getInputValueById('#notes');
    let date = getInputValueById('#day') +" "+getInputValueById('#month')+" "+getInputValueById('#year');
    employeePayrollData.date = date;
    let employeePayrollList1 = JSON.parse(localStorage.getItem("EmployeePayrollList"));
        if (employeePayrollList1 == undefined)
            employeePayrollData.id = 1;
        else employeePayrollData.id = employeePayrollList1.length + 1;
    alert(employeePayrollData.toString());
    return employeePayrollData;
}

const  getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems= [];
    allItems.forEach(item => {
        if(item.checked) selItems.push(item.value);
    });
    return selItems;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const getInputElementValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
}

const resetForm = () => {
    setValue("#name", '');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary','');
    setValue('#notes','');
    setValue('#day','1');
    setValue('#month','January');
    setValue('#year','2021');
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    })
}

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue = (id, value ) => {
    const element = document.querySelector(id);
    element.value = value;
}

const setSelectedIndex = (id, index) => {
    const element = document.querySelector(id);
    element.selectedIndex = index;
}
