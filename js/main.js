// Initialize form and event listeners
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('admissionForm');
    const clearCartBtn = document.getElementById('clearCart');
    const eligibilityMessage = document.getElementById('eligibilityMessage');
    const qrCodeContainer = document.getElementById('qrCodeContainer');

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: document.getElementById('name').value.trim(),
            school: document.getElementById('school').value.trim(),
            mobile: document.getElementById('mobile').value.trim(),
            place: document.getElementById('place').value.trim(),
            maths: parseInt(document.getElementById('maths').value),
            physics: parseInt(document.getElementById('physics').value),
            chemistry: parseInt(document.getElementById('chemistry').value),
            gender: document.getElementById('gender').value,
            community: document.getElementById('community').value,
            firstGraduate: document.getElementById('firstGraduate').value
        };

        // Validate all fields
        if (!validateForm(formData)) {
            alert('Please fill in all fields correctly!');
            return;
        }

        // Save to LocalStorage
        saveAdmission(formData);

        // Show eligibility message
        showEligibilityMessage(formData);

        // Reset form after a delay
        setTimeout(() => {
            form.reset();
        }, 100);
    });

    // Clear cart button handler
    clearCartBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to clear all fields?')) {
            form.reset();
            eligibilityMessage.classList.add('hidden');
            qrCodeContainer.innerHTML = '';
        }
    });

    // Validate form function
    function validateForm(data) {
        return data.name !== '' &&
               data.school !== '' &&
               data.mobile !== '' &&
               data.place !== '' &&
               !isNaN(data.maths) && data.maths >= 0 && data.maths <= 100 &&
               !isNaN(data.physics) && data.physics >= 0 && data.physics <= 100 &&
               !isNaN(data.chemistry) && data.chemistry >= 0 && data.chemistry <= 100 &&
               data.gender !== '' &&
               data.community !== '' &&
               data.firstGraduate !== '';
    }

    // Save admission to LocalStorage
    function saveAdmission(data) {
        let admissions = JSON.parse(localStorage.getItem('admissions')) || [];
        
        const admission = {
            id: Date.now().toString(),
            name: data.name,
            school: data.school,
            mobile: data.mobile,
            place: data.place,
            maths: data.maths,
            physics: data.physics,
            chemistry: data.chemistry,
            gender: data.gender,
            community: data.community,
            firstGraduate: data.firstGraduate,
            date: new Date().toISOString().split('T')[0],
            timestamp: new Date().toISOString()
        };

        admissions.push(admission);
        localStorage.setItem('admissions', JSON.stringify(admissions));
    }

    // Show eligibility message and generate QR code
    function showEligibilityMessage(data) {
        // Show eligibility message
        eligibilityMessage.classList.remove('hidden');

        // Scroll to eligibility message
        eligibilityMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Clear previous QR code
        qrCodeContainer.innerHTML = '';

        // Generate QR code
        const qrData = `R.M Engineering College Admission\n\nName: ${data.name}\nSchool: ${data.school}\nMobile: ${data.mobile}\nPlace: ${data.place}\n\nYOU ARE ELIGIBLE FOR R M ENGINEERING COLLEGE B.E COURSE WITH FULL SCHOLARSHIP\n\nDate: ${new Date().toLocaleDateString()}`;

        // Create QR code using qrcode.js library
        new QRCode(qrCodeContainer, {
            text: qrData,
            width: 256,
            height: 256,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: 3 // H (High error correction level)
        });
    }
});

