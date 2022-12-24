import apiService from "../../../services";

export const TodoService = {
  getTodo(params: any) {
    return apiService.get("todo", { params });
  },
  addTodo(params: any) {
    return apiService.post("todo", params);
  },
  updateTodo(id: any, params: any) {
    return apiService.put(`todo/${id}`, params);
  },
  deleteTodo(id: any) {
    return apiService.delete(`todo/${id}`);
  },
};
