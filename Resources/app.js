var myapp={};



myapp.db=Ti.Database.open('user');
myapp.db.execute('create table IF NOT EXISTS user(user_id integer primary key ,name varchar(255),phone_number int(11),email varchar(255))');	



myapp.myContainer = Ti.UI.createWindow({
	layout:"vertical"
});

/////////////////////////////////create tabs//////////////////////////////////


myapp.settings=Ti.UI.createWindow({
	title:"Settings",
	layout:"vertical",
	});

myapp.request=Ti.UI.createWindow({
	title:"Requset",
	layout:"vertical",
	});

myapp.tabGroup=Ti.UI.createTabGroup(
	{
		
		tabsBackgroundColor :'red',
		color:"blue",
		
	}
);

myapp.tab_settings=Ti.UI.createTab({
	title:"Settings",
	window:myapp.settings
});

myapp.tab_request=Ti.UI.createTab({
	title:"Request",
	window:myapp.request
});

myapp.tabGroup.addTab(myapp.tab_settings);
myapp.tabGroup.addTab(myapp.tab_request);

myapp.myContainer.add(myapp.tabGroup);


///////////////////////////////////tab1_request///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////tab2_settings///////////////////////////////////////

myapp.settingsView=Ti.UI.createView({
	layout:"vertical",
	width:"100%",
	height:"100%",
		
});		


///////////////////////////////////notification settings//////////////////////////

myapp.notificationLbl= Ti.UI.createLabel({
text:"Notifications",
font:{fontSize:"15dp"},
top:10,
left:10,
color: 'black'
});

myapp.basicSwitch = Ti.UI.createSwitch({
  value:true,
  top:10,
  right:10 
});

myapp.notification_req=Ti.Network.createHTTPClient({
	onload:function(){
		alert (this.responseText);
	}
});

myapp.notification_req.open("POST","http://192.168.1.105/uberme/public/members/updateStatus_ws");

myapp.basicSwitch.addEventListener('change',function(e){
  Ti.API.info('Switch value: ' + basicSwitch.value);
  
  myapp.notification_req.send({
  	"status":basicSwitch.value,
  	"user_id":1
  });

});


myapp.settingsView.add(myapp.notificationLbl);
myapp.settingsView.add(myapp.basicSwitch);


/////////////////////////////////settings_cont///////////////////////////////////////
			
myapp.myProfileBtn=Ti.UI.createButton({
			     title:"Profile",
			     width:'70%',
			     backgroundColor:"#3a2613",
			     top:'20dp',
			     borderRadius:10,
			});
			
			
myapp.TripsBtn=Ti.UI.createButton({
			     title:"Trips",
			     width:'70%',
			     backgroundColor:"#3a2613",
			     top:'20dp',
			     borderRadius:10,
			});
			
			

myapp.settingsView.add(myapp.myProfileBtn);
myapp.settingsView.add(myapp.TripsBtn);

myapp.settings.add(myapp.settingsView);


///////////////////////////////////profile settings///////////////////////////////

myapp.myProfile = Ti.UI.createWindow({
	layout:"vertical",
});

myapp.editProfileView = Ti.UI.createView({
	layout:"vertical",
	width:"100%",
	height:"100%",
		
});


myapp.myProfileBtn.addEventListener('click',function(){
	
	myapp.myProfile=myapp.db.execute('select * from  user ');

		if(myapp.myProfile.isValidRow())
		{
		  for(var i=0,j=myapp.myProfile.data.length;i<j;i++)
		     {
	   			myapp.namelabel=Ti.UI.createLabel({
				text:"name",
				color:"red",
				font:{fontSize:"30dp"},
				width:'50%',
				right:'160dp',
		
				});
				
				myapp.nameText=Ti.UI.createTextField({
				text:myapp.myProfile.data[0].name,
				color:"red",
				font:{fontSize:"30dp"},
				width:'50%',
				right:'160dp',
		
				});
				
				myapp.phonelabel=Ti.UI.createLabel({
				text:"Phone Number",
				color:"red",
				font:{fontSize:"30dp"},
				width:'50%',
				right:'160dp',
		
				});
				
				myapp.phoneText=Ti.UI.createTextField({
				text:myapp.myProfile.data[0].phone_number,
				color:"red",
				font:{fontSize:"30dp"},
				width:'50%',
				right:'160dp',
		
				});
				
				myapp.emaillabel=Ti.UI.createLabel({
				text:"email",
				color:"red",
				font:{fontSize:"30dp"},
				width:'50%',
				right:'160dp',
		
				});
				
				myapp.emailText=Ti.UI.createTextField({
				text:myapp.myProfile.data[0].email,
				color:"red",
				font:{fontSize:"30dp"},
				width:'50%',
				right:'160dp',
		
				});
			}
			
			
	    }
	
	});
	
	
////////////////////////////////////////edit_profile_event//////////////////////////////	
myapp.profileEditBtn=Ti.UI.createButton({
			     title:"Update",
			     width:'70%',
			     backgroundColor:"#3a2613",
			     top:'20dp',
			     borderRadius:10,
			});
				

myapp.profileEditBtn.addEventListener('click',function(){
	
//myapp.db.execute('update table user set name="'+nameText.value+'",email="'+emailText.value+'",phone_number="'+phoneText.value+'""');	
	
	myapp.updateProfile_req=Ti.Network.createHTTPClient({
	onload:function(){
		alert (this.responseText);
	}
});


myapp.updateProfile_req.open("POST","http://192.168.1.105/uberme/public/members/update");

myapp.updateProfile_req.send({
  	"user_id":1,
  	"name":nameText.value,
  	"phone_number":phoneText.value , 
  	"email": emailText.value,
  	});

});
	
	
myapp.editProfileView.add(myapp.namelabel);
myapp.editProfileView.add(myapp.nameText); 
myapp.editProfileView.add(myapp.phonelabel); 
myapp.editProfileView.add(myapp.phoneText);  	
myapp.editProfileView.add(myapp.emaillabel);  	
myapp.editProfileView.add(myapp.emailText);  	

myapp.editProfileView.add(myapp.profileEditBtn);  	

myapp.myProfile.add(myapp.editProfileView);
myapp.myProfile.open();	



///////////////////////////////////trips settings/////////////////////////////////


myapp.myTrips = Ti.UI.createWindow({
	layout:"vertical",
});


myapp.tripView=Ti.UI.createView({
	layout:"vertical",
	width:"100%",
	height:"100%",
		
});		

myapp.tripTbl=Ti.UI.createTableView({
	
	search:myapp.searchBar1,
	filterAttribute:'title'
});


myapp.TripsBtn.addEventListener('click',function(e){
	myapp.myTrips.open();

myapp.showTripsReq=Ti.Network.createHTTPClient({
	onload:function(){
		myapp.trips_rows=[];
		myapp.trips=JSON.parse(this.responseText);
		for(var i=0,j=myapp.trips.data.length;i<j;i++){
			myapp.trips_row={
				title:myapp.trips.data[i].pickup_location,
				color:"white",
				height:"100dp",
				font:{fontSize:"20dp",fontWeight:'bold'},
				id:myapp.trips.data[i].trip_id,

			};
			myapp.trips_rows.push(myapp.trips_row);
		}
		myapp.tripTbl.setData(myapp.trips_rows);
	}
	
    });
});

//myapp.showTripsReq.open("POST","http://192.168.1.105/uberme/public/User_invitation_trip/show_ws");
//myapp.showTripsReq.send({
//		'user_id':1
//	});

myapp.tripView.add(myapp.tripTbl);
myapp.myTrips.add(myapp.tripView);


/////////////////////////////////// trip_details /////////////////////////////////


myapp.myTripDetails = Ti.UI.createWindow({
	layout:"vertical",
});


myapp.tripDetailsView=Ti.UI.createView({
	layout:"vertical",
	width:"100%",
	height:"100%",
		
});		

myapp.trips_rows.addEventListener('click',function(){
	myapp.myTripsDetails.open();
	
	myapp.TripDetailsReq=Ti.Network.createHTTPClient({
	onload:function(){
		myapp.tripDetails=JSON.parse(this.responseText);
		for(var i=0,j=myapp.tripDetails.data.length;i<j;i++)
		{	
			myapp.pickUpLabel=Ti.UI.createLabel({
			text:myapp.tripDetails.data[i].pickup_location,
			color:"red",
			font:{fontSize:"30dp"},
			width:'50%',
			right:'160dp',
		
			});
			
			myapp.destinationLabel=Ti.UI.createLabel({
			text:myapp.tripDetails.data[i].destnation_location,
			color:"red",
			font:{fontSize:"30dp"},
			width:'50%',
			right:'160dp',
		
			});
			
			myapp.tripLabel=Ti.UI.createLabel({
			text:myapp.tripDetails.data[i].trip_time,
			color:"red",
			font:{fontSize:"30dp"},
			width:'50%',
			right:'160dp',
		
			});
			
			myapp.invitedNamesLabel=Ti.UI.createLabel({
			text:myapp.tripDetails.data[i].name,
			color:"red",
			font:{fontSize:"30dp"},
			width:'50%',
			right:'160dp',
		
			});
		  }
		}
	});
});

myapp.tripDetailsView.add(myapp.pickUpLabel);
myapp.tripDetailsView.add(myapp.destinationLabel);
myapp.tripDetailsView.add(myapp.tripLabel);
myapp.tripDetailsView.add(myapp.invitedNamesLabel);

myapp.myTripDetails.add(myapp.tripDetailsView);

///////////////////////////////end_of_app//////////////////////////////////////////

myapp.myContainer.open();
