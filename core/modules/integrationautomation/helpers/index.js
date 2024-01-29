export const httpMethodOptions = [
    { id: 'GET', name: 'GET' },
    { id: 'POST', name: 'POST' },
    { id: 'PUT', name: 'PUT' },
    { id: 'PATCH', name: 'PATCH' },
    { id: 'DELETE', name: 'DELETE' },
];

export const typeOptions = [
    { id: 'direct', name: 'Direct' },
    { id: 'topic', name: 'Topic' },
    { id: 'headers', name: 'Headers' },
    { id: 'Fanout', name: 'Fanout' },
];

export const modeOptions = [
    { id: 'queue', name: 'Queue' },
    { id: 'exchange', name: 'Exchange' },
];

export const conditionOptions = [
    { value: 'company_id', label: 'Company', key: 'company' },
    { value: 'channel_id', label: 'Channel', key: 'channel' },
    { value: 'loc_id', label: 'Location', key: 'location' },
];

export const actionsOptions = [
    { value: 'http_request', label: 'Send HTTP Request' },
    { value: 'rabbitmq', label: 'Publish to RabbitMQ' },
];
