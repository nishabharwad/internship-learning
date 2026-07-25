Ext.onReady(function() {

    var openBtn = new Ext.Button({
        text: 'Open Window',
        renderTo: Ext.getBody(),
        handler: function() {

            console.log('hidden:', myWindow.hidden);
            console.log('manager:', myWindow.manager);
    
            myWindow.show();
        }
    });

    var myWindow = new Ext.Window({
        title: 'window',
        width: 300,
        height: 200,
        closable: true,
        modal: true,
        closeAction: 'hide',
        manager: Ext.WindowMgr,
        items: [
            new Ext.Button({
                text: 'ok',
                handler: function() {
                    Ext.MessageBox.alert('Message', 'OK button is clicked');
                }
            }),
            new Ext.Button({
                text: 'Close',
                handler: function() {
                    myWindow.hide();
                }
            })
        ]
    });

});



