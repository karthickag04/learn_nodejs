const os = require('os');

// Get the operating system platform
console.log('Platform:', os.platform());

// Get the CPU architecture
console.log('Architecture:', os.arch());

// Get total system memory
console.log('Total Memory:', os.totalmem());

// Get free system memory
console.log('Free Memory:', os.freemem());

// Get information about CPUs
console.log('CPU Info:', os.cpus());

// Get home directory
console.log('Home Directory:', os.homedir());