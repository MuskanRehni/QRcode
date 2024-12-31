document.addEventListener('DOMContentLoaded', () => {
    // Select the form element
    const form = document.querySelector('#payment-form');
    const qrCanvas = document.querySelector('#qr-code'); // Assuming you have a <canvas> with id "qr-code"

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const amount = document.querySelector('#amount').value;
        const payee = document.querySelector('#payee').value;

        if (!amount || !payee) {
            alert('Please fill out all fields.');
            return;
        }

        try {
            // Send request to backend to generate payment link
            const response = await fetch('/api/payments/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount, payee }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate payment link');
            }

            const { paymentLink } = await response.json();

            // Clear previous QR code
            const ctx = qrCanvas.getContext('2d');
            ctx.clearRect(0, 0, qrCanvas.width, qrCanvas.height);

            // Generate QR Code
            QRCode.toCanvas(qrCanvas, paymentLink, {
                width: 256,
                color: {
                    dark: '#000', // Black
                    light: '#FFF', // White
                },
            }, (error) => {
                if (error) {
                    console.error('Error generating QR Code:', error);
                    alert('Failed to generate QR Code.');
                } else {
                    console.log('QR Code generated successfully.');
                }
            });
        } catch (error) {
            console.error(error);
            alert('Something went wrong.');
        }
    });
});

