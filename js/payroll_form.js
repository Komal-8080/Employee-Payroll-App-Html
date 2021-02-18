window.addEventListener('DOMContentLoaded', (event) => {
    const name=document.querySelector('#name');
    const textError=document.querySelector('.text-error');
    name.addEventListener('input', function() {
        if(name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new EmployeePayrollData()).name = name.value;;
            textError.textContent="";
        }catch (e) {
            textError.textContent=e;
        }
    });

    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent=salary.value;
    salary.addEventListener('input', function() {
        output.textContent=salary.value;
    });
});

function save() {
    console.log("In SAVE");
    try {
        let employeePayrollData = createEmployeePayroll();
        console.log("My DAta",employeePayrollData);
        createAndUpdateStorage(employeePayrollData);
    } catch(e){
        console.log(e);
      //  return;
    }
}

const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    console.log("Created:");
   /* try {
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
    employeePayrollData.date = Date.parse(date);
    console.log(employeePayrollData.toString());
    alert(employeePayrollData.toString());
    return employeePayrollData;*/
}

const  getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems= [];
    allItems.forEach(item => {
        if(item.checked) selItems.push(items.value);
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