class Autosave {

    save(query) {
        return this.query(query.payload.key ? 'update' : 'create', query);
    }

    create(query) {
        return this.query('create', query);
    }

    update(query) {
        return this.query('update', query);
    }

    get(query) {
        return this.query('read', query);
    }

    delete(query) {
        return this.query('delete', query);
    }

    query(action, query) {
        return axios.post(ASSETS + 'autosave/' + action, query)
            .then(response => {
                return response.data.success 
                    ? response.data.data
                    : false;
            })
            .catch(error => {
                console.error(error);
                return false;
            });
    }

}

export default Autosave = new Autosave(); 