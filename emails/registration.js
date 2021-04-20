module.exports = function(to){
    return {
        to:to,
        from:"damr18@gmail.com",
        subject:"Account creted",
        html: `<h1>Welcome to the store</h1>
                <p>you created an account successfully! with the email - ${to}</p>
                <hr />
                
                <a href="${process.env.BASE_URL}"> Course Store</a>
                `
      }
}

