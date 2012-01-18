// $Id$
/**
 * Script helpers for cul_hours
 */
/**
 * The libraryhours object.
 */
var libraryhours = {};

if (Drupal.jsEnabled) {  
   
   // This appends all our jQuery stuff to the Drupal behaviors variable
   Drupal.behaviors.libraryhours = function (context) {
      
      $('#details').html('<span class="hoursprompt">Click on a location from the list at the left to see the full semester schedule.</span>');
      
      // Create the custom overlay for the CU Google map
      document.domain = "cornell.edu";
      customOverlay = { title: 'Libraries',
                        iconURL: 'http://www.library.cornell.edu/mjc12/mobilecul/library_open.png'
                      };
      customOverlay.points = [];   
      libs = Drupal.settings.libraryhours.libs; 
      $.each(libs, function() { 
         customOverlay.points.push({ lat: this.lat,
                                     lng: this.long,
                                     title: this.title
                                    });
      });
      
      // Attach event handler for when the user selects a particular library
      $('table.hourstable td').click( function() {
         
         // First, call up the semester schedule for that library and display it
         // (get just the text without the inner elements following the example here:
         // http://viralpatel.net/blogs/2011/02/jquery-get-text-element-without-child-element.html)
         var selectedLibrary = $(this).clone().children().remove().end().text();
         var itemIndex = $('td').index(this);
         $.get('libraryhours/get/semester/' + selectedLibrary, function(data) {
            $('#details').html("<h2>Details for " + selectedLibrary + ":</h2>" + data);   
         });
         
         // Secondly, center the map
         iframe = document.getElementById('campusmap');
         iframe.src = "http://www.cornell.edu/maps/gmap.cfm?iframe=1&hideLocList=1&hideOverlays=1&hideDir=1" + "&loc=" + selectedLibrary;
      });
      
      // Toggle between showing a list of all libraries and only those that are currently open
      $('#showOption').click( function() {
         if ($('#showOption button').html() == "Show only what's open") {
            var numHidden = $('td.closed').size();
            $('#showOption button').html('Show all libraries');
            $('#showNote').html('(Hiding ' + numHidden + ' libraries)');
         }
         else {
            $('#showOption button').html("Show only what's open");
            $('#showNote').html('');
         }
         $('.closed').toggle(); 
      });
     
   };  // End Drupal.behaviors.libraryhours definition

}

