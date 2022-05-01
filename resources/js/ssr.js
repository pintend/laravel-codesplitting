import { createSSRApp, h } from 'vue';
import { renderToString } from '@vue/server-renderer';
import { createInertiaApp } from '@inertiajs/inertia-vue3';
import createServer from '@inertiajs/server';
import route from 'ziggy';

const appName = 'Laravel';

createServer((page) =>
    createInertiaApp({
        page,
        render: renderToString,
        title: (title) => `${title} - ${appName}`,
        resolve: (name) => {
            let module = name.split('/')[0];
            let component = name.split(module + '/')[1];
            return require(`./${module}/Pages/${component}.vue`);
        },
        setup({ app, props, plugin }) {
            return createSSRApp({ render: () => h(app, props) })
                .use(plugin)
                .mixin({
                    methods: {
                        route: (name, params, absolute) => {
                            return route(name, params, absolute, {
                                ...page.props.ziggy,
                                location: new URL(page.props.ziggy.url),
                            });
                        },
                    },
                });
        },
    })
);
