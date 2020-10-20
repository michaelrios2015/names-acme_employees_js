// Skip to main content
// I am looking for...
// Video Classroom
// Workshops
// Calendar
// Checkpoints
// Support 

// LESSON COMMENTS (0) 
// Acme - Employee Management JS > The Task
// The Task
// The Acme Company keeps track of their management structure in an array.

// Your task is to write some functions to help them find information about them.

// Put your solution in a github repo names acme_employees_js.


const employees = [
  { id: 1, name: 'moe'},
  { id: 2, name: 'larry', managerId: 1},
  { id: 4, name: 'shep', managerId: 2},
  { id: 3, name: 'curly', managerId: 1},
  { id: 5, name: 'groucho', managerId: 3},
  { id: 6, name: 'harpo', managerId: 5},
  { id: 8, name: 'shep Jr.', managerId: 4},
  { id: 99, name: 'lucy', managerId: 1}
];




const spacer = (text)=> {
  if(!text){
    return console.log('');
  }
  const stars = new Array(5).fill('*').join('');
  console.log(`${stars} ${text} ${stars}`);
}

const findEmployeeByName = (name, arr) => 
{
  
  for (let i =0 ; i<arr.length; i++){

    //console.log(arr[i]['name']);

    if (arr[i]['name'] === name){
      return arr[i];
    }

  }

//console.log(name);



};

spacer('findEmployeeByName Moe')
// given a name and array of employees, return employee
console.log(findEmployeeByName('moe', employees));//{ id: 1, name: 'moe' }
spacer('')


const findManagerFor = (employee, arr) => {

  // console.log(employee);
  // console.log(employee['managerId']);

  //think i am supposed to use reduce
  for (let i =0 ; i<arr.length; i++){

    //console.log(arr[i]['name']);

    if (arr[i]['id'] === employee['managerId']){
      return arr[i];
    }

  }


}

spacer('findManagerFor Shep Jr.')
//given an employee and a list of employees, return the employee who is the manager
console.log(findManagerFor(findEmployeeByName('shep Jr.', employees), employees));//{ id: 4, name: 'shep', managerId: 2 }
spacer('')



const findCoworkersFor= (employee, employees) => {

//console.log(findManagerFor(employee, employees));

const manager = findManagerFor(employee, employees);
const coworkers = [];
  //think i am supposed to use reduce
  for (let i = 0 ; i < employees.length; i++){

    //console.log(arr[i]['name']);

    if (employees[i]['managerId'] === manager['id'] && employees[i]['name'] != employee['name']){
      coworkers.push(employees[i]);
    }

  }

return coworkers;

}


spacer('findCoworkersFor Larry')

//given an employee and a list of employees, return the employees who report to the same manager
console.log(findCoworkersFor(findEmployeeByName('larry', employees), employees));/*
[ { id: 3, name: 'curly', managerId: 1 },
  { id: 99, name: 'lucy', managerId: 1 } ]
*/

spacer('');


//this works but can be made simplier will come back to it :)
const findManagementChainForEmployee = (employee, employees) =>{

  //set managerID

  //finds first manager
  let manager = findManagerFor(employee, employees);

  //first manager does not exisit
if (manager === undefined){
  return [];
}

  // manager = manager.managerId;
  // console.log("managerID");
  // console.log(manager);


  //make array to psuh in managers

  const managers = [];

  //put in first manager 
  managers.push(manager);


  // check for mor
  while (manager.managerId){

    manager = findManagerFor(manager, employees);

    if (manager === undefined){
      break;
    }

    managers.push(manager);

  }


 return managers.reverse();

}


spacer('findManagementChain for moe')
//given an employee and a list of employees, return a the management chain for that employee. The management chain starts from the employee with no manager 
//with the passed in employees manager 
console.log(findManagementChainForEmployee(findEmployeeByName('moe', employees), employees));//[  ]
spacer('');

spacer('findManagementChain for shep Jr.')
console.log(findManagementChainForEmployee(findEmployeeByName('shep Jr.', employees), employees));/*
[ { id: 1, name: 'moe' },
  { id: 2, name: 'larry', managerId: 1 },
  { id: 4, name: 'shep', managerId: 2 }]
*/
spacer('');


const generateManagementTree = (employees) => {

  //let's start with moe..hmm can't start with moe or at least non of the 
  //functions are set up to start with moe 

  const managementTree = Object.assign({}, employees[0]);

  managementTree.reports = [];


  for (let i =1; i< employees.length; i++){

    const managmentChain = findManagementChainForEmployee(employees[i], employees); 
  // console.log(findManagementChainForEmployee(employees[i], employees));
  
  if (managmentChain.length === 1){
    const copy = Object.assign({}, employees[i]);
    copy.reports = [];
    managementTree.reports.push(copy);
  }

  if (managmentChain.length === 2){
    //can pretty much do the same thing but need to find who to attach it to
    const copy = Object.assign({}, employees[i]);
    copy.reports = [];
    //console.log(employees[i].managerId);
    for (let j =0; j<managementTree.reports.length; j++){
      if (employees[i].managerId === managementTree.reports[j].id){
        managementTree.reports[j].reports.push(copy);
      }
    }
    //managementTree.reports.push(copy);
  }

  if (managmentChain.length === 3){
    //can pretty much do the same thing but need to find who to attach it to
    const copy = Object.assign({}, employees[i]);
    copy.reports = [];
    console.log(employees[i].managerId);
    for (let j =0; j<managementTree.reports.length; j++){
      for (let k =0; k<managementTree.reports[j].reports.length; k++){
        if (employees[i].managerId === managementTree.reports[j].reports[k].id){
          managementTree.reports[j].reports[k].reports.push(copy);
        }
        }
    //managementTree.reports.push(copy);
        }


  }

}
return managementTree;
  

}



spacer('generateManagementTree')
//given a list of employees, generate a tree like structure for the employees, starting with the employee who has no manager. 
//Each employee will have a reports property which is an array of the employees who report directly to them.
console.log(JSON.stringify(generateManagementTree(employees), null, 2));
/*
{
  "id": 1,
  "name": "moe",
  "reports": [
    {
      "id": 2,
      "name": "larry",
      "managerId": 1,
      "reports": [
        {
          "id": 4,
          "name": "shep",
          "managerId": 2,
          "reports": [
            {
              "id": 8,
              "name": "shep Jr.",
              "managerId": 4,
              "reports": []
            }
          ]
        }
      ]
    },
    {
      "id": 3,
      "name": "curly",
      "managerId": 1,
      "reports": [
        {
          "id": 5,
          "name": "groucho",
          "managerId": 3,
          "reports": [
            {
              "id": 6,
              "name": "harpo",
              "managerId": 5,
              "reports": []
            }
          ]
        }
      ]
    },
    {
      "id": 99,
      "name": "lucy",
      "managerId": 1,
      "reports": []
    }
  ]
}
*/
spacer('');

spacer('displayManagementTree')
//given a tree of employees, generate a display which displays the hierarchy
displayManagementTree(generateManagementTree(employees));/*
moe
-larry
--shep
---shep Jr.
-curly
--groucho
---harpo
-lucy
*/
// NEXT LESSON
// Feedback: Let us know what you think!


// © 2020 Fullstack Academy. All content provided on this website is owned by Fullstack Academy and licensed to the user only for the use of their own personal study. This content may not be saved, copied or re-produced in any way without express written permission from Fullstack Academy.Report a bug
