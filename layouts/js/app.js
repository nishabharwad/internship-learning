Ext.onReady(function() {

    // absolute layouts
    new Ext.Panel({
        renderTo: Ext.getBody(),
        title: 'Absolute Layout',
        width: 300,
        height: 150,
        layout: 'absolute',
        items: [
            new Ext.Button({ text: 'Positioned Button', x: 20, y: 40 })
        ]
    });

    // accordion layout 

    new Ext.Panel({
        renderTo: Ext.getBody(),
        title: 'Accordion Layout',
        width: 300,
        height: 200,
        layout: 'accordion',
        items: [
            new Ext.Panel({ title: 'Section 1', html: 'Content one' }),
            new Ext.Panel({ title: 'Section 2', html: 'Content two' })
        ]
    });

    // anchor 

    new Ext.Panel({
        renderTo: Ext.getBody(),
        title: 'Anchor Layout',
        width: 300,
        height: 150,
        layout: 'anchor',
        items: [
            new Ext.form.TextField({ fieldLabel: 'Name', anchor: '100%' })
        ]
    });

    // hbox
    new Ext.Panel({
        renderTo: Ext.getBody(),
        title: 'HBox Layout',
        width: 300,
        height: 100,
        layout: 'hbox',
        items: [
            new Ext.Button({ text: 'One' }),
            new Ext.Button({ text: 'Two' }),
            new Ext.Button({ text: 'Three' })
        ]
    });

    // vbox

    new Ext.Panel({
        renderTo: Ext.getBody(),
        title: 'VBox Layout',
        width: 150,
        height: 200,
        layout: 'vbox',
        items: [
            new Ext.Button({ text: 'One' }),
            new Ext.Button({ text: 'Two' }),
            new Ext.Button({ text: 'Three' })
        ]
    });

    // card layout 
    var cardPanel = new Ext.Panel({
        renderTo: Ext.getBody(),
        title: 'Card Layout',
        width: 300,
        height: 150,
        layout: 'card',
        activeItem: 0,
        items: [
            new Ext.Panel({ html: 'Card 1' }),
            new Ext.Panel({ html: 'Card 2' })
        ],
        bbar: [
            {
                text: 'Next Card',
                handler: function() {
                    var l = cardPanel.getLayout();
                    l.next();
                }
            }
        ]
    });

    // form layout

    new Ext.Panel({
        renderTo: Ext.getBody(),
        title: 'Form Layout',
        width: 300,
        height: 150,
        layout: 'form',
        items: [
            new Ext.form.TextField({ fieldLabel: 'First Name' }),
            new Ext.form.TextField({ fieldLabel: 'Last Name' })
        ]
    });

    // toolbar layout 
    new Ext.Panel({
        renderTo: Ext.getBody(),
        title: 'Toolbar Example',
        width: 300,
        height: 100,
        tbar: [
            new Ext.Button({ text: 'Save' }),
            new Ext.Button({ text: 'Cancel' })
        ]
    });

    // table layout 

    new Ext.Panel({
        renderTo: Ext.getBody(),
        title: 'Table Layout',
        width: 300,
        height: 150,
        layout: 'table',
        layoutConfig: { columns: 2 },
        items: [
            new Ext.Button({ text: 'A' }),
            new Ext.Button({ text: 'B' }),
            new Ext.Button({ text: 'C' }),
            new Ext.Button({ text: 'D' })
        ]
    });


    // container layout ?

    new Ext.Panel({
        renderTo: Ext.getBody(),
        title: 'Container Layout',
        width: 300,
        height: 150,
        layout: 'container',
        items: [
            new Ext.Button({ text: 'Item 1' }),
            new Ext.Button({ text: 'Item 2' })
        ]
    });

    // fit layout 


    new Ext.Panel({
        renderTo: Ext.getBody(),
        title: 'Fit Layout',
        width: 300,
        height: 150,
        layout: 'fit',
        items: [ new Ext.Panel({ html: 'this fills the entire place ' }) ]
    });

    // auto layout 

    new Ext.Panel({
        renderTo: Ext.getBody(),
        title: 'Auto Layout',
        width: 300,
        height: 150,
        layout: 'auto',
        items: [
            new Ext.Button({ text: 'One' }),
            new Ext.Button({ text: 'Two' })
        ]
    });




    // column layout example 

    new Ext.Panel({
        renderTo: Ext.getBody(),
        title: 'Column Layout',
        width: 300,
        height: 150,
        layout: 'column',
        items: [
            new Ext.Panel({ columnWidth: 0.5, html: 'Left', border: false }),
            new Ext.Panel({ columnWidth: 0.5, html: 'Right', border: false })
        ]
    });



    // border layout 



    new Ext.Panel({
        renderTo: Ext.getBody(),
        title: 'Border Layout',
        width: 400,
        height: 250,
        layout: 'border',
        items: [
            new Ext.Panel({ region: 'north', html: 'Header', height: 40 }),
            new Ext.Panel({ region: 'west', html: 'Sidebar', width: 100 }),
            new Ext.Panel({ region: 'center', html: 'Main content' })
        ]
    });

});




