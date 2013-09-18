// $Id$
/**
 * Script helpers for cul_hours
 */
/**
 * The cul_hours object.
 */
(function ($) {
   var cul_hours = {};
   document.domain = 'cornell.edu';

   // This appends all our jQuery stuff to the Drupal behaviors variable
   Drupal.behaviors.cul_hours = {
      attach: function (context) {
         $('#details').html('<span class="hoursprompt">Click on a location from the list at the left to see the full semester schedule.</span>');

         // Create the custom overlay for the CU Google map
         customOverlay = { title: 'Libraries',
                           iconURL: Drupal.settings.cul_hours.module_path + '/images/96-book.png'
                         };
         customOverlay.points = [];
         libs = Drupal.settings.cul_hours.libs;

         nameMap = Drupal.settings.cul_hours.name_map;
         $.each(libs, function() {
            customOverlay.points.push({ lat: this.lat,
                                        lng: this.long,
                                        title: this.title
                                       });
         });

         // Attach event handler for when the user selects a particular library
         $('ul.hourscontent li').click( function() {

            // Before first, add a progress indicator
            $('#details').html('<span class="hoursprompt">Loading...</span>');

            // First, call up the semester schedule for that library and display it
            // (get just the text without the inner elements following the example here:
            // http://viralpatel.net/blogs/2011/02/jquery-get-text-element-without-child-element.html)
            var selectedLibrary = $(this).clone().children().remove().end().text();
            var itemIndex = $('li').index(this);
            $.get('libraryhours/get/semester/' + selectedLibrary, function(data) {
               $('#details').addClass('detail_display').html("<h2>Details for " + selectedLibrary + ":</h2>" + data);
            });

            // Secondly, center the map
            iframe = document.getElementById('campusmap');
            iframe.src = "http://www.cornell.edu/maps?iframe=1&hideLocList=1&hideOverlays=1&hideDir=1&suppressUserLoc=1" + "&loc=" + nameMap[selectedLibrary];
         });

         // Toggle between showing a list of all libraries and only those that are currently open
         $('#showOption').click( function() {
            if ($('#showOption button').html() == "Show only what's open") {
               var numHidden = $('li.closed').size();
               $('#showOption button').html('Show all libraries');
               $('#showNote').html('(Hiding ' + numHidden + (numHidden == 1 ? ' library)' : ' libraries)'));
            }
            else {
               $('#showOption button').html("Show only what's open");
               $('#showNote').html('');
            }
            $('.closed').toggle();
         });

         // Parameterize the URL query parameters, using the code from
         // http://stackoverflow.com/questions/5448545/how-to-retrieve-get-parameters-from-javascript
         var prmstr = window.location.search.substr(1);
         var prmarr = prmstr.split ("&");
         var params = {};

         for ( var i = 0; i < prmarr.length; i++) {
            var tmparr = prmarr[i].split("=");
            params[tmparr[0]] = tmparr[1];
         }

         // If a 'loc' location parameter is specified in the URL, simulate a click on that list item to focus the
         // map and detail view on that library.
         if (params.loc) {
            $('ul.hourscontent li#loc_' + params.loc).click();
         }

      }  // End Drupal.behaviors.cul_hours definition
})(jQuery);
