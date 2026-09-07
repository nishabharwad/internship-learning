Ext.onReady(function () {

    Ext.QuickTips.init();


    var EmployeeRecord = Ext.data.Record.create([
        { name: 'id', type: 'int' },
        { name: 'name', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'department', type: 'string' },
        { name: 'designation', type: 'string' },
        { name: 'salary', type: 'float' }
    ]);


    var initialData = [
        { id: 1, name: 'Aarav Shah', email: 'aarav.shah@example.com', department: 'Engineering', designation: 'Frontend Developer', salary: 45000 },
        { id: 2, name: 'Priya Mehta', email: 'priya.mehta@example.com', department: 'HR', designation: 'HR Executive', salary: 32000 },
        { id: 3, name: 'Rohan Verma', email: 'rohan.verma@example.com', department: 'Engineering', designation: 'Backend Developer', salary: 48000 },
        { id: 4, name: 'Sneha Patel', email: 'sneha.patel@example.com', department: 'Finance', designation: 'Accountant', salary: 38000 },
        { id: 5, name: 'Kabir Nair', email: 'kabir.nair@example.com', department: 'Sales', designation: 'Sales Manager', salary: 50000 }
    ];


    var employeeStore = new Ext.data.JsonStore({
        data: initialData,
        fields: EmployeeRecord,
        root: '',
        idProperty: 'id'
    });


    var nextId = 6;

    var editingRecord = null;


    var loginForm = new Ext.form.FormPanel({
        labelWidth: 80,
        frame: true,
        bodyStyle: 'padding:15px',
        defaultType: 'textfield',
        monitorValid: true,
        items: [
            {
                fieldLabel: 'Username',
                name: 'username',
                anchor: '100%',
                allowBlank: false,
                minLength: 3,
                blankText: 'Username is required'
            },
            {
                fieldLabel: 'Password',
                name: 'password',
                inputType: 'password',
                anchor: '100%',
                allowBlank: false,
                minLength: 4,
                blankText: 'Password is required',
                minLengthText: 'Password must be at least 4 characters'
            }
        ],
        buttons: [
            {
                text: 'Login',
                formBind: true,
                handler: function () {

                    loginWindow.hide();
                    buildDashboard();
                }
            }
        ]
    });


    var loginWindow = new Ext.Window({
        title: 'Employee Management System - Login',
        width: 320,
        height: 160,
        closable: false,
        resizable: false,
        draggable: false,
        modal: true,
        plain: true,
        layout: 'fit',
        items: [loginForm]
    });


    loginWindow.show();


    var departmentStore = new Ext.data.ArrayStore({
        fields: ['dept'],
        data: [
            ['Engineering'],
            ['HR'],
            ['Finance'],
            ['Sales'],
            ['Marketing']
        ]
    });


    var employeeFormPanel = new Ext.form.FormPanel({
        labelWidth: 90,
        frame: true,
        bodyStyle: 'padding:10px',
        defaultType: 'textfield',

        items: [

            {
                xtype: 'hidden',
                name: 'id'
            },

            {
                fieldLabel: 'Name',
                name: 'name',
                anchor: '100%',
                allowBlank: false
            },

            {
                fieldLabel: 'Email',
                name: 'email',
                anchor: '100%',
                vtype: 'email',
                allowBlank: false
            },

            {
                xtype: 'combo',
                fieldLabel: 'Department',
                name: 'department',
                store: departmentStore,
                displayField: 'dept',
                valueField: 'dept',
                mode: 'local',
                triggerAction: 'all',
                editable: false,
                anchor: '100%',
                allowBlank: false
            },

            {
                fieldLabel: 'Designation',
                name: 'designation',
                anchor: '100%',
                allowBlank: false
            },

            {
                xtype: 'numberfield',
                fieldLabel: 'Salary',
                name: 'salary',
                anchor: '100%',
                allowBlank: false,
                minValue: 0
            }
        ]
    });


    var employeeFormWindow = new Ext.Window({
        title: 'Add Employee',
        width: 380,
        height: 300,
        closeAction: 'hide',
        modal: true,
        plain: true,
        layout: 'fit',
        items: [employeeFormPanel],

        buttons: [

            {
                text: 'Save',

                handler: function () {

                    if (!employeeFormPanel.getForm().isValid()) {
                        return;
                    }

                    var values = employeeFormPanel.getForm().getFieldValues();

                    if (editingRecord) {

                        editingRecord.set('name', values.name);
                        editingRecord.set('email', values.email);
                        editingRecord.set('department', values.department);
                        editingRecord.set('designation', values.designation);
                        editingRecord.set('salary', values.salary);

                        editingRecord.commit();

                    }
                    else {

                        var newRecord = new EmployeeRecord({
                            id: nextId++,
                            name: values.name,
                            email: values.email,
                            department: values.department,
                            designation: values.designation,
                            salary: values.salary
                        });

                        employeeStore.add(newRecord);
                    }


                    employeeFormWindow.hide();
                }
            },


            {
                text: 'Cancel',

                handler: function () {
                    employeeFormWindow.hide();
                }
            }
        ],


        listeners: {

            hide: function () {

                employeeFormPanel.getForm().reset();

                editingRecord = null;
            }
        }
    });


    function openAddForm() {

        editingRecord = null;

        employeeFormWindow.setTitle('Add Employee');

        employeeFormPanel.getForm().reset();

        employeeFormWindow.show();
    }


    function openEditForm(record) {

        editingRecord = record;

        employeeFormWindow.setTitle('Edit Employee');

        employeeFormPanel.getForm().reset();

        employeeFormPanel.getForm().setValues({

            id: record.get('id'),
            name: record.get('name'),
            email: record.get('email'),
            department: record.get('department'),
            designation: record.get('designation'),
            salary: record.get('salary')

        });

        employeeFormWindow.show();
    }


    var grid;


    function buildDashboard() {


        var searchField = new Ext.form.TextField({
            emptyText: 'Search employees...',
            width: 200,
            enableKeyEvents: true,

            listeners: {

                keyup: function (field) {
                    applyFilters();
                }
            }
        });


        var filterCombo = new Ext.form.ComboBox({
            store: departmentStore,
            displayField: 'dept',
            valueField: 'dept',
            mode: 'local',
            triggerAction: 'all',
            editable: false,
            emptyText: 'All Departments',
            width: 150,

            listeners: {

                select: function () {
                    applyFilters();
                },

                specialkey: function (field, e) {

                    if (
                        e.getKey() === e.BACKSPACE ||
                        e.getKey() === e.DELETE
                    ) {
                        applyFilters();
                    }
                }
            }
        });


        function applyFilters() {

            var searchVal = searchField.getValue().toLowerCase();

            var deptVal = filterCombo.getValue();


            employeeStore.clearFilter(true);


            employeeStore.filterBy(function (record) {

                var matchesSearch = true;

                var matchesDept = true;


                if (searchVal) {

                    var haystack = (

                        record.get('name') + ' ' +
                        record.get('email') + ' ' +
                        record.get('department') + ' ' +
                        record.get('designation')

                    ).toLowerCase();


                    matchesSearch =
                        haystack.indexOf(searchVal) !== -1;
                }


                if (deptVal) {

                    matchesDept =
                        record.get('department') === deptVal;
                }


                return matchesSearch && matchesDept;
            });
        }


        function clearFilters() {

            searchField.setValue('');

            filterCombo.clearValue();

            employeeStore.clearFilter();
        }


        var columnModel = new Ext.grid.ColumnModel({

            defaultSortable: true,

            columns: [

                {
                    id: 'id',
                    header: 'ID',
                    dataIndex: 'id',
                    width: 50
                },

                {
                    id: 'name',
                    header: 'Name',
                    dataIndex: 'name',
                    width: 150,

                    editor: new Ext.form.TextField({
                        allowBlank: false
                    })
                },

                {
                    id: 'email',
                    header: 'Email',
                    dataIndex: 'email',
                    width: 200,

                    editor: new Ext.form.TextField({
                        vtype: 'email',
                        allowBlank: false
                    })
                },

                {
                    id: 'department',
                    header: 'Department',
                    dataIndex: 'department',
                    width: 120,

                    editor: new Ext.form.ComboBox({
                        store: departmentStore,
                        displayField: 'dept',
                        valueField: 'dept',
                        mode: 'local',
                        triggerAction: 'all',
                        editable: false
                    })
                },

                {
                    id: 'designation',
                    header: 'Designation',
                    dataIndex: 'designation',
                    width: 150,

                    editor: new Ext.form.TextField({
                        allowBlank: false
                    })
                },

                {
                    id: 'salary',
                    header: 'Salary',
                    dataIndex: 'salary',
                    width: 100,
                    align: 'right',

                    renderer: Ext.util.Format.numberRenderer('0,000.00'),

                    editor: new Ext.form.NumberField({
                        allowBlank: false,
                        minValue: 0
                    })
                }
            ]
        });


        var selectionModel =
            new Ext.grid.RowSelectionModel({
                singleSelect: true
            });


        grid = new Ext.grid.EditorGridPanel({

            store: employeeStore,

            cm: columnModel,

            sm: selectionModel,

            region: 'center',

            clicksToEdit: 2,

            stripeRows: true,

            autoExpandColumn: 'email',


            tbar: [

                {
                    text: 'Add Employee',

                    iconCls: 'icon-add',

                    handler: openAddForm
                },

                '-',

                {
                    text: 'Edit',

                    handler: function () {

                        var record =
                            selectionModel.getSelected();


                        if (!record) {

                            Ext.Msg.alert(
                                'No Selection',
                                'Please select an employee to edit.'
                            );

                            return;
                        }


                        openEditForm(record);
                    }
                },


                {
                    text: 'Delete',

                    handler: function () {

                        var record =
                            selectionModel.getSelected();


                        if (!record) {

                            Ext.Msg.alert(
                                'No Selection',
                                'Please select an employee to delete.'
                            );

                            return;
                        }


                        Ext.Msg.confirm(

                            'Confirm Delete',

                            'Delete employee "' +
                            record.get('name') +
                            '"?',

                            function (btn) {

                                if (btn === 'yes') {

                                    employeeStore.remove(record);
                                }
                            }
                        );
                    }
                },

                '->',

                'Department:',
                ' ',

                filterCombo,

                ' ',
                ' ',

                searchField,

                ' ',

                {
                    text: 'Clear',

                    handler: clearFilters
                }
            ],


            bbar: new Ext.Toolbar({

                items: [

                    {
                        xtype: 'tbtext',

                        id: 'record-count-text',

                        text: ''
                    }
                ]
            })
        });


        function updateRecordCount() {

            var countEl =
                Ext.getCmp('record-count-text');


            if (countEl) {

                countEl.setText(
                    employeeStore.getCount() +
                    ' employee(s)'
                );
            }
        }


        employeeStore.on(
            'datachanged',
            updateRecordCount
        );


        employeeStore.on(
            'load',
            updateRecordCount
        );


        updateRecordCount();


        var viewport = new Ext.Viewport({

            layout: 'border',

            items: [

                {
                    xtype: 'box',

                    region: 'north',

                    height: 40,

                    autoEl: {

                        tag: 'div',

                        html:
                            '<div style="padding:10px;font-size:16px;font-weight:bold;background:#dfe8f6;">Employee Management System</div>'
                    }
                },

                grid
            ]
        });
    }

});