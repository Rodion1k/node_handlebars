const fileManager = require('./file_manager');

async function getAllStudents() {
    return await fileManager.read();
}

async function getStudentById(id) {
    let studentList = await getAllStudents();
    let student = studentList.find(student => student.id === id);
    if (student)
        return student;
    return Promise.reject(`Student with id=${id} not found`);
}

async function addStudent(student) {
    let studentList = await getAllStudents();
    let studentRes = studentList.find(s => s.id === student.id);
    if (studentRes)
        return Promise.reject(`Student with id=${student.id} already exists`);

    studentList.push(student);
    return await fileManager.write(studentList).then((data) => {
        return student;
    }).catch((err) => {
        return Promise.reject(err);
    });
}

async function updateStudent(student) {
    let studentList = await getAllStudents();
    let studentRes = studentList.find(s => s.id === student.id);
    if (!studentRes)
        return Promise.reject(`Student with id=${student.id} not found`);

    studentList = studentList.map(s => s.id === student.id ? student : s);
    return await fileManager.write(studentList).then((data) => {
        return student;
    }).catch((err) => {
        return Promise.reject(err);
    });

}

async function deleteStudent(id) {
    let studentList = await getAllStudents();
    let student = studentList.find(student => student.id === id);
    if (!student)
        return Promise.reject(`Student with id=${id} not found`);

    studentList = studentList.filter(s => s.id !== id);
    return await fileManager.write(studentList).then((data) => {
        return student;
    }).catch((err) => {
        return Promise.reject(err);
    });
}

async function backup() {
    const date = new Date();
    const formattedDate = createBackupDate(date);
    return await fileManager.copyFile(`${__dirname}\\studentList.json`, `${__dirname}\\backupFiles\\${formattedDate}studentListBackup.json`);
}

async function cleanBackup(dateString) {
    const date = getDateFromYYYYDDMM(dateString);
    const backupFiles = await fileManager.readDir(`${__dirname}\\backupFiles`);
    const filesToDelete = backupFiles.filter(file => getDateFromBackupFile(file) < date);
    return await Promise.all(filesToDelete.map(file => fileManager.deleteFile(`${__dirname}\\backupFiles\\${file}`)));
}

async function getBackupFiles() {
    return await fileManager.readDir(`${__dirname}\\backupFiles`);
}

function watchDir(serverRPC) {
    return fileManager.watchDir(serverRPC, `${__dirname}\\backupFiles`);
}

const getDateFromYYYYDDMM = (dateString) => {
    const year = dateString.slice(0, 4);
    const day = dateString.slice(4, 6);
    const month = dateString.slice(6);
    return new Date(year, month, day);
}

const getDateFromBackupFile = (file) => {
    let date = file.split('studentListBackup.json')[0];
    date = date.split('-');
    return new Date(date);
}

const createBackupDate = (date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
module.exports.fileService = {
    getAllStudents,
    getStudentById,
    addStudent,
    updateStudent,
    deleteStudent,
    backup,
    cleanBackup,
    getBackupFiles,
    watchDir,
}