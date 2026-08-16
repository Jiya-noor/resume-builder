/* =========================================================
   GLOBAL STATE
========================================================= */

let currentTemplate = "modern";
let currentColor = "#4f46e5";

let educationCount = 0;
let experienceCount = 0;
let projectCount = 0;


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    setupSimpleFieldListeners();

    loadDarkMode();

    updateProgress();

});


/* =========================================================
   HOME / BUILDER NAVIGATION
========================================================= */

function openBuilder(template = "modern") {

    document.getElementById("home").style.display = "none";

    document.getElementById("builder").style.display = "block";

    setTemplate(template);

    loadSavedData();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


function showHome() {

    document.getElementById("builder").style.display = "none";

    document.getElementById("home").style.display = "block";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   SIMPLE FIELDS
========================================================= */

const simpleFields = [
    "fullName",
    "jobTitle",
    "email",
    "phone",
    "location",
    "linkedin",
    "summary",
    "skills"
];


function setupSimpleFieldListeners() {

    simpleFields.forEach(id => {

        const field =
            document.getElementById(id);

        if (!field) {
            return;
        }

        field.addEventListener("input", () => {

            updatePreview();

            saveData();

            updateProgress();

        });

    });

}


/* =========================================================
   EDUCATION
========================================================= */

function addEducation(data = {}) {

    educationCount++;

    const id = educationCount;

    const item =
        document.createElement("div");

    item.className = "dynamic-item";

    item.id =
        `education-${id}`;

    item.innerHTML = `

        <div class="dynamic-item-header">

            <strong>
                Education ${id}
            </strong>

            <button
                class="remove-item"
                onclick="removeItem('education-${id}')"
            >
                Remove
            </button>

        </div>


        <div class="form-grid">

            <div class="field">

                <label>
                    Degree
                </label>

                <input
                    class="education-degree"
                    placeholder="B.Tech Computer Science"
                    value="${escapeAttr(data.degree || "")}"
                >

            </div>


            <div class="field">

                <label>
                    Institution
                </label>

                <input
                    class="education-school"
                    placeholder="ABC University"
                    value="${escapeAttr(data.school || "")}"
                >

            </div>


            <div class="field">

                <label>
                    Year
                </label>

                <input
                    class="education-year"
                    placeholder="2022 - 2026"
                    value="${escapeAttr(data.year || "")}"
                >

            </div>


            <div class="field">

                <label>
                    Grade / CGPA
                </label>

                <input
                    class="education-grade"
                    placeholder="8.5 CGPA"
                    value="${escapeAttr(data.grade || "")}"
                >

            </div>

        </div>

    `;

    document
        .getElementById("educationList")
        .appendChild(item);

    attachDynamicListeners();

    updatePreview();

    saveData();

}


/* =========================================================
   EXPERIENCE
========================================================= */

function addExperience(data = {}) {

    experienceCount++;

    const id = experienceCount;

    const item =
        document.createElement("div");

    item.className = "dynamic-item";

    item.id =
        `experience-${id}`;

    item.innerHTML = `

        <div class="dynamic-item-header">

            <strong>
                Experience ${id}
            </strong>

            <button
                class="remove-item"
                onclick="removeItem('experience-${id}')"
            >
                Remove
            </button>

        </div>


        <div class="form-grid">

            <div class="field">

                <label>
                    Job Title
                </label>

                <input
                    class="experience-title"
                    placeholder="Software Developer Intern"
                    value="${escapeAttr(data.title || "")}"
                >

            </div>


            <div class="field">

                <label>
                    Company
                </label>

                <input
                    class="experience-company"
                    placeholder="XYZ Technologies"
                    value="${escapeAttr(data.company || "")}"
                >

            </div>


            <div class="field">

                <label>
                    Duration
                </label>

                <input
                    class="experience-date"
                    placeholder="Jun 2025 - Aug 2025"
                    value="${escapeAttr(data.date || "")}"
                >

            </div>


            <div class="field full">

                <label>
                    Description
                </label>

                <textarea
                    class="experience-description"
                    placeholder="Describe your responsibilities and achievements..."
                >${escapeHtml(data.description || "")}</textarea>

            </div>

        </div>

    `;

    document
        .getElementById("experienceList")
        .appendChild(item);

    attachDynamicListeners();

    updatePreview();

    saveData();

}


/* =========================================================
   PROJECTS
========================================================= */

function addProject(data = {}) {

    projectCount++;

    const id = projectCount;

    const item =
        document.createElement("div");

    item.className = "dynamic-item";

    item.id =
        `project-${id}`;

    item.innerHTML = `

        <div class="dynamic-item-header">

            <strong>
                Project ${id}
            </strong>

            <button
                class="remove-item"
                onclick="removeItem('project-${id}')"
            >
                Remove
            </button>

        </div>


        <div class="form-grid">

            <div class="field">

                <label>
                    Project Name
                </label>

                <input
                    class="project-name"
                    placeholder="Resume Builder"
                    value="${escapeAttr(data.name || "")}"
                >

            </div>


            <div class="field">

                <label>
                    Technology
                </label>

                <input
                    class="project-tech"
                    placeholder="HTML, CSS, JavaScript"
                    value="${escapeAttr(data.tech || "")}"
                >

            </div>


            <div class="field full">

                <label>
                    Description
                </label>

                <textarea
                    class="project-description"
                    placeholder="Describe your project..."
                >${escapeHtml(data.description || "")}</textarea>

            </div>

        </div>

    `;

    document
        .getElementById("projectList")
        .appendChild(item);

    attachDynamicListeners();

    updatePreview();

    saveData();

}


/* =========================================================
   REMOVE ITEM
========================================================= */

function removeItem(id) {

    const item =
        document.getElementById(id);

    if (item) {
        item.remove();
    }

    updatePreview();

    saveData();

    updateProgress();

}


/* =========================================================
   DYNAMIC LISTENERS
========================================================= */

function attachDynamicListeners() {

    document
        .querySelectorAll(
            ".dynamic-item input, .dynamic-item textarea"
        )
        .forEach(field => {

            if (
                field.dataset.listenerAttached
            ) {
                return;
            }

            field.dataset.listenerAttached =
                "true";

            field.addEventListener(
                "input",
                () => {

                    updatePreview();

                    saveData();

                    updateProgress();

                }
            );

        });

}


/* =========================================================
   UPDATE PREVIEW
========================================================= */

function updatePreview() {

    const getValue = id => {

        const element =
            document.getElementById(id);

        return element
            ? element.value.trim()
            : "";

    };


    /* PERSONAL INFORMATION */

    document.getElementById(
        "previewName"
    ).textContent =
        getValue("fullName") ||
        "Your Name";


    document.getElementById(
        "previewTitle"
    ).textContent =
        getValue("jobTitle") ||
        "Professional Title";


    document.getElementById(
        "previewEmail"
    ).textContent =
        getValue("email") ||
        "email@example.com";


    document.getElementById(
        "previewPhone"
    ).textContent =
        getValue("phone") ||
        "+91 00000 00000";


    document.getElementById(
        "previewLocation"
    ).textContent =
        getValue("location") ||
        "Location";


    document.getElementById(
        "previewLinkedin"
    ).textContent =
        getValue("linkedin") ||
        "LinkedIn";


    /* SUMMARY */

    const summary =
        getValue("summary");

    const summarySection =
        document.getElementById(
            "summarySection"
        );


    if (summary) {

        summarySection.style.display =
            "block";

        document.getElementById(
            "previewSummary"
        ).textContent =
            summary;

    } else {

        summarySection.style.display =
            "none";

    }


    /* EDUCATION */

    updateEducationPreview();


    /* EXPERIENCE */

    updateExperiencePreview();


    /* PROJECTS */

    updateProjectPreview();


    /* SKILLS */

    updateSkillsPreview();

}


/* =========================================================
   EDUCATION PREVIEW
========================================================= */

function updateEducationPreview() {

    const container =
        document.getElementById(
            "previewEducation"
        );

    container.innerHTML = "";


    const items =
        document.querySelectorAll(
            "#educationList .dynamic-item"
        );


    items.forEach(item => {

        const degree =
            item.querySelector(
                ".education-degree"
            )?.value.trim();


        const school =
            item.querySelector(
                ".education-school"
            )?.value.trim();


        const year =
            item.querySelector(
                ".education-year"
            )?.value.trim();


        const grade =
            item.querySelector(
                ".education-grade"
            )?.value.trim();


        if (!degree && !school) {
            return;
        }


        container.innerHTML += `

            <div class="resume-item">

                <div class="resume-item-top">

                    <div class="resume-item-title">
                        ${escapeHtml(
                            degree || "Degree"
                        )}
                    </div>

                    <div class="resume-item-date">
                        ${escapeHtml(
                            year || ""
                        )}
                    </div>

                </div>

                <div class="resume-item-subtitle">
                    ${escapeHtml(
                        school || ""
                    )}
                </div>

                ${
                    grade
                    ? `
                        <div class="resume-item-description">
                            ${escapeHtml(grade)}
                        </div>
                    `
                    : ""
                }

            </div>

        `;

    });


    document.getElementById(
        "educationSection"
    ).style.display =
        container.innerHTML
            ? "block"
            : "none";

}


/* =========================================================
   EXPERIENCE PREVIEW
========================================================= */

function updateExperiencePreview() {

    const container =
        document.getElementById(
            "previewExperience"
        );

    container.innerHTML = "";


    const items =
        document.querySelectorAll(
            "#experienceList .dynamic-item"
        );


    items.forEach(item => {

        const title =
            item.querySelector(
                ".experience-title"
            )?.value.trim();


        const company =
            item.querySelector(
                ".experience-company"
            )?.value.trim();


        const date =
            item.querySelector(
                ".experience-date"
            )?.value.trim();


        const description =
            item.querySelector(
                ".experience-description"
            )?.value.trim();


        if (!title && !company) {
            return;
        }


        container.innerHTML += `

            <div class="resume-item">

                <div class="resume-item-top">

                    <div class="resume-item-title">
                        ${escapeHtml(
                            title || "Position"
                        )}
                    </div>

                    <div class="resume-item-date">
                        ${escapeHtml(
                            date || ""
                        )}
                    </div>

                </div>


                <div class="resume-item-subtitle">
                    ${escapeHtml(
                        company || ""
                    )}
                </div>


                ${
                    description
                    ? `
                        <div class="resume-item-description">
                            ${escapeHtml(
                                description
                            )}
                        </div>
                    `
                    : ""
                }

            </div>

        `;

    });


    document.getElementById(
        "experienceSection"
    ).style.display =
        container.innerHTML
            ? "block"
            : "none";

}


/* =========================================================
   PROJECT PREVIEW
========================================================= */

function updateProjectPreview() {

    const container =
        document.getElementById(
            "previewProjects"
        );

    container.innerHTML = "";


    const items =
        document.querySelectorAll(
            "#projectList .dynamic-item"
        );


    items.forEach(item => {

        const name =
            item.querySelector(
                ".project-name"
            )?.value.trim();


        const tech =
            item.querySelector(
                ".project-tech"
            )?.value.trim();


        const description =
            item.querySelector(
                ".project-description"
            )?.value.trim();


        if (!name) {
            return;
        }


        container.innerHTML += `

            <div class="resume-item">

                <div class="resume-item-title">
                    ${escapeHtml(name)}
                </div>


                ${
                    tech
                    ? `
                        <div class="resume-item-subtitle">
                            ${escapeHtml(tech)}
                        </div>
                    `
                    : ""
                }


                ${
                    description
                    ? `
                        <div class="resume-item-description">
                            ${escapeHtml(
                                description
                            )}
                        </div>
                    `
                    : ""
                }

            </div>

        `;

    });


    document.getElementById(
        "projectSection"
    ).style.display =
        container.innerHTML
            ? "block"
            : "none";

}


/* =========================================================
   SKILLS PREVIEW
========================================================= */

function updateSkillsPreview() {

    const container =
        document.getElementById(
            "previewSkills"
        );

    const skills =
        document.getElementById(
            "skills"
        ).value
        .split(",")
        .map(skill => skill.trim())
        .filter(Boolean);


    container.innerHTML = "";


    skills.forEach(skill => {

        container.innerHTML += `

            <span class="skill">
                ${escapeHtml(skill)}
            </span>

        `;

    });


    document.getElementById(
        "skillsSection"
    ).style.display =
        skills.length
            ? "block"
            : "none";

}


/* =========================================================
   TEMPLATE
========================================================= */

function setTemplate(template) {

    currentTemplate =
        template;


    const paper =
        document.getElementById(
            "resumePaper"
        );


    paper.classList.remove(
        "modern",
        "classic",
        "minimal"
    );


    paper.classList.add(
        template
    );


    document
        .querySelectorAll(
            ".template-option"
        )
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.template ===
                template
            );

        });


    saveData();

}


/* =========================================================
   COLOR
========================================================= */

function setColor(color, button) {

    currentColor =
        color;


    document
        .getElementById(
            "resumePaper"
        )
        .style
        .setProperty(
            "--resume-color",
            color
        );


    document
        .querySelectorAll(
            ".color-option"
        )
        .forEach(option => {

            option.classList.remove(
                "active"
            );

        });


    if (button) {
        button.classList.add(
            "active"
        );
    }


    saveData();

}


/* =========================================================
   PROGRESS
========================================================= */

function updateProgress() {

    let completed = 0;

    const total = 8;


    const ids = [
        "fullName",
        "jobTitle",
        "email",
        "phone",
        "location",
        "summary",
        "skills"
    ];


    ids.forEach(id => {

        const field =
            document.getElementById(id);


        if (
            field &&
            field.value.trim()
        ) {

            completed++;

        }

    });


    if (
        document.querySelectorAll(
            "#educationList .dynamic-item"
        ).length
    ) {

        completed++;

    }


    const percentage =
        Math.min(
            100,
            Math.round(
                (completed / total) *
                100
            )
        );


    document.getElementById(
        "progressText"
    ).textContent =
        percentage + "%";


    document.getElementById(
        "progressFill"
    ).style.width =
        percentage + "%";

}


/* =========================================================
   SAVE DATA
========================================================= */

function saveData() {

    const data = {

        simple: {},

        education: [],

        experience: [],

        projects: [],

        template:
            currentTemplate,

        color:
            currentColor

    };


    /* SIMPLE */

    simpleFields.forEach(id => {

        const element =
            document.getElementById(id);

        if (element) {

            data.simple[id] =
                element.value;

        }

    });


    /* EDUCATION */

    document
        .querySelectorAll(
            "#educationList .dynamic-item"
        )
        .forEach(item => {

            data.education.push({

                degree:
                    item.querySelector(
                        ".education-degree"
                    )?.value || "",

                school:
                    item.querySelector(
                        ".education-school"
                    )?.value || "",

                year:
                    item.querySelector(
                        ".education-year"
                    )?.value || "",

                grade:
                    item.querySelector(
                        ".education-grade"
                    )?.value || ""

            });

        });


    /* EXPERIENCE */

    document
        .querySelectorAll(
            "#experienceList .dynamic-item"
        )
        .forEach(item => {

            data.experience.push({

                title:
                    item.querySelector(
                        ".experience-title"
                    )?.value || "",

                company:
                    item.querySelector(
                        ".experience-company"
                    )?.value || "",

                date:
                    item.querySelector(
                        ".experience-date"
                    )?.value || "",

                description:
                    item.querySelector(
                        ".experience-description"
                    )?.value || ""

            });

        });


    /* PROJECTS */

    document
        .querySelectorAll(
            "#projectList .dynamic-item"
        )
        .forEach(item => {

            data.projects.push({

                name:
                    item.querySelector(
                        ".project-name"
                    )?.value || "",

                tech:
                    item.querySelector(
                        ".project-tech"
                    )?.value || "",

                description:
                    item.querySelector(
                        ".project-description"
                    )?.value || ""

            });

        });


    localStorage.setItem(
        "resumecraftData",
        JSON.stringify(data)
    );

}


/* =========================================================
   LOAD DATA
========================================================= */

function loadSavedData() {

    const saved =
        localStorage.getItem(
            "resumecraftData"
        );


    if (!saved) {

        if (
            !document.querySelector(
                "#educationList .dynamic-item"
            )
        ) {

            addEducation();

        }

        updatePreview();

        updateProgress();

        return;

    }


    try {

        const data =
            JSON.parse(saved);


        /* SIMPLE */

        simpleFields.forEach(id => {

            if (
                data.simple &&
                data.simple[id] !== undefined
            ) {

                document.getElementById(
                    id
                ).value =
                    data.simple[id];

            }

        });


        /* CLEAR OLD ITEMS */

        document.getElementById(
            "educationList"
        ).innerHTML = "";

        document.getElementById(
            "experienceList"
        ).innerHTML = "";

        document.getElementById(
            "projectList"
        ).innerHTML = "";


        educationCount = 0;

        experienceCount = 0;

        projectCount = 0;


        /* RESTORE */

        (data.education || [])
            .forEach(item => {

                addEducation(item);

            });


        (data.experience || [])
            .forEach(item => {

                addExperience(item);

            });


        (data.projects || [])
            .forEach(item => {

                addProject(item);

            });


        if (
            !data.education?.length &&
            !data.experience?.length &&
            !data.projects?.length
        ) {

            addEducation();

        }


        /* TEMPLATE */

        if (data.template) {

            currentTemplate =
                data.template;

        }


        /* COLOR */

        if (data.color) {

            currentColor =
                data.color;

        }


        setTemplate(
            currentTemplate
        );


        document
            .getElementById(
                "resumePaper"
            )
            .style
            .setProperty(
                "--resume-color",
                currentColor
            );


        updatePreview();

        updateProgress();

    } catch (error) {

        console.error(
            "Unable to load saved data:",
            error
        );

    }

}


/* =========================================================
   CLEAR RESUME
========================================================= */

function clearResume() {

    const confirmed =
        confirm(
            "Are you sure you want to clear your resume?"
        );


    if (!confirmed) {
        return;
    }


    localStorage.removeItem(
        "resumecraftData"
    );


    location.reload();

}


/* =========================================================
   PRINT / PDF
========================================================= */

function printResume() {

    updatePreview();

    window.print();

}


/* =========================================================
   DARK MODE
========================================================= */

document
    .getElementById(
        "darkModeBtn"
    )
    .addEventListener(
        "click",
        toggleDarkMode
    );


function toggleDarkMode() {

    document.body
        .classList
        .toggle("dark");


    const isDark =
        document.body
        .classList
        .contains("dark");


    document.getElementById(
        "darkModeBtn"
    ).textContent =
        isDark
            ? "☀️"
            : "🌙";


    localStorage.setItem(
        "darkMode",
        isDark
    );

}


function loadDarkMode() {

    const saved =
        localStorage.getItem(
            "darkMode"
        );


    if (saved === "true") {

        document.body
            .classList
            .add("dark");


        document.getElementById(
            "darkModeBtn"
        ).textContent =
            "☀️";

    }

}


/* =========================================================
   TOAST
========================================================= */

function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    setTimeout(() => {

        toast.classList.remove(
            "show"
        );

    }, 1800);

}


/* =========================================================
   SECURITY / HTML ESCAPING
========================================================= */

function escapeHtml(value) {

    return String(value)

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );

}


function escapeAttr(value) {

    return escapeHtml(value);

}
