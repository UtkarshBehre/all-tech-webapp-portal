export const environment = {
    chat_config: {
        chat_hub_url: 'https://all-tech-webapp-service.azurewebsites.net/Chat'
    },
    services_todo_config: {
        endpoint_base_url: 'https://all-tech-webapp-service.azurewebsites.net/api',

        todoItem: {
            endpoint_create: '/todoItem/create',
            endpoint_get_all: '/todoItem/all',
            endpoint_get_by_group: '/todoItem/all/',
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
            endpoint_update: '/user/update/',
            endpoint_delete: '/user/delete/'
        },
        dashboard: {
            endpoint_get: '/dashboard/'
        }
    }
};
