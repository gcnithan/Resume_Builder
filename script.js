// Add this script tag to your HTML file, right before your existing script.js reference
// <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>

// Keep your existing functions (addWe, addAq, generate)
function addWe() {
    let newNode = document.createElement("textarea");
    newNode.classList.add("form-control")
    newNode.classList.add("weField")
    newNode.classList.add("mt-3");
    newNode.setAttribute("placeholder", "Enter here")
    newNode.setAttribute("rows", 3)
    
    let weOb = document.getElementById("we")
    let weAddButtonOb = document.getElementById("weAddButton")
    weOb.insertBefore(newNode, weAddButtonOb)
}

function addAq() {
    let newNode = document.createElement("textarea");
    newNode.classList.add("form-control")
    newNode.classList.add("aqField")
    newNode.classList.add("mt-3");
    newNode.setAttribute("placeholder", "Enter here")
    newNode.setAttribute("rows", 3)
    
    let aqOb = document.getElementById("aq")
    let aqAddButtonOb = document.getElementById("aqAddButton")
    aqOb.insertBefore(newNode, aqAddButtonOb)
}

function generate() {
    document.getElementById('nameT').innerHTML = document.getElementById('nameField').value;
    document.getElementById('nameT1').innerHTML = document.getElementById('nameField').value;
    document.getElementById('contactT').innerHTML = document.getElementById('contactField').value;
    document.getElementById('adressT').innerHTML = document.getElementById('adressField').value;
    document.getElementById('linkedT').innerHTML = document.getElementById('linkedinField').value;
    document.getElementById('linkedT').href = document.getElementById('linkedinField').value;
    document.getElementById('projectT').innerHTML = document.getElementById('projectField').value;
    document.getElementById('projectT').href = document.getElementById('projectField').value;
    document.getElementById('objectiveT').innerHTML = document.getElementById('objectiveField').value;

    let wes = document.getElementsByClassName("weField")
    let str = '';
    for (let e of wes) {
        str = str + `<li>${e.value}</li>`;
    }
    document.getElementById('weT').innerHTML = str;

    let aqs = document.getElementsByClassName("aqField")
    let str1 = '';
    for (let e of aqs) {
        str1 = str1 + `<li>${e.value}</li>`;
    }
    document.getElementById('aqT').innerHTML = str1;

    document.getElementById('form').style.display = 'none';
    document.getElementById('template').style.display = 'block';
}

// Improved printResume function with proper print settings
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

// Improved downloadPDF function to handle the buttons correctly
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

// Add CSS for print media to hide buttons when printing
function addPrintStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @media print {
            #template .mt-3.text-center {
                display: none !important;
            }
            @page {
                margin: 0;
            }
            body {
                margin: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Call this function when the page loads
window.onload = function() {
    addPrintStyles();
    
    // Initially hide the template
    if (document.getElementById('template')) {
        document.getElementById('template').style.display = 'none';
    }
};