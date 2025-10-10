// Function to format date
function formatDate(dateString) {
    if (!dateString) return '';

    // Parse the date properly to avoid timezone issues
    const [year, month, day] = dateString.split('-').map(num => parseInt(num));

    // Return in DD/MM/YYYY format
    return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
}

// Function to calculate expiration dates based on packing date
function calculateExpirationDates(packDateStr) {
    if (!packDateStr) return;

    // Parse the date properly to avoid timezone issues
    const [year, month, day] = packDateStr.split('-').map(num => parseInt(num));
    const packDate = new Date(year, month - 1, day);

    // Refrigeration: +15 days from packing
    const refDate = new Date(packDate);
    refDate.setDate(refDate.getDate() + 15);
    const refDay = refDate.getDate().toString().padStart(2, '0');
    const refMonth = (refDate.getMonth() + 1).toString().padStart(2, '0');
    const refYear = refDate.getFullYear();
    const refDateStr = `${refDay}/${refMonth}/${refYear}`;
    document.getElementById('refrigeracion').value = refDateStr;

    // Freezing: +3 months from packing
    const congDate = new Date(packDate);
    congDate.setMonth(congDate.getMonth() + 3);
    const congDay = congDate.getDate().toString().padStart(2, '0');
    const congMonth = (congDate.getMonth() + 1).toString().padStart(2, '0');
    const congYear = congDate.getFullYear();
    const congDateStr = `${congDay}/${congMonth}/${congYear}`;
    document.getElementById('congelacion').value = congDateStr;
}

// Set today's date as default for packed date
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('packDate').value = today;

    // Calculate expiration dates based on today
    calculateExpirationDates(today);

    // Update labels with default values
    updateAllLabels();

    // Add event listener to packDate to recalculate expiration dates
    const packDateInput = document.getElementById('packDate');
    if (packDateInput) {
        packDateInput.addEventListener('change', function() {
            calculateExpirationDates(this.value);
            updateAllLabels();
        });
    }
});

// Function to update all labels with the form data
window.updateAllLabels = function() {
    try {
        console.log('Updating labels...');

        // Get form values
        const productName = document.getElementById('productName').value || 'Producto';
        const weight = document.getElementById('weight').value || '10 kg';
        const packDate = document.getElementById('packDate').value;
        const comedor = document.getElementById('comedor').value || 'GRAMMER';
        const refrigeracion = document.getElementById('refrigeracion').value || '';
        const congelacion = document.getElementById('congelacion').value || '';

    // Format dates
    const formattedPackDate = formatDate(packDate);

    // Get dates directly from refrigeracion and congelacion fields (they now only contain dates)
    const refDate = refrigeracion || formatDate(new Date().toISOString().split('T')[0]);
    const congDate = congelacion || formatDate(new Date().toISOString().split('T')[0]);

    // Update only selected labels
    const labels = document.querySelectorAll('.label');
    labels.forEach((label, index) => {
        // Check if this label is selected
        const labelId = label.getAttribute('data-label-id');
        const checkbox = document.getElementById('label' + labelId);

        // Skip if this label is not selected
        if (!checkbox || !checkbox.checked) {
            return;
        }
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
        if (qrcodeElement) {
            // Check if QRCode library is loaded
            if (typeof QRCode !== 'undefined') {
                // Clear existing QR code if any
                qrcodeElement.innerHTML = '';

                try {
                    // Create new QR code
                    new QRCode(qrcodeElement, {
                        text: "https://www.ganaderiacatorce.com/",
                        width: 128,
                        height: 128,
                        colorDark : "#000000",
                        colorLight : "#ffffff",
                        correctLevel : QRCode.CorrectLevel.L
                    });
                } catch (qrError) {
                    console.error('Error generating QR code:', qrError);
                }
            } else {
                console.warn('QRCode library not loaded');
            }
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
        console.log('Labels updated successfully');
    } catch (error) {
        console.error('Error updating labels:', error);
    }
}

// Function to clear the form
window.clearForm = function() {
    document.getElementById('labelForm').reset();

    // Reset dates to defaults
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('packDate').value = today;

    // Recalculate expiration dates based on today
    calculateExpirationDates(today);

    // Update labels with cleared values
    updateAllLabels();
}

// Add real-time update listeners to non-readonly form fields
window.addEventListener('DOMContentLoaded', function() {
    const formElements = document.querySelectorAll('#labelForm input:not([readonly]), #labelForm textarea');
    formElements.forEach(element => {
        // Skip the refrigeration and freezing fields
        if (element.id !== 'refrigeracion' && element.id !== 'congelacion') {
            element.addEventListener('input', updateAllLabels);
            element.addEventListener('change', updateAllLabels);
        }
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

// Function to select all labels
window.selectAllLabels = function() {
    for (let i = 1; i <= 6; i++) {
        const checkbox = document.getElementById('label' + i);
        if (checkbox) {
            checkbox.checked = true;
        }
    }
    updateSelectionCount();
    updateAllLabels();  // Update all labels with form data
}

// Function to deselect all labels
window.deselectAllLabels = function() {
    for (let i = 1; i <= 6; i++) {
        const checkbox = document.getElementById('label' + i);
        if (checkbox) {
            checkbox.checked = false;
        }
    }
    updateSelectionCount();
    updateAllLabels();  // Clear updates from unchecked labels
}

// Function to update selection count
window.updateSelectionCount = function() {
    let count = 0;
    for (let i = 1; i <= 6; i++) {
        const checkbox = document.getElementById('label' + i);
        if (checkbox && checkbox.checked) {
            count++;
        }
    }
    const countElement = document.getElementById('selectionCount');
    if (countElement) {
        countElement.textContent = `${count} de 6 etiquetas se actualizarán`;
    }
}


// Add change listeners to checkboxes
window.addEventListener('DOMContentLoaded', function() {
    for (let i = 1; i <= 6; i++) {
        const checkbox = document.getElementById('label' + i);
        if (checkbox) {
            checkbox.addEventListener('change', function() {
                updateSelectionCount();
                updateAllLabels();  // Update labels when checkbox changes
            });
        }
    }
    // Initial count update
    updateSelectionCount();
});