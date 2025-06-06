document.addEventListener('DOMContentLoaded', function() {
    // Handle sidebar navigation - including subnav items
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    const sidebarSubItems = document.querySelectorAll('.sidebar-sub-item');
    const contentSections = document.querySelectorAll('.settings-container');
    
    // Get toast element
    const toast = document.getElementById('settings-toast');
    
    // Function to update sidebar selection
    function updateSidebarSelection(item, isSubItem = false) {
        // Remove selection from all items
        sidebarItems.forEach(si => {
            si.classList.remove('selected');
            
            // Remove checkmarks
            const checkmark = si.querySelector('.checkmark');
            if (checkmark) {
                si.removeChild(checkmark);
            }
        });
        
        // Also remove selection from sub-items
        sidebarSubItems.forEach(si => {
            si.classList.remove('selected');
            
            // Remove checkmarks
            const checkmark = si.querySelector('.checkmark');
            if (checkmark && !si.classList.contains('add-form')) {
                si.removeChild(checkmark);
            }
        });
        
        // Add selected class to clicked item
        item.classList.add('selected');
        
        // Add checkmark to this item if it doesn't already have one
        if (!item.querySelector('.checkmark') && !item.classList.contains('add-form')) {
            const checkmark = document.createElement('span');
            checkmark.className = 'checkmark';
            checkmark.textContent = '✓';
            item.appendChild(checkmark);
        }
    }
    
    // Function to show toast notification
    function showToast() {
        console.log('Showing toast notification');
        
        // Remove the class if it's already there (to reset animation)
        toast.classList.remove('show');
        
        // Force a reflow before adding the class again
        void toast.offsetWidth;
        
        // Add the class to start the animation
        toast.classList.add('show');
        
        // Automatically hide toast after 1 second
        setTimeout(() => {
            toast.classList.remove('show');
        }, 1000);
    }
    
    // Get references to relevant elements
    const formsParent = document.querySelector('.sidebar-item.parent[data-page="forms"]');
    const formsSubnav = document.querySelector('.sidebar-subnav');
    const firstFormItem = document.querySelector('.sidebar-sub-item[data-page="demographic-form"]');
    
    // By default, hide or show the forms subnav based on initial selection
    const selectedForm = document.querySelector('.sidebar-sub-item.selected');
    if (selectedForm) {
        formsSubnav.style.display = 'block';
    } else {
        formsSubnav.style.display = 'none';
    }
    
    // When the Forms parent is clicked
    formsParent.addEventListener('click', function() {
        // Show the forms subnav
        formsSubnav.style.display = 'block';
        
        // Select the first form in the subnav and show its content
        updateSidebarSelection(firstFormItem, true);
        
        // Show the first form's content
        contentSections.forEach(section => {
            section.style.display = 'none';
        });
        document.getElementById('demographic-form-content').style.display = 'block';
    });
    
    // When non-Forms items are clicked, hide the subnav
    sidebarItems.forEach(item => {
        if (item !== formsParent) {
            item.addEventListener('click', function() {
                formsSubnav.style.display = 'none';
            });
        }
    });
    
    // Add event listeners to main nav items
    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            if (!this.classList.contains('parent')) {
                updateSidebarSelection(this);
                
                // Show corresponding content
                const page = this.getAttribute('data-page');
                contentSections.forEach(section => {
                    section.style.display = 'none';
                });
                document.getElementById(`${page}-content`).style.display = 'block';
            }
        });
    });
    
    // Add event listeners to subnav items
    sidebarSubItems.forEach(item => {
        if (!item.classList.contains('add-form')) {
            item.addEventListener('click', function() {
                updateSidebarSelection(this, true);
                
                // Show corresponding content
                const page = this.getAttribute('data-page');
                contentSections.forEach(section => {
                    section.style.display = 'none';
                });
                document.getElementById(`${page}-content`).style.display = 'block';
            });
        } else {
            // Handle add form button
            item.addEventListener('click', function() {
                console.log('Add new form clicked');
                alert('This would open a form upload dialog');
            });
        }
    });
    
    // Get all toggle inputs
    const toggles = document.querySelectorAll('.toggle input');
    
    // Add event listeners to toggles
    toggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const sectionId = this.getAttribute('data-section');
            const patientSection = document.getElementById(sectionId);
            const patientCheckboxes = patientSection.querySelectorAll('input[type="checkbox"]');
            
            console.log(`Toggle changed for ${sectionId}:`, this.checked);
            
            // Show/hide the patient types section
            if (this.checked) {
                patientSection.style.display = 'block';
                
                // When toggle is turned on:
                // 1. Select only the New patients checkbox (first one)
                // 2. Ensure Existing patients checkbox (second one) is unchecked
                patientCheckboxes[0].checked = true;  // New patients
                
                // If there's a second checkbox (Existing patients), uncheck it
                if (patientCheckboxes.length > 1) {
                    patientCheckboxes[1].checked = false;  // Existing patients
                }
            } else {
                patientSection.style.display = 'none';
            }
            
            // Show toast notification
            showToast();
        });
    });
    
    // Add event listeners to all patient type checkboxes
    const allCheckboxes = document.querySelectorAll('.checkbox-container input');
    allCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const parentId = this.getAttribute('data-parent');
            const parentSection = document.getElementById(parentId);
            const siblingCheckboxes = parentSection.querySelectorAll('input[type="checkbox"]');
            const toggle = document.querySelector(`input[data-section="${parentId}"]`);
            
            console.log(`Checkbox changed in ${parentId}:`, this.checked);
            
            // If no patient type is selected, turn off the related toggle
            if (Array.from(siblingCheckboxes).every(cb => !cb.checked)) {
                toggle.checked = false;
                parentSection.style.display = 'none';
            }
            
            // Show toast notification
            showToast();
        });
    });
    
    // Initialize all sections based on toggle state
    toggles.forEach(toggle => {
        const sectionId = toggle.getAttribute('data-section');
        const patientSection = document.getElementById(sectionId);
        
        if (toggle.checked) {
            patientSection.style.display = 'block';
        } else {
            patientSection.style.display = 'none';
        }
    });
}); 