describe('/api/user/register', () => {
    const loginEndpoint = 'http://127.0.0.1:3000/api/user/login';
  
    it('Log in with valid user', () => {
      let body = {
        email: 'het@gmail.com',
        password: 'het@1234'
      }
      cy.request('POST', loginEndpoint, body)
        .then((response) => {
          expect(response.status).to.eq(200);
        })
    });
});