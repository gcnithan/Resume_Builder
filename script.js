
// Profile image handling
document.getElementById('imageUpload').addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Update preview image
            document.getElementById('previewImg').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Form validation functions
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validateURL(url) {
    if (!url || url.trim() === '') return true; // Optional field
    const re = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return re.test(url);
}

function validatePhone(phone) {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return re.test(phone);
}

function validateForm() {
    let isValid = true;
    
    // Check required fields
    const nameField = document.getElementById('nameField');
    if (!nameField.value.trim()) {
        nameField.classList.add('is-invalid');
        nameField.nextElementSibling.style.display = 'block';
        isValid = false;
    } else {
        nameField.classList.remove('is-invalid');
        nameField.nextElementSibling.style.display = 'none';
    }
    
    // Validate email
    const emailField = document.getElementById('emailField');
    if (!emailField.value.trim() || !validateEmail(emailField.value)) {
        emailField.classList.add('is-invalid');
        emailField.nextElementSibling.style.display = 'block';
        isValid = false;
    } else {
        emailField.classList.remove('is-invalid');
        emailField.nextElementSibling.style.display = 'none';
    }
    
    // Validate contact
    const contactField = document.getElementById('contactField');
    if (!contactField.value.trim() || !validatePhone(contactField.value)) {
        contactField.classList.add('is-invalid');
        contactField.nextElementSibling.style.display = 'block';
        isValid = false;
    } else {
        contactField.classList.remove('is-invalid');
        contactField.nextElementSibling.style.display = 'none';
    }
    
    // Check address
    const adressField = document.getElementById('adressField');
    if (!adressField.value.trim()) {
        adressField.classList.add('is-invalid');
        adressField.nextElementSibling.style.display = 'block';
        isValid = false;
    } else {
        adressField.classList.remove('is-invalid');
        adressField.nextElementSibling.style.display = 'none';
    }
    
    // Validate LinkedIn if provided
    const linkedinField = document.getElementById('linkedinField');
    if (linkedinField.value && !validateURL(linkedinField.value)) {
        linkedinField.classList.add('is-invalid');
        linkedinField.nextElementSibling.style.display = 'block';
        isValid = false;
    } else {
        linkedinField.classList.remove('is-invalid');
        linkedinField.nextElementSibling.style.display = 'none';
    }
    
    // Validate Project URL if provided
    const projectField = document.getElementById('projectField');
    if (projectField.value && !validateURL(projectField.value)) {
        projectField.classList.add('is-invalid');
        projectField.nextElementSibling.style.display = 'block';
        isValid = false;
    } else {
        projectField.classList.remove('is-invalid');
        projectField.nextElementSibling.style.display = 'none';
    }
    
    // Check objective
    const objectiveField = document.getElementById('objectiveField');
    if (!objectiveField.value.trim()) {
        objectiveField.classList.add('is-invalid');
        objectiveField.nextElementSibling.style.display = 'block';
        isValid = false;
    } else {
        objectiveField.classList.remove('is-invalid');
        objectiveField.nextElementSibling.style.display = 'none';
    }
    
    // Validate at least one work experience
    const weFields = document.getElementsByClassName('weField');
    let hasValidWe = false;
    for (let field of weFields) {
        if (field.value.trim()) {
            hasValidWe = true;
            field.classList.remove('is-invalid');
        } else {
            field.classList.add('is-invalid');
        }
    }
    if (!hasValidWe) {
        weFields[0].classList.add('is-invalid');
        weFields[0].nextElementSibling.style.display = 'block';
        isValid = false;
    }
    
    // Validate at least one academic qualification
    const aqFields = document.getElementsByClassName('aqField');
    let hasValidAq = false;
    for (let field of aqFields) {
        if (field.value.trim()) {
            hasValidAq = true;
            field.classList.remove('is-invalid');
        } else {
            field.classList.add('is-invalid');
        }
    }
    if (!hasValidAq) {
        aqFields[0].classList.add('is-invalid');
        aqFields[0].nextElementSibling.style.display = 'block';
        isValid = false;
    }
    
    return isValid;
}

// Add new fields functions
function addWe() {
    let newNode = document.createElement("textarea");
    newNode.classList.add("form-control");
    newNode.classList.add("weField");
    newNode.classList.add("mt-3");
    newNode.setAttribute("placeholder", "Enter here");
    newNode.setAttribute("rows", 3);
    
    let invalidFeedback = document.createElement("div");
    invalidFeedback.classList.add("invalid-feedback");
    invalidFeedback.textContent = "Please enter your work experience";
    
    let weOb = document.getElementById("we");
    let weAddButtonOb = document.getElementById("weAddButton");
    weOb.insertBefore(newNode, weAddButtonOb);
    weOb.insertBefore(invalidFeedback, weAddButtonOb);
}

function addAq() {
    let newNode = document.createElement("textarea");
    newNode.classList.add("form-control");
    newNode.classList.add("aqField");
    newNode.classList.add("mt-3");
    newNode.setAttribute("placeholder", "Enter here");
    newNode.setAttribute("rows", 3);
    
    let invalidFeedback = document.createElement("div");
    invalidFeedback.classList.add("invalid-feedback");
    invalidFeedback.textContent = "Please enter your academic qualification";
    
    let aqOb = document.getElementById("aq");
    let aqAddButtonOb = document.getElementById("aqAddButton");
    aqOb.insertBefore(newNode, aqAddButtonOb);
    aqOb.insertBefore(invalidFeedback, aqAddButtonOb);
}

// Validate and generate resume
function validateAndGenerate() {
    if (validateForm()) {
        generate();
    } else {
        // Scroll to the first invalid field
        const invalidField = document.querySelector('.is-invalid');
        if (invalidField) {
            invalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

// Generate resume
function generate() {
    // Set profile image
    document.getElementById('profileImageT').src = document.getElementById('previewImg').src;
    
    // Set text fields
    document.getElementById('nameT').innerHTML = document.getElementById('nameField').value;
    document.getElementById('nameT1').innerHTML = document.getElementById('nameField').value;
    document.getElementById('emailT').innerHTML = document.getElementById('emailField').value;
    document.getElementById('contactT').innerHTML = document.getElementById('contactField').value;
    document.getElementById('adressT').innerHTML = document.getElementById('adressField').value;
    
    // Set links
    document.getElementById('linkedT').innerHTML = document.getElementById('linkedinField').value || 'N/A';
    if (document.getElementById('linkedinField').value) {
        document.getElementById('linkedT').href = ensureHttpPrefix(document.getElementById('linkedinField').value);
    } else {
        document.getElementById('linkedT').href = '#';
        document.getElementById('linkedT').style.textDecoration = 'none';
    }
    
    document.getElementById('projectT').innerHTML = document.getElementById('projectField').value || 'N/A';
    if (document.getElementById('projectField').value) {
        document.getElementById('projectT').href = ensureHttpPrefix(document.getElementById('projectField').value);
    } else {
        document.getElementById('projectT').href = '#';
        document.getElementById('projectT').style.textDecoration = 'none';
    }
    
    document.getElementById('objectiveT').innerHTML = document.getElementById('objectiveField').value;

    // Set work experience list
    let wes = document.getElementsByClassName("weField");
    let str = '';
    for (let e of wes) {
        if (e.value.trim()) {
            str = str + `<li>${e.value}</li>`;
        }
    }
    document.getElementById('weT').innerHTML = str;

    // Set academic qualifications list
    let aqs = document.getElementsByClassName("aqField");
    let str1 = '';
    for (let e of aqs) {
        if (e.value.trim()) {
            str1 = str1 + `<li>${e.value}</li>`;
        }
    }
    document.getElementById('aqT').innerHTML = str1;

    // Show template, hide form
    document.getElementById('form').style.display = 'none';
    document.getElementById('template').style.display = 'block';
}

// Helper function to ensure URLs have http/https prefix
function ensureHttpPrefix(url) {
    if (!url) return '#';
    return url.match(/^https?:\/\//) ? url : 'https://' + url;
}

// Go back to edit form
function backToEdit() {
    document.getElementById('form').style.display = 'block';
    document.getElementById('template').style.display = 'none';
}

// Print resume function
function printResume() {
    // Hide the buttons before printing
    const buttonsContainer = document.querySelector('#template .mt-3.text-center');
    const originalDisplay = buttonsContainer.style.display;
    buttonsContainer.style.display = 'none';
    
    // Print the page
    window.print();
    
    // Restore the buttons after printing
    setTimeout(() => {
        buttonsContainer.style.display = originalDisplay;
    }, 500);
}

// Download PDF function
function downloadPDF() {
    // Get the resume template element
    const element = document.getElementById('template');
    
    // Hide the buttons before generating PDF
    const buttonsContainer = document.querySelector('#template .mt-3.text-center');
    const originalDisplay = buttonsContainer.style.display;
    buttonsContainer.style.display = 'none';
    
    // Get the name to use in the filename
    const personName = document.getElementById('nameT').innerText || 'resume';
    const fileName = personName.toLowerCase().replace(/\s+/g, '_') + '_resume.pdf';
    
    // Set options for PDF generation
    const options = {
        margin: [0, 0, 0, 0],
        filename: fileName,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { 
            scale: 2,
            useCORS: true,
            logging: false,
            letterRendering: true
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait',
            compress: true
        }
    };
    
    // Generate PDF
    html2pdf().set(options).from(element).save().then(() => {
        // Restore the buttons after PDF is generated
        setTimeout(() => {
            buttonsContainer.style.display = originalDisplay;
        }, 500);
    });
}

