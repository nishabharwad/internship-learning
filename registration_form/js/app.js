Ext.onReady(function () {

   var qualificationsData= [
      ['Undergraduate', 'Undergraduate'],
      ['Postgraduate', 'Postgraduate'],
      ['Diploma', 'Diploma']
   ];

   var qualificationsStore= new Ext.data.ArrayStore({
         fields:['qlcode','qualification'],
         data: qualificationsData
      });
   
   Ext.apply(Ext.form.VTypes, {
         passwordMatch: function(val,field)
         {
            if(field.initialPassField)
            {
               var pwd=Ext.getCmp(field.initialPassField);
               return (val === pwd.getValue());
            }
            return true;
         },
         passwordMatchText: 'Passwords do not match'
      });

   var userData = new Ext.data.Store({
   fields: [
    'firstName',
    'middleName',
    'lastName',
    'gender',
    'email',
    'birthdate',
    'address',
    'instituteName',
    'qualification'
   ]
   });

   var regform = new Ext.form.FormPanel({
   title: 'Registration Form',
   bodyStyle:'padding:20px;',
   labelWidth:100,
   labelPad:10,
   defaults:{
   msgTarget: 'side'
   },
   width: 1180,
   height: 500,
   renderTo : Ext.getBody(),
   items : [
      {
         xtype: 'textfield',
         fieldLabel:'First Name',
         name: 'firstName',
         width:200,
         allowBlank:false
      },
      {
         xtype: 'textfield',
         fieldLabel:'Middle Name',
         name: 'middleName',
         width:200,
         allowBlank:false
      },
      {
         xtype: 'textfield',
         fieldLabel:'Last Name',
         name: 'lastName',
         width:200,
         allowBlank:false
      },
      {
         xtype:'radiogroup',
         fieldLabel: 'Gender',
         name:'gender',
         columns :3,
         allowBlank:false,
         items: [
            {
               xtype: 'radio',
               boxLabel: 'Male',
               name: 'gender',
               inputValue: 'Male'       
            },
            {
               xtype: 'radio',
               boxLabel: 'Female',
               name: 'gender',
               inputValue: 'Female'
            },
            {
               xtype:'radio',
               boxLabel:'Non-binary',
               name:'gender',
               inputValue:'Non-binary'
            },
            {
               xtype: 'radio',
               boxLabel:'Other',
               name:'gender',
               inputValue:'Other'
            },
            {
               xtype:'radio',
               boxLabel:'Prefer not to say',
               name:'gender',
               inputValue:'Prefer not to say'
            }]
         },

         {  
            xtype: 'textfield',
            fieldLabel: 'Email Address',
            name: 'email',
            vtype:'email',
            width:200,
            allowBlank:false
         },
         {
            xtype:'datefield',
            fieldLabel:'Date of Birth',
            name: 'birthdate',
            format:'Y-m-d',
            altFormats:'m/d/Y|d-m-Y',
            allowBlank:false,
            width:200
         },
         {
            xtype:'textarea',
            fieldLabel:'Address',
            name:'address',
            grow:false,
            // growMax:150,
            preventScrollbars:false,
            maxLength:1000,
            anchor:'85%',
            allowBlank:false
         },
         {
            xtype: 'textfield',
            fieldLabel: 'Institute Name',
            name: 'instituteName',
            width: 200,
            allowBlank: false
         },
         {
            xtype:'combo',
            fieldLabel: 'Qualification',
            name:'qualification',
            hiddenName:'qualification',
            store:qualificationsStore,
            valueField:'qlcode',
            displayField:'qualification',
            typeAhead:true,
            mode:'local',
            triggerAction:'all',
            emptyText: 'Select your qualification...',
            selectOnFocus:true,
            allowBlank:false,
            width:200
         },
         {
            xtype:'textfield',
            fieldLabel:'Password',
            name:'password',
            id:'main-password-field',
            inputType:'password',
            allowBlank:false,
            minLength:8,
            maxLength:12,
            width:200
         },
         {
            xtype:'textfield',
            fieldLabel:'Confirm Password',
            name:'confirmPassword',
            inputType:'password',
            vtype:'passwordMatch',
            initialPassField:'main-password-field',
            allowBlank:false,
            width:200
         }],

         buttons : [
            {
            text : 'submit',
            formBind:true,
            handler : function(){
               var formInstance= regform.getForm();
               if(formInstance.isValid())
               {
                  var formData= formInstance.getFieldValues();
                  var genderField = regform.getForm().findField('gender');
console.log(genderField);
                  var gender = genderField.getValue().inputValue;
                  var NewRecord = Ext.data.Record.create([
                     {name:'firstName'},
                     {name:'middleName'},
                     {name:'lastName'},
                     {name:'gender'},
                     {name:  'email'},
                     {name:'birthdate'},
                     {name: 'address'},
                     {name: 'instituteName'},
                     {name:'qualification'}
                  ]);

               var newRow=new NewRecord({
                  firstName:formData.firstName,
                  middleName:formData.middleName,
                  lastName:formData.lastName,
                  gender: gender,
                  email:formData.email,
                  birthdate:formData.birthdate,
                  address:formData.address,
                  instituteName:formData.instituteName,
                  qualification:formData.qualification,
               });

               userData.add(newRow);
               formInstance.reset();
               }
            }
            },
            {
               text: 'reset',
               handler: function()
               {
                  regform.getForm().reset();
               }
            }
         ]

   });

   var dataGrid = new Ext.grid.GridPanel({
      title:'User Data',
      renderTo :Ext.getBody(),
      store: userData,
      height:200,
      width:1180,
      columns: [
    { header: 'First Name',      dataIndex: 'firstName',      width: 100 },
    { header: 'Middle Name',     dataIndex: 'middleName',     width: 100 },
    { header: 'Last Name',       dataIndex: 'lastName',       width: 100 },
    { header: 'Gender',          dataIndex: 'gender',         width: 100 },
    { header: 'Email',           dataIndex: 'email',          width: 180 },
    { header: 'Date of Birth',   dataIndex: 'birthdate',    width: 110, renderer: function(value) {
        return Ext.util.Format.date(value, 'd/m/Y');
    }},
    { header: 'Address',         dataIndex: 'address',        width: 180 },
    { header: 'Institute Name',  dataIndex: 'instituteName',  width: 180 },
    { header: 'Qualification',   dataIndex: 'qualification',  width: 120 }
      ]   });

});
