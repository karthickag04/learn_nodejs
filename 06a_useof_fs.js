/**
 * FILE SYSTEMS in Node.js - Comprehensive Guide
 * 
 * This file demonstrates:
 * ✓ Synchronous vs Asynchronous Methods
 * ✓ File Operations (Create, Read, Write, Update, Delete)
 * ✓ Directory Operations (Create, List, Remove)
 * 
 * The fs module provides both sync and async methods for file operations
 */

const fs = require('fs');
const path = require('path');

console.log("Session 06a - Advanced File System Operations");
console.log("=".repeat(50));

// ===========================================
// SYNCHRONOUS vs ASYNCHRONOUS METHODS
// ===========================================

console.log("\n1. SYNCHRONOUS vs ASYNCHRONOUS METHODS");
console.log("-".repeat(40));

// SYNCHRONOUS METHOD (Blocking)
// The program waits for the operation to complete before moving to the next line
console.log("Before synchronous file write");
try {
    fs.writeFileSync('sync_example.txt', 'This is written synchronously!');
    console.log("Synchronous write completed");
} catch (error) {
    console.error("Sync write error:", error.message);
}
console.log("After synchronous file write");

// ASYNCHRONOUS METHOD (Non-blocking)
// The program continues executing while the operation runs in the background
console.log("\nBefore asynchronous file write");
fs.writeFile('async_example.txt', 'This is written asynchronously!', (error) => {
    if (error) {
        console.error("Async write error:", error.message);
    } else {
        console.log("Asynchronous write completed (callback executed)");
    }
});
console.log("After asynchronous file write (but operation might still be running)");

// ===========================================
// FILE OPERATIONS
// ===========================================

console.log("\n\n2. FILE OPERATIONS");
console.log("-".repeat(40));

// CREATE and WRITE to files
console.log("\n2.1 Creating and Writing Files:");

// Method 1: writeFileSync (creates or overwrites)
fs.writeFileSync('student_data.txt', 'Student Name: John Doe\nAge: 20\nCourse: Computer Science');
console.log("✓ Created student_data.txt synchronously");

// Method 2: writeFile (asynchronous)
const studentInfo = {
    name: "Jane Smith",
    age: 22,
    course: "Mathematics",
    grade: "A"
};

fs.writeFile('student_json.txt', JSON.stringify(studentInfo, null, 2), (error) => {
    if (error) {
        console.error("Error creating student_json.txt:", error.message);
    } else {
        console.log("✓ Created student_json.txt asynchronously");
    }
});

// Method 3: appendFileSync (adds to existing file)
fs.appendFileSync('student_data.txt', '\nGrade: A+\nYear: 2024');
console.log("✓ Appended data to student_data.txt");

// READ files
console.log("\n2.2 Reading Files:");

// Synchronous read
try {
    const syncData = fs.readFileSync('student_data.txt', 'utf8');
    console.log("Synchronous read result:");
    console.log(syncData);
} catch (error) {
    console.error("Error reading file synchronously:", error.message);
}

// Asynchronous read
fs.readFile('student_data.txt', 'utf8', (error, data) => {
    if (error) {
        console.error("Error reading file asynchronously:", error.message);
    } else {
        console.log("\nAsynchronous read result:");
        console.log(data);
    }
});

// CHECK if file exists
console.log("\n2.3 Checking File Existence:");

// Method 1: fs.existsSync (synchronous)
const fileExists = fs.existsSync('student_data.txt');
console.log("Does student_data.txt exist?", fileExists);

// Method 2: fs.access (asynchronous)
fs.access('student_data.txt', fs.constants.F_OK, (error) => {
    if (error) {
        console.log("File does not exist or cannot be accessed");
    } else {
        console.log("✓ File exists and can be accessed");
    }
});

// GET file information (stats)
console.log("\n2.4 Getting File Statistics:");

try {
    const stats = fs.statSync('student_data.txt');
    console.log("File Statistics:");
    console.log("- Size:", stats.size, "bytes");
    console.log("- Is File:", stats.isFile());
    console.log("- Is Directory:", stats.isDirectory());
    console.log("- Created:", stats.birthtime);
    console.log("- Modified:", stats.mtime);
} catch (error) {
    console.error("Error getting file stats:", error.message);
}

// COPY files
console.log("\n2.5 Copying Files:");

try {
    fs.copyFileSync('student_data.txt', 'student_data_backup.txt');
    console.log("✓ File copied successfully (synchronous)");
} catch (error) {
    console.error("Error copying file:", error.message);
}

// RENAME/MOVE files
console.log("\n2.6 Renaming Files:");

setTimeout(() => {
    try {
        fs.renameSync('student_data_backup.txt', 'student_backup.txt');
        console.log("✓ File renamed successfully");
    } catch (error) {
        console.error("Error renaming file:", error.message);
    }
}, 1000);

// DELETE files
console.log("\n2.7 Deleting Files:");

setTimeout(() => {
    // Method 1: unlinkSync (synchronous)
    try {
        if (fs.existsSync('sync_example.txt')) {
            fs.unlinkSync('sync_example.txt');
            console.log("✓ Deleted sync_example.txt");
        }
    } catch (error) {
        console.error("Error deleting sync_example.txt:", error.message);
    }

    // Method 2: unlink (asynchronous)
    fs.unlink('async_example.txt', (error) => {
        if (error) {
            console.error("Error deleting async_example.txt:", error.message);
        } else {
            console.log("✓ Deleted async_example.txt");
        }
    });
}, 2000);

// ===========================================
// DIRECTORY OPERATIONS
// ===========================================

console.log("\n\n3. DIRECTORY OPERATIONS");
console.log("-".repeat(40));

// CREATE directories
console.log("\n3.1 Creating Directories:");

// Method 1: mkdirSync (synchronous)
try {
    fs.mkdirSync('test_folder');
    console.log("✓ Created test_folder synchronously");
} catch (error) {
    if (error.code === 'EEXIST') {
        console.log("Directory test_folder already exists");
    } else {
        console.error("Error creating directory:", error.message);
    }
}

// Method 2: mkdir (asynchronous)
fs.mkdir('async_folder', (error) => {
    if (error) {
        if (error.code === 'EEXIST') {
            console.log("Directory async_folder already exists");
        } else {
            console.error("Error creating async_folder:", error.message);
        }
    } else {
        console.log("✓ Created async_folder asynchronously");
    }
});

// Create nested directories
try {
    fs.mkdirSync('parent/child/grandchild', { recursive: true });
    console.log("✓ Created nested directories");
} catch (error) {
    console.error("Error creating nested directories:", error.message);
}

// READ directory contents
console.log("\n3.2 Reading Directory Contents:");

setTimeout(() => {
    // Synchronous read
    try {
        const files = fs.readdirSync('.');
        console.log("Current directory contents (sync):");
        files.forEach(file => {
            const stats = fs.statSync(file);
            const type = stats.isDirectory() ? '[DIR]' : '[FILE]';
            console.log(`  ${type} ${file}`);
        });
    } catch (error) {
        console.error("Error reading directory:", error.message);
    }

    // Asynchronous read
    fs.readdir('.', (error, files) => {
        if (error) {
            console.error("Error reading directory asynchronously:", error.message);
        } else {
            console.log("\nCurrent directory contents (async):");
            files.forEach(file => {
                console.log(`  ${file}`);
            });
        }
    });
}, 1500);

// CHECK if directory exists
console.log("\n3.3 Checking Directory Existence:");

const dirExists = fs.existsSync('test_folder');
console.log("Does test_folder exist?", dirExists);

// GET directory statistics
setTimeout(() => {
    try {
        const dirStats = fs.statSync('test_folder');
        console.log("\nDirectory Statistics:");
        console.log("- Is Directory:", dirStats.isDirectory());
        console.log("- Created:", dirStats.birthtime);
        console.log("- Modified:", dirStats.mtime);
    } catch (error) {
        console.error("Error getting directory stats:", error.message);
    }
}, 500);

// REMOVE directories
console.log("\n3.4 Removing Directories:");

setTimeout(() => {
    // Remove empty directory (synchronous)
    try {
        if (fs.existsSync('test_folder')) {
            fs.rmdirSync('test_folder');
            console.log("✓ Removed test_folder");
        }
    } catch (error) {
        console.error("Error removing test_folder:", error.message);
    }

    // Remove directory with contents (Node.js 14+)
    try {
        if (fs.existsSync('parent')) {
            fs.rmSync('parent', { recursive: true, force: true });
            console.log("✓ Removed parent directory and all contents");
        }
    } catch (error) {
        console.error("Error removing parent directory:", error.message);
    }

    // Remove directory asynchronously
    fs.rmdir('async_folder', (error) => {
        if (error) {
            console.error("Error removing async_folder:", error.message);
        } else {
            console.log("✓ Removed async_folder");
        }
    });
}, 3000);

// ===========================================
// ADVANCED FILE SYSTEM OPERATIONS
// ===========================================

console.log("\n\n4. ADVANCED OPERATIONS");
console.log("-".repeat(40));

// Working with file paths
console.log("\n4.1 Working with Paths:");

const filePath = path.join(__dirname, 'data', 'users.txt');
console.log("Constructed file path:", filePath);
console.log("Directory name:", path.dirname(filePath));
console.log("Base name:", path.basename(filePath));
console.log("Extension:", path.extname(filePath));

// File watching (monitoring changes)
console.log("\n4.2 File Watching:");

// Create a file to watch
const watchFile = 'watched_file.txt';
fs.writeFileSync(watchFile, 'Original content');

// Watch for changes
const watcher = fs.watch(watchFile, (eventType, filename) => {
    console.log(`File ${filename} was ${eventType}d`);
});

// Modify the file after a delay
setTimeout(() => {
    fs.appendFileSync(watchFile, '\nModified content');
    console.log("✓ Modified watched file");
}, 2000);

// Stop watching after 5 seconds
setTimeout(() => {
    watcher.close();
    console.log("✓ Stopped watching file");
    
    // Clean up
    if (fs.existsSync(watchFile)) {
        fs.unlinkSync(watchFile);
        console.log("✓ Cleaned up watched file");
    }
}, 5000);

// ===========================================
// ERROR HANDLING EXAMPLES
// ===========================================

console.log("\n\n5. ERROR HANDLING");
console.log("-".repeat(40));

// Handling errors in synchronous operations
try {
    const nonExistentFile = fs.readFileSync('does_not_exist.txt', 'utf8');
} catch (error) {
    console.log("Caught synchronous error:");
    console.log("- Error code:", error.code);
    console.log("- Error message:", error.message);
}

// Handling errors in asynchronous operations
fs.readFile('also_does_not_exist.txt', 'utf8', (error, data) => {
    if (error) {
        console.log("\nCaught asynchronous error:");
        console.log("- Error code:", error.code);
        console.log("- Error message:", error.message);
    } else {
        console.log("File content:", data);
    }
});

// ===========================================
// CLEANUP SECTION
// ===========================================

// Clean up created files after demonstration
setTimeout(() => {
    console.log("\n\n6. CLEANUP");
    console.log("-".repeat(40));
    
    const filesToCleanup = [
        'student_data.txt',
        'student_json.txt',
        'student_backup.txt'
    ];
    
    filesToCleanup.forEach(file => {
        try {
            if (fs.existsSync(file)) {
                fs.unlinkSync(file);
                console.log(`✓ Cleaned up ${file}`);
            }
        } catch (error) {
            console.error(`Error cleaning up ${file}:`, error.message);
        }
    });
    
    console.log("\n🎉 File system demonstration completed!");
    console.log("Key Takeaways:");
    console.log("- Synchronous methods block execution until complete");
    console.log("- Asynchronous methods allow other code to run while processing");
    console.log("- Always handle errors in file operations");
    console.log("- Use path module for cross-platform path handling");
    console.log("- Remember to clean up temporary files and directories");
    
}, 6000);

// Export for potential use in other modules
module.exports = {
    message: "Advanced File System Operations Demonstration",
    topics: [
        "Synchronous vs Asynchronous Methods",
        "File Operations (CRUD)",
        "Directory Operations",
        "Error Handling",
        "File Watching",
        "Path Utilities"
    ]
};
