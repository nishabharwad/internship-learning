Ext.onReady(function() {

    var userStore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: 'https://jsonplaceholder.typicode.com/users'
        }),
        reader: new Ext.data.JsonReader({ fields: ['name', 'email', 'phone', 'website', { name: 'city', mapping: 'address.city' }] })
    });

    var userGrid = new Ext.grid.GridPanel({
        title: 'Users',
        store: userStore,
        columns: [
            { header: 'Name',    dataIndex: 'name',    width: 150 },
            { header: 'Email',   dataIndex: 'email',   width: 200 },
            { header: 'Phone',   dataIndex: 'phone',   width: 150 },
            { header: 'Website', dataIndex: 'website', width: 150 },
            { header: 'City',    dataIndex: 'city',    width: 150 }
        ],
        renderTo: 'grid-container',
        width: 760,
        height: 280,
        loadMask: true,   
        stripeRows: true 
    });

    userStore.load({
        callback: function(){
            
           
            userStore.sort('name', 'DESC' )

            userStore.filterBy( function(record) {
                    return record.get('website').indexOf('.') !== -1;
            });

            while (userStore.getCount()>6)
            {
             
                userStore.removeAt(6);
            }
    }});

});