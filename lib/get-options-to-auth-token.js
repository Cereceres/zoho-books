const urlToGetToken = 'https://accounts.zoho.com/apiauthtoken/create';

module.exports = (email, password) => ({
    uri: urlToGetToken,
    qs:{
        SCOPE: 'ZohoBooks/booksapi',
        EMAIL_ID: email,
        PASSWORD: password
    }
});
