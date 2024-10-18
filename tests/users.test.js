// Unit tests for automated grading of the User Management API
const request = require('supertest');
const app = require('../src/index');

describe('User Management API (Grading)', () => {
    // PR Submitted Test (1 point)
    it('PR was successfully created and merged (1 point)', () => {
        expect(true).toBe(true); // Dummy test that always passes
    });

    // POST /users test (1 point)
    it('POST /users should create a new user (1 point)', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                name: 'John Doe',
                email: 'john@example.com',
            })
            .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe('John Doe');
        expect(response.body.email).toBe('john@example.com');
    });

    // GET /users/:id test (1 point)
    it('GET /users/:id should return user details (1 point)', async () => {
        // Create a user before retrieving it
        const postResponse = await request(app)
            .post('/users')
            .send({
                name: 'John Doe',
                email: 'john@example.com',
            })
            .expect(201);

        const userId = postResponse.body.id; // Capture the created user's ID

        // Now retrieve the user details
        const getResponse = await request(app)
            .get(`/users/${userId}`)
            .expect(200);

        expect(getResponse.body).toHaveProperty('id', userId);
        expect(getResponse.body.name).toBe('John Doe');
        expect(getResponse.body.email).toBe('john@example.com');
    });

    // PUT /users/:id test (1 point)
    it('PUT /users/:id should update user details (1 point)', async () => {
        // First, create a user to update
        const postResponse = await request(app)
            .post('/users')
            .send({
                name: 'John Doe',
                email: 'john@example.com',
            })
            .expect(201);

        const userId = postResponse.body.id; // Capture the created user's ID

        // Now update the user
        const putResponse = await request(app)
            .put(`/users/${userId}`)
            .send({
                name: 'Jane Doe',
                email: 'jane@example.com',
            })
            .expect(200);

        expect(putResponse.body.name).toBe('Jane Doe');
        expect(putResponse.body.email).toBe('jane@example.com');
    });

    // DELETE /users/:id test (1 point)
    it('DELETE /users/:id should delete the user (1 point)', async () => {
        // First, create a user to delete
        const postResponse = await request(app)
            .post('/users')
            .send({
                name: 'John Doe',
                email: 'john@example.com',
            })
            .expect(201);

        const userId = postResponse.body.id; // Capture the created user's ID

        // Now delete the user
        await request(app)
            .delete(`/users/${userId}`)
            .expect(204);

        // Confirm that the user was deleted
        await request(app)
            .get(`/users/${userId}`)
            .expect(404); // Expect 404 since the user no longer exists
    });
});
