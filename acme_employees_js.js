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

const findEmployeeByName = (name, arr) => {
  
  //console.log("find employees name")
   
  return arr.filter(item => item.name === name)[0];
  // for (let i =0 ; i<arr.length; i++){
  //   //console.log(arr[i]['name']);
  //   if (arr[i]['name'] === name){
  //     return arr[i];
  //   }
  // }



};

spacer('findEmployeeByName Moe')
// given a name and array of employees, return employee
console.log(findEmployeeByName('moe', employees));//{ id: 1, name: 'moe' }
spacer('')


const findManagerFor = (employee, arr) => {

 
  return arr.filter(item => item.id === employee['managerId'])[0];

  // for (let i =0 ; i<arr.length; i++){
  //   //console.log(arr[i]['name']);
  //   if (arr[i]['id'] === employee['managerId']){
  //     return arr[i];
  //   }
  // }


}

spacer('findManagerFor Shep Jr.')
//given an employee and a list of employees, return the employee who is the manager
console.log(findManagerFor(findEmployeeByName('shep Jr.', employees), employees));//{ id: 4, name: 'shep', managerId: 2 }
spacer('')



const findCoworkersFor= (employee, employees) => {

//find the manager 
const manager = findManagerFor(employee, employees);


return employees.filter(item => item['managerId'] === manager['id'] && item['name'] != employee['name']);

// const coworkers = [];
//   //think i am supposed to use reduce
//   for (let i = 0 ; i < employees.length; i++){
//     if (employees[i]['managerId'] === manager['id'] && employees[i]['name'] != employee['name']){
//       coworkers.push(employees[i]);
//     }

//   }

// return coworkers;

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

//no recursive way   
//first manager
//   let manager = findManagerFor(employee, employees);
//  //an array to store managers
//   const arr = []

//  //keep going until we reach the top 
//  while (manager != undefined) {
   
//      arr.push(manager);
//      manager = findManagerFor(manager, employees)
//   }

//   //reverse the aray and return it
//   return arr.reverse();



//an atttempt at recursive it works but managers are put in three different array... not sure how to carray an array over unless it's global but that 
//could have other problems
  //let manager = findManagerFor(employee, employees);

  //with recursion
  //const arr = []
  //the employee does not have a manager ID therefor no manager so return an empty array
  if (!employee.managerId){
    //debugger;
    return [];
  } else {

    //We call find management chain again but this time on the manager of the first employee
    //so this moves us up the management chain at which point it becomes and [] then it works it way back down 
    
    const manager = findManagementChainForEmployee(findManagerFor(employee, employees), employees);
    // console.log("manager one");
    // console.log(manager);

    //console.log(findManagerFor(employee, employees));
    //it does not start pushing until after it has reached the top and is coming down again 
    manager.push(findManagerFor(employee, employees));
    //console.log("manager");
    //console.log(manager);
    //returns the array which now has the manager(s) pushed into it.  
    return manager;
  }

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


//how vince did it pretty sure there most be a way to do it that uses the functions already created
//I understand how vince did it though should try to write my own.. going to go back to yesterdays assignment first  
function generateManagementTree(list) {
 
  function getDirectReports(manager, list){
    //employees directly under the manager  
    const employeeList = list.filter((item) => manager.id === item.managerId);
      
      console.log("employeeList");
      console.log(employeeList);
      //no one is under the manager just add an empty array
      if (employeeList.length === 0){
          manager.reports = [];
          //why do you need to return?? I guess the obj is not modified until returned 
          return manager;
        } else {
          //go through each employee
          employeeList.forEach((employee) => {
            //see if they manage anyone
            const person = getDirectReports(employee, list);
            if (manager.reports) {
              //if the reports array was all ready created push them into array
              manager.reports.push(person);
            } else {
              //create reprts and put person in it
              manager.reports = [person];
            }
          });
        return manager;
        } 
  }

  newList = list.map((item) => Object.assign({}, item));
  
  //console.log(newList);

  //we send in the big boss moe and the list 
  return getDirectReports(findEmployeeByName('moe', newList), newList);

}


//was trying to think of a better solution
// const generateManagementTree = (employees) => {

//   //let's start with moe..hmm can't start with moe or at least none of the 
  
//   //makes and object, puts Moe in first  
//   const managementTree = Object.assign({}, employees[0]);

//   //adds a report for Moe
//   managementTree.reports = [];


//   //going through all the employees
//   for (let i = 1; i < employees.length; i++){

//     //get the management chain
//     const managmentChain = findManagementChainForEmployee(employees[i], employees); 
  
//     for (let j = 1; j < managmentChain.length; j++){
      
            
 

//       //way to many if statements  
//   if (managmentChain.length === 1){
//     const copy = Object.assign({}, employees[i]);
//     copy.reports = [];
//     managementTree.reports.push(copy);
//   }

// }



// const generateManagementTree = (employees) => {

//   //let's start with moe..hmm can't start with moe or at least non of the 
  
//   //makes and object, puts Moe in first  
//   const managementTree = Object.assign({}, employees[0]);

//   //adds a report for Moe
//   managementTree.reports = [];


//   //going through all the employees
//   for (let i =1; i< employees.length; i++){

//     //get the management chain
//     const managmentChain = findManagementChainForEmployee(employees[i], employees); 
  
//   //way to many if statements  
//   if (managmentChain.length === 1){
//     const copy = Object.assign({}, employees[i]);
//     copy.reports = [];
//     managementTree.reports.push(copy);
//   }

//   if (managmentChain.length === 2){
//     //can pretty much do the same thing but need to find who to attach it to
//     const copy = Object.assign({}, employees[i]);
//     copy.reports = [];
//     //console.log(employees[i].managerId);
//     for (let j =0; j<managementTree.reports.length; j++){
//       if (employees[i].managerId === managementTree.reports[j].id){
//         managementTree.reports[j].reports.push(copy);
//       }
//     }
//     //managementTree.reports.push(copy);
//   }

//   if (managmentChain.length === 3){
//     //can pretty much do the same thing but need to find who to attach it to
//     const copy = Object.assign({}, employees[i]);
//     copy.reports = [];
//     console.log(employees[i].managerId);
//     for (let j =0; j<managementTree.reports.length; j++){
//       for (let k =0; k<managementTree.reports[j].reports.length; k++){
//         if (employees[i].managerId === managementTree.reports[j].reports[k].id){
//           managementTree.reports[j].reports[k].reports.push(copy);
//         }
//         }
//     //managementTree.reports.push(copy);
//         }


//   }

// }
// return managementTree;
  

// }



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

// displayManagementTree(generateManagementTree(employees));
/*

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
