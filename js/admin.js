// Admin panel functionality
document.addEventListener('DOMContentLoaded', function() {
    const ADMIN_PASSWORD = 'Rmec@4208';
    const loginScreen = document.getElementById('loginScreen');
    const adminContent = document.getElementById('adminContent');
    const loginForm = document.getElementById('loginForm');
    const adminPassword = document.getElementById('adminPassword');
    const loginError = document.getElementById('loginError');
    const logoutBtn = document.getElementById('logoutBtn');
    
    const tableBody = document.getElementById('admissionsTableBody');
    const editModal = document.getElementById('editModal');
    const editForm = document.getElementById('editForm');
    const closeModal = document.querySelector('.close-modal');
    const cancelEdit = document.getElementById('cancelEdit');
    const refreshBtn = document.getElementById('refreshData');
    const generateReportBtn = document.getElementById('generateReport');
    const reportDate = document.getElementById('reportDate');

    // Check if already logged in (sessionStorage)
    if (sessionStorage.getItem('adminLoggedIn') === 'true') {
        showAdminPanel();
    } else {
        showLoginScreen();
    }

    // Login form handler
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const password = adminPassword.value;
        
        if (password === ADMIN_PASSWORD) {
            sessionStorage.setItem('adminLoggedIn', 'true');
            showAdminPanel();
            adminPassword.value = '';
            loginError.classList.add('hidden');
        } else {
            loginError.textContent = 'Incorrect password! Please try again.';
            loginError.classList.remove('hidden');
            adminPassword.value = '';
            adminPassword.focus();
        }
    });

    // Logout handler
    logoutBtn.addEventListener('click', function() {
        sessionStorage.removeItem('adminLoggedIn');
        showLoginScreen();
    });

    function showLoginScreen() {
        loginScreen.classList.remove('hidden');
        adminContent.classList.add('hidden');
        adminPassword.focus();
    }

    function showAdminPanel() {
        loginScreen.classList.add('hidden');
        adminContent.classList.remove('hidden');
        loadAdmissions();
    }

    // Set today's date as default
    if (reportDate) {
        reportDate.valueAsDate = new Date();
    }

    // Load and display all admissions
    function loadAdmissions() {
        const admissions = JSON.parse(localStorage.getItem('admissions')) || [];
        
        if (admissions.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="13" class="no-data">No admissions found</td></tr>';
            return;
        }

        tableBody.innerHTML = admissions.map(admission => `
            <tr>
                <td>${admission.id.substring(0, 8)}</td>
                <td>${admission.name}</td>
                <td>${admission.school}</td>
                <td>${admission.mobile}</td>
                <td>${admission.place}</td>
                <td>${admission.maths}</td>
                <td>${admission.physics}</td>
                <td>${admission.chemistry}</td>
                <td>${admission.gender}</td>
                <td>${admission.community}</td>
                <td>${admission.firstGraduate}</td>
                <td>${admission.date}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-edit" onclick="editAdmission('${admission.id}')">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-danger" onclick="deleteAdmission('${admission.id}')">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    // Delete admission
    window.deleteAdmission = function(id) {
        if (confirm('Are you sure you want to delete this admission?')) {
            let admissions = JSON.parse(localStorage.getItem('admissions')) || [];
            admissions = admissions.filter(adm => adm.id !== id);
            localStorage.setItem('admissions', JSON.stringify(admissions));
            loadAdmissions();
        }
    };

    // Edit admission
    window.editAdmission = function(id) {
        const admissions = JSON.parse(localStorage.getItem('admissions')) || [];
        const admission = admissions.find(adm => adm.id === id);
        
        if (!admission) {
            alert('Admission not found!');
            return;
        }

        // Fill edit form
        document.getElementById('editId').value = admission.id;
        document.getElementById('editName').value = admission.name;
        document.getElementById('editSchool').value = admission.school;
        document.getElementById('editMobile').value = admission.mobile;
        document.getElementById('editPlace').value = admission.place;
        document.getElementById('editMaths').value = admission.maths;
        document.getElementById('editPhysics').value = admission.physics;
        document.getElementById('editChemistry').value = admission.chemistry;
        document.getElementById('editGender').value = admission.gender;
        document.getElementById('editCommunity').value = admission.community;
        document.getElementById('editFirstGraduate').value = admission.firstGraduate;

        // Show modal
        editModal.classList.remove('hidden');
    };

    // Handle edit form submission
    editForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const id = document.getElementById('editId').value;
        let admissions = JSON.parse(localStorage.getItem('admissions')) || [];
        
        const index = admissions.findIndex(adm => adm.id === id);
        if (index === -1) {
            alert('Admission not found!');
            return;
        }

        // Update admission
        admissions[index] = {
            ...admissions[index],
            name: document.getElementById('editName').value.trim(),
            school: document.getElementById('editSchool').value.trim(),
            mobile: document.getElementById('editMobile').value.trim(),
            place: document.getElementById('editPlace').value.trim(),
            maths: parseInt(document.getElementById('editMaths').value),
            physics: parseInt(document.getElementById('editPhysics').value),
            chemistry: parseInt(document.getElementById('editChemistry').value),
            gender: document.getElementById('editGender').value,
            community: document.getElementById('editCommunity').value,
            firstGraduate: document.getElementById('editFirstGraduate').value
        };

        localStorage.setItem('admissions', JSON.stringify(admissions));
        loadAdmissions();
        editModal.classList.add('hidden');
        alert('Admission updated successfully!');
    });

    // Close modal handlers
    closeModal.addEventListener('click', function() {
        editModal.classList.add('hidden');
    });

    cancelEdit.addEventListener('click', function() {
        editModal.classList.add('hidden');
    });

    // Close modal when clicking outside
    editModal.addEventListener('click', function(e) {
        if (e.target === editModal) {
            editModal.classList.add('hidden');
        }
    });

    // Refresh data
    refreshBtn.addEventListener('click', function() {
        loadAdmissions();
        alert('Data refreshed!');
    });

    // Generate daily report
    generateReportBtn.addEventListener('click', function() {
        const selectedDate = reportDate.value;
        if (!selectedDate) {
            alert('Please select a date!');
            return;
        }

        const admissions = JSON.parse(localStorage.getItem('admissions')) || [];
        const dailyAdmissions = admissions.filter(adm => adm.date === selectedDate);

        const reportDisplay = document.getElementById('dailyReport');
        
        if (dailyAdmissions.length === 0) {
            reportDisplay.innerHTML = `
                <div style="text-align: center; padding: 20px; color: #999;">
                    <i class="fas fa-info-circle" style="font-size: 2em; margin-bottom: 10px;"></i>
                    <p>No admissions found for ${selectedDate}</p>
                </div>
            `;
            return;
        }

        const totalCount = dailyAdmissions.length;
        const totalMarks = dailyAdmissions.reduce((sum, adm) => sum + adm.maths + adm.physics + adm.chemistry, 0);
        const avgMarks = (totalMarks / (totalCount * 3)).toFixed(2);

        let reportHTML = `
            <h3 style="color: #667eea; margin-bottom: 15px;">Report for ${selectedDate}</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px;">
                <div style="background: #e3f2fd; padding: 15px; border-radius: 8px;">
                    <strong>Total Admissions:</strong> ${totalCount}
                </div>
                <div style="background: #f3e5f5; padding: 15px; border-radius: 8px;">
                    <strong>Average Marks:</strong> ${avgMarks}
                </div>
            </div>
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <thead>
                    <tr style="background: #667eea; color: white;">
                        <th style="padding: 10px; text-align: left;">Name</th>
                        <th style="padding: 10px; text-align: left;">Mobile</th>
                        <th style="padding: 10px; text-align: left;">Total Marks</th>
                        <th style="padding: 10px; text-align: left;">Gender</th>
                        <th style="padding: 10px; text-align: left;">Community</th>
                    </tr>
                </thead>
                <tbody>
        `;

        dailyAdmissions.forEach(adm => {
            const totalMarks = adm.maths + adm.physics + adm.chemistry;
            reportHTML += `
                <tr style="border-bottom: 1px solid #e0e0e0;">
                    <td style="padding: 10px;">${adm.name}</td>
                    <td style="padding: 10px;">${adm.mobile}</td>
                    <td style="padding: 10px;">${totalMarks}/300</td>
                    <td style="padding: 10px;">${adm.gender}</td>
                    <td style="padding: 10px;">${adm.community}</td>
                </tr>
            `;
        });

        reportHTML += `
                </tbody>
            </table>
        `;

        reportDisplay.innerHTML = reportHTML;
    });

    // Initial load
    loadAdmissions();
});

