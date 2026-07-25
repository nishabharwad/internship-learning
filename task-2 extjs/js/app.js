Ext.onReady(function() {

    var userStore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: 'https://jsonplaceholder.typicode.com/users'
        }),
        reader: new Ext.data.JsonReader({ fields: ['name', 'email', 'phone', 'website'] })
    });

    var userGrid = new Ext.grid.GridPanel({
        title: 'Users',
        store: userStore,
        columns: [
            { header: 'Name',    dataIndex: 'name',    width: 150 },
            { header: 'Email',   dataIndex: 'email',   width: 200 },
            { header: 'Phone',   dataIndex: 'phone',   width: 150 },
            { header: 'Website', dataIndex: 'website', width: 150 }
        ],
        renderTo: 'grid-container',
        width: 700,
        height: 320,
        loadMask: true,   
        stripeRows: true  
    });

    userStore.load();

});