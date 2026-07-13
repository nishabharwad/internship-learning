Ext.onReady(function() {

    var openBtn = new Ext.Button({
        text: 'Open Window',
        renderTo: Ext.getBody(),
        handler: function() {
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
                    myWindow.close();
                }
            })
        ]
    });

});
