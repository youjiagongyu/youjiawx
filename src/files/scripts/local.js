$(function(){
    AV.$ = jQuery;

	AV.initialize("y5hlx1obxjy0g8vscp4p7rldsw01qt0te4yxn9bv79j6al6h", "5nyxyi0o29mmj4sikf7ktmy2y2j5waansr7k2npjnrbb7ao0");
	
	
	var Merchant = AV.Object.extend("Merchant", {
		
		
	});
	
    var MerchantList = AV.Collection.extend({

      model: Merchant,
	  
	  sub: function(category) {
		  return this.filter(function(merc){ return merc.get('category')==category;});
	  }
    });
	
	var ItemView = AV.View.extend({
		el: "li",
		template: _.template($('#item-template').html()),
		
	    render: function() {
	      $(this.el).html(this.template(this.model.toJSON()));
		  return this;
	    },
		  
	    initialize: function() {
	        _.bindAll(this, 'render');
	        this.model.bind('change', this.render);
	    }
	});
	
	var ListView = AV.View.extend({
		el: ".app-content",
		template: _.template($('#list-template').html()),
		
		initialize: function() {
			var self = this;
			
			_.bindAll(this, "addOne", "addAll")
			
			this.merchants = new MerchantList;
			
			this.merchants.fetch({success:function(){
				//alert(self.merchants.length);
				//self.addAll();
				
	  	      self.$("#merchant-list").html("");
	  	      self.merchants.each(self.addOne);
			}});
			
			
		},
		
	    addOne: function(merchant) {
	      var view = new ItemView({model: merchant});
	      this.$("#merchant-list").append(view.render().el);
	    },

	    addAll: function(collection, filter) {
	      this.$("#merchant-list").html("");
	      this.merchants.each(this.addOne);
	    }
	});
	
	new ListView;
});