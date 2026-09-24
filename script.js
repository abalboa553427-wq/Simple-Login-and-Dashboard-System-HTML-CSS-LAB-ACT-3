/* =========================================
   GET REGISTERED STUDENTS
========================================= */

function getStudents() {

    const students = localStorage.getItem("students");

    if (students) {
        return JSON.parse(students);
    }

    return [];
}


/* =========================================
   SAVE STUDENTS
========================================= */

function saveStudents(students) {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

}


/* =========================================
   REGISTER
========================================= */

const registerForm =
    document.getElementById("registerForm");


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const fullname =
                document.getElementById("fullname").value.trim();

            const username =
                document.getElementById("username").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const course =
                document.getElementById("course").value.trim();

            const password =
                document.getElementById("password").value;

            const confirmPassword =
                document.getElementById("confirmPassword").value;

            const message =
                document.getElementById("registerMessage");


            /* CHECK PASSWORD */

            if (password !== confirmPassword) {

                message.textContent =
                    "Passwords do not match.";

                message.className =
                    "message error";

                return;
            }


            /* GET EXISTING STUDENTS */

            const students = getStudents();


            /* CHECK USERNAME */

            const usernameExists =
                students.some(
                    function (student) {
                        return student.username === username;
                    }
                );


            if (usernameExists) {

                message.textContent =
                    "Username is already registered.";

                message.className =
                    "message error";

                return;
            }


            /* CREATE NEW STUDENT */

            const newStudent = {

                id: students.length + 1,

                fullname: fullname,

                username: username,

                email: email,

                course: course,

                password: password

            };


            /* ADD STUDENT */

            students.push(newStudent);


            /* SAVE */

            saveStudents(students);


            /* SUCCESS MESSAGE */

            message.textContent =
                "Registration successful. Redirecting to login...";

            message.className =
                "message success";


            /* REDIRECT */

            setTimeout(
                function () {

                    window.location.href =
                        "login.html";

                },
                1000
            );

        }
    );

}


/* =========================================
   LOGIN
========================================= */

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const username =
                document.getElementById("loginUsername").value.trim();

            const password =
                document.getElementById("loginPassword").value;

            const message =
                document.getElementById("loginMessage");


            const students = getStudents();


            /* FIND USER */

            const student =
                students.find(
                    function (student) {

                        return (
                            student.username === username &&
                            student.password === password
                        );

                    }
                );


            /* LOGIN FAILED */

            if (!student) {

                message.textContent =
                    "Incorrect username or password.";

                message.className =
                    "message error";

                return;
            }


            /* SAVE CURRENT USER */

            localStorage.setItem(
                "currentUser",
                JSON.stringify(student)
            );


            /* LOGIN SUCCESS */

            window.location.href =
                "dashboard.html";

        }
    );

}


/* =========================================
   DISPLAY STUDENTS
========================================= */

function displayStudents() {

    const table =
        document.getElementById("studentTable");

    const emptyMessage =
        document.getElementById("emptyMessage");


    if (!table) {
        return;
    }


    const students = getStudents();


    table.innerHTML = "";


    /* NO STUDENTS */

    if (students.length === 0) {

        if (emptyMessage) {
            emptyMessage.style.display = "block";
        }

        return;
    }


    /* HIDE EMPTY MESSAGE */

    if (emptyMessage) {
        emptyMessage.style.display = "none";
    }


    /* DISPLAY EACH STUDENT */

    students.forEach(
        function (student, index) {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${String(index + 1).padStart(3, "0")}
                </td>

                <td>
                    ${student.fullname}
                </td>

                <td>
                    ${student.email}
                </td>

                <td>
                    ${student.course}
                </td>

            `;


            table.appendChild(row);

        }
    );

}


/* =========================================
   DISPLAY CURRENT USER
========================================= */

function displayCurrentUser() {

    const userName =
        document.getElementById("userName");

    const welcomeName =
        document.getElementById("welcomeName");

    const userAvatar =
        document.getElementById("userAvatar");

    const courseDisplay =
        document.getElementById("courseDisplay");


    const currentUser =
        localStorage.getItem("currentUser");


    if (!currentUser) {
        return;
    }


    const user =
        JSON.parse(currentUser);


    if (userName) {

        userName.textContent =
            user.fullname;

    }


    if (welcomeName) {

        welcomeName.textContent =
            "Welcome back, " + user.fullname + "!";

    }


    if (courseDisplay) {

        courseDisplay.textContent =
            user.course;

    }


    if (userAvatar) {

        userAvatar.textContent =
            user.fullname
                .charAt(0)
                .toUpperCase();

    }

}


/* =========================================
   DISPLAY STUDENT COUNT
========================================= */

function displayStudentCount() {

    const studentCount =
        document.getElementById("studentCount");


    if (!studentCount) {
        return;
    }


    const students =
        getStudents();


    studentCount.textContent =
        students.length;

}


/* =========================================
   LOGOUT
========================================= */

function logout() {

    localStorage.removeItem("currentUser");

}


/* =========================================
   RUN FUNCTIONS
========================================= */

displayStudents();

displayCurrentUser();

displayStudentCount();

function saveSettings() {

    const name = document.getElementById("settingsName").value;
    const course = document.getElementById("settingsCourse").value;

    if (name === "" || course === "") {

        alert("Please fill in all fields.");

        return;

    }

    document.getElementById("userName").textContent = name;
    document.getElementById("welcomeName").textContent = "Welcome back, " + name + "!";
    document.getElementById("courseDisplay").textContent = course;

    document.getElementById("userAvatar").textContent =
        name.charAt(0).toUpperCase();

    alert("Settings saved successfully!");

}


function saveTheme() {

    const theme = document.getElementById("themeSelect").value;

    if (theme === "dark") {

        document.body.classList.add("dark-theme");

    } else {

        document.body.classList.remove("dark-theme");

    }

    alert("Theme applied successfully!");

}