import TodosRepository from "../repository/todos.js";
import location from "./location.js";

class Todos {

    static async getAll() {
        const response = await TodosRepository.getAll();
        return response.data;
    }

    static async get(id) {
        const response = await TodosRepository.get(id);
        return response.data;
    }

    static async create(description) {
        const response = await TodosRepository.create(description);
        return response.data;
    }

    static async update(id, completed) {
        const response = await TodosRepository.update(id, completed);
        return response.data;
    }

    static async delete(id) {
        const response = await TodosRepository.delete(id);
        return response.data;
    }
}

export default Todos