interface ContactFormData {
    name: string;
    email: string;
    contact: string;
    subject: string;
    message: string;
}

const contactForm = document.getElementById('contactForm') as HTMLFormElement;

const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validateContactNumber = (contact: string): boolean => {
    const contactRegex = /^[0-9]{10}$/;
    return contactRegex.test(contact);
};

const validateForm = (data: ContactFormData): boolean => {
    if (!data.name.trim()) {
        alert('Name is required');
        return false;
    }

    if (!validateEmail(data.email)) {
        alert('Invalid email format');
        return false;
    }

    if (!validateContactNumber(data.contact)) {
        alert('Invalid contact number');
        return false;
    }

    if (!data.subject.trim()) {
        alert('Subject is required');
        return false;
    }

    if (!data.message.trim()) {
        alert('Message is required');
        return false;
    }

    return true;
};

const handleSubmit = async (event: Event) => {
    event.preventDefault();

    const formData: ContactFormData = {
        name: (document.getElementById('name') as HTMLInputElement).value,
        email: (document.getElementById('email') as HTMLInputElement).value,
        contact: (document.getElementById('contact') as HTMLInputElement).value,
        subject: (document.getElementById('subject') as HTMLInputElement).value,
        message: (document.getElementById('message') as HTMLTextAreaElement).value,
    };


    if (!validateForm(formData)) {
        return;
    }

    try {
        const response = await fetch('https://671763d3b910c6a6e027ddcb.mockapi.io/api/contactform', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert('Message sent successfully!');
        } else {
            alert('Failed to send message. Please try again.');
        }
    } catch (error) {
        console.error('Error submitting form', error);
        alert('An error occurred. Please try again.');
    }
};

contactForm.addEventListener('submit', handleSubmit);
