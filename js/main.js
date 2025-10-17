// Interactive Timeline JavaScript
class InteractiveTimeline {
    constructor() {
        this.timelineItems = document.querySelectorAll('.timeline-item');
        this.contentAreas = document.querySelectorAll('.content-area');
        this.progressBar = document.getElementById('timelineProgress');
        
        this.init();
    }

    init() {
        this.timelineItems.forEach((item, index) => {
            item.addEventListener('click', () => this.showContent(item, index));
        });

        // Initialize with Harvard (current) active - find the harvard item
        const harvardIndex = Array.from(this.timelineItems).findIndex(item => 
            item.dataset.period === 'harvard'
        );
        if (harvardIndex !== -1) {
            // Also set Harvard as active initially
            this.timelineItems.forEach(item => item.classList.remove('active'));
            this.timelineItems[harvardIndex].classList.add('active');
            // Set progress bar to extend all the way to the end (100%)
            this.progressBar.style.width = '100%';
            
            // Scroll to Harvard initially after a short delay
            setTimeout(() => {
                this.scrollToActiveItem(this.timelineItems[harvardIndex]);
            }, 500);
        }
    }

    showContent(clickedItem, index) {
        // Update active states
        this.timelineItems.forEach(item => item.classList.remove('active'));
        clickedItem.classList.add('active');

        // Scroll to active item
        this.scrollToActiveItem(clickedItem);

        // Hide all content areas
        this.contentAreas.forEach(area => area.classList.remove('active'));

        // Show selected content
        const period = clickedItem.dataset.period;
        const targetContent = document.getElementById(`content-${period}`);
        if (targetContent) {
            setTimeout(() => {
                targetContent.classList.add('active');
                
                // Add animation classes to child elements
                const mainContent = targetContent.querySelector('.content-main');
                const sidebar = targetContent.querySelector('.content-sidebar');
                
                if (mainContent) {
                    mainContent.classList.remove('fade-in');
                    void mainContent.offsetWidth; // Force reflow
                    mainContent.classList.add('fade-in');
                }
                if (sidebar) {
                    sidebar.classList.remove('slide-in-right');
                    void sidebar.offsetWidth; // Force reflow
                    sidebar.classList.add('slide-in-right');
                }
            }, 100);
        }

        // Update progress bar
        this.updateProgressBar(index);
    }

    scrollToActiveItem(activeItem) {
        const timelineWrapper = document.getElementById('timelineWrapper');
        const itemRect = activeItem.getBoundingClientRect();
        const wrapperRect = timelineWrapper.getBoundingClientRect();
        
        // Calculate scroll position to center the active item
        const scrollLeft = timelineWrapper.scrollLeft + 
            (itemRect.left - wrapperRect.left) - 
            (wrapperRect.width / 2) + 
            (itemRect.width / 2);
        
        timelineWrapper.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
        });
    }

    updateProgressBar(activeIndex) {
        // Always keep the progress bar at 100% to show the complete journey
        this.progressBar.style.width = '100%';
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    new InteractiveTimeline();

    // Mobile navigation toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const headerNav = document.getElementById('headerNav');

    if (mobileMenuBtn && headerNav) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            headerNav.classList.toggle('active');
        });

        // Close mobile menu when clicking nav links
        const navLinks = headerNav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                headerNav.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuBtn.contains(e.target) && !headerNav.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                headerNav.classList.remove('active');
            }
        });
    }

    // Handle modal functionality for Sidequest section
    const modal = document.querySelectorAll('.modal');
    const collageItems = document.querySelectorAll('.collage-item');
    const modalCloses = document.querySelectorAll('.modal-close');

    // Open modals
    collageItems.forEach(item => {
        item.addEventListener('click', function() {
            const modalType = this.dataset.modal;
            const targetModal = document.getElementById(`modal-${modalType}`);
            if (targetModal) {
                targetModal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    // Close modals
    modalCloses.forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        });
    });

    // Close modal when clicking outside
    modal.forEach(modalElement => {
        modalElement.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modal.forEach(modalElement => {
                if (modalElement.style.display === 'block') {
                    modalElement.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });

    // Handle expandable sidebar items
    document.querySelectorAll('.expandable-item').forEach((item, index) => {
        item.addEventListener('click', function() {
            // Find the parent content area
            const contentArea = this.closest('.content-area');
            const expandableSection = contentArea.querySelector('.expandable-content-section');
            const isExpanded = this.classList.contains('expanded');
            
            // Hide all other expanded sections in this content area
            contentArea.querySelectorAll('.expandable-content-section').forEach(section => {
                if (section !== expandableSection) {
                    section.style.display = 'none';
                }
            });
            
            // Remove expanded class from all items in this content area
            contentArea.querySelectorAll('.expandable-item').forEach(otherItem => {
                if (otherItem !== this) {
                    otherItem.classList.remove('expanded');
                }
            });
            
            if (isExpanded) {
                // Collapse
                expandableSection.style.display = 'none';
                this.classList.remove('expanded');
            } else {
                // Expand
                expandableSection.style.display = 'block';
                this.classList.add('expanded');
                
                // Smooth scroll to the expanded content after animation
                setTimeout(() => {
                    expandableSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest'
                    });
                }, 200);
            }
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
        }
    }
});