describe('/api/user/register', () => {
  const registerEndpoint = 'http://127.0.0.1:3000/api/user/register';

  it('creates user with valid body', () => {
    let body = {
      name: 'TestName',
      email: 'test@email.com',
      password: 'TestPassword'
    }
    cy.request('POST', registerEndpoint, body)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.name).to.eq('TestName');
        expect(response.body.email).to.eq('test@email.com');
        expect(response.body.password).to.eq('TestPassword');
      })
  });

  it('Not allow to create user with bad user body', () => {
    let badBody = {
      name: 'aa',
      email: 'te.com',
      password: 'dd'
    }

    cy.request({
      method: 'POST',
      url: registerEndpoint,
      failOnStatusCode: false,
      body: badBody
    }).then((response) => {
      expect(response.status).to.eq(400);
    })
  });

  it('Not allow to create user with invalid Email', () => {
    let badBody = {
      name: 'validName',
      email: 'te343.com',
      password: 'validPassword'
    }

    cy.request({
      method: 'POST',
      url: registerEndpoint,
      failOnStatusCode: false,
      body: badBody
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.eq('"email" must be a valid email');
    })
  });

  it('Not allow to create user without password', () => {
    let badBody = {
      name: 'validName',
      email: 'test@gmail.com'
    }

    cy.request({
      method: 'POST',
      url: registerEndpoint,
      failOnStatusCode: false,
      body: badBody
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.eq('"password" is required');
    })
  });

  it('returns 400 when with no body', () => {
    cy.request({
      method: 'POST',
      url: registerEndpoint,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    })
  })
})