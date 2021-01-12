class Autosave {

    constructor() {
        this.saving = false;
    }

    save(query) {
        return this.saving === false 
            ? this.query(query.payload.key ? 'update' : 'create', query)
            : new Promise((resolve, reject) => {
                return null
            });
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
        this.saving = true;

        return axios.post(ASSETS + 'autosave/' + action, query)
            .then(response => {
                this.saving = false;

                return response.data.success 
                    ? response.data.data
                    : false;
            })
            .catch(error => {
                console.error(error);
                return false;
            });
    }

    
    processCurrentStage(stage) {
        if(stage === undefined || stage == null || stage == ""){
            return 1;
        }

        var stageArray = stage.split(" ");

        return parseInt(stageArray[0]);
    }
}

export default Autosave = new Autosave(); 