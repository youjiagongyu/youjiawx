docpadConfig = {
	templateData:
		site:
			title: "You+国际青年公寓"
			styles: [
				"/vendor/css/bootstrap.css"
				"/styles/style.css"
			]
			scripts: [
				"/vendor/js/jquery.min.js"
				"/vendor/js/bootstrap.min.js"
				"/vendor/js/underscore.min.js"
				"/scripts/script.js"
			]
		getTitle: -> if @document.title then "#{@document.title} | #{@site.title}" else @site.title
	
	collections:
		pages: -> @getCollection("documents").findAllLive({isPage:true})
		rooms: -> @getCollection("documents").findAllLive({isRoom:true})
		events: -> @getCollection("documents").findAllLive({isEvent:true})
		entertainments: -> @getCollection("documents").findAllLive({isEntertainment:true})
		
	# DocPad Events
	events:

	    # Server Extend
	    # Used to add our own custom routes to the server before the docpad routes are added
	    serverExtend: (opts) ->
	        # Extract the server from the options
	        {server,express} = opts
	        docpad = @docpad
	        request = require('request')

	        # DocPad Regenerate Hook
	        # Automatically regenerate when new changes are pushed to our documentation
	        server.all '/regenerate', (req,res) ->
	            if req.query?.key is process.env.WEBHOOK_KEY
	                docpad.log('info', 'Regenerating for documentation change')
	                docpad.action('generate')
	                res.send(200, 'regenerated')
	            else
	                res.send(400, 'key is incorrect')
}

module.exports = docpadConfig