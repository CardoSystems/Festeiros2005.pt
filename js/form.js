/* Form handling script */
document.addEventListener('DOMContentLoaded', function() {
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show some loading state
            const submitBtn = orderForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'A enviar...';
            submitBtn.disabled = true;
            
            const formData = new FormData(orderForm);
            const formSuccess = orderForm.querySelector('.form-success');
            const formError = orderForm.querySelector('.form-error');
            
            // Hide any previous messages
            formSuccess.style.display = 'none';
            formError.style.display = 'none';
            
            // Use fetch API to submit the form
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(async (response) => {
                let json = await response.json();
                
                if (response.status === 200) {
                    // Success
                    formSuccess.style.display = 'block';
                    orderForm.reset();
                } else {
                    // Error
                    console.log(json);
                    formError.style.display = 'block';
                    formError.innerHTML = json.message || 'Ocorreu um erro ao enviar o formulário. Por favor tente novamente.';
                }
            })
            .catch(error => {
                console.log(error);
                formError.style.display = 'block';
            })
            .finally(() => {
                // Reset submit button
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                
                // Scroll to the appropriate message
                const messageToShow = formSuccess.style.display === 'block' ? formSuccess : formError;
                if (messageToShow.style.display === 'block') {
                    messageToShow.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                
                // Hide success message after a delay
                if (formSuccess.style.display === 'block') {
                    setTimeout(() => {
                        formSuccess.style.display = 'none';
                    }, 5000);
                }
            });
        });
    }
});