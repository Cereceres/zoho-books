module.exports = (self) => (res) => {
    const json = res
        .split('\n')
        .reduce((_json, line) => {
            const value = line.split('=');
            if (value.length > 1) _json[value[0].toLowerCase()] = value[1];
            return _json;
        }, {});
    if (!json.authtoken) return Promise.reject(json);

    self.options.authtoken = json.authtoken;
    return json;
};
