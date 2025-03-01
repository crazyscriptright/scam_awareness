const axios = require('axios');

const verifyCaptcha = async (token) => {
    try {
        const response = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
        );
        return response.data.success; // Returns true if CAPTCHA is valid
    } catch (err) {
        console.error('CAPTCHA verification failed:', err);
        return false;
    }
};

module.exports = { verifyCaptcha };
