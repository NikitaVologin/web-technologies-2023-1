import api from "../services/api.js";

const TodosRepository = {
    async getAll() {
        return await api('/todo', {
            method: 'GET',
        });
    },

    async get(id) {
        return await api('/todo/' + id, {
            method: 'GET',
        });
    },

    async create(description) {
        return await api('/todo', {
            method: 'POST',
            body: JSON.stringify({ description: description })
        });
    },

    async update(id, completed) {
        return await api('/todo/' + id, {
            method: 'PUT',
            body: JSON.stringify({ completed: completed }) 
        });
    },

    async delete(id) {
        return await api('/todo/' + id, {
            method: 'DELETE',
        });
    }
}

export default TodosRepository