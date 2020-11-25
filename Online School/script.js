// class School {
//     constructor (name, level, numberOfStudents) {
//         this._name = name;
//         this._level = level;
//         this._numberOfStudents = numberOfStudents
//     }
//     get name () {
//        return this._name 
//     }
//     get level () {
//         return this._level
//     }
//     get numberOfStudents () {
//         return this._numberOfStudents
//     }
//     set numberOfStudents (num) {
//         this._numberOfStudents = num
//     }
//     quickFacts () {
//         return `${this.name} educates ${this.numberOfStudents} students at the ${this.level} school level.`
//     }
// ​
//     static pickSubstituteTeacher (substituteTeachers) {
//         let randomTeacher =Math.floor(Math.random() * substituteTeachers.length);
//         return substituteTeachers[randomTeacher]
//     }
// }
// ​
// class Primary extends School {
//     constructor (name, level, numberOfStudents, pickupPolicy) {
//         super (name, level, numberOfStudents)
//         this._pickupPolicy = pickupPolicy
//     }
// ​
//     get pickupPolicy () {
//         return this._pickupPolicy
//     }
// }
// ​
// class Middle extends School {
//     constructor (name, level, numberOfStudents) {
//         super (name, level, numberOfStudents)
//     }
// }
// ​
// class High extends School {
//     constructor (name, level, numberOfStudents, sportsTeam) {
//         super (name, level, numberOfStudents)
//         this._sportsTeam = sportsTeam
//     }
// ​
//     get sportsTeam () {
//         return this._sportsTeam
//     }
// }
// ​
// const sierraNevada = new Primary('Sierre Nevada', 'primary', 422, 'Student must be picked up by a parent, guardian, or a family member over the age of 15.');
// ​
// //console.log(sierraNevada.quickFacts())
// ​
// let subTech = ['Marisol Chandler', 'Morin Marcia Walsh', 'Walton Pratt Wiley', 'Lou Williams', 'J. R. Burton', 'Allen Downs', 'Salinas Mcclain', 'Nancy Miles'];
// ​
// //console.log(School.pickSubstituteTeacher(subTech))
// ​
// const elkhart = new High('Elkhart', 'highschool', 515, ['Baseball', 'Basketball', 'Volleyball', 'Ice Hockey']);
// ​
// console.log(elkhart.sportsTeam)

////////////////////////
// DOM and LOCAL STORAGE
////////////////////////


class AddSchool {
    constructor (schoolType, title, numStudents, pickup, sportTeam, overV) {
        this.schoolType = schoolType,
        this.titleSchool = title,
        this.numberStudent = numStudents,
        this.pickPol = pickup,
        this.sports = sportTeam,
        this.overV = overV
    }
}

class Store {
    static getItems () {
        let catalogs;
        if (localStorage.getItem('catalogs') === null) {
            catalogs = []
            } else {
                catalogs = JSON.parse(localStorage.getItem('catalogs'))
            }

            return catalogs
    }

    static addItem (item) {
        const catalogs = Store.getItems();
        catalogs.push(item);
        localStorage.setItem('catalogs', JSON.stringify(catalogs));
    }

    static removeItem (st, stm, pp, ns, ts) {
        const catalogs = Store.getItems();

        for (let i = 0; i < catalogs.length; i++) {
            if (catalogs[i].overV == st && catalogs[i].sports == stm && catalogs[i].pickPol == pp && catalogs[i].numberStudent == ns && catalogs[i].titleSchool == ts) {
                catalogs.splice(i, 1)
                
            }
        }
        console.log(catalogs)
        localStorage.setItem('catalogs', JSON.stringify(catalogs))
    }
 }

 class UI {
     static displayItems () {
         const catalogs = Store.getItems();
         catalogs.forEach((item) => UI.addItemToList(item));
     }

     static addItemToList (item) {
         const list = document.querySelector('#item-list')

         const row = document.createElement('tr')
            
        row.innerHTML = `
        <td class="text-center">${item.schoolType}</td>
        <td class="text-center">${item.titleSchool}</td>
        <td class="text-center">${item.numberStudent}</td>
        <td class="text-center">${item.pickPol}</td>
        <td class="text-center">${item.sports}</td>
        <td class="text-center">${item.overV}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row)
     }

     static deleteItem (el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove()
        }
     }

     static showAlert (message, className) {
         const div = document.createElement('div')
         div.className = `alert alert-${className}`
         div.appendChild(document.createTextNode(message))
         const container = document.querySelector('.container')
         const form = document.querySelector('.schoolForm')
         container.insertBefore(div, form)

         //setTimeOut
         setTimeout(() => document.querySelector('.alert').remove(), 2000)
     }

     static clearFields () {
        document.querySelector('#titleOfSchool').value = '';
        document.querySelector('#studentsNumber').value = '';
        document.querySelector('#pickupPolicy').value = '';
        document.querySelector('#sportsTeams').value = '';
        document.querySelector('#schoolOverview').value = '';
     }
 }

 // Event: dislay items

 document.addEventListener('DOMContentLoaded', UI.displayItems)

 // Event: add item
 document.querySelector('#submit_btn').addEventListener('click', (e) => {
     // prevent actual submit
     e.preventDefault();

     //get form values
     let schoolType = document.querySelector('#schoolTypeSelect').value;

     let title = document.getElementById('titleOfSchool').value;
     
     let numStudents = document.getElementById('studentsNumber').value;
     
     let pickup = document.getElementById('pickupPolicy').value;
     
     let sportTeam = document.getElementById('sportsTeams').value;
     
     let overview = document.querySelector('#schoolOverview').value;

    //validate
    if (title === '' || numStudents === '' || pickup === '' || sportTeam === '' || overview === '') {
        UI.showAlert('Please fill in all fields', 'danger')
    } else {
        // instantiate item
        const school = new AddSchool(schoolType, title,numStudents, pickup, sportTeam, overview)

        // add item to UI
        UI.addItemToList(school)

        // add item to store
        Store.addItem(school)

        // show success message
        UI.showAlert('Book Added', 'succes')

        // clear fields
        UI.clearFields()
    }
 })

 //Event : remove item

document.querySelector('#item-list').addEventListener('click', (e) => {
    //remove item from UI
    UI.deleteItem(e.target)

    //remove item from store
    let st = e.target.parentElement.previousElementSibling.textContent
    let stm = e.target.parentElement.previousElementSibling.previousElementSibling.textContent
    let pp = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent
    let ns = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent
    let ts = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent

    Store.removeItem(st, stm, pp, ns, ts)

    //show success message
    UI.showAlert('Book Removed', 'success')
})
