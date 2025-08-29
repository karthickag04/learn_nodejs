const fs = require('fs');

//  fs: File system operations

// Write to a file
fs.writeFileSync('example.txt', 'Hello, this is a file created using Node.js!');

// Read from the file
const data = fs.readFileSync('example.txt', 'utf8');
console.log('File contents:', data);

// fs.mkdir("newfolder", (err) => {
//   if (err) {
//     console.error('Error creating directory:', err);
//   } else {
//     console.log('Directory created successfully!');
//   }
// });


fs.rmdir("newfolder", (err) => {
  if (err) {
    console.error('Error removing directory:', err);
  } else {
    console.log('Directory removed successfully!');
  }
});