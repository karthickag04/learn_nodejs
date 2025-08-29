console.log("Session 01a Test with data:");

const data = {
    name: "John Doe",
    age: 30
};

const namelist = ["Ravi", "John", "Doe"];

console.log("Data printed from where it declared:", data);
console.log("Name List printed from where it declared:", namelist);

module.exports = { data, namelist };
module.exports = { studentdata : data, studentnamelist : namelist };