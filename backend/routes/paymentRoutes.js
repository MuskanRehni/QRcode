const express = require('express');
const { generatePaymentLink, handleSuccess } = require('../controllers/paymentController');

const router = express.Router();

// Route to generate a payment link
router.post('/generate', generatePaymentLink);

// Route to display success page after scanning
router.get('/success', handleSuccess);

module.exports = router;
