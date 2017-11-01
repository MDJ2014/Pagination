
//////////**********defined the search formm and added it to the page programatically
let searchForm =
"<form id='searchbox'>" +
  "<input id='search' type='text' name='search'  placeholder='Search for students...'' value=''>" +
  "<input id = 'searchbtn' class='btn btn-info'TYPE='button' NAME='button' Value='Search' onClick='searchList(this.form)'>"+
  "<input TYPE = 'button' id='back' Value='Reload' onClick='reload()'></form>"

 $("#student-header").after(searchForm);



let pageSize = 10;                                             //set the number of students per page
var slist = $(".student-item");                                 //get the list of students from the DOM


showPage(1,slist);                                               //show page 1 as soon as the page loads
appendPageLinks(slist);                                           //append page links to the page
$('#back').hide();                                                //hide the reset page button


///////////************showPage function
function showPage(page, list) {                                     //pass a page number and  a list to show

  var $activeLink = $( "li a" ).eq( page -1);                       // checks if the page number is equal to the link num
                                                                  // first hide all students on the page
  $('.student-item').hide();
                                                                      // Then loop through all students in the student list argument
    list.each(function(index){
                                                                         // if student should be on this page number
      if (index >= pageSize * (page - 1) && index < pageSize * page){
                                                                         // show the student
               $(this).show();

               }
      });

    $('li a').removeClass('active');                              //remove the active class to unhighlight the link
      $activeLink.addClass('active');                             //add the hightlight  to the active link
 }


///////////************appendPageLinks function
 function appendPageLinks(list) {                                    //a list is passed here to get the length

   var len=list.length;                                             //get the length
   var numPages = Math.ceil(len/10);                                 //get the number of pages by rounding up
   var nav =  "<ul class='pagination'>";                           //set up the html to display the links

    for(let i =1; i<numPages +1; i++){                              //loop through the pages to add html and id for href
        nav += ("<li> <a id="+ i +">" + i + "</li></a>");
       }

     nav += "</ul>";                                               //close the html
     $("#searchResults").after(nav);                                //add the links to the page after the results div

     $('.pagination a').click(function(id){                       //add a click listener to each a tag passing the links id

        var num = this.id;
        showPage(num,list);                                         //call the showPage function to display the page

     });
 }



///////////************search function
 function searchList() {
                                                                                // Obtain the value of the search input
     var searchTerm = document.getElementById('search').value;
     document.getElementById('searchResults').innerHTML ="";                    //clear the results div
                                                                                // remove the previous page link section
      $('.pagination').hide();                                                  //hide the pagination
      $('#students').hide();                                                    //hide the student list
      $('#back').show();                                                        //show reset button

                                                                                // ...obtain the student’s name…
     let names = document.querySelectorAll('h3');
                                                                                // ...and the student’s email…
     let emails = document.querySelectorAll('.email');
                                                                                // Loop over the student list, and for each student…
     var rgxsearch = searchTerm + '+';                                          //set up the searchTerm as a regular expression for more acurate seaarches
     var regexp = new RegExp(rgxsearch, "gi");                                  //form the expresson
     var found =0;                                                              //var for checking for matches

     for (let i = 0; i < names.length; i++){                                        // loop through the names and emails to find a match

      if(names[i].innerHTML.match(regexp)  || emails[i].innerHTML.match(regexp)){        //match the regexp to names and emails
          found+=1;                                                                    //add to the counter
          document.getElementById('searchResults').append(names[i].closest("li"));     //append all found items to this hidden div to make the matched list
        }
     }


var resultlist = $("#searchResults").children();                                //get the items in the results div to pass as a list

if(found === 0){
                                                                                //  if no match was found
    $('#search').val('');                                                       //clear the search box
    var messg = "<p class='well'>  Student not found. </p>";                     // make a html message to display
    $("#searchResults").append(messg);                                            //display the message

  }else if(found > 10){                                                        //if more than 10 matches are found

     $('#search').val('');                                                      //clear the search box
     appendPageLinks(resultlist);                                               //call the appendPageLinks function with the match results list
     showPage( 1, resultlist);                                                  //show page 1 of the matched results list

   }else{                                                                        //if less than 10 just clear the search box

      $('#search').val('');                                                     //and call show page , page 1 with the result list
      showPage(1,resultlist);
   }


  }
///////////************reload function
function reload(){                                                                //this is called by the reload button to reset the page
   location.reload();
}
