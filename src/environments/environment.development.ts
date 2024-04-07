export const environment = {
    endpoint_todo_hub_url: 'https://localhost:7152/Todo',
    endpoint_chat_hub_url: 'https://localhost:7152/Chat',
    todo_config: {
        endpoint_base_url: 'https://localhost:7152/api',
        //endpoint_base_url: 'https://localhost:7152/api',
        todoItem: {
            endpoint_create: '/todoItem/create',
            endpoint_get_by_user: '/todoItem/all/userId=',
            endpoint_get_by_group: '/todoItem/all/groupId=',
            endpoint_get_by_id: '/todoItem/',
            endpoint_update: '/todoItem/update/',
            endpoint_delete: '/todoItem/delete/'
        },
        todoGroup: {
            endpoint_create: '/todoGroup/create',
            endpoint_get_by_id: '/todoGroup/',
            endpoint_update: '/todoGroup/update/',
            endpoint_share: '/todoGroup/share/',
            endpoint_delete: '/todoGroup/delete/'
        },
        userTodo: {
            endpoint_create: '/userTodo/create',
            endpoint_get_all: '/userTodo/all',
            endpoint_get_by_id: '/userTodo/',
            endpoint_update: '/userTodo/update/',
            endpoint_delete: '/userTodo/delete/'
        },
        user: {
            endpoint_create: '/user/create',
            endpoint_get: '/user',
            endpoint_get_by_email: '/user/email/',
            endpoint_update: '/user/update/',
            endpoint_delete: '/user/delete/'
        },
        dashboard: {
            endpoint_get: '/dashboard/'
        }
    }
};
