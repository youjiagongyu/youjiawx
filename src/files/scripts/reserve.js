$(function(){
    AV.$ = jQuery;

	AV.initialize("y5hlx1obxjy0g8vscp4p7rldsw01qt0te4yxn9bv79j6al6h", "5nyxyi0o29mmj4sikf7ktmy2y2j5waansr7k2npjnrbb7ao0");
	
	var StatusView = AV.View.extend({
		el: ".app-content",
		
		initialize: function() {
			this.render();
		},
		
		render: function() {
			this.$el.html(_.template($("#reserve-status-template").html(), {temp: "1234"}));
		}
	});
	
	var FormView = AV.View.extend({
		events: {
			"submit form#reserve-form": "add"
		},
		
		el: ".app-content",
		
		add: function(e){
			var self = this;
			var Reservation = AV.Object.extend("Reservation");
			var newReservation = new Reservation();
			newReservation.set("name",this.$("#inputName").val());
			newReservation.set("gender",this.$("#selectGender").val());
			newReservation.set("age",this.$("#selectAge").val());
			newReservation.set("education",this.$("#selectEdu").val());
			newReservation.set("occupation",this.$("#selectOccu").val());
			newReservation.set("shop",this.$("#selectShop").val());
			newReservation.set("room_type",this.$("#selectRoomType").val());
			newReservation.set("budget",this.$("#selectBudget").val());
			newReservation.set("start_date",this.$("#inputDate").val());
		    newReservation.save(null, {
		        success: function(object) {
		        	new StatusView;
		            self.undelegateEvents();
		            delete self;
		        },
				error: function(obj, error) {
				    alert('Failed to create new object, with error code: ' + error.description);
				}
		    });
			return false;
		},
		
	    initialize: function() {
	      _.bindAll(this, "add");
	      this.render();
	    },
		
	    render: function() {
	        this.$el.html(_.template($("#reserve-form-template").html()));
	        this.delegateEvents();
	    }
	});
		
	new FormView;		
});
