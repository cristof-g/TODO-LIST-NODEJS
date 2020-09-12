const vue =  new Vue({
    el : "#app",
    data: {
        task : {
            _id : '',
            title: '',
            description : '',
        },
        tasks : {},
        isTaskEdit: false,
    },
    methods : {
        showModal: function(taskId=null){
            this.isTaskEdit = false;
            
            if(taskId != null){
                this.getTask(taskId);
                this.isTaskEdit = true;
            }

            let modal = new BSN.Modal("#taskModal");
            modal.show();
        },
        newTask: function(){
            const self = this;

            axios.post('/tasks', {
                title: self.task.title,
                description: self.task.description,
            }).then(function(response){
                if(response.data.status == 'success'){
                    self.getTasks();
                    self.task._id = '',
                    self.task.title = '';
                    self.task.description = '';
                }
            }).catch(function(err){
                console.log(err);
            });
        },
        editTask: function(id){
            const self = this;

            axios.put('/tasks/'+id, {
                title: self.task.title,
                description: self.task.description
            }).then(function(resp){
                if(resp.data.status == 'success'){
                    self.getTasks();
                    self.task._id = '';
                    self.task.title = '';
                    self.task.description = '';

                    let modal = new BSN.Modal("#taskModal");
                    modal.close();
                }
            }).catch(function(err){
                console.log(err);
            });

            
        },
        getTasks: function(){
            const self = this;

            axios.get('/tasks')
                .then(function(response){
                    self.tasks = response.data;
                }).catch(function(err){
                    console.log(err);
                });
        },
        getTask: function(id){
            const self = this;

            axios.get('/tasks/' + id)
                .then(function(resp){
                    self.task._id = resp.data._id;
                    self.task.title = resp.data.title;
                    self.task.description = resp.data.description;
                }).catch(function(err){
                    console.log(err);
                });
        },
        removeTask: function(id){
            const self = this;
            const url  =  '/tasks/'+  id;
            
            axios.delete(url)
                .then(function(response){
                    if(response.data.status == 'success'){
                        self.getTasks();
                    }
                }).catch(function(err){
                    console.log(err);
                });
        },
        turnTask: function(id){
            const self = this;
            let link = '/tasks/'+  id + '/turn'; 

            axios.get(link).
                then(function(response){
                    if(response.data.status == 'success'){
                        self.getTasks();
                    }
                }).catch(function(err){
                    console.log(err);
                });
        },
    },
    mounted : function(){
        this.getTasks();
       
    }
});