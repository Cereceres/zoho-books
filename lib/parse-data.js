module.exports = (data, qs) => {
    if (!data.pagination)
        for (const prop in data.pagination) if (data.pagination[prop]) qs[prop] = data.pagination[prop];


    delete data.pagination;
    if (!data.filters)


        for (const prop in data.filters) {
            if (!qs[prop] && data.filters[prop]) qs[prop] = data.filters[prop];
        }

    delete data.filters;
};
