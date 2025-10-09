// Set today's date as default for packed date
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('packDate').value = today;

    // Set default use by date (7 days from today)
    const useByDate = new Date();
    useByDate.setDate(useByDate.getDate() + 7);
    document.getElementById('useBy').value = useByDate.toISOString().split('T')[0];

    // Update labels with default values
    updateAllLabels();
});

// Function to update all labels with the form data
function updateAllLabels() {
    // Get form values
    const productName = document.getElementById('productName').value || 'Product Name';
    const weight = document.getElementById('weight').value || '';
    const packDate = document.getElementById('packDate').value;
    const useBy = document.getElementById('useBy').value;
    const price = document.getElementById('price').value || '';
    const batchCode = document.getElementById('batchCode').value || '';
    const storageInstructions = document.getElementById('storageInstructions').value || 'Keep refrigerated';
    const origin = document.getElementById('origin').value || '';
    const additionalInfo = document.getElementById('additionalInfo').value || '';

    // Format dates
    const formattedPackDate = formatDate(packDate);
    const formattedUseBy = formatDate(useBy);

    // Update all labels
    const labels = document.querySelectorAll('.label');
    labels.forEach(label => {
        // Update product name
        label.querySelector('.product-name').textContent = productName;

        // Update price
        if (price) {
            label.querySelector('.price-tag').textContent = price;
            label.querySelector('.price-tag').style.display = 'block';
        } else {
            label.querySelector('.price-tag').style.display = 'none';
        }

        // Update weight
        label.querySelector('.weight').textContent = weight;

        // Update dates
        label.querySelector('.pack-date').textContent = formattedPackDate;
        label.querySelector('.use-by').textContent = formattedUseBy;

        // Update batch code
        label.querySelector('.batch').textContent = batchCode;

        // Update origin
        label.querySelector('.origin-text').textContent = origin;

        // Update storage instructions
        label.querySelector('.storage-text').textContent = storageInstructions;

        // Update additional info
        const additionalInfoElement = label.querySelector('.additional-info');
        additionalInfoElement.textContent = additionalInfo;
        if (additionalInfo) {
            additionalInfoElement.style.display = 'block';
        } else {
            additionalInfoElement.style.display = 'none';
        }
    });
}

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

// Function to clear the form
function clearForm() {
    document.getElementById('labelForm').reset();

    // Reset dates to defaults
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('packDate').value = today;

    const useByDate = new Date();
    useByDate.setDate(useByDate.getDate() + 7);
    document.getElementById('useBy').value = useByDate.toISOString().split('T')[0];

    // Reset storage instructions to default
    document.getElementById('storageInstructions').value = 'Keep refrigerated at 0-4°C';

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