document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('idCardForm');
    const photoInput = document.getElementById('photo');
    const companyLogoInput = document.getElementById('companyLogo');
    const previewPhoto = document.getElementById('previewPhoto');
    const previewCompanyLogo = document.getElementById('previewCompanyLogo');
    const downloadBtn = document.getElementById('downloadBtn');
    
    // Preview company logo when selected
    companyLogoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewCompanyLogo.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Preview photo when selected
    photoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewPhoto.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = {
            fullName: formData.get('fullName'),
            employeeId: formData.get('employeeId'),
            department: formData.get('department'),
            position: formData.get('position'),
            photo: previewPhoto.src,
            companyLogo: previewCompanyLogo.src
        };

        // Update preview
        document.getElementById('previewName').textContent = data.fullName;
        document.getElementById('previewId').textContent = data.employeeId;
        document.getElementById('previewDepartment').textContent = data.department;
        document.getElementById('previewPosition').textContent = data.position;
        
        // Set validity date (1 year from now)
        const validUntil = new Date();
        validUntil.setFullYear(validUntil.getFullYear() + 1);
        document.getElementById('validUntil').textContent = validUntil.toLocaleDateString();

        // Enable download button
        downloadBtn.disabled = false;

        try {
            // Send data to backend
            const response = await fetch('http://localhost:8080/api/idcard/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Failed to generate ID card');
            }

            const result = await response.json();
            console.log('ID Card generated successfully:', result);
        } catch (error) {
            console.error('Error generating ID card:', error);
            alert('Failed to generate ID card. Please try again.');
        }
    });

    // Handle download
    downloadBtn.addEventListener('click', async () => {
        try {
            const idCard = document.getElementById('idCardPreview');
            
            // Use html2canvas to capture the ID card
            const canvas = await html2canvas(idCard, {
                scale: 2, // Higher quality
                useCORS: true, // Enable CORS for images
                allowTaint: true // Allow cross-origin images
            });
            const image = canvas.toDataURL('image/png');
            
            // Create download link
            const link = document.createElement('a');
            link.href = image;
            link.download = 'id-card.png';
            link.click();
        } catch (error) {
            console.error('Error downloading ID card:', error);
            alert('Failed to download ID card. Please try again.');
        }
    });
}); 