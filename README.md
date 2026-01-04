# R.M Engineering College - Admission Website

A student-friendly admission portal with form submission, eligibility verification, QR code generation, and admin panel for managing admissions.

## Features

- **Admission Form**: Easy-to-use form with all required fields (Name, School, Mobile, Place, Marks, Gender, Community, First Graduate)
- **Eligibility Check**: Automatic eligibility verification with success message
- **QR Code Generation**: Generates QR code with admission details after submission
- **Clear Cart**: Reset form functionality
- **Admin Panel**: Full CRUD operations for managing admissions
- **Daily Reports**: Filter and view admissions by date

## Setup Instructions

1. **Add College Image**: 
   - Place the R.M Engineering College image in the `images/` folder
   - Name it `college-image.jpg` (or update the image path in `index.html` line 12 if using a different name/format)

2. **Open the Website**:
   - Simply open `index.html` in a web browser
   - No server setup required (uses LocalStorage for data storage)

## File Structure

```
├── index.html          # Main admission form page
├── admin.html          # Admin panel for managing admissions
├── css/
│   └── style.css       # Styling for both pages
├── js/
│   ├── main.js         # Form handling and QR code generation
│   └── admin.js        # Admin panel functionality
└── images/
    └── college-image.jpg  # College banner image (to be added)
```

## Usage

### Student Form (index.html)
1. Fill in all the required fields
2. Click "Submit" button
3. Eligibility message and QR code will be displayed
4. Use "Clear Cart" to reset the form

### Admin Panel (admin.html)
1. View all admissions in the table
2. Use "Edit" button to update admission records
3. Use "Delete" button to remove admission records
4. Generate daily reports by selecting a date and clicking "Generate Report"
5. Click "Refresh" to reload data

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Font Awesome Icons (CDN)
- QRCode.js Library (CDN)
- LocalStorage API

## Notes

- All data is stored in browser LocalStorage (client-side only)
- Eligibility check always shows success message (no conditional logic)
- QR code contains admission details and eligibility confirmation
- Responsive design works on desktop and mobile devices


