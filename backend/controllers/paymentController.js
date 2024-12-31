const generatePaymentLink = (req, res) => {
    const { amount, payee } = req.body;

    if (!amount || !payee) {
        return res.status(400).json({ error: 'Amount and payee are required.' });
    }

    // Simulate generating a payment link for a specific recipient
    const paymentLink = `https://www.example.com/pay?amount=${amount}&payee=${encodeURIComponent(payee)}`;


    res.status(200).json({ paymentLink });
};

const handleSuccess = (req, res) => {
    const { amount, payee } = req.query;

    if (!amount || !payee) {
        return res.status(400).send('Invalid payment details.');
    }

    res.render('success', { amount, payee });
};

module.exports = { generatePaymentLink, handleSuccess };
