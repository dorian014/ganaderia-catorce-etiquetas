// Function to format date
function formatDate(dateString) {
    if (!dateString) return '';

    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    // Return in DD/MM/YYYY format
    return `${day}/${month}/${year}`;
}

// Set today's date as default for packed date
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('packDate').value = today;

    // Set default expiration date (14 days from today for refrigeration)
    const expDate = new Date();
    expDate.setDate(expDate.getDate() + 14);
    document.getElementById('expDate').value = expDate.toISOString().split('T')[0];

    // Set default refrigeration date (14 days)
    const refDate = new Date();
    refDate.setDate(refDate.getDate() + 14);
    const refDateStr = formatDate(refDate.toISOString().split('T')[0]);
    document.getElementById('refrigeracion').value = `Caducidad refrigeración: ${refDateStr}`;

    // Set default freezing date (60 days)
    const congDate = new Date();
    congDate.setDate(congDate.getDate() + 60);
    const congDateStr = formatDate(congDate.toISOString().split('T')[0]);
    document.getElementById('congelacion').value = `Caducidad congelación: ${congDateStr}`;

    // Update labels with default values
    updateAllLabels();
});

// Function to update all labels with the form data
function updateAllLabels() {
    // Get form values
    const productName = document.getElementById('productName').value || 'Producto';
    const weight = document.getElementById('weight').value || '10 kg';
    const packDate = document.getElementById('packDate').value;
    const comedor = document.getElementById('comedor').value || 'GRAMMER';
    const refrigeracion = document.getElementById('refrigeracion').value || '';
    const congelacion = document.getElementById('congelacion').value || '';

    // Format dates
    const formattedPackDate = formatDate(packDate);

    // Extract dates from refrigeracion and congelacion fields
    const refDateMatch = refrigeracion.match(/(\d{2}\/\d{2}\/\d{4})/);
    const refDate = refDateMatch ? refDateMatch[1] : formatDate(new Date().toISOString().split('T')[0]);

    const congDateMatch = congelacion.match(/(\d{2}\/\d{2}\/\d{4})/);
    const congDate = congDateMatch ? congDateMatch[1] : formatDate(new Date().toISOString().split('T')[0]);

    // Update all labels
    const labels = document.querySelectorAll('.label');
    labels.forEach((label, index) => {
        // Update product name
        const productNameElement = label.querySelector('.product-name');
        if (productNameElement) {
            productNameElement.textContent = productName;
        }

        // Update weight
        const weightElement = label.querySelector('.weight');
        if (weightElement) {
            weightElement.textContent = weight;
        }

        // Update pack date
        const packDateElement = label.querySelector('.pack-date');
        if (packDateElement) {
            packDateElement.textContent = formattedPackDate;
        }

        // Update comedor
        const comedorElement = label.querySelector('.comedor-name');
        if (comedorElement) {
            comedorElement.textContent = comedor;
        }

        // Generate QR code
        const qrcodeElement = label.querySelector('.qrcode');
        if (qrcodeElement && typeof QRCode !== 'undefined') {
            // Clear existing QR code if any
            qrcodeElement.innerHTML = '';

            // Create new QR code
            new QRCode(qrcodeElement, {
                text: "https://www.ganaderiacatorce.com/",
                width: 128,
                height: 128,
                colorDark : "#000000",
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.L
            });
        }

        // Update refrigeration date
        const refDateElement = label.querySelector('.ref-date');
        if (refDateElement) {
            refDateElement.textContent = refDate;
        }

        // Update freezing date
        const congDateElement = label.querySelector('.cong-date');
        if (congDateElement) {
            congDateElement.textContent = congDate;
        }
    });
}

// Function to clear the form
function clearForm() {
    document.getElementById('labelForm').reset();

    // Reset dates to defaults
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('packDate').value = today;

    const expDate = new Date();
    expDate.setDate(expDate.getDate() + 14);
    document.getElementById('expDate').value = expDate.toISOString().split('T')[0];

    // Reset refrigeration date (14 days)
    const refDate = new Date();
    refDate.setDate(refDate.getDate() + 14);
    const refDateStr = formatDate(refDate.toISOString().split('T')[0]);
    document.getElementById('refrigeracion').value = `Caducidad refrigeración: ${refDateStr}`;

    // Reset freezing date (60 days)
    const congDate = new Date();
    congDate.setDate(congDate.getDate() + 60);
    const congDateStr = formatDate(congDate.toISOString().split('T')[0]);
    document.getElementById('congelacion').value = `Caducidad congelación: ${congDateStr}`;

    // Update labels with cleared values
    updateAllLabels();
}

// Add real-time update listeners to all form fields
document.addEventListener('DOMContentLoaded', function() {
    const formElements = document.querySelectorAll('#labelForm input, #labelForm textarea');
    formElements.forEach(element => {
        element.addEventListener('input', updateAllLabels);
        element.addEventListener('change', updateAllLabels);
    });
});

// Print functionality with better formatting
window.addEventListener('beforeprint', function() {
    // Ensure all labels are updated before printing
    updateAllLabels();
});

// Add keyboard shortcut for printing (Ctrl+P or Cmd+P)
document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        window.print();
    }
});